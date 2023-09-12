const convert = require('./convert.js');

const reverse = async function(blob, clips, selected) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const arrBuffer = await blob.arrayBuffer();
  console.log('dis', arrBuffer);

  audioContext.decodeAudioData(arrBuffer, async (audioBuffer) => {
    const reversedBuffer = audioContext.createBuffer(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );

    for(let channel = 0; channel < audioBuffer.numberOfChannels; channel += 1) {
      const inputData = audioBuffer.getChannelData(channel);
      const outputData = reversedBuffer.getChannelData(channel);

      for(let i = 0; i < audioBuffer.length; i += 1) {
        outputData[i] = inputData[audioBuffer.length - 1 - i];
      }

    }
    const reversedWav = convert.buffToWav(reversedBuffer);
    const reversedBlob = new Blob([reversedWav], { 'type' : 'audio/wav' });
    console.log('reversedBlob', reversedBlob);

    const reversedURL = window.URL.createObjectURL(reversedBlob);
    console.log('end', reversedURL);

    clips.current[selected].reversed = reversedURL;
  });
};

export default reverse;