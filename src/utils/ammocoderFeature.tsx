import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBulletCodeJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Ammo Coder') return null;

  // Get "Includes Strikes" dot from subclassProgressionDots
  const includesStrikes = (sheet?.subclassProgressionDots as any)?.ammocoderFeatureIncludesStrikesDots?.[0] === true;

  return (
    <>
      <b><i style={{ color: '#112972' }}>Bullet Code.</i></b> Whenever you make an <b><i style={{ color: '#990000' }}>Attack</i></b> or <b>[{includesStrikes ? <i style={{ color: '#351c75' }}>Strike</i> : ' - '}]</b>, you can change the Damage type of your <b><i style={{ color: '#990000' }}>Attack</i></b> or <b>[{includesStrikes ? <i style={{ color: '#351c75' }}>Strike</i> : ' - '}]</b> to any of the following: <br />
      <b style={{ color: '#de7204', textDecoration: 'underline' }}><u>Chemical</u></b> <img src="/Chemical.png" alt="Chemical" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '0px' }} />, <b style={{ color: '#3ebbff', textDecoration: 'underline' }}><u>Cold</u></b> <img src="/Cold.png" alt="Cold" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '0px' }} />, <b style={{ color: '#d5d52a', textDecoration: 'underline' }}><u>Electric</u></b> <img src="/Electric.png" alt="Electric" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '0px' }} />, <b style={{ color: '#f90102', textDecoration: 'underline' }}><u>Fire</u></b> <img src="/Fire.png" alt="Fire" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '0px' }} />, <b style={{ color: '#516fff', textDecoration: 'underline' }}><u>Force</u></b> <img src="/Force.png" alt="Force" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '0px' }} />, <b style={{ color: '#a929ff', textDecoration: 'underline' }}><u>Neural</u></b> <img src="/Neural.png" alt="Neural" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '0px' }} />, <b style={{ color: '#02b900', textDecoration: 'underline' }}><u>Toxic</u></b> <img src="/Toxic.png" alt="Toxic" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '0px' }} />
    </>
  );
};
