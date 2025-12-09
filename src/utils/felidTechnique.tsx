import React from "react";

export const generateFelineAgilityJSX = (cooldown: number, strikes: number = 0) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b16326' }}>Feline Agility</i></b> <i style={{ color: '#b16326', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You immediately remove all conditions on yourself. Additionally, you double all types of <b><i style={{ color: '#38761d' }}>Speeds</i></b> you have (including your <b><i style={{ color: '#38761d' }}>Jump Speed</i></b>) and you gain +<b>[{strikes}]</b> <b><i style={{ color: '#351c75' }}>Strike(s)</i></b>.
    </span>
  );
};

export const generateFelineAgilityCardJSX = (cooldown: number, strikes: number = 0) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You immediately remove all conditions on yourself. Additionally, you double all types of <b><i style={{ color: '#38761d' }}>Speeds</i></b> you have (including your <b><i style={{ color: '#38761d' }}>Jump Speed</i></b>) and you gain +<b>[{strikes}]</b> <b><i style={{ color: '#351c75' }}>Strike(s)</i></b>.
    </span>
  );
};
