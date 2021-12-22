import React from "react";
import movesOnOne from "../helpers/calls";

const Player = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [metronomeInterval, setMetronomeInterval] = React.useState(null);
  const [count, setCount] = React.useState(0);
  const [moveList, setMoveList] = React.useState([]);
  let myAudio = new Audio("/metronomeHit.mp3");

  const start = () => {
    myAudio.play();
  };
  const countFunc = (beatsPerSecond) => {
    const myTimer = setInterval(() => {
      start();
      setCount((prevCount) => prevCount + 1);
    }, beatsPerSecond);
    setMetronomeInterval(myTimer);
  };

  React.useEffect(() => {
    let lstCopy = [...moveList];
    lstCopy.push(movesOnOne[0]);
    setMoveList(lstCopy);
  }, [count]);

  const onPlay = () => {
    setIsPlaying(!isPlaying);
    let theInput = document.getElementById("bpmInput").value;
    let numInput = parseInt(theInput);
    numInput = (60 / numInput) * 1000;
    myAudio.play();
    countFunc(numInput);
  };

  return (
    <div>
      <button
        onClick={() => {
          onPlay();
        }}
        disabled={isPlaying}
      >
        Play
      </button>

      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
          clearInterval(metronomeInterval);
          setCount(0);
          setMoveList([]);
        }}
        disabled={!isPlaying}
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

      {count}
      <ul>
        {moveList.map((move) => {
          return <li>{move}</li>;
        })}
      </ul>
    </div>
  );
};

export default Player;
