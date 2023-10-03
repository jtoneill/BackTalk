import React, { useState, useEffect } from 'react';
import Clip from './Clip.jsx';

function SoundClips({ clips, selected, setSelected, playbackSpeed, reverse, loop, preservePitch, burn }) {

  return (
    <div id="sound-clips" >
      {clips.current.map((soundClip, index) => {
        return (
          <Clip
            key={`clip${index}`}
            soundClip={soundClip}
            clips={clips}
            idx={index}
            selected={selected}
            setSelected={setSelected}
            playbackSpeed={playbackSpeed}
            reverse={reverse}
            loop={loop}
            preservePitch={preservePitch}
            burn={burn}
          />
        )
      })}
    </div>
  );

}

export default SoundClips;