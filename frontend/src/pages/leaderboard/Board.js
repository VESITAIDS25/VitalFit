import React, { useState } from "react";
import Profiles from "./Profiles";
import { Leaderboard } from "./Database";
import "./style.css";

export default function Board() {
  const [period, setPeriod] = useState(0);

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id);
  };

  return (
    <div className="board text-center">
      <h1 className="leaderboard text-2xl mb-4">Leaderboard</h1>

      <div className="duration flex justify-center gap-4">
        <button
          onClick={handleClick}
          data-id="7"
          className={`duration-btn ${period === "7" ? "active" : ""}`}
        >
          7 Days
        </button>
        <button
          onClick={handleClick}
          data-id="30"
          className={`duration-btn ${period === "30" ? "active" : ""}`}
        >
          30 Days
        </button>
        <button
          onClick={handleClick}
          data-id="0"
          className={`duration-btn ${period === "0" ? "active" : ""}`}
        >
          All-Time
        </button>
      </div>

      <Profiles Leaderboard={between(Leaderboard, period)} />
    </div>
  );
}

function between(data, between) {
  const today = new Date();
  const previous = new Date(today);
  previous.setDate(previous.getDate() - (parseInt(between, 10) + 1));

  let filter = data.filter((val) => {
    let userDate = new Date(val.dt);
    if (parseInt(between, 10) === 0) return val;
    return previous <= userDate && today >= userDate;
  });

  // sort with ascending order
  return filter.sort((a, b) => {
    return b.score - a.score;
  });
}
