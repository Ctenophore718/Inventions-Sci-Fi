import React from 'react';

export interface ChemistPrimaryAttackData {
  dieSizeDots: number;
  critDots: number;
  dieSize: number;
  critThreshold: number;
}

/**
 * Calculate Chemist primary attack values based on class card dots
 */
export function calculateChemistPrimaryAttackData(classCardDots?: boolean[][]): ChemistPrimaryAttackData {
  // Get die size dots (array index 6)
  const dieSizeDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  // Get crit dots (array index 7)
  const critDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  
  // Calculate die size: 6 -> 8 -> 10 -> 12
  const dieSize = dieSizeDots === 0 ? 6 : dieSizeDots === 1 ? 8 : dieSizeDots === 2 ? 10 : 12;
  
  // Calculate crit threshold: 18 -> 17 -> 16 -> 15
  const critThreshold = 18 - critDots;
  
  return { dieSizeDots, critDots, dieSize, critThreshold };
}

/**
 * Generate the primary attack stats for Chemist cards
 */
export function generateChemistPrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  cost?: number,
  dartGunName?: string
): React.ReactElement {
  const { dieSize, critThreshold } = calculateChemistPrimaryAttackData(classCardDots);
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 8hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single <br />
        {dartGunName === 'Chem Gun' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <br />
            <div style={{ textAlign: 'right', width: '100%' }}><b><i>Spike</i></b> <b>(<u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u>)</b></div>
          </>
        ) : dartGunName === 'Happy Pill Pusher' ? (
          <> 
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b>: <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>: <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <br />
            <div style={{ textAlign: 'right', width: '100%' }}><b><i>Mesmerize</i></b></div>   
          </>
        ) : dartGunName === 'Sour Juicer' ? (
          <> 
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b>: <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>: <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Demoralize</i></b>    
          </>
        ) : dartGunName === 'Prickly Goo' ? (
          <> 
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b>: <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>: <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Blind,</i></b> <br />
            <div style={{ textAlign: 'right', width: '100%' }}><b><i>Restrain</i></b></div> 
          </>
        ) : (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>
          </>
        )}
      </div>
      {cost && (
        <div style={{ fontStyle: 'italic', color: '#666', fontSize: '0.9em' }}>
          Cost: {cost}c
        </div>
      )}
    </div>
  );
}

/**
 * Get the dart gun cost
 */
export function getDartGunCost(dartGunName: string): number {
  switch (dartGunName) {
    case 'Chem Gun': return 150;
    case 'Happy Pill Pusher': return 160;
    case 'Sour Juicer': return 160;
    case 'Prickly Goo': return 175;
    default: return 0;
  }
}
