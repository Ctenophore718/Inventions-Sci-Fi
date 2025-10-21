import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export interface DevoutPrimaryAttackData {
  dieSizeDots: number;
  critDots: number;
  dieSize: number;
  critThreshold: number;
}

/**
 * Calculate Devout primary attack values based on class card dots
 */
export function calculateDevoutPrimaryAttackData(classCardDots?: boolean[][]): DevoutPrimaryAttackData {
  // Get die size dots (array index 4 - "Increase die size")
  const dieSizeDots = classCardDots?.[4]?.filter(Boolean).length || 0;
  // Get crit dots in Primary Attack section (array index 5 - "+1 Crit")
  const critDots = classCardDots?.[5]?.filter(Boolean).length || 0;
  
  // Calculate die size: base 6, +2 per dot
  const dieSize = 6 + dieSizeDots * 2;
  // Calculate crit threshold: 18 minus crit dots
  const critThreshold = 18 - critDots;
  
  return { dieSizeDots, critDots, dieSize, critThreshold };
}

/**
 * Generate the primary attack stats for Devout Incantation cards
 */
export function generateDevoutPrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _cost?: number,
  incantationName?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _sheet?: CharacterSheet | null
): React.ReactElement {
  const { dieSize, critThreshold } = calculateDevoutPrimaryAttackData(classCardDots);
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 10hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single, Arcing<br />
        {incantationName === 'Cleanse' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, remove <br />
            <span style={{ display: 'block', textAlign: 'right' }}>1 negative status effect</span>
          </>
        ) : incantationName === 'Enlighten' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, grant ally <br />
            <span style={{ display: 'block', textAlign: 'right' }}>within 10hx +2 to next roll</span>
          </>
        ) : incantationName === 'Comply' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#ffe700', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#ffe700', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Confuse</i></b>
          </>
        ) : incantationName === 'Detain' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#ffe700', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#ffe700', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Restrain</i></b>
          </>
        ) : incantationName === 'Rampage' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Enrage</i></b>
          </>
        ) : incantationName === 'Terrify' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Demoralize</i></b>
          </>
        ) : incantationName === 'Erase' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Blind</i></b>
          </>
        ) : incantationName === 'Exhaust' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Drain</i></b>
          </>
        ) : (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Get the incantation cost
 */
export function getIncantationCost(incantationName: string): number {
  switch (incantationName) {
    case 'Cleanse': return 160;
    case 'Enlighten': return 160;
    case 'Comply': return 155;
    case 'Detain': return 155;
    case 'Rampage': return 155;
    case 'Terrify': return 155;
    case 'Erase': return 155;
    case 'Exhaust': return 160;
    default: return 0;
  }
}
