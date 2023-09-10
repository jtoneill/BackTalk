import React, { useState } from 'react';

function Controls({ recording, record, stopRec }) {

  return (
    <div id="main-controls" >
      <button className="record" disabled={recording} onClick={(e) => {
        e.preventDefault();
        record();
        }}>Record</button>
      <button className="stop" disabled={!recording} onClick={(e) => {
        e.preventDefault();
        stopRec();
      }}>Stop</button>
    </div>
  );

}

export default Controls;