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

export default function BoardScreen({ session }) {
  const gameRef = useRef(new Chess());
  const game = gameRef.current;

  const [board, setBoard] = useState(gameRef.current.board);

  // console.log(gameConfig);

  const {
    playerColor,
    botColor,
    depth,
    whiteTime,
    blackTime,
    increment,
    flipped,
  } = session;

  // "2K5/2P2PnP/pB1k1b2/8/p3B2Q/1Ppqp3/8/8 w - - 0 1"
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [_, forceUpdate] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const [kingInCheck, setKingInCheck] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [history, setHistory] = useState([]);
  // const [flipped, setFlipped] = useState(playerColor === "black");

  // const [whiteTime, setWhiteTime] = useState(config.time);
  // const [blackTime, setBlackTime] = useState(config.time);

  const clearSelection = () => {
    setSelectedSquare(null);
  };
  const clearLegalMoves = () => {
    setLegalMoves([]);
  };

  useEffect(() => {
    if (botColor === "white") {
      makeBotMove();
    }
  }, []);

  function makeBotMove() {
    const botMove = findBestMove(game, 2);
    const movingPiece = board[botMove.from[0]][botMove.from[1]];
    playMove(botMove, movingPiece);
  }

  function handleSquareClick(row, col) {
    if (gameResult) return;

    const board = game.getBoard();
    const piece = board[row][col];

    if (!selectedSquare && piece && piece.color === game.getTurn()) {
      setSelectedSquare([row, col]);
      const moves = game.getLegalMoves(row, col);
      // console.log(moves);
      setLegalMoves(moves);

      return;
    }

    if (selectedSquare) {
      const move = legalMoves.find((m) => m.to[0] === row && m.to[1] === col);
      const movingPiece = board[selectedSquare[0]][selectedSquare[1]];
      // console.log(move);

      // if (!move) {
      //   if (piece.color === game.getTurn()) {
      //     continue
      //   }
      // }

      if (move) {
        game.makeMove({
          from: selectedSquare,
          to: [row, col],
        });

        if (game.isCheckmate(game.getTurn())) {
          setGameResult({
            type: "checkmate",
            winner: game.getTurn() === "w" ? "black" : "white",
          });
        } else if (game.isStalemate(game.getTurn())) {
          setGameResult({
            type: "stalemate",
          });
        }

        console.log(generateFEN(game));

        const playedMove = {
          piece: movingPiece.type,

          color: movingPiece.color,

          from: selectedSquare,

          to: [row, col],

          captured: move.captured ?? null,

          check: false,

          mate: false,
        };

        setHistory((prevStateValue) => [...prevStateValue, playedMove]);
        // console.log(history);

        const inCheck = game.isKingInCheck(game.getTurn());

        setKingInCheck(inCheck ? game.findKing(game.getTurn()) : null);

        setLastMove({
          from: selectedSquare,
          to: [row, col],
        });
        // const [isKingInCheck, kingPos]= game.isKingInCheck(game.getTurn())
        // setInCheck(isKingInCheck)
        // console.log(lastMove);

        clearSelection();
        clearLegalMoves();

        setBoard([...game.getBoard()]);

        //botMove logic
        if (game.getTurn() === botColor[0]) {
          makeBotMove();
        }
      } else {
        if (piece) {
          setSelectedSquare([row, col]);
          setLegalMoves(game.getLegalMoves(row, col));
        } else {
          clearSelection();
          clearLegalMoves();
        }
      }
    }
  }

  function playMove(move, movingPiece) {
    game.makeMove(move);
    setBoard([...game.getBoard()]);
    const playedMove = {
      piece: movingPiece.type,

      color: movingPiece.color,

      from: move.from,

      to: move.to,

      captured: move.captured ?? null,

      check: false,

      mate: false,
    };
    setHistory((prevStateValue) => [...prevStateValue, playedMove]);
  }

  const isSelected =
    selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
  const isLegalMove = legalMoves.some(
    (move) => move.to[0] === row && move.to[1] === col,
  );
  const isLastMove =
    lastMove &&
    ((lastMove.from[0] === row && lastMove.from[1] === col) ||
      (lastMove.to[0] === row && lastMove.to[1] === col));
  const isKingInCheck =
    kingInCheck && kingInCheck[0] === row && kingInCheck[1] === col;

  function handleNewGame() {
    setGame(new Chess());
    clearSelection();
    clearLegalMoves();
    setLastMove(null);
    setKingInCheck(null);
    setGameResult(null);
    setHistory([]);
    console.log(game);

    // console.log("newgame");

    // forceUpdate(value=> value+1)
  }

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
        time: 771,
      }
    : {
        avatar: avatar1,
        name: "Magnus Carlsen",
        country: "NOR",
        rating: 2830,
        time: 671,
      };

  const bottomPlayer = flipped
    ? {
        avatar: avatar1,
        name: "Magnus Carlsen",
        country: "NOR",
        rating: 2830,
        time: 671,
      }
    : {
        avatar: avatar2,
        name: "Vivek Sharma",
        country: "IND",
        rating: 5000,
        time: 771,
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

  console.log(topCaptured);
  console.log(bottomCaptured);

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
        <LeftPanel
          onNewGame={handleNewGame}
          onFlipBoard={handleFlipBoard}
          // onQuit={onQuit}
        />
        <PlayerCard {...bottomPlayer} />
      </div>
      <div className="flex flex-col items-center gap-10">
        <div className="relative">
          <Board
            board={board}
            isSelected={isSelected}
            isLegalMove={isLegalMove}
            isLastMove={isLastMove}
            isKingInCheck={isKingInCheck}
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
