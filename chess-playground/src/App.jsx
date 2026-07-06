import { Chess } from "chess-engine";
import Board from "./components/board/Board";
import ChessPiece from "./components/board/ChessPiece";
import { useState } from "react";
import GameOver from "./components/GameOver";
import HistoryPanel from "./components/HistoryPanel";

export default function App() {
  const [game, setGame] = useState(
    () => new Chess("2K5/2P2PnP/pB1k1b2/8/p3B2Q/1Ppqp3/8/8 w - - 0 1"),
  );

  // "2K5/2P2PnP/pB1k1b2/8/p3B2Q/1Ppqp3/8/8 w - - 0 1"
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [_, forceUpdate] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const [kingInCheck, setKingInCheck] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [history, setHistory] = useState([]);

  const clearSelection = () => {
    setSelectedSquare(null);
  };
  const clearLegalMoves = () => {
    setLegalMoves([]);
  };

  function handleSquareClick(row, col) {
    if (gameResult) return;
    const board = game.getBoard();
    const piece = board[row][col];

    if (!selectedSquare && piece && piece.color === game.getTurn()) {
      setSelectedSquare([row, col]);
      const moves = game.getLegalMoves(row, col);
      console.log(moves);
      setLegalMoves(moves);

      return;
    }

    if (selectedSquare) {
      const move = legalMoves.find((m) => m.to[0] === row && m.to[1] === col);
      console.log(move);

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

        const playedMove = {
          piece: piece.type,

          color: piece.color,

          from: selectedSquare,

          to: [row, col],

          captured: move.captured ?? null,

          promotion: move.promotion ?? null,

          castle: move.castle ?? null,

          check: false,

          mate: false,
        };

        setHistory((prevStateValue) => [...prevStateValue, playedMove]);

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
        forceUpdate((value) => value + 1);
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

    // console.log("CLicked: ", row, col);
    // setSelectedSquare([row, col]);
    // setLegalMoves(moves);
    // // console.log(moves);
    // if (moves.some((move) => move.from[0] === row && move.from[1] === col)) {
    //   console.log(selectedSquare);
    //   setSelectedSquare([row,col])

    //   game.makeMove(
    //     {
    //       from: selectedSquare,
    //       to: selectedSquare
    //     }
    //   );
    //   clearSelection();
    //   clearLegalMoves();
    //   forceUpdate((value) => value + 1);
    // }
    // console.log(lastMove);
  }

  function restart() {
    setGame(new Chess());
    clearSelection();
    clearLegalMoves();
    setLastMove(null);
    setKingInCheck(null);
    setGameResult(null);
    setHistory([]);
  }

  return (
    <main
      className="
  min-h-screen
  bg-zinc-900
  flex
  justify-center
  items-start
  gap-14 pt-10"
    >
      <Board
        board={game.getBoard()}
        selectedSquare={selectedSquare}
        legalMoves={legalMoves}
        lastMove={lastMove}
        kingInCheck={kingInCheck}
        onSquareClick={handleSquareClick}
      />
      {gameResult && <GameOver result={gameResult} game={restart} />}

      <HistoryPanel history={history} />
    </main>
  );
}
