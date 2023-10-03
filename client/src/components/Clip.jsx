import React, { useState, useEffect, useRef } from 'react';

function Clip({ soundClip, idx, selected, setSelected, clips, playbackSpeed, reverse, loop, preservePitch, burn }) {
  const [playing, setPlaying] = useState(false);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioElement = useRef();

  useEffect(() => { // sets the audio element playback rate
    audioElement.current.playbackRate = clips.current[idx].speed;
  }, [playbackSpeed]);

  useEffect(() => { // sets the speed to 1 on load
    audioElement.current.preservesPitch = clips.current[idx].pitchLock;
  }, [preservePitch]);

  useEffect(() => {
    audioElement.current.loop = clips.current[idx].loop;
  }, [loop]);

  useEffect(() => {
    setPlaying(false);
  }, [reverse]);

  return (
    <div
      className={selected === idx ? 'clip selected' : 'clip'}
      onClick={() => { // sets focus for controls
        setSelected(idx);
      }}
    >
      <p className="clipLabel">{`clip ${idx + 1}`}</p>

      <button
        className={!playing ? "clipButton clipPlay" : "clipButton clipPause"}
        onClick={(e) => {
          e.stopPropagation();
          console.log('play button pressed on clip', idx + 1, 'playing was: ', playing);
          if(playing) {
            audioElement.current.pause();
          } else {
            // audioElement.current.load();
            audioElement.current.playbackRate = clips.current[idx].speed;
            audioElement.current.play();
          }
          console.log('speed---->', clips.current[selected].speed, '=', playbackSpeed);
          setPlaying(!playing);
        }}
      ></button>

      <button
        className="clipButton clipStop"
        onClick={(e) => {
          e.stopPropagation();
          console.log('stop button pressed on clip', idx + 1, 'playing: ', playing);
          audioElement.current.pause();
          audioElement.current.currentTime = 0;
          setPlaying(false);
        }}
      ></button>

      <p>{`${playTime.toFixed(2)} / ${duration.toFixed(2)}`}</p>

      <a
        href={clips.current[idx].reversed ? soundClip.reversedSrc : soundClip.forwardSrc}
        download="clip"
      >Download</a>

      <audio
        className="audioPlayer"
        src={clips.current[idx].reversed ? soundClip.reversedSrc : soundClip.forwardSrc}
        preload='auto'
        ref={audioElement}
        onPause={() => {setPlaying(false)}}
        onEnded={() => {
          setPlaying(false);
          audioElement.current.currentTime = 0;
          console.log('audio end reached');
        }}
        onLoadedMetadata={() => {
          setDuration(audioElement.current.duration);
        }}
        onTimeUpdate={() => {
          setPlayTime(audioElement.current.currentTime);
        }}
      />
    </div>
  );

}

export default Clip;