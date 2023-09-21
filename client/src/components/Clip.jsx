import React, { useState, useEffect, useRef } from 'react';

function Clip({ soundClip, idx, setSelected, clips, playbackSpeed, reverse, preservePitch }) {


  const audioElement = useRef();


  useEffect(() => { // updates the audio elements playbackRate
    audioElement.current.playbackRate = clips.current[idx].speed;
  }, [playbackSpeed]);

  useEffect(() => { // sets the speed to 1 on load
    audioElement.current.preservesPitch = clips.current[idx].pitchLock;
    console.log('pitchLock toggled!!!!!!!!!');
  }, [preservePitch]);

  useEffect(() => {
    audioElement.current.loop = clips.current[idx].loop;
    console.log('a change to loop in a clip set the audioElements loop setting??????????????delete');
  }, [clips.current[idx].loop]);

  useEffect(() => {
    audioElement.current.src = (clips.current[idx].reversed ? soundClip.reversedSrc : soundClip.forwardSrc);
  }, [clips.current[idx].reversed, clips.current[idx].forwardSrc]);

  return (
    <div className={`clip clip${idx + 1}`} onClick={() => { setSelected(idx) }}>
      <p>{`clip ${idx + 1}`}</p>
      <audio
        controls
        // src={clips.current[idx].reversed ? soundClip.reversedSrc : soundClip.forwardSrc}
        ref={audioElement}
      />
    </div>
  );

}

export default Clip;