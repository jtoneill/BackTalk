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
  const loopCheckbox = useRef();

  useEffect(() => { // sets the slider to the stored speed when switching between forward and reversed
    slider.current.value = clips.current[selected].speed;
    setPlaybackSpeed(clips.current[selected].speed);
    pitch.current.checked = clips.current[selected].pitchLock;
    reverseCheckbox.current.checked = clips.current[selected].reversed;
    loopCheckbox.current.checked = clips.current[selected].loop;
  }, [selected, reverse]);

  const applySettings = () => {

  }

  // useEffect(() => {

  // }, [selected])

  useEffect(() => {
    slider.current.value = clips.current[selected].speed;
  }, []);

  return (
    <div id="main-controls" >
      <button
        className="record"
        onClick={(e) => { // record button
          e.preventDefault();
          if(recording) {
            stopRec();
          } else {
            record();
          }
        }}
      >{recording ? 'Stop' : 'Record'}</button>

      <input
        type="range"
        min="0.1"
        max="3"
        step="0.1"
        ref={slider}
        onChange={(e) => { // sets playback speed
          slider.current.value = e.target.value;
          clips.current[selected].speed = e.target.value;
          setPlaybackSpeed(e.target.value);
        }}
        onMouseUp={(e) => {
        }}
      />
      <input
        type="checkbox"
        ref={reverseCheckbox}
        onChange={(e) => { // toggle between the reversed and forward audio sources
          clips.current[selected].reversed = !clips.current[selected].reversed;
          setReverse(!clips.current[selected].reversed);
        }}
      />
      <input
        type="checkbox"
        ref={pitch}
        onChange={(e) => { // allow pitch to shift / lock pitch
          clips.current[selected].pitchLock = !clips.current[selected].pitchLock;
          setPreservePitch(!preservePitch);
        }}
      />
      <input
        type="checkbox"
        ref={loopCheckbox}
        onChange={(e) => { // loops playback
          clips.current[selected].loop = !clips.current[selected].loop;
          setLoop(!loop);
        }}
      />
    </div>
  );

}

export default Controls;