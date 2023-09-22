import React, { useState, useRef } from 'react';

function Visualizer({ mainSection }) {

  const canvasRef = useRef();

  let audioCtx;

  window.visualize = function (stream) {
    if(!audioCtx) {
      audioCtx = new AudioContext();
    }

    const source = audioCtx.createMediaStreamSource(stream);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    //analyser.connect(audioCtx.destination);

    draw()

    function draw() {
      const WIDTH = canvasRef.current.width
      const HEIGHT = canvasRef.current.height;
      const canvasCtx = canvasRef.current.getContext("2d");

      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgba(30, 30, 30, 0.5)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 255, 13)';

      canvasCtx.beginPath();

      let sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;


      for(let i = 0; i < bufferLength; i++) {

        let v = dataArray[i] / 128.0;
        let y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvasRef.current.width, canvasRef.current.height/2);
      canvasCtx.stroke();

    }
  }

  // window.onresize = function() {
  //   console.log('lalalalalalalalalalalalalalalalalalalala');
  //   canvasRef.current.width = 500;
  // }

  // window.onresize();

  return (
    <div id="Waveform">
      <canvas className="visualizer" ref={canvasRef} height="100px" width={500}></canvas>
    </div>
  );

}

export default Visualizer;