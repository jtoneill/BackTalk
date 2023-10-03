const convert = require('./convert.js');

const processAudio = async function(blob, clips, selected) {
  const audioContext1 = new (window.AudioContext || window.webkitAudioContext)();
  const audioContext2 = new (window.AudioContext || window.webkitAudioContext)();


  const arrBuffer = await blob.arrayBuffer();

  audioContext1.decodeAudioData(arrBuffer, async (audioBuffer1) => {
    const forwardBuffer = audioContext1.createBuffer(
      audioBuffer1.numberOfChannels,
      audioBuffer1.length,
      audioBuffer1.sampleRate
    );

    for(let channel = 0; channel < audioBuffer1.numberOfChannels; channel += 1) {
      const inputData = audioBuffer1.getChannelData(channel);
      const outputData = forwardBuffer.getChannelData(channel);

      for(let i = 0; i < audioBuffer1.length; i += 1) {
        outputData[i] = inputData[i];
      }
    }

    const forwardWav = convert.buffToWav(forwardBuffer);
    const forwardBlob = new Blob([forwardWav], { 'type' : 'audio/wav' });
    const forwardURL = window.URL.createObjectURL(forwardBlob);
    clips.current[selected].forwardSrc = forwardURL;
    console.log('forward source set in clips object');
  });


  const arrBuffer2 = await blob.arrayBuffer();

  audioContext2.decodeAudioData(arrBuffer2, async (audioBuffer2) => {
    const reversedBuffer = audioContext2.createBuffer(
      audioBuffer2.numberOfChannels,
      audioBuffer2.length,
      audioBuffer2.sampleRate
    );

    for(let channel = 0; channel < audioBuffer2.numberOfChannels; channel += 1) {
      const inputData = audioBuffer2.getChannelData(channel);
      const outputData = reversedBuffer.getChannelData(channel);

      for(let i = 0; i < audioBuffer2.length; i += 1) {
        outputData[i] = inputData[audioBuffer2.length - 1 - i];
      }
    }

    const reversedWav = convert.buffToWav(reversedBuffer);
    const reversedBlob = new Blob([reversedWav], { 'type' : 'audio/wav' });
    const reversedURL = window.URL.createObjectURL(reversedBlob);
    clips.current[selected].reversedSrc = reversedURL;
    console.log('reversed source set in clips object');
  });
};

export default processAudio;