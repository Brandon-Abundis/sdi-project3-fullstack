
import Back from "../Start/Back"

export default function EndGuessOverlay({win, lose}){

  function accuracy(win, lose) {
    return (win/lose)* 100;
  }

  return(
    <div className="end-guess-overlay">
      <div className="top-end">

      </div>
      <div className="bottom-end">
        <div className="left-end">

        </div>
        <div className="right-end">

        </div>
      </div>
    </div>
  )
}