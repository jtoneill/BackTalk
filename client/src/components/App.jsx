import React, { useState, useEffect, useRef } from 'react';
import Visualizer from './Visualizer.jsx';
import Controls from './Controls.jsx';
import SoundClips from './SoundClips.jsx';
import processAudio from '../utils/processAudio.js';
import convert from '../utils/convert.js';

function App() {

  const [burn, setBurn] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [permission, setPermission] = useState(false);
  const [recording, setRecording] = useState(false);
  const [selected, setSelected] = useState(0);

  const [preservePitch, setPreservePitch] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.6);
  const [reverse, setReverse] = useState(false);
  const [loop, setLoop] = useState(false);

  const chunks = useRef();
  const mediaRecorder = useRef();
  const soundClips = useRef();
  const clips = useRef([]);
  // const playbackSpeed = useRef(clips.current[selected]?.speed || 1);

  if(clips.current.length === 0) {
    for(let i = 0; i < 4; i += 1) {
      clips.current.push(
        {
          forwardSrc: undefined,
          reversedSrc: undefined,
          speed: 1,
          reversed: false,
          pitchLock: false,
          loop: false,
        }
      );
    }
  }

  let renderCount = useRef();
  if(!renderCount.current) {
    renderCount.current = 0;
  }
  renderCount.current++;

  console.log('App.jsx has rendered', renderCount.current, 'times, clip selected:', selected + 1);

  const record = function() {
    setRecording(true);
    chunks.current = [];
    mediaRecorder.current.start(1000);
    console.log('recorder state:', mediaRecorder.current.state);
  }

  const stopRec = function() {
    setRecording(false);
    mediaRecorder.current.stop();
    console.log('recorder state:', mediaRecorder.current.state);
  }

  if (navigator.mediaDevices?.getUserMedia) {

    const constraints = { audio: true };

    let onSuccess = function(stream) {

      window.visualize(stream);

      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = function(e) {
        chunks.current.push(e.data);
        console.log('chunk: ', e.data, 'chunks: ', chunks.current);
      };

      mediaRecorder.current.onstop = function() {

        const clipName = `clip ${selected}`;

        const chunksBlob = new Blob([...chunks.current], { 'type' : 'audio/wav' });
        console.log('blob:', chunksBlob);

        if(!clips.current[selected].forwardSrc) {
          URL.revokeObjectURL(clips.current[selected].forwardSrc);
          URL.revokeObjectURL(clips.current[selected].reversedSrc);
        }

        processAudio(chunksBlob, clips, selected); // Saves the reversed recording in clips

        setTimeout(() => {
          setBurn(!burn);
        }, 50);

      };
    }

    let onError = function(err) {
      console.log('The following error occured: ' + err);
    }

    if(mediaRecorder.current === undefined || mediaRecorder.current.state === 'inactive') {
      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    }

  } else {
    console.log('getUserMedia not supported on your browser!');
  }




  return (
    <div id="Wrapper" >
      <header>BackTalk</header>
      <div id="Recorder">

        <Visualizer />

        <Controls
          recording={recording}
          record={record}
          stopRec={stopRec}
          clips={clips}
          selected={selected}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
          reverse={reverse}
          setReverse={setReverse}
          loop={loop}
          setLoop={setLoop}
          preservePitch={preservePitch}
          setPreservePitch={setPreservePitch}
          burn={burn}
          setBurn={setBurn}
        />

        <SoundClips
          clips={clips}
          selected={selected}
          setSelected={setSelected}
          playbackSpeed={playbackSpeed}
          reverse={reverse}
          loop={loop}
          preservePitch={preservePitch}
          burn={burn}
        />

      </div>
      <footer>footer / App renders:{renderCount.current}</footer>
    </div>
  );

}

export default App;