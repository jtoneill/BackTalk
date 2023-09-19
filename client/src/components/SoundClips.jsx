import React, { useState, useEffect } from 'react';
import Clip from './Clip.jsx';

function SoundClips({ clips, setSelected, burn, playbackSpeed, reverse, loop, preservePitch }) {

  useEffect(() => {
    console.log('update clips');
  }, [burn]);

  return (
    <div id="sound-clips" >
      {clips.current.map((soundClip, index) => {
        return (
          <Clip
            key={`clip${index}`}
            soundClip={soundClip}
            clips={clips}
            idx={index}
            setSelected={setSelected}
            playbackSpeed={playbackSpeed}
            reverse={reverse}
            loop={loop}
            preservePitch={preservePitch}
          />
        )
      })}
    </div>
  );

}

export default SoundClips;