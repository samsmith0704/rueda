import React from "react";

const Player = () => {
  let beatsPerSecond = (60 / 122) * 1000;

  let myAudio = new Audio("/metronomeHit.mp3");
  const start = () => {
    myAudio.play();
  };
  //   countFunc(beatsPerSecond);
  const countFunc = (beatsPerSecond) => {
    const myTimer = setInterval(() => {
      start();
    }, beatsPerSecond);

    setTimeout(() => {
      clearInterval(myTimer);
    }, 6000);
  };
  return (
    <div>
      <button onClick={() => countFunc(beatsPerSecond)}>Play Sound</button>
    </div>
  );
};

export default Player;
