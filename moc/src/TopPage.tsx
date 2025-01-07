// import React from "react";
import "./TopPage.css";
import topIcon from "./topIcon.png";
import { useNavigate } from "react-router-dom";

export function TopPage() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/input");
  }
  return (
    <div className="app-container">
      <div className="button-section">
        <button className="input-button" onClick={handleClick}>
          日々実績入力
          <img src={topIcon} alt="Input Icon" />
        </button>
      </div>
    </div>
  );
}

// export default TopPage;
