import React from "react";

const Player = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [metronomeInterval, setMetronomeInterval] = React.useState(null);
  const [beatsPerSecond, setBeatsPerSecond] = React.useState(0);

  let myAudio = new Audio("/metronomeHit.mp3");
  const start = () => {
    myAudio.play();
  };
  const countFunc = (beatsPerSecond) => {
    const myTimer = setInterval(() => {
      start();
    }, beatsPerSecond);
    setMetronomeInterval(myTimer);
  };
  return (
    <div>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
          let theInput = document.getElementById("bpmInput").value;
          let numInput = parseInt(theInput);
          numInput = (60 / numInput) * 1000;
          console.log(numInput);
          countFunc(numInput);
        }}
      >
        Play
      </button>

      <button
        onClick={() => {
          clearInterval(metronomeInterval);
        }}
      >
        Stop
      </button>
      <br />
      <br />
      <input
        id="bpmInput"
        type="text"
        placeholder="Enter your desired BPM..."
      />
    </div>
  );
};

export default Player;
