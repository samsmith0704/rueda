import React from "react";
import movesOnOne from "../helpers/calls";

/**
 * TODO: add input validation
 */

const textAlign = { textAlign: "center" };
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
    if (count > 0 && count % 8 === 0) {
      let lstCopy = [...moveList];
      let index = Math.floor(Math.random() * movesOnOne.length);

      lstCopy.push(movesOnOne[index]);

      setMoveList(lstCopy);
    }
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
    <div style={textAlign}>
      <h1 className="display-3">Rueda Caller</h1>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            onPlay();
          }}
          disabled={isPlaying}
        >
          Play
        </button>
        <button
          className="btn btn-danger"
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
      </div>
      <br />
      <div>
        <i>Current Count: {count}</i>
      </div>
      <br />
      <input id="bpmInput" type="text" placeholder="Enter BPM..." />
      <br />
      <br />
      <ul className="list-group">
        {moveList.map((move) => {
          return (
            <li className="list-group-item list-group-item-warning">{move}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default Player;
