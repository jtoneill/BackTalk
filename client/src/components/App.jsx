import React, { useState, useEffect, useRef } from 'react';
import Visualizer from './Visualizer.jsx';
import Controls from './Controls.jsx';
import SoundClips from './SoundClips.jsx';
import reverse from '../utils/reverse.js';

function App() {

  const [burn, setBurn] = useState(false);
  const [permission, setPermission] = useState(false);
  const [recording, setRecording] = useState(false);
  const [selected, setSelected] = useState(0);


  const clips = useRef([
    {src: undefined, fSpeed: 1, rSpeed: 1},
    {src: undefined, fSpeed: 1, rSpeed: 1},
    {src: undefined, fSpeed: 1, rSpeed: 1},
    {src: undefined, fSpeed: 1, rSpeed: 1},
    {src: undefined, fSpeed: 1, rSpeed: 1},
    {src: undefined, fSpeed: 1, rSpeed: 1},
    {src: undefined, fSpeed: 1, rSpeed: 1},
    {src: undefined, fSpeed: 1, rSpeed: 1},
  ]);
  const mainSection = useRef();
  const mediaRecorder = useRef();
  const soundClips = useRef();
  const chunks = useRef();

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

        const clipName = `clip${selected}`;

        const blob = new Blob([...chunks.current], { 'type' : 'audio/wav' });
        console.log('blob:', blob);

        const audioURL = window.URL.createObjectURL(blob);
        console.log('audioURL:', audioURL);

        if(clips.current[selected.src !== undefined]) {
          clips.current[selected].src.revokeObjectURL();
          clips.current[selected].reversed.revokeObjectURL();
        }

        clips.current[selected].src = audioURL; // Saves the recording in clips
        reverse(blob, clips, selected); // Saves the reversed recording in clips

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
    <div id="Wrapper" ref={mainSection}>
      <header>BackTalk{renderCount.current}</header>
      <div id="Recorder">

        <Visualizer mainSection={mainSection}/>

        <Controls recording={recording} record={record} stopRec={stopRec}/>

        <SoundClips clips={clips} setSelected={setSelected} burn={burn}/>

      </div>
      <footer>footer</footer>
    </div>
  );

}

export default App;