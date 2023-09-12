module.exports = {
  buffToWav: (buffer) => { // converts audio buffer to wav
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const interleaved = new Float32Array(buffer.length * numberOfChannels);
    const view = new DataView(new ArrayBuffer(44 + interleaved.length * 2));
    const channels = [];

    for (let channel = 0; channel < numberOfChannels; channel++) {
      channels.push(buffer.getChannelData(channel));
    }

    for (let sample = 0; sample < buffer.length; sample++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        interleaved[sample * numberOfChannels + channel] = channels[channel][sample];
      }
    }

    const writeUTFBytes = (view, offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    // RIFF header
    writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 44 + interleaved.length * 2, true);
    writeUTFBytes(view, 8, 'WAVE');

    // Format chunk
    writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // PCM format
    view.setUint16(20, 1, true); // Mono (1 channel) or Stereo (2 channels)
    view.setUint16(22, numberOfChannels, true); // Number of channels
    view.setUint32(24, sampleRate, true); // Sample rate
    view.setUint32(28, sampleRate * 2 * numberOfChannels, true); // Byte rate
    view.setUint16(32, numberOfChannels * 2, true); // Block align
    view.setUint16(34, 16, true); // 16-bit (2 bytes) sample size

    // Data chunk
    writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);

    // Write the interleaved audio data
    for (let i = 0; i < interleaved.length; i++) {
      view.setInt16(44 + i * 2, interleaved[i] * 0x7FFF, true);
    }

    return view;
  },
}