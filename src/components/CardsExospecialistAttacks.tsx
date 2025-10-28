import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateExospecialistPrimaryAttackStatsJSX } from '../utils/exospecialistPrimaryAttack';
import { generateExospecialistSecondaryAttackStatsJSX, calculateExospecialistSecondaryAttackData } from '../utils/exospecialistSecondaryAttack';

interface CardsExospecialistAttacksProps {
  sheet: CharacterSheet | null;
  subclass: string;
}

function getIntegratedBlasterFlavorText(blaster: string): string {
  switch (blaster) {
    case 'Boomstick':
      return '“A classic built-in custom shotgun that no Exospec worth their salt would go without!” --Greaves McDirt, Mustelid Brawler';
    case 'Firestarter':
      return '“I mean… it’s a flamethrower. You ever hear of a flamethrower before?” --RaShell Q, Secessionist Exospec';
    case 'Sleepytime':
      return 'Caustic vapor spills out of this embedded weapon, eating away at the insides of its targets and causing them to go unconscious.';
    default:
      return 'Integrated blasters represent the pinnacle of Exospecialist weaponry, seamlessly bonded to the user\'s exoframe.';
  }
}

function getSmartMissileFlavorText(missile: string): string {
  switch (missile) {
    case 'Neutron Torpedo':
      return 'A near-invisible projectile finds its mark, suddenly bursting into a tiny mushroom cloud, engulfing all in its radioactive emissions.';
    case 'Pulsar Cannon':
      return '“The missiles come screaming in, strobing like mad. Damned if you know whether you’re in a war or a nightclub!” --Ecks, X-Ray Dreadnaught';
    case 'Razor Rain':
      return 'A cluster bomb of razors explodes shortly before hitting the ground, slicing up the entire area and pinning targets in place.';
    default:
      return 'Smart missiles combine advanced targeting systems with devastating payloads, perfect for Exospecialists who prefer precision over luck.';
  }
}

const exospecialistColor = '#117233';

export const CardsExospecialistAttacks: React.FC<CardsExospecialistAttacksProps> = ({ sheet, subclass }) => {
  const integratedBlasters = sheet?.integratedBlasters || [];
  const smartMissiles = sheet?.smartMissiles || [];
  
  if (integratedBlasters.length === 0 && smartMissiles.length === 0) {
    return null;
  }

  return (
    <>
      {/* Integrated Blaster (Primary Attack) Cards */}
      {integratedBlasters.map((blaster: string, index: number) => {
        return (
          <div key={`blaster-${blaster}-${index}`} style={{ 
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
                color: exospecialistColor,
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 120px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {blaster}
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: exospecialistColor,
                lineHeight: 1.1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '105px',
                display: 'inline-block',
                textAlign: 'right'
              }}>
                Integrated<br />Blaster
              </span>
            </div>

            {/* Card Image */}
            <img 
              src={`/${blaster}.png`}
              alt={blaster}
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
              {generateExospecialistPrimaryAttackStatsJSX(sheet?.classCardDots, subclass, blaster)}
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
              {getIntegratedBlasterFlavorText(blaster)}
            </div>
          </div>
        );
      })}

      {/* Smart Missile (Secondary Attack) Cards */}
      {smartMissiles.map((missile: string, index: number) => {
        const { cooldown } = calculateExospecialistSecondaryAttackData(sheet?.classCardDots);
        
        return (
          <div key={`missile-${missile}-${index}`} style={{ 
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
                color: exospecialistColor,
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 100px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {missile}
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: exospecialistColor,
                lineHeight: 1.1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '85px',
                display: 'inline-block',
                textAlign: 'right'
              }}>
                Smart<br />Missiles
              </span>
            </div>

            {/* Card Image */}
            <img 
              src={`/${missile}.png`}
              alt={missile}
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
              <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>
                Secondary Attack (Cooldown [{cooldown}])
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
              {generateExospecialistSecondaryAttackStatsJSX(sheet?.classCardDots, subclass, missile)}
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
              {getSmartMissileFlavorText(missile)}
            </div>
          </div>
        );
      })}
    </>
  );
};
