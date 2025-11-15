import React from 'react';

interface FalconDiveParams {
  speedMultiplier?: number;
  cooldown?: number;
}

export const generateFalconDiveJSX = (params?: FalconDiveParams) => {
  const speedMultiplier = params?.speedMultiplier ?? 2;
  const cooldown = params?.cooldown ?? 3;
  const speedText = speedMultiplier === 2 ? 'double' : speedMultiplier === 3 ? 'triple' : `${speedMultiplier}x`;
  
  return (
    <>
      <b><i style={{ color: '#6d7156' }}>Falcon Dive</i></b> <span style={{ color: '#6d7156', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You <b>[{speedText}]</b> your <b><i style={{ color: '#38761d' }}>Speed</i></b> until the beginning of the next round.
    </>
  );
};

export const generateFalconDiveCardJSX = (params?: FalconDiveParams) => {
  const speedMultiplier = params?.speedMultiplier ?? 2;
  const speedText = speedMultiplier === 2 ? 'double' : speedMultiplier === 3 ? 'triple' : `${speedMultiplier}x`;
  
  return (
    <>
      You <b>[{speedText}]</b> your <b><i style={{ color: '#38761d' }}>Speed</i></b> until the beginning of the next round.
    </>
  );
};
