import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateCommanderPrimaryAttackStatsJSX } from '../utils/commanderPrimaryAttack';

interface CardsCommanderAttacksProps {
  sheet: CharacterSheet | null;
  subclass: string;
}

function getRifleFlavorText(rifle: string): string {
  switch (rifle) {
    case 'Plasma Rifle':
      return '“Slickin’ foes with the fourth state of matter since the Great Silence.” --Defteran saying';
    case 'Sapper Gun':
      return 'The Sapper has the unique ability to draw the life energy of its target and imbue the attacker with renewed constitution.';
    default:
      return 'A specialized rifle for primary attacks.';
  }
}

export const CardsCommanderAttacks: React.FC<CardsCommanderAttacksProps> = ({ sheet }) => {
  const rifles = sheet?.rifles || [];
  
  if (rifles.length === 0) {
    return null;
  }

  return (
    <>
      {rifles.map((rifle: string, index: number) => (
        <div key={`${rifle}-${index}`} style={{ 
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
              color: '#717211',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {rifle}
            </span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#717211',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Rifle</span>
          </div>
          
          {/* Card Image */}
          <img 
            src={rifle === 'Plasma Rifle' ? '/Plasma Rifle.png' : rifle === 'Sapper Gun' ? '/Sapper Gun.png' : '/Blank Card.png'}
            alt={rifle}
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
            alignItems: 'flex-start',
            zIndex: 2,
            lineHeight: 1.2
          }}>
            {generateCommanderPrimaryAttackStatsJSX(sheet?.classCardDots, rifle)}
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
            {getRifleFlavorText(rifle)}
          </div>
        </div>
      ))}
    </>
  );
};
