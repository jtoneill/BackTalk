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

  useEffect(() => { // sets the settings to the stored settings when switching between forward and reversed
    slider.current.value = clips.current[selected].speed;
    pitch.current.checked = clips.current[selected].pitchLock;
    reverseCheckbox.current.checked = clips.current[selected].reversed;
    loopCheckbox.current.checked = clips.current[selected].loop;
    applySettings();
  }, [selected, reverse]);

  const applySettings = () => {
    setPlaybackSpeed(clips.current[selected].speed);
    setPreservePitch(clips.current[selected].pitchLock);
    setReverse(clips.current[selected].reversed);
    setLoop(clips.current[selected].loop);
    console.log('settings applied to clip', selected + 1);
  };

  // useEffect(() => {

  // }, [selected])

  useEffect(() => {
    slider.current.value = clips.current[selected].speed;
    // applySettings();
  }, []);

  return (
    <div className={recording ? "main-controls recording" : "main-controls"} >

      <div className="controlDivider">
        <button
          id={recording ? "stopButton" : "recordButton"}
          onClick={(e) => { // record button
            e.preventDefault();
            if(recording) {
              stopRec();
              // setReverse(!reverse);
              applySettings();
            } else {
              record();
            }
          }}
        >{recording ? 'Stop' : 'Record'}</button>
      </div>

      <div className="controlDivider">
        <p className="label">Speed</p>
        <input
          className="speedSlider"
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          ref={slider}
          onChange={(e) => { // sets playback speed
            slider.current.value = e.target.value;
            clips.current[selected].speed = e.target.value;
            setPlaybackSpeed(e.target.value);
            console.log('slider value changed');
          }}
        />
      </div>

      <div className="checkboxes controlDivider">
        <div className="box">
          <p className="label">Reverse</p>
          <input
            type="checkbox"
            ref={reverseCheckbox}
            onChange={(e) => { // toggle between the reversed and forward audio sources
              clips.current[selected].reversed = !clips.current[selected].reversed;
              setReverse(clips.current[selected].reversed);
              console.log('reverse checkbox changed');
            }}
          />
        </div>

        <div className="box">
          <p className="label">Pitch Lock</p>
          <input
            type="checkbox"
            ref={pitch}
            onChange={(e) => { // allow pitch to shift / lock pitch
              clips.current[selected].pitchLock = !clips.current[selected].pitchLock;
              setPreservePitch(!preservePitch);
              console.log('pitch checkbox changed');
            }}
          />
        </div>

        <div className="box">
          <p className="label">Loop</p>
          <input
            type="checkbox"
            ref={loopCheckbox}
            onChange={(e) => { // loops playback
              clips.current[selected].loop = !clips.current[selected].loop;
              setLoop(!loop);
              console.log('loop checkbox changed');
            }}
          />
        </div>
      </div>

    </div>
  );

}

export default Controls;