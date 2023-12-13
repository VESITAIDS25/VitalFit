import React from 'react';

export default function Profiles({ Leaderboard }) {
  return <div id="profile">{Item(Leaderboard)}</div>;
}

function Item(data) {
  return (
    <>
      {data.map((value, index) => (
        <div
          className={`flex ${index === 0 ? 'glow1' : ''} ${
            index === 1 ? 'glow2' : ''
          } ${index === 2 ? 'glow3' : ''}`}
          key={index}
        >
          <div className="item">
            <span className="rank text-lg font-bold pr-2">{index + 1}</span>
            <img className="w-1/5 rounded-full" src={value.img} alt="" />

            <div className="info pl-4">
              <h3 className="name text-dark text-lg font-bold">{value.name}</h3>
              <span className="text-sm">{value.location}</span>
            </div>
          </div>
          <div className="item">
            <span className="text-lg font-bold">{value.score}</span>
          </div>
        </div>
      ))}
    </>
  );
}
