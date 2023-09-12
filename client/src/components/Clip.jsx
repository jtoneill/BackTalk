import React, { useState, useEffect, useRef } from 'react';

function Clip({ soundClip, idx, setSelected, clips }) {

  const [preservePitch, setPreservePitch] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [reverse, setReverse] = useState(false);
  const audioElement = useRef();
  const slider = useRef();

  useEffect(() => {
    // console.log('speed updated');
    audioElement.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    slider.current.value = playbackSpeed;
  }, [reverse]);

  useEffect(() => {
    // console.log('speed updated');
    slider.current.value = 1;
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
        onMouseUp={(e) => {
          // e.preventDefault();
          // console.log('a', e.target.value);
          slider.current.value = e.target.value;
          setPlaybackSpeed(e.target.value);
        }}
      />
      <input type="checkbox" onChange={(e) => { // use the reversed audio source
        // e.preventDefault();
        console.log(e.target.value);
        setReverse(!reverse);

      }}/>
      <input type="checkbox" onChange={(e) => { // allow pitch to shift
        // e.preventDefault();
        // console.log(e.target.value);
        audioElement.current.preservesPitch = preservePitch;
        setPreservePitch(!preservePitch);
      }}/>
    </div>
  );

}

export default Clip;