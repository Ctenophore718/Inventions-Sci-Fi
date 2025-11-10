import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

/**
 * Get the siege drone cost
 */
export function getSiegeDroneCost(droneName: string): number {
  const costs: { [key: string]: number } = {
    'Chewy Tank': 175,
    'Goblin Kisses': 165
  };
  return costs[droneName] || 0;
}

/**
 * Get the base stats for a siege drone
 */
export function getSiegeDroneBaseStats(droneName: string) {
  if (droneName === 'Chewy Tank') {
    return { hitPoints: 25, speed: 4 };
  } else if (droneName === 'Goblin Kisses') {
    return { hitPoints: 20, speed: 5 };
  }
  return { hitPoints: 10, speed: 6 };
}

export const generateSiegeDroneJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const tankerPrimaryAttackAoEDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackAoEDots || [false, false, false];
  const tankerPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackDieSizeDots || [false, false];
  const tankerPrimaryAttackCritDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackCritDots || [false, false, false];
  const tankerPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackSpeedDots || [false, false, false];
  const tankerPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackHitPointsDots || [false, false, false];

  // Calculate dynamic values
  const aoeRadius = 1 + tankerPrimaryAttackAoEDots.filter(Boolean).length;
  const dieSizeSteps = tankerPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [8, 10, 12];
  const dieSize = dieSizeOptions[dieSizeSteps] || 8;
  const critThreshold = 18 - tankerPrimaryAttackCritDots.filter(Boolean).length;
  const speedBonus = tankerPrimaryAttackSpeedDots.filter(Boolean).length;
  const hitPointsBonus = tankerPrimaryAttackHitPointsDots.filter(Boolean).length * 5;

  return (
    <div style={{ fontSize: '1em', marginTop: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Summon</u></b> (x)+<b>[{hitPointsBonus}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
        <span style={{ textAlign: 'right', minWidth: '100px' }}><b><u>Size</u></b> 4hx</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> (x)+<b>[{speedBonus}]</b>hx</span>
        <span style={{ textAlign: 'right', minWidth: '100px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Range</u></b> 8hx
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-Radius
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

export const generateSiegeDroneCharacterSheetJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const tankerPrimaryAttackAoEDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackAoEDots || [false, false, false];
  const tankerPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackDieSizeDots || [false, false];
  const tankerPrimaryAttackCritDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackCritDots || [false, false, false];
  const tankerPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackSpeedDots || [false, false, false];
  const tankerPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackHitPointsDots || [false, false, false];

  // Calculate dynamic values
  const aoeRadius = 1 + tankerPrimaryAttackAoEDots.filter(Boolean).length;
  const dieSizeSteps = tankerPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [8, 10, 12];
  const dieSize = dieSizeOptions[dieSizeSteps] || 8;
  const critThreshold = 18 - tankerPrimaryAttackCritDots.filter(Boolean).length;
  const speedBonus = tankerPrimaryAttackSpeedDots.filter(Boolean).length;
  const hitPointsBonus = tankerPrimaryAttackHitPointsDots.filter(Boolean).length * 5;

  return (
    <>
      <b><i style={{ color: '#990000', fontSize: '1em' }}>Siege Drone.</i></b> Summon, 8hx Range, <i>AoE</i> <b>[{aoeRadius}]</b>hx-Radius, <b>[{critThreshold}]</b>+ Crit, 1d<b>[{dieSize}]</b> Damage{speedBonus > 0 && <>, +<b>[{speedBonus}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b></>}{hitPointsBonus > 0 && <>, <b>[{hitPointsBonus}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b></>}.
    </>
  );
};

/**
 * Generate card stats JSX for siege drones
 */
export function generateSiegeDroneCardStatsJSX(sheet: CharacterSheet | null, droneName: string): React.JSX.Element {
  const tankerPrimaryAttackAoEDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackAoEDots || [false, false, false];
  const tankerPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackDieSizeDots || [false, false];
  const tankerPrimaryAttackCritDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackCritDots || [false, false, false];
  const tankerPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackSpeedDots || [false, false, false];
  const tankerPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.tankerPrimaryAttackHitPointsDots || [false, false, false];
  
  const aoeRadius = 1 + tankerPrimaryAttackAoEDots.filter(Boolean).length;
  const dieSizeSteps = tankerPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [8, 10, 12];
  const dieSize = dieSizeOptions[dieSizeSteps] || 8;
  const critThreshold = 18 - tankerPrimaryAttackCritDots.filter(Boolean).length;
  const speedDots = tankerPrimaryAttackSpeedDots.filter(Boolean).length;
  const hitPointsDots = tankerPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  
  const baseStats = getSiegeDroneBaseStats(droneName);
  const totalHitPoints = baseStats.hitPoints + hitPointsDots;
  const totalSpeed = baseStats.speed + speedDots;
  
  if (droneName === 'Chewy Tank') {
    return (
      <div style={{ fontSize: '0.865em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Summon</u></b> <b>[{totalHitPoints}]</b> <i><b style={{ color: '#990000' }}>Hit Point(s)</b></i></span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Size</u></b> 4hx</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> <b>[{totalSpeed}]</b>hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Range</u></b> 8hx
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-Radius
        </div>
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#8b4513', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        <div>
          <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#8b4513', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
        <span style={{ display: 'block', textAlign: 'right' }}><b><i>Bounce</i></b> 3hx, leaves </span>
        <span style={{ display: 'block', textAlign: 'right' }}><i>Rough Terrain</i> in <i>AoE</i></span>
        </div>
      </div>
    );
  }
  
  if (droneName === 'Goblin Kisses') {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Summon</u></b> <b>[{totalHitPoints}]</b> <i><b style={{ color: '#990000' }}>Hit Point(s)</b></i></span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Size</u></b> 4hx</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> <b>[{totalSpeed}]</b>hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Range</u></b> 8hx
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-Radius
        </div>
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        <div>
          <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Mesmerize</i></b>
        </div>
      </div>
    );
  }
  
  return <></>;
}
