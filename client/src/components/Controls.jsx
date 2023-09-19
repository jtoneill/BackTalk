import React, { useState, useEffect, useRef } from 'react';

function Controls({
  recording,
  record,
  stopRec,
  clips,
  selected,
  playbackSpeed,
  setPlaybackSpeed,
  reverse,
  setReverse,
  loop,
  setLoop,
  preservePitch,
  setPreservePitch
}) {
  const slider = useRef();
  const pitch = useRef();
  const reverseCheckbox = useRef();

  useEffect(() => { // sets the slider to the stored speed when switching between forward and reversed
    if(reverse) {
      slider.current.value = clips.current[selected].rSpeed;
      setPlaybackSpeed(clips.current[selected].rSpeed);
      pitch.current.checked = clips.current[selected].pitchLock;
      reverseCheckbox.current.checked = true;
    } else {
      slider.current.value = clips.current[selected].fSpeed;
      setPlaybackSpeed(clips.current[selected].fSpeed);
      pitch.current.checked = clips.current[selected].pitchLock;
      reverseCheckbox.current.checked = false;
    }
  }, [selected, reverse]);

  // useEffect(() => {

  // }, [selected])

  useEffect(() => {
    slider.current.value = clips.current[selected].fSpeed;
  }, []);

  return (
    <div id="main-controls" >
      <button
        className="record"
        disabled={recording}
        onClick={(e) => {
          e.preventDefault();
          record();
        }}
      >Record</button>
      <button
        className="stop"
        disabled={!recording}
        onClick={(e) => {
          e.preventDefault();
          stopRec();
        }}
      >Stop</button>
      <input
        type="range"
        min="0.1"
        max="3"
        step="0.1"
        ref={slider}
        onChange={(e) => {
          slider.current.value = e.target.value;
          setPlaybackSpeed(e.target.value);
          if(reverse) {
            clips.current[selected].rSpeed = e.target.value;
          } else {
            clips.current[selected].fSpeed = e.target.value;
          }
        }}
        onMouseUp={(e) => {
        }}
      />
      <input
        type="checkbox"
        ref={reverseCheckbox}
        onChange={(e) => { // toggle the reversed audio source
          console.log('toggle reverse', e.target.value);
          setReverse(!clips.current[selected].reversed);
          clips.current[selected].reversed = !clips.current[selected].reversed;
        }}
      />
      <input
        type="checkbox"
        ref={pitch}
        onChange={(e) => { // allow pitch to shift
          // audioElement.current.preservesPitch = preservePitch;
          setPreservePitch(!preservePitch);
          clips.current[selected].pitchLock = !clips.current[selected].pitchLock;
        }}
      />
    </div>
  );

}

export default Controls;