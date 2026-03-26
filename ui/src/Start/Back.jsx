import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { GameContext } from "../App";

export default function Back() {
  const navigate = useNavigate()
  function handleBack() {
    navigate('/');
    window.location.reload();
  }

  return(
    <div className="back">
      <button className="back-btn" style={{width:'fit-content'}} onClick={() => handleBack()}>
        🏠Home
      </button>
    </div>
  )
}