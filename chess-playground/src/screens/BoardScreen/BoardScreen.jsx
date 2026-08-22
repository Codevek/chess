import { Chess, generateFEN } from "chess-engine";
import Board from "../../components/board/Board";
import ChessPiece from "../../components/board/ChessPiece";
import { useEffect, useState, useRef } from "react";
import GameOver from "../../components/GameOver";
import HistoryPanel from "../../components/HistoryPanel";
import PlayerCard from "../../components/player/playerCard";
import avatar1 from "../../assets/avtars/avatar1.jpg";
import avatar2 from "../../assets/avtars/avatar2.jpg";
import GameStatus from "../../components/GameStatus";
import CapturedPieces from "../../components/CapturedPieces";
import MenuLayout from "../../components/leftPanel/MenuLayout";
import LeftPanel from "../../components/leftPanel/LeftPanel";
import BoardCoordinates from "../../components/board/BoardCoordinates";
import HomeScreen from "../HomeScreen/HomeScreen";
import newGame from "../../../../chess-engine/src/index.js";
import { BOT_DEPTH } from "@/lib/botLevel";
import { findBestMove } from "chess-engine/src/ai/minimax";
import QuitPopup from "@/components/QuitPopup";

export default function BoardScreen({ session, onQuitGame }) {
  const gameRef = useRef(new Chess());
  const game = gameRef.current;

  const [board, setBoard] = useState(gameRef.current.board);

  // console.log(gameConfig);

  const {
    mode, // "newgame", "practice", "online", "friend"
    playerColor,
    botColor,
    depth,
    time,
    whiteTime = time || 600,
    blackTime = time || 600,
    increment,
  } = session;

  // "2K5/2P2PnP/pB1k1b2/8/p3B2Q/1Ppqp3/8/8 w - - 0 1"
  const [flipped, setFlipped] = useState(playerColor === "black");
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  // const [_, forceUpdate] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const [kingInCheck, setKingInCheck] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [history, setHistory] = useState([]);

  const [whiteClock, setWhiteClock] = useState(whiteTime);
  const [blackClock, setBlackClock] = useState(blackTime);
  const [running, setRunning] = useState(true);

  const clearSelection = () => {
    setSelectedSquare(null);
  };
  const clearLegalMoves = () => {
    setLegalMoves([]);
  };

  useEffect(() => {
    if (botColor === "white" && mode === "newgame") {
      makeBotMove();
    }
  }, [mode, botColor]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      if (game.getTurn() === "w") {
        setWhiteClock((time) => Math.max(0, time - 1));
      } else {
        setBlackClock((time) => Math.max(0, time - 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [running, gameResult]);

  useEffect(() => {
    if (whiteClock === 0) {
      setGameResult({
        type: "timeout",
        winner: "black",
      });

      setRunning(false);
    }

    if (blackClock === 0) {
      setGameResult({
        type: "timeout",
        winner: "white",
      });

      setRunning(false);
    }
  }, [whiteClock, blackClock]);

  function makeBotMove() {
    if (game.getTurn() !== botColor[0]) {
      console.warn(
        "Blocked bot from playing on human's turn. (Safe to ignore in Dev)",
      );
      return;
    }
    
    //createWorker for background findBestMove(since it take a lot timr) nd in these time the rest of the ui's components should be working perfectly
    const worker = new Worker(new URL("../../lib/botWorker.js", import.meta.url), {type: "module"})
    worker.onmessage = (e)=>{
      const botMove = e.data;
      if (botMove) {
        const movingPiece = board[botMove.from[0]][botMove.from[1]];
        playMove(botMove, movingPiece);
      }
      worker.terminate(); // Clean up the thread after the move is done
    }
    worker.postMessage({
      fen: generateFEN(game),
      depth: depth || 2,
      withBonus: session.withBonus
    });

    // const botMove = findBestMove(game, depth, session.withBonus);
    // const movingPiece = board[botMove.from[0]][botMove.from[1]];
    // playMove(botMove, movingPiece);
    console.log(session.depth, session.withBonus);
  }

  function playMove(move, movingPiece) {
    game.makeMove(move);

    if (movingPiece.color === "w") {
      setWhiteClock((t) => t + increment);
    } else {
      setBlackClock((t) => t + increment);
    }

    //mate/stalemate Check
    if (game.isCheckmate(game.getTurn())) {
      setGameResult({
        type: "checkmate",
        winner: game.getTurn() === "w" ? "black" : "white",
      });
      setRunning(false)
    } else if (game.isStalemate(game.getTurn())) {
      setGameResult({
        type: "stalemate",
      });
      setRunning(false)
    }

    //get move for History
    const playedMove = {
      piece: movingPiece.type,
      color: movingPiece.color,
      from: move.from,
      to: move.to,
      captured: move.captured ?? null,
      check: game.isKingInCheck(game.getTurn()),
      mate: game.isCheckmate(game.getTurn()),
    };

    //update Screen
    setHistory((prevStateValue) => [...prevStateValue, playedMove]);
    const inCheck = game.isKingInCheck(game.getTurn());
    setKingInCheck(inCheck ? game.findKing(game.getTurn()) : null);
    setLastMove({
      from: move.from,
      to: move.to,
    });
    setBoard([...game.getBoard()]);
    clearSelection();
    clearLegalMoves();
  }

  function handleSquareClick(row, col) {
    if (gameResult) return;

    const currentBoard = game.getBoard();
    const piece = currentBoard[row][col];

    if (mode === "newgame" && game.getTurn() === botColor[0]) return;
    if (
      (mode === "online" || mode === "friend") &&
      game.getTurn !== playerColor[0]
    )
      return;

    //selectPiece
    if (!selectedSquare && piece && piece.color === game.getTurn()) {
      setSelectedSquare([row, col]);
      // const moves = game.getLegalMoves(row, col);
      // // console.log(moves);
      setLegalMoves(game.getLegalMoves(row, col));
      return;
    }

    //if already selected
    if (selectedSquare) {
      const move = legalMoves.find((m) => m.to[0] === row && m.to[1] === col);
      const movingPiece = currentBoard[selectedSquare[0]][selectedSquare[1]];

      if (move) {
        playMove(
          {
            from: selectedSquare,
            to: [row, col],
            captured: move.captured,
          },
          movingPiece,
        );
        console.log(generateFEN(game));

        switch (mode) {
          case "newgame":
            if (game.getTurn() === botColor[0]) {
              setTimeout(() => makeBotMove(), 50);
            }
            break;

          case "practice":
            setFlipped((p) => !p);
            break;

          case "online":
          case "friend":
            break;

          default:
            break;
        }
      } else {
        if (piece && piece.color === game.getTurn()) {
          setSelectedSquare([row, col]);
          setLegalMoves(game.getLegalMoves(row, col));
        } else {
          clearSelection();
          clearLegalMoves();
        }
      }
    }
  }

  function handleNewGame() {
    gameRef.current = new Chess();
    setBoard([...gameRef.current.getBoard()]);
    clearSelection();
    clearLegalMoves();
    setWhiteClock(whiteTime)
    setBlackClock(blackTime)
    setLastMove(null);
    setKingInCheck(null);
    setGameResult(null);
    setHistory([]);
    setRunning(true)
    // console.log(game);

    if (mode === "newgame" && botColor === "white") {
      makeBotMove();
    }

    // console.log("newgame");

    // forceUpdate(value=> value+1)
  }

  // function handleQuitGame(){
  //   return(
  //     HomeScreen
  //   )
    
  // }

  const VALUES = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
  };

  function getCapturedPieces(history, color) {
    return history.filter(
      (move) => move.captured !== null && move.color === color,
    );
  }

  function getScore(capturedPieces) {
    return capturedPieces.reduce((acc, move) => {
      return acc + (VALUES[move.captured.type] || 0);
    }, 0);
  }

  function handleFlipBoard() {
    setFlipped((p) => !p);
  }

  function quitPopup(){
    console.log("hell");
    
    return(
      <QuitPopup result={onQuitGame}/>
    )
  }

  const capturedByWhite = getCapturedPieces(history, "w");
  const capturedByBlack = getCapturedPieces(history, "b");
  const scoreWhite = getScore(capturedByWhite);
  const scoreBlack = getScore(capturedByBlack);

  const relativeWhite =
    scoreWhite > scoreBlack ? "+" + (scoreWhite - scoreBlack) : null;
  const relativeBlack =
    scoreBlack > scoreWhite ? "+" + (scoreBlack - scoreWhite) : null;

  const topPlayer = flipped
    ? {
        avatar: avatar2,
        name: "Vivek Sharma",
        country: "IND",
        rating: 5000,
        time: whiteClock,
      }
    : {
        avatar: avatar1,
        name: "Magnus Carlsen",
        country: "NOR",
        rating: 2830,
        time: blackClock,
      };

  const bottomPlayer = flipped
    ? {
        avatar: avatar1,
        name: "Magnus Carlsen",
        country: "NOR",
        rating: 2830,
        time: blackClock,
      }
    : {
        avatar: avatar2,
        name: "Vivek Sharma",
        country: "IND",
        rating: 5000,
        time: whiteClock,
      };

  const topCaptured = flipped
    ? {
        pieces: capturedByWhite,
        score: relativeWhite,
      }
    : {
        pieces: capturedByBlack,
        score: relativeBlack,
      };
  const bottomCaptured = flipped
    ? {
        pieces: capturedByBlack,
        score: relativeBlack,
      }
    : {
        pieces: capturedByWhite,
        score: relativeWhite,
      };

  // console.log(topCaptured);
  // console.log(bottomCaptured);

  // const quitHandler = () => {
  //   return <HomeScreen />;
  // };

  return (
    <main
      className="
      min-h-screen
      bg-[#1b1b20]
      flex
      overflow-hidden
      justify-center
      items-center
      gap-14"
    >
      <div className="flex flex-col justify-between gap-20 items-center">
        <PlayerCard {...topPlayer} />
        <LeftPanel onNewGame={handleNewGame} onFlipBoard={handleFlipBoard} onQuitGame={quitPopup}/>
        <PlayerCard {...bottomPlayer} />
      </div>
      <div className="flex flex-col items-center gap-10">
        <div className="relative">
          <Board
            board={board}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            lastMove={lastMove}
            kingInCheck={kingInCheck}
            onSquareClick={handleSquareClick}
            flipped={flipped}
          />
          <BoardCoordinates flipped={flipped} />
        </div>
        <GameStatus text="Checkmate !" />
      </div>
      <div className="flex flex-col justify-between gap-15">
        {<CapturedPieces {...topCaptured} />}
        {history && <HistoryPanel history={history} />}
        {gameResult && <GameOver result={gameResult} game={handleNewGame} />}
        {<CapturedPieces {...bottomCaptured} />}
      </div>
    </main>
  );
}
