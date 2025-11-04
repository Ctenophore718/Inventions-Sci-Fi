import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateEncodeWeaknessJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Ammo Coder') return null;

  // Get progression dots
  const critDots = (sheet?.subclassProgressionDots as any)?.ammocoderTechniqueCritDots?.filter(Boolean).length || 0;
  const vulnerabilityDot = (sheet?.subclassProgressionDots as any)?.ammocoderTechniqueVulnerabilityDots?.[0] === true;
  const cooldownDots = (sheet?.subclassProgressionDots as any)?.ammocoderTechniqueCooldownDots?.filter(Boolean).length || 0;
  const cooldown = 4 - cooldownDots;

  return (
    <>
        <b><i style={{ color: '#112972' }}>Encode Weakness</i></b> <i style={{ color: '#112972' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You gain a +<b>[{critDots}]</b> Crit on the next <b><i style={{ color: '#990000' }}>Attack</i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b>, and the Target loses <i>Resistance</i> and <i>Immunity</i> and suffers <b>[</b>{vulnerabilityDot ? <i>Vulnerability</i> : ' - ' }<b>]</b> to a Damage type of your choice until the beginning of the next round. You choose which Damage type before rolling for Damage.
    </>
  );
};

// Version for Cards page (without "Encode Weakness (Cooldown [#])" text)
export const generateEncodeWeaknessCardJSX = (subclassProgressionDots: any) => {
  // Get progression dots
  const critDots = subclassProgressionDots?.ammocoderTechniqueCritDots?.filter(Boolean).length || 0;
  const vulnerabilityDot = subclassProgressionDots?.ammocoderTechniqueVulnerabilityDots?.[0] === true;

  return (
    <>
      You gain a +<b>[{critDots}]</b> Crit on the next <b><i style={{ color: '#990000' }}>Attack</i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b>, and the Target loses <i>Resistance</i> and <i>Immunity</i> and suffers <b>[</b>{vulnerabilityDot ? <i>Vulnerability</i> : ' - ' }<b>]</b> to a Damage type of your choice until the beginning of the next round. You choose which Damage type before rolling for Damage.
    </>
  );
};
