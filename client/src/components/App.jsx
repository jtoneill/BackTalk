import React, { useState, useEffect, useRef } from 'react';
import Visualizer from './Visualizer.jsx';
import Controls from './Controls.jsx';
import SoundClips from './SoundClips.jsx';
import reverseBlob from '../utils/reverse.js';

function App() {

  const [burn, setBurn] = useState(false);
  const [permission, setPermission] = useState(false);
  const [recording, setRecording] = useState(false);
  const [selected, setSelected] = useState(0);

  const [preservePitch, setPreservePitch] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [reverse, setReverse] = useState(false);
  const [loop, setLoop] = useState(false);

  const chunks = useRef();
  const mediaRecorder = useRef();
  const soundClips = useRef();
  const clips = useRef([]);

  if(clips.current.length === 0) {
    for(let i = 0; i < 8; i += 1) {
      clips.current.push(
        {
          forwardSrc: undefined,
          reversedSrc: undefined,
          fSpeed: 1,
          rSpeed: 1,
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
    console.log(mediaRecorder.current.state);
    console.log("recorder started");
  }

  const stopRec = function() {
    setRecording(false);
    mediaRecorder.current.stop();
    console.log(mediaRecorder.current.state);
    console.log("recorder stopped");
  }

  if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');

    const constraints = { audio: true };

    let onSuccess = function(stream) {

      window.visualize(stream);

      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = function(e) {
        chunks.current.push(e.data);
        console.log('chunk: ', e.data, 'chunks: ', chunks.current);
      }

      mediaRecorder.current.onstop = function() {
        console.log("data available after MediaRecorder.stop() called.");

        const clipName = `clip ${selected}`;

        const blob = new Blob([...chunks.current], { 'type' : 'audio/wav' });
        console.log('blob:', blob);

        const audioURL = window.URL.createObjectURL(blob);
        console.log('audioURL:', audioURL);

        if(clips.current[selected.forwardSrc !== undefined]) {
          clips.current[selected].forwardSrc.revokeObjectURL();
          clips.current[selected].reversedSrc.revokeObjectURL();
        }

        clips.current[selected].forwardSrc = audioURL; // Saves the recording in clips
        reverseBlob(blob, clips, selected); // Saves the reversed recording in clips

        console.log("audio saved to clips: ", clips.current);

        setBurn(!burn);

      }
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
      <header>BackTalk{renderCount.current}</header>
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
        />

        <SoundClips
          clips={clips}
          setSelected={setSelected}
          burn={burn}
          playbackSpeed={playbackSpeed}
          reverse={reverse}
          loop={loop}
          preservePitch={preservePitch}
        />

      </div>
      <footer>footer</footer>
    </div>
  );

}

export default App;