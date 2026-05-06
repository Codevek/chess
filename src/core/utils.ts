export function isInsideBoard(row: number, column: number): boolean{
    const ans = row>=0 && row<8 && column>=0 && column<8
    return ans
}

// console.log(isInsideBoard(10, 4))
// console.log(isInsideBoard(5, 4))

// we're storing the location as (num,num) instead of e1, f7 etc.