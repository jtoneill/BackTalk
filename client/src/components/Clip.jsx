import React, { useState, useEffect, useRef } from 'react';

function Clip({ soundClip, idx, selected, setSelected, clips, playbackSpeed, reverse, loop, preservePitch }) {


  const audioElement = useRef();


  useEffect(() => { // updates the audio elements playbackRate
    audioElement.current.playbackRate = clips.current[idx].speed;
    console.log('playback speed set!!!!!!');
  }, [playbackSpeed]);

  useEffect(() => { // sets the speed to 1 on load
    audioElement.current.preservesPitch = clips.current[idx].pitchLock;
    console.log('pitchLock toggled!!!!!!!!!');
  }, [preservePitch]);

  useEffect(() => {
    audioElement.current.loop = clips.current[idx].loop;
    console.log('loop toggled!!!!!!!!!!!');
  }, [loop]);

  useEffect(() => {
    audioElement.current.playbackRate = clips.current[idx].speed;
    console.log('reverse toggled');
  }, [reverse]);

  return (
    <div
      className={selected === idx ? 'clip selected' : 'clip'}
      onClick={() => { // sets focus for controls
        setSelected(idx);
      }}
    >
      <p className="clipLabel">{`clip ${idx + 1}`}</p>
      <audio
        className="audioPlayer"
        controls
        src={clips.current[idx].reversed ? soundClip.reversedSrc : soundClip.forwardSrc}
        ref={audioElement}
      />
    </div>
  );

}

export default Clip;