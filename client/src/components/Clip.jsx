import React, { useState, useEffect, useRef } from 'react';

function Clip({ soundClip, idx, setSelected, clips }) {

  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioElement = useRef();

  useEffect(() => {
    // console.log('speed updated');
    audioElement.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  return (
    <div className={`clip clip${idx + 1}`} onClick={() => { setSelected(idx) }}>
      <p>{`clip ${idx + 1}`}</p>
      <audio controls src={soundClip.src} ref={audioElement}/>
      <input
        type="range"
        min="0.1"
        max="4"
        step="0.1"
        class="slider"
        onChange={(e) => {
          e.preventDefault();
          // console.log('a', e.target.value);
          setPlaybackSpeed(e.target.value);
        }}
      ></input>
    </div>
  );

}

export default Clip;