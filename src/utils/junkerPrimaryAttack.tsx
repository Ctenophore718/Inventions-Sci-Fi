import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

/**
 * Get the junker drone cost
 */
export function getJunkerDroneCost(droneName: string): number {
  const costs: { [key: string]: number } = {
    'Big Hugs Gas Can': 165,
    'Shrapnel-Matic 500': 160,
    'Smash Hands XBot': 150
  };
  return costs[droneName] || 0;
}

/**
 * Get the base stats for a junker drone
 */
export function getJunkerDroneBaseStats(droneName: string) {
  if (droneName === 'Big Hugs Gas Can') {
    return { hitPoints: 5, speed: 4 };
  } else if (droneName === 'Shrapnel-Matic 500') {
    return { hitPoints: 10, speed: 8 };
  } else if (droneName === 'Smash Hands XBot') {
    return { hitPoints: 20, speed: 5 };
  }
  return { hitPoints: 5, speed: 4 };
}

export const generateJunkerDroneJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const junkerPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackDieSizeDots || [false, false, false];
  const junkerPrimaryAttackRepeatDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackRepeatDots || [false, false, false];
  const junkerPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackSpeedDots || [false, false, false];
  const junkerPrimaryAttackCritDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackCritDots || [false, false, false];
  const junkerPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackHitPointsDots || [false, false, false];
  
  // Calculate dynamic values
  const dieSizeSteps = junkerPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [6, 8, 10, 12];
  const dieSize = dieSizeOptions[dieSizeSteps] || 6;
  const repeatBonus = junkerPrimaryAttackRepeatDots.filter(Boolean).length;
  const speed = junkerPrimaryAttackSpeedDots.filter(Boolean).length * 2;
  const critThreshold = 18 - junkerPrimaryAttackCritDots.filter(Boolean).length;
  const hitPoints = junkerPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  
  const totalRepeat = 1 + repeatBonus;
  
  return (
    <div style={{ fontSize: '1em', marginTop: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Summon</u></b> (x)+<b>[{hitPoints}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> (x)+<b>[{speed}]</b>hx
      </div>
      <div>
        <b><u>Range</u></b> 1hx
      </div>
      <div>
        <b><u>Target</u></b> Single, Repeat <b>[{totalRepeat}]</b>
      </div>
      <div>
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b>
      </div>
    </div>
  );
};

export const generateJunkerDroneCharacterSheetJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const junkerPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackDieSizeDots || [false, false, false];
  const junkerPrimaryAttackRepeatDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackRepeatDots || [false, false, false];
  const junkerPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackSpeedDots || [false, false, false];
  const junkerPrimaryAttackCritDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackCritDots || [false, false, false];
  const junkerPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackHitPointsDots || [false, false, false];
  
  // Calculate dynamic values
  const dieSizeSteps = junkerPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [6, 8, 10, 12];
  const dieSize = dieSizeOptions[dieSizeSteps] || 6;
  const repeatBonus = junkerPrimaryAttackRepeatDots.filter(Boolean).length;
  const speed = junkerPrimaryAttackSpeedDots.filter(Boolean).length * 2;
  const critThreshold = 18 - junkerPrimaryAttackCritDots.filter(Boolean).length;
  const hitPoints = junkerPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  
  const totalRepeat = 1 + repeatBonus;
  
  return (
    <>
      <b><i style={{ color: '#990000', fontSize: '1em' }}>Junker Drone.</i></b> Summon, 1hx Range, Single Target, Repeat <b>[{totalRepeat}]</b>, <b>[{critThreshold}]</b>+ Crit, 1d<b>[{dieSize}]</b> Damage{speed > 0 && <>, +<b>[{speed}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b></>}{hitPoints > 0 && <>, <b>[{hitPoints}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b></>}.
    </>
  );
};

/**
 * Generate card stats JSX for junker drones
 */
export function generateJunkerDroneCardStatsJSX(sheet: CharacterSheet | null, droneName: string): React.JSX.Element {
  const junkerPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackDieSizeDots || [false, false, false];
  const junkerPrimaryAttackRepeatDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackRepeatDots || [false, false, false];
  const junkerPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackSpeedDots || [false, false, false];
  const junkerPrimaryAttackCritDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackCritDots || [false, false, false];
  const junkerPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackHitPointsDots || [false, false, false];
  
  const dieSizeSteps = junkerPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [6, 8, 10, 12];
  const dieSize = dieSizeOptions[dieSizeSteps] || 6;
  const repeatBonus = junkerPrimaryAttackRepeatDots.filter(Boolean).length;
  const totalRepeat = 1 + repeatBonus;
  const speedDots = junkerPrimaryAttackSpeedDots.filter(Boolean).length * 2;
  const critThreshold = 18 - junkerPrimaryAttackCritDots.filter(Boolean).length;
  const hitPointsDots = junkerPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  
  const baseStats = getJunkerDroneBaseStats(droneName);
  const totalHitPoints = baseStats.hitPoints + hitPointsDots;
  const totalSpeed = baseStats.speed + speedDots;
  
  if (droneName === 'Big Hugs Gas Can') {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Summon</u></b> <b>[{totalHitPoints}]</b> <i><b style={{ color: '#990000' }}>Hit Point(s)</b></i></span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> <b>[{totalSpeed}]</b>hx, <b><i style={{ color: '#38761d' }}>Fly</i></b>
        </div>
        <div>
          <b><u>Range</u></b> 1hx
        </div>
        <div>
          <b><u>Target</u></b> Single, Repeat <b>[{totalRepeat}]</b>
        </div>
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#cc0000', display: 'inline-flex', alignItems: 'center' }}>
        Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        <div>
          <b><u>Crit Effect</u></b>  1d<b>[{dieSize}]</b> <b><u style={{ color: '#cc0000', display: 'inline-flex', alignItems: 'center' }}>
        Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
        <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#cc0000', display: 'inline-flex', alignItems: 'center' }}>
        Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>, <b><i>Blind</i></b></span>
        </div>
      </div>
    );
  }
  
  if (droneName === 'Shrapnel-Matic 500') {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Summon</u></b> <b>[{totalHitPoints}]</b> <i><b style={{ color: '#990000' }}>Hit Point(s)</b></i></span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> <b>[{totalSpeed}]</b>hx
        </div>
        <div>
          <b><u>Range</u></b> 1hx
        </div>
        <div>
          <b><u>Target</u></b> Single, Repeat <b>[{totalRepeat}]</b>
        </div>
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        <div>
          <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b> <br />
        <span style={{ display: 'block', textAlign: 'right' }}><b>(</b><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
        Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
        </div>
      </div>
    );
  }
  
  if (droneName === 'Smash Hands XBot') {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Summon</u></b> <b>[{totalHitPoints}]</b> <i><b style={{ color: '#990000' }}>Hit Point(s)</b></i></span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> <b>[{totalSpeed}]</b>hx
        </div>
        <div>
          <b><u>Range</u></b> 1hx
        </div>
        <div>
          <b><u>Target</u></b> Single, Repeat <b>[{totalRepeat}]</b>
        </div>
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#8b4513', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        <div>
          <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#8b4513', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
        <span style={{ display: 'block', textAlign: 'right' }}><b><i>Bounce</i></b> 3hx</span>
        </div>
      </div>
    );
  }
  
  return <></>;
}
