export function getRookMoves(board, pRow, pCol, piece) {
  const moves = [];
  // const rowDir = -1 | 1;
  // let isOtherPiece = false;
  
  // console.log("here");
    
    // HORIZONTAL MOVES
    const rookRow = board[pRow];
    //checking left of the rook
    for (let i = pCol-1; i>=0 ; i--) {
      const element = rookRow[i]
      if (element !== null){
        if(piece.color !== element.color){
          moves.push({
            from: [pRow, pCol],
            to: [pRow, i]
          })
          break; 
        }else{
          break;
        }
      }
      moves.push({
        from: [pRow, pCol],
        to: [pRow, i],
      });
      
    }
    // checking right of the rook
    for (let i = pCol+1; i < rookRow.length; i++) {
      const element = rookRow[i];
      if (element !== null){
        if(piece.color !== element.color){
          moves.push({
            from: [pRow, pCol],
            to: [pRow, i]
          })
          break; 
        }else{
          break
        }
      }
      moves.push({
        from: [pRow, pCol],
        to: [pRow, i],
      });
    }

    // VERTICAL MOVES
    const rookCol = board.map(row=> row[pCol]);
    // checking top of the rook
    for (let i = pRow-1; i>=0; i--) {
      const element = rookCol[i];
      if (element !== null){
        if(piece.color !== element.color){
          moves.push({
          from: [pRow, pCol],
          to: [i, pCol],
        });
          break; 
        }else{
          break
        }
      }
      moves.push({
        from: [pRow, pCol],
        to: [i, pCol],
      });
    }
    // checking bottom of the rook
    for (let i = pRow+1; i < rookRow.length; i++) {
      const element = rookCol[i];
      if (element !== null){
        if(piece.color !== element.color){
          moves.push({
          from: [pRow, pCol],
          to: [i, pCol],
        });
          break; 
        }else{
          break
        }
      }
      moves.push({
        from: [pRow, pCol],
        to: [i, pCol],
      });
    } 


  
  console.log(piece);
  return moves;
}

// getRookMoves(
//   parseFEN("8/4Q3/pPb5/RP4p1/1K2p3/5PP1/2R1q3/2br3k w - - 0 1"),
//   6,
//   2,
//   parseFEN("8/4Q3/pPb5/RP4p1/1K2p3/5PP1/2R1q3/2br3k w - - 0 1")[6][2]
// );
