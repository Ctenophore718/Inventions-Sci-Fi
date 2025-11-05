import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

interface CardsGunslingerAttacksProps {
  sheet: CharacterSheet | null;
  subclass: string;
}

function getCoderCarbineCost(weapon: string): number {
  switch (weapon) {
    case 'Arcane Railgun':
      return 175;
    case 'Space Vaporizer':
      return 165;
    default:
      return 0;
  }
}

function getCoderCarbineFlavorText(weapon: string): string {
  switch (weapon) {
    case 'Arcane Railgun':
      return 'Oikomagic is imbued straight into this carbine, allowing it to deliver a jolt straight through clustered targets.';
    case 'Space Vaporizer':
      return '“This baby’ll sap the very air outta the room ‘fore ya even notice it’s been fired. Jus’ need the right Coder to ‘nipulate it jus’ right.” --Beems, Carbine Tech';
    default:
      return 'Flavor Text.';
  }
}

export const CardsGunslingerAttacks: React.FC<CardsGunslingerAttacksProps> = ({ sheet, subclass }) => {
  const coderCarbines = sheet?.coderCarbines || [];
  
  if (coderCarbines.length === 0) {
    return null;
  }

  // Get progression dots for dynamic stats
  const chainAoEDots = (sheet?.subclassProgressionDots as any)?.ammocoderAttackChainAoEDots?.filter(Boolean).length || 0;
  const dieSizeDots = (sheet?.subclassProgressionDots as any)?.ammocoderAttackDieSizeDots?.filter(Boolean).length || 0;
  const critDots = (sheet?.subclassProgressionDots as any)?.ammocoderAttackCritDots?.filter(Boolean).length || 0;

  // Calculate Sharpshooter bonuses (Gunslinger feature)
  const sharpshooterCritBonus = 2 + (sheet?.classCardDots?.[0]?.filter(Boolean).length || 0);
  const sharpshooterRangeBonus = 0 + (sheet?.classCardDots?.[1]?.filter(Boolean).length || 0);

  const dieSize = 6 + (dieSizeDots * 2);
  const critThreshold = 18 - critDots - sharpshooterCritBonus;
  const chainAoE = 1 + (chainAoEDots * 2);
  const totalRange = 10 + sharpshooterRangeBonus;

  return (
    <>
      {coderCarbines.map((weapon, index) => {
        const subclassColor = '#112972';
        
        return (
        <div key={`${weapon}-${index}`} style={{ 
          width: '240px', 
          height: '336px', 
          background: '#fff', 
          border: '5px solid #990000', 
          borderRadius: 8, 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          padding: '1.2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Card Header */}
          <div style={{
            position: 'absolute',
            top: -4,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 10px',
            boxSizing: 'border-box',
            minHeight: '2.1em'
          }}>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 'bold',
              fontSize: 'clamp(0.8em, 4vw, 1.25em)',
              color: subclassColor,
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {weapon}
            </span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: subclassColor,
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Coder Carbine</span>
          </div>

          {/* Card Image */}
          <img 
            src={`/${weapon}.png`}
            alt={weapon}
            style={{
              position: 'absolute',
              top: 35,
              left: 10,
              right: 10,
              width: 'calc(100% - 20px)',
              height: 'calc(50% - 55px)',
              objectFit: 'cover',
              zIndex: 1,
              borderRadius: 8
            }}
          />
          
          {/* Card Type */}
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 15px)',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 10,
            paddingRight: 10,
            zIndex: 3
          }}>
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Primary Attack</span>
          </div>
          
          {/* Card Stats */}
          <div style={{
            position: 'absolute',
            top: 'calc(50% + 10px)',
            left: 10,
            right: 10,
            bottom: 45,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 400,
            overflow: 'auto',
            wordWrap: 'break-word',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            zIndex: 2,
            lineHeight: 1.2
          }}>
            <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><b><u>Range</u></b> <b>[{totalRange}]</b>hx</span>
                <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
              </div>
              <div>
                <b><u>Target</u></b> AoE <b>[{chainAoE}]</b>hx-Chain<br />
                {weapon === 'Arcane Railgun' ? (
                  <>
                    <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
                    Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
                    Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
                    <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
                    Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
                    Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
                    <div style={{ textAlign: 'right', width: '100%' }}><b><i>Blind</i></b></div>
                  </>
                ) : weapon === 'Space Vaporizer' ? (
                  <>
                    <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
                    Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
                    <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
                    Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Spike</i></b> <br />
                    <div style={{ textAlign: 'right', width: '100%' }}><b>(<u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
                    Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u>)</b></div>
                  </>
                ) : (
                  <>
                    <b><u>Damage</u></b> 1d<b>[{dieSize}]</b><br />
                    <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>, status effect
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Flavor Text */}
          <div style={{
            position: 'absolute',
            top: 330,
            bottom: 5,
            left: 10,
            right: 10,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontStyle: 'italic',
            fontSize: '0.70em',
            fontWeight: 400,
            zIndex: 3,
            textAlign: 'left'
          }}>
            {getCoderCarbineFlavorText(weapon)}
          </div>
        </div>
        );
      })}
    </>
  );
};

export default CardsGunslingerAttacks;
