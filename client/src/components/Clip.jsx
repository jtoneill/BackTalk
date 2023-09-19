import React, { useState, useEffect, useRef } from 'react';

function Clip({ soundClip, idx, setSelected, clips, playbackSpeed, reverse, preservePitch }) {


  const audioElement = useRef();


  useEffect(() => { // updates the audio elements playbackRate
    audioElement.current.playbackRate = (reverse ? clips.current[idx].rSpeed : clips.current[idx].fSpeed);
  }, [playbackSpeed]);

  useEffect(() => { // sets the speed to 1 on load
    audioElement.current.preservesPitch = clips.current[idx].pitchLock;
  }, [preservePitch]);

  return (
    <div className={`clip clip${idx + 1}`} onClick={() => { setSelected(idx) }}>
      <p>{`clip ${idx + 1}`}</p>
      <audio controls src={soundClip.reversed ? soundClip.reversedSrc : soundClip.forwardSrc} ref={audioElement}/>
      {/* <input
        type="range"
        min="0.1"
        max="3"
        step="0.1"
        ref={slider}
        onChange={(e) => {
          slider.current.value = e.target.value;
          setPlaybackSpeed(e.target.value);
        }}
        onMouseUp={(e) => {
          if(reverse) {
            clips.current[idx].rSpeed = e.target.value;
          } else {
            clips.current[idx].fSpeed = e.target.value;
          }
        }}
      />
      <input
        type="checkbox"
        onChange={(e) => { // use the reversed audio source
          console.log('toggle reverse', e.target.value);
          setReverse(!reverse);

        }}
      />
      <input
        type="checkbox"
        onChange={(e) => { // allow pitch to shift
          audioElement.current.preservesPitch = preservePitch;
          setPreservePitch(!preservePitch);
        }}
      /> */}
    </div>
  );

}

export default Clip;