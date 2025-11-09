import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

/**
 * Get the stealth drone cost
 */
export function getStealthDroneCost(droneName: string): number {
  const costs: { [key: string]: number } = {
    'Blind Silence': 165,
    'Will-o\'-the-Wisp': 160
  };
  return costs[droneName] || 0;
}

/**
 * Get the base stats for a stealth drone
 */
export function getStealthDroneBaseStats(droneName: string) {
  if (droneName === 'Blind Silence') {
    return { hitPoints: 1, speed: 7 };
  }
  if (droneName === 'Will-o\'-the-Wisp') {
    return { hitPoints: 1, speed: 6 };
  }
  return { hitPoints: 1, speed: 5 };
}

export const generateStealthDroneJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const hackerPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackDieSizeDots || [false, false, false];
  const hackerPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackSpeedDots || [false, false, false];
  const hackerPrimaryAttackCritDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackCritDots || [false, false, false];
  const hackerPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackHitPointsDots || [false, false, false];
  
  // Calculate dynamic values
  const dieSizeSteps = hackerPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [6, 8, 10, 12];
  const dieSize = dieSizeOptions[dieSizeSteps] || 6;
  const speed = hackerPrimaryAttackSpeedDots.filter(Boolean).length * 2;
  const critThreshold = 18 - hackerPrimaryAttackCritDots.filter(Boolean).length;
  const hitPoints = hackerPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  
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
        <b><u>Range</u></b> Self
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> 3hx-Radius
      </div>
      <div>
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b>
      </div>
      <div>
        <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>, status effect
      </div>
    </div>
  );
};

export const generateStealthDroneCharacterSheetJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const hackerPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackDieSizeDots || [false, false, false];
  const hackerPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackSpeedDots || [false, false, false];
  const hackerPrimaryAttackCritDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackCritDots || [false, false, false];
  const hackerPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackHitPointsDots || [false, false, false];
  
  // Calculate dynamic values
  const dieSizeSteps = hackerPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [6, 8, 10, 12];
  const dieSize = dieSizeOptions[dieSizeSteps] || 6;
  const speed = hackerPrimaryAttackSpeedDots.filter(Boolean).length * 2;
  const critThreshold = 18 - hackerPrimaryAttackCritDots.filter(Boolean).length;
  const hitPoints = hackerPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  
  return (
    <>
      <b><i style={{ color: '#990000', fontSize: '1em' }}>Stealth Drone.</i></b> Summon, Self Range, <i>AoE</i> 3hx-Radius, <b>[{critThreshold}]</b>+ Crit, 1d<b>[{dieSize}]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage{speed > 0 && <>, +<b>[{speed}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b></>}{hitPoints > 0 && <>, <b>[{hitPoints}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b></>}.
    </>
  );
};

/**
 * Generate card stats JSX for stealth drones
 */
export function generateStealthDroneCardStatsJSX(sheet: CharacterSheet | null, droneName: string): React.JSX.Element {
  const hackerPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackDieSizeDots || [false, false, false];
  const hackerPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackSpeedDots || [false, false, false];
  const hackerPrimaryAttackCritDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackCritDots || [false, false, false];
  const hackerPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackHitPointsDots || [false, false, false];
  
  const dieSizeSteps = hackerPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [6, 8, 10, 12];
  const dieSize = dieSizeOptions[dieSizeSteps] || 6;
  const speedDots = hackerPrimaryAttackSpeedDots.filter(Boolean).length * 2;
  const critThreshold = 18 - hackerPrimaryAttackCritDots.filter(Boolean).length;
  const hitPointsDots = hackerPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  
  const baseStats = getStealthDroneBaseStats(droneName);
  const totalHitPoints = baseStats.hitPoints + hitPointsDots;
  const totalSpeed = baseStats.speed + speedDots;
  
  if (droneName === 'Blind Silence') {
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
          <b><u>Range</u></b> Self
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> 3hx-Radius
        </div>
        <div>
          <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        </div>
                <div>
          <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Blind</i></b>
        </div>
      </div>
    );
  }
  
  if (droneName === 'Will-o\'-the-Wisp') {
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
          <b><u>Range</u></b> Self
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> 3hx-Radius
        </div>
        <div>
          <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        </div>
                <div>
          <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Restrain</i></b>
        </div>
      </div>
    );
  }
  
  return <></>;
}
