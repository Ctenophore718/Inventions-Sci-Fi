import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

/**
 * Get the nanodrone swarm cost
 */
export function getNanodroneSwarmCost(swarmName: string): number {
  const costs: { [key: string]: number } = {
    'Blockwave': 165,
    'Mech-Arachnids': 160,
    'Toxic Cloudbot': 150
  };
  return costs[swarmName] || 0;
}

/**
 * Get the base stats for a nanodrone swarm
 */
export function getNanodroneSwarmBaseStats(swarmName: string) {
  if (swarmName === 'Blockwave') {
    return { hitPoints: 1, speed: 5 };
  }
  if (swarmName === 'Mech-Arachnids') {
    return { hitPoints: 1, speed: 6 };
  }
  if (swarmName === 'Toxic Cloudbot') {
    return { hitPoints: 1, speed: 5 };
  }
  return { hitPoints: 1, speed: 5 };
}

export const generateNanodroneSwarmJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const nanoboticistPrimaryAttackTargetDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackTargetDots || [false, false, false];
  const nanoboticistPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackDieSizeDots || [false, false, false];
  const nanoboticistPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackSpeedDots || [false, false, false];
  const nanoboticistPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackHitPointsDots || [false, false];
  const nanoboticistPrimaryAttackSwarmDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackSwarmDots || [false, false];
  const nanoboticistPrimaryAttackSpikeDot = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackSpikeDot || [false];
  
  // Calculate dynamic values
  const dieSizeSteps = nanoboticistPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [4, 6, 8, 10];
  const dieSize = dieSizeOptions[dieSizeSteps] || 4;
  
  const targetBonus = nanoboticistPrimaryAttackTargetDots.filter(Boolean).length;
  const totalTargets = 1 + targetBonus;
  
  const speedBonus = nanoboticistPrimaryAttackSpeedDots.filter(Boolean).length;
  
  const hitPointsBonus = nanoboticistPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  
  const swarmMax = 1 + nanoboticistPrimaryAttackSwarmDots.filter(Boolean).length;
  
  return (
    <div style={{ fontSize: '1em', marginTop: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div><b><u>Summon</u></b> (x)+<b>[{hitPointsBonus}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b></div>
      <div><b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> (x)+<b>[{speedBonus}]</b>hx</div>
      <div><b><u>Swarm Max</u></b> <b>[{swarmMax}]</b></div>
      <div><b><u>Strike</u></b> <b>[{totalTargets}]</b> target{totalTargets > 1 && 's'}</div>
      <div><b><u>Damage</u></b> <b>[1]</b>d<b>{dieSize}</b></div>
    </div>
  );
};

export const generateNanodroneSwarmCharacterSheetJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const nanoboticistPrimaryAttackTargetDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackTargetDots || [false, false, false];
  const nanoboticistPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackDieSizeDots || [false, false, false];
  const nanoboticistPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackSpeedDots || [false, false, false];
  const nanoboticistPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackHitPointsDots || [false, false];
  const nanoboticistPrimaryAttackSwarmDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackSwarmDots || [false, false];
  const nanoboticistPrimaryAttackSpikeDot = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackSpikeDot || [false];
  
  // Calculate dynamic values
  const dieSizeSteps = nanoboticistPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [4, 6, 8, 10];
  const dieSize = dieSizeOptions[dieSizeSteps] || 4;
  
  const targetBonus = nanoboticistPrimaryAttackTargetDots.filter(Boolean).length;
  const totalTargets = 1 + targetBonus;
  
  const speedBonus = nanoboticistPrimaryAttackSpeedDots.filter(Boolean).length;
  const totalSpeed = speedBonus;
  
  const hitPointsBonus = nanoboticistPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  
  const swarmCount = 1 + nanoboticistPrimaryAttackSwarmDots.filter(Boolean).length;
  const hasSpike = nanoboticistPrimaryAttackSpikeDot[0];
  
  return (
    <div style={{ fontSize: '1em', marginTop: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Summon</u></b> <b>[{swarmCount}]</b> Nanodrone{swarmCount > 1 && 's'}</span>
        {hitPointsBonus > 0 && <span style={{ textAlign: 'right' }}>+<b>[{hitPointsBonus}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>}
      </div>
      {totalSpeed > 0 && (
        <div>
          <b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> +<b>[{totalSpeed}]</b>hx
        </div>
      )}
      <div>
        <b><u>Strike</u></b> 1d<b>[{dieSize}]</b>{hasSpike && <>, <b><i>Spike</i></b> (<b><u style={{ color: '#666', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>)</>}
      </div>
      <div>
        <b><u>Target</u></b> <b>[{totalTargets}]</b> Target{totalTargets > 1 && 's'}
      </div>
    </div>
  );
};

/**
 * Generate card stats JSX for nanodrone swarms
 */
export function generateNanodroneSwarmCardStatsJSX(sheet: CharacterSheet | null, swarmName: string): React.JSX.Element {
  const nanoboticistPrimaryAttackTargetDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackTargetDots || [false, false, false];
  const nanoboticistPrimaryAttackDieSizeDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackDieSizeDots || [false, false, false];
  const nanoboticistPrimaryAttackSpeedDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackSpeedDots || [false, false, false];
  const nanoboticistPrimaryAttackHitPointsDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackHitPointsDots || [false, false];
  const nanoboticistPrimaryAttackSwarmDots = (sheet?.subclassProgressionDots as any)?.nanoboticistPrimaryAttackSwarmDots || [false, false];
  
  const dieSizeSteps = nanoboticistPrimaryAttackDieSizeDots.filter(Boolean).length;
  const dieSizeOptions = [4, 6, 8, 10];
  const dieSize = dieSizeOptions[dieSizeSteps] || 4;
  
  const targetBonus = nanoboticistPrimaryAttackTargetDots.filter(Boolean).length;
  const totalTargets = 1 + targetBonus;
  
  const speedBonus = nanoboticistPrimaryAttackSpeedDots.filter(Boolean).length;
  const hitPointsBonus = nanoboticistPrimaryAttackHitPointsDots.filter(Boolean).length * 5;
  const swarmMax = 1 + nanoboticistPrimaryAttackSwarmDots.filter(Boolean).length;
  
  const baseStats = getNanodroneSwarmBaseStats(swarmName);
  const totalHitPoints = baseStats.hitPoints + hitPointsBonus;
  const totalSpeed = baseStats.speed + speedBonus;
  
  if (swarmName === 'Blockwave') {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div>
          <b><u>Summon</u></b> <b>[{swarmMax}]</b> nanodrone{swarmMax > 1 && 's'} (max)
        </div>
        <div>
          <b>[{totalHitPoints}]</b> <i><b style={{ color: '#990000' }}>Hit Point(s)</b></i> each
        </div>
        <div>
          <b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> <b>[{totalSpeed}]</b>hx, <b><i style={{ color: '#38761d' }}>Fly</i></b>
        </div>
        <div>
          <b><u>Range</u></b> Self
        </div>
        <div>
          <b><u>Target</u></b> <b>[{totalTargets}]</b> target{totalTargets > 1 && 's'}
        </div>
        <div>
          <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#666', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        </div>
        <div>
          <b><u>Effect</u></b> <b><i>Knockback</i></b> 1hx
        </div>
      </div>
    );
  }
  
  if (swarmName === 'Mech-Arachnids') {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div>
          <b><u>Summon</u></b> <b>[{swarmMax}]</b> nanodrone{swarmMax > 1 && 's'} (max)
        </div>
        <div>
          <b>[{totalHitPoints}]</b> <i><b style={{ color: '#990000' }}>Hit Point(s)</b></i> each
        </div>
        <div>
          <b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> <b>[{totalSpeed}]</b>hx, <b><i style={{ color: '#38761d' }}>Climb</i></b>
        </div>
        <div>
          <b><u>Range</u></b> Self
        </div>
        <div>
          <b><u>Target</u></b> <b>[{totalTargets}]</b> target{totalTargets > 1 && 's'}
        </div>
        <div>
          <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#8e7000', display: 'inline-flex', alignItems: 'center' }}>
            Poison<img src="/Poison.png" alt="Poison" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        </div>
        <div>
          <b><u>Effect</u></b> <b><i>Poison</i></b> 1d4
        </div>
      </div>
    );
  }
  
  if (swarmName === 'Toxic Cloudbot') {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div>
          <b><u>Summon</u></b> <b>[{swarmMax}]</b> nanodrone{swarmMax > 1 && 's'} (max)
        </div>
        <div>
          <b>[{totalHitPoints}]</b> <i><b style={{ color: '#990000' }}>Hit Point(s)</b></i> each
        </div>
        <div>
          <b><i><u style={{ color: '#38761d' }}>Speed</u></i></b> <b>[{totalSpeed}]</b>hx, <b><i style={{ color: '#38761d' }}>Fly</i></b>
        </div>
        <div>
          <b><u>Range</u></b> Self
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> 2hx-Radius
        </div>
        <div>
          <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#274e13', display: 'inline-flex', alignItems: 'center' }}>
            Acid<img src="/Acid.png" alt="Acid" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
        </div>
        <div>
          <b><u>Effect</u></b> <b><i>Corrode</i></b>
        </div>
      </div>
    );
  }
  
  return <></>;
}
