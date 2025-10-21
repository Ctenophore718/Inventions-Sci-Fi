import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateDevoutPrimaryAttackStatsJSX } from '../utils/devoutPrimaryAttack';
import { generateDevoutSecondaryAttackStatsJSX } from '../utils/devoutSecondaryAttack';

interface CardsDevoutAttacksProps {
  sheet: CharacterSheet | null;
  subclass: string;
}

function getIncantationFlavorText(incantation: string): string {
  switch (incantation) {
    case 'Cleanse':
      return '"By the light of the astral plane, I purge the darkness from within and without." --Seraph Lightbringer, Defteran Astral Devout';
    case 'Enlighten':
      return '"True enlightenment comes not from within, but from channeling the infinite wisdom of the astral realm to guide your allies." --Celeste Morningstar, Human Astral Devout';
    case 'Comply':
      return '"Order must be maintained. Your will is no longer your own—submit to the greater design." --Magistrate Ironheart, Petran Order Devout';
    case 'Detain':
      return '"The chains of order are not physical, but they bind more thoroughly than any iron ever could." --Warden Steelgrasp, Apocritan Order Devout';
    case 'Rampage':
      return '"Let chaos flow through you! Feel the madness, embrace the fury, and unleash it upon your foes!" --Havoc Bloodrage, X-Ray Chaos Devout';
    case 'Terrify':
      return '"Fear is the truest form of chaos. When the mind breaks, all order crumbles." --Dread Whisper, Nocturne Chaos Devout';
    case 'Erase':
      return '"The void consumes all things. Your memory, your presence, your very existence—all shall be erased." --Nullmind, Lumenaren Void Devout';
    case 'Exhaust':
      return '"The void drains not just your body, but your will to continue. Soon, you will have nothing left." --Entropy, Felid Void Devout';
    default:
      return 'A divine incantation channeled through faith and sacrifice.';
  }
}

function getRelicFlavorText(relic: string): string {
  switch (relic) {
    case 'Astral Prism':
      return '"The prism focuses astral light into a devastating beam that shatters the material world." --Lumina Starshard, Lumenaren Astral Devout';
    case 'Chaos Orb':
      return '"Contained within this orb is pure, unrefined chaos. Release it at your peril—or your enemy\'s." --Vex Mayhem, Human Chaos Devout';
    case 'Order Seal':
      return '"This seal bears the mark of absolute law. Those who oppose order will face its judgment." --Justicar Sterling, Defteran Order Devout';
    case 'Void Crystal':
      return '"Peer into the crystal and see the void staring back. Feel it draw everything into its endless hunger." --Abyssal, Nocturne Void Devout';
    default:
      return 'A sacred relic channeling divine power.';
  }
}

function getIncantationSubclass(incantation: string): string {
  switch (incantation) {
    case 'Cleanse':
    case 'Enlighten':
      return 'Astral Incantation';
    case 'Comply':
    case 'Detain':
      return 'Order Incantation';
    case 'Rampage':
    case 'Terrify':
      return 'Chaos Incantation';
    case 'Erase':
    case 'Exhaust':
      return 'Void Incantation';
    default:
      return 'Incantation';
  }
}

function getRelicSubclass(relic: string): string {
  switch (relic) {
    case 'Astral Prism':
      return 'Astral Relic';
    case 'Chaos Orb':
      return 'Chaos Relic';
    case 'Order Seal':
      return 'Order Relic';
    case 'Void Crystal':
      return 'Void Relic';
    default:
      return 'Relic';
  }
}

function getSubclassColor(incantationOrRelic: string): string {
  const subclassType = getIncantationSubclass(incantationOrRelic) || getRelicSubclass(incantationOrRelic);
  if (subclassType.includes('Astral')) return '#516fff';
  if (subclassType.includes('Order')) return '#ffe700';
  if (subclassType.includes('Chaos')) return '#a929ff';
  if (subclassType.includes('Void')) return '#3ebbff';
  return '#6b1172'; // Default Devout color
}

export const CardsDevoutAttacks: React.FC<CardsDevoutAttacksProps> = ({ sheet }) => {
  const incantations = sheet?.incantations || [];
  const relics = sheet?.relics || [];
  
  if (incantations.length === 0 && relics.length === 0) {
    return null;
  }

  return (
    <>
      {/* Incantation (Primary Attack) Cards */}
      {incantations.map((incantation: string, index: number) => {
        const subclassColor = getSubclassColor(incantation);
        
        return (
          <div key={`${incantation}-${index}`} style={{ 
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
                {incantation}
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
              }}>{getIncantationSubclass(incantation)}</span>
            </div>

            {/* Card Image */}
            <img 
              src={`/${incantation}.png`}
              alt={incantation}
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
              {generateDevoutPrimaryAttackStatsJSX(sheet?.classCardDots, undefined, incantation, sheet)}
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
              {getIncantationFlavorText(incantation)}
            </div>
          </div>
        );
      })}

      {/* Relic (Secondary Attack) Cards */}
      {relics.map((relic: string, index: number) => {
        const subclassColor = getSubclassColor(relic);
        
        return (
          <div key={`${relic}-${index}`} style={{ 
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
                {relic}
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
              }}>{getRelicSubclass(relic)}</span>
            </div>

            {/* Card Image */}
            <img 
              src={`/${relic}.png`}
              alt={relic}
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
                Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((sheet?.classCardDots?.[9] || []).filter(Boolean).length)}]</span>
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              zIndex: 2,
              lineHeight: 1.2
            }}>
              {generateDevoutSecondaryAttackStatsJSX(sheet?.classCardDots, undefined, relic)}
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
              {getRelicFlavorText(relic)}
            </div>
          </div>
        );
      })}
    </>
  );
};
