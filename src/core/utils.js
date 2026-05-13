// export function isInsideBoard(row, column){
//     const ans = row>=0 && row<8 && column>=0 && column<8
//     return ans
// }

export function isInsideBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// export function num2ChessCoords(row, col) {
//   (col)=>{
//     const alpha = ["a", "b", "c", "d", "e", "f"]
//     let col2Coord = ""
//     switch (col) {
//       case 1: 
//         col2Coord = "a"
//       case 2: 
//         col2Coord = "b"
//       case 3: 
//         col2Coord = "c"
//       case 4: 
//         col2Coord = "d"
//       case 5: 
//         col2Coord = "e"
//       case 6: 
//         col2Coord = "f"
//       case 7: 
//         col2Coord = "g"
//       case 8: 
//         col2Coord = "h"
    
//       default:
//         return col
//     }
//   }
//   console.log(row, col2Coord);
  
// return row, col
// }    

// num2ChessCoords(2,6)