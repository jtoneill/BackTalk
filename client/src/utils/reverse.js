const reverse = function(blob) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioContext.decodeAudioData(blob.arrayBuffer(), (audioBuffer) => {
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
    return reversedBuffer.numberOfChannels;
  })
};

export default reverse;