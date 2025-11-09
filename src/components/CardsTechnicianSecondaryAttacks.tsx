import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateTechnicianSecondaryAttackStatsJSX } from '../utils/technicianSecondaryAttack';
import { calculateTechnicianSecondaryAttackData } from '../utils/technicianSecondaryAttack';

export interface CardsTechnicianSecondaryAttacksProps {
  sheet: CharacterSheet | null;
}

export const CardsTechnicianSecondaryAttacks: React.FC<CardsTechnicianSecondaryAttacksProps> = ({ sheet }) => {
  const techPulses = sheet?.techPulses || [];
  
  // Helper function to get Tech Pulse subclass
  const getTechPulseSubclass = (techPulse: string): string => {
    switch (techPulse) {
      case 'Cloaker Bubble':
        return 'Hacker';
      case 'Shrap Happy':
        return 'Junker';
      case 'Swarm Surge':
        return 'Nanoboticist';
      case 'Rubblemaker':
        return 'Tanker';
      default:
        return 'Technician';
    }
  };

  // Helper function to get header color (for card name) based on subclass
  const getHeaderColor = (techPulse: string): string => {
    const subclass = getTechPulseSubclass(techPulse);
    switch (subclass) {
      case 'Hacker': return '#5c57b8';
      case 'Junker': return '#6db857';
      case 'Nanoboticist': return '#57b8b0';
      case 'Tanker': return '#b8578b';
      default: return '#724811';
    }
  };

  // Helper function to get flavor text
  const getTechPulseFlavorText = (techPulse: string): string => {
    switch (techPulse) {
      case 'Cloaker Bubble':
        return '"I could go into detail about the quantum mirror arrays involved, but really it just makes all your friends invisible." --Jeddison, Human Hacker';
      case 'Shrap Happy':
        return '"I mean, it\'s like a big shrapnel grenade that I can just pull the pin on and target only the baddies. What\'s not to like about it?" Breev, Mustelid Junker';
      case 'Swarm Surge':
        return 'Waves of nanobot swarms emit from this tech pulse, causing enemies to be pushed and pulled around the battlefield against their will.';
      case 'Rubblemaker':
        return 'This contraption simply embeds itself in the ground and emits an extremely low frequency sound wave that makes a mess out of the ground in the area.';
      default:
        return 'Flavor text.';
    }
  };

  return (
    <>
      {techPulses.map((techPulse: string, index: number) => {
        const headerColor = getHeaderColor(techPulse);
        const subclassLabel = getTechPulseSubclass(techPulse);
        
        return (
          <div key={`${techPulse}-${index}`} style={{ 
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
                fontSize: 'clamp(0.75em, 3.8vw, 1.15em)',
                color: headerColor,
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {techPulse}
              </span>
              {/* Tech Pulse Subheader */}
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                lineHeight: 1,
                whiteSpace: 'pre-line',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right',
                color: headerColor
              }}>
                {subclassLabel}{'\n'}Tech Pulse
              </span>
            </div>

            {/* Card Image */}
            <img 
              src={`/${techPulse}.png`}
              alt={techPulse}
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
            
            {/* Card Type with Cooldown */}
            <div style={{
              position: 'absolute',
              top: 'calc(50% - 15px)',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              zIndex: 3
            }}>
              <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Secondary Attack</span>
              <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 180px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{calculateTechnicianSecondaryAttackData(sheet?.classCardDots).cooldown}]</span>
              </span>
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
              zIndex: 2,
              lineHeight: 1.2
            }}>
              {generateTechnicianSecondaryAttackStatsJSX(sheet?.classCardDots, undefined, techPulse)}
            </div>
            
            {/* Flavor Text */}
            <div
              style={{
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
                textAlign: 'left',
              }}
            >
              {getTechPulseFlavorText(techPulse)}
            </div>
          </div>
        );
      })}
    </>
  );
};
