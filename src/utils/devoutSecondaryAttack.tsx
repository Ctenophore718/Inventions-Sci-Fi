import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export interface DevoutSecondaryAttackData {
  damageDiceDots: number;
  aoeDots: number;
  critDots: number;
  cooldownDots: number;
  damageDice: number;
  aoeRadius: number;
  critThreshold: number;
  cooldown: number;
}

/**
 * Calculate Devout secondary attack values based on class card dots
 */
export function calculateDevoutSecondaryAttackData(classCardDots?: boolean[][]): DevoutSecondaryAttackData {
  // Get +1 Damage die dots (array index 6)
  const damageDiceDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  // Get +1hx-Cone AoE dots (array index 7)
  const aoeDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  // Get +1 Crit dots (array index 8)
  const critDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  // Get -1 Cooldown dots (array index 9)
  const cooldownDots = classCardDots?.[9]?.filter(Boolean).length || 0;
  
  // Calculate damage dice: base 1, +1 per dot
  const damageDice = 1 + damageDiceDots;
  // Calculate AoE radius: base 3, +1 per dot
  const aoeRadius = 3 + aoeDots;
  // Calculate crit threshold: 18 minus crit dots
  const critThreshold = 18 - critDots;
  // Calculate cooldown: base 4, minus cooldown dots
  const cooldown = 4 - cooldownDots;
  
  return { damageDiceDots, aoeDots, critDots, cooldownDots, damageDice, aoeRadius, critThreshold, cooldown };
}

/**
 * Generate the secondary attack stats for Devout Relic cards
 */
export function generateDevoutSecondaryAttackStatsJSX(
  classCardDots?: boolean[][],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _cost?: number,
  relicName?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _sheet?: CharacterSheet | null,
  fontSize: string = '1em'
): React.ReactElement {
  const { damageDice, aoeRadius, critThreshold } = calculateDevoutSecondaryAttackData(classCardDots);
  
  return (
    <div style={{ fontSize: fontSize, width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 1hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-Cone<br />
        {relicName === "Aktinovo's Lantern" ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Blind</i></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Drain</i></b>
          </>
        ) : relicName === "Agathe's Halo" ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Blind</i></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Restrain</i></b>
          </>
        ) : relicName === "Entropos' Maw" ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b><br />
            <span style={{ display: 'block', textAlign: 'right' }}><b>(</b><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Spike</i></b><br />
            <span style={{ display: 'block', textAlign: 'right' }}><b>(</b><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
          </>
        ) : relicName === "Kako's Bloodshot Eye" ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b><br />
            <span style={{ display: 'block', textAlign: 'right' }}><b>(</b><b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Demoralize</i></b></span>
          </>
        ) : relicName === "Storvald's Rimehold Hand" ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Restrain</i></b>
          </>
        ) : relicName === 'Scepter of Ethos' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Restrain</i></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Drain</i></b>
          </>
        ) : relicName === "Fylakas' Censor" ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Restrain</i></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Sleep</i></b>
          </>
        ) : relicName === "Kenos' Scythe" ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Drain</i></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b></span>
          </>
        ) : relicName === 'Orb of Mitra' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Drain</i></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Demoralize</i></b>
          </>
        ) : (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6<br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Get the relic cost
 */
export function getRelicCost(relicName: string): number {
  switch (relicName) {
    case "Aktinovo's Lantern": return 275;
    case "Agathe's Halo": return 275;
    case "Entropos' Maw": return 265;
    case "Kako's Bloodshot Eye": return 265;
    case "Storvald's Rimehold Hand": return 255;
    case 'Scepter of Ethos': return 275;
    case "Fylakas' Censor": return 290;
    case "Kenos' Scythe": return 255;
    case 'Orb of Mitra': return 275;
    default: return 0;
  }
}
