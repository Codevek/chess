import bB from "../../assets/pieces/bB.svg"
import bW from "../../assets/pieces/bW.svg"
import kB from "../../assets/pieces/kB.svg"
import kW from "../../assets/pieces/kW.svg"
import nB from "../../assets/pieces/nB.svg"
import nW from "../../assets/pieces/nW.svg"
import pB from "../../assets/pieces/pB.svg"
import pW from "../../assets/pieces/pW.svg"
import qB from "../../assets/pieces/qB.svg"
import qW from "../../assets/pieces/qW.svg"
import rB from "../../assets/pieces/rB.svg"
import rW from "../../assets/pieces/rW.svg"

export const PIECES = {
    bB, bW,
    kB, kW,
    nB, nW,
    pB, pW,
    qB, qW,
    rB, rW
}

export default function ChessPiece({ piece }){

    if(piece === null) return null
    const fileName = piece.type + piece.color.toUpperCase()
    const image = PIECES[fileName]
    // console.log(fileName);
    

    return(
        <div>
            <img src={image} alt={fileName}/>
        </div>
    )
}