import React, { useState, useEffect, useRef } from 'react';

function Clip({ soundClip, idx, setSelected, clips }) {

  const [preservePitch, setPreservePitch] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [reverse, setReverse] = useState(false);
  const audioElement = useRef();
  const slider = useRef();

  useEffect(() => { // updates the audio elements playbackRate
    audioElement.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => { // sets the slider to the stored speed when switching between forward and reversed
    if(reverse) {
      slider.current.value = clips.current[idx].rSpeed;
      setPlaybackSpeed(clips.current[idx].rSpeed);
    } else {
      slider.current.value = clips.current[idx].fSpeed;
      setPlaybackSpeed(clips.current[idx].fSpeed);
    }
  }, [reverse]);

  useEffect(() => { // sets the speed to 1 on load
    slider.current.value = soundClip.fSpeed;
  }, []);

  return (
    <div className={`clip clip${idx + 1}`} onClick={() => { setSelected(idx) }}>
      <p>{`clip ${idx + 1}`}</p>
      <audio controls src={reverse ? soundClip.reversed : soundClip.src} ref={audioElement}/>
      <input
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
          console.log(e.target.value);
          setReverse(!reverse);

        }}
      />
      <input
        type="checkbox"
        onChange={(e) => { // allow pitch to shift
          audioElement.current.preservesPitch = preservePitch;
          setPreservePitch(!preservePitch);
        }}
      />
    </div>
  );

}

export default Clip;