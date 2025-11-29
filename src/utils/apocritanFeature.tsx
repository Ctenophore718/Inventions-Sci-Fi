import React from 'react';

export const generateSwarmTacticsJSX = (rangeBonus: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6d7156' }}>Swarm Tactics.</i></b> When you are <b>[{rangeBonus}]</b>hx away from an enemy, allies who <b><i style={{ color: '#351c75' }}>Strike</i></b> that enemy can choose to inflict the <b><i>Spike</i></b>, <b><i>Confuse</i></b> or <b><i>Restrain</i></b> condition on it. The <b><i>Spike</i></b> Damage type is the same as the ally's <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.
    </span>
  );
};
