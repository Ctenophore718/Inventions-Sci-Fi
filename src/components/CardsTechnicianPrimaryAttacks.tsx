import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateStealthDroneCardStatsJSX } from '../utils/hackerPrimaryAttack';
import { generateJunkerDroneCardStatsJSX } from '../utils/junkerPrimaryAttack';
import { generateNanodroneSwarmCardStatsJSX } from '../utils/nanoboticistPrimaryAttack';
import { generateSiegeDroneCardStatsJSX } from '../utils/tankerPrimaryAttack';

interface CardsTechnicianPrimaryAttacksProps {
  sheet: CharacterSheet | null;
}

function getFlavorText(droneName: string): string {
  if (droneName === 'Blind Silence') {
    return 'The hollow within its torso contains a strong electrical current that, when deployed, shocks everyone nearby into temporary blindness.';
  }
  if (droneName === 'Will-o\'-the-Wisp') {
    return '"It glows with an unearthly aura of moonlight and flame, and it gives a ghostly shriek--all a nasty ploy to scare locals to death." --Figgurus Outz, DAGR';
  }
  if (droneName === 'Big Hugs Gas Can') {
    return '"Big Hugs is my very favoritist toy in the whole world! Just make sure you don\'t squeeze him too tight, okay?" --Tots Tizzy, Diminutive Junker';
  }
  if (droneName === 'Shrapnel-Matic 500') {
    return 'A standard design in the junker community, the Shrapnel-Matic 500 does its job best when its target is easily shredible.';
  }
  if (droneName === 'Smash Hands XBot') {
    return '"Hey! Ya need a bunch of bricks? Well find ya self a wall and I\'ll sic ol\' Smash Hands on it for ya! Only cost ya \'bout tree-fiddy." --Grooks, Petran Junker';
  }
  if (droneName === 'Blockwave') {
    return 'These drones intuitively stack together and are capable of protecting their Technician due to their natural durability.';
  }
  if (droneName === 'Mech-Arachnids') {
    return '"What\'s worse than a swarm of spiders, you ask? A swarm of mecha-spiders, dammit!" --Kelvin Spurry, Mustelid Secessionist';
  }
  if (droneName === 'Toxic Cloudbot') {
    return '"I saw the green cloud moving as if it had a life of its own. It wasn\'t until later that I realized it was given artificial life through its Nanoboticist." --Anonymous';
  }
  if (droneName === 'Chewy Tank') {
    return '"This tank will slurp up the ground and chew it up \'til it\'s unrecognizable… Grrr, now I\'m hungry…" --George \'da Tanker, Massive Human';
  }
  if (droneName === 'Goblin Kisses') {
    return '"Bleefin\' bloobin\' blorfin\' bang! \'Tis the words my mother sang!" --Goblin Kisses';
  }
  return '"Flavor text."';
}

export const CardsTechnicianPrimaryAttacks: React.FC<CardsTechnicianPrimaryAttacksProps> = ({ sheet }) => {
  const stealthDrones = sheet?.stealthDrones || [];
  const junkerDrones = sheet?.junkerDrones || [];
  const nanodroneSwarms = sheet?.nanodroneSwarms || [];
  const siegeDrones = sheet?.siegeDrones || [];
  
  return (
    <>
      {/* Stealth Drones (Hacker subclass) */}
      {stealthDrones.map((droneName, index) => (
        <div
          key={`${droneName}-${index}`}
          style={{
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
          }}
        >
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
              color: '#5c57b8',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {droneName}
            </span>
            {/* Stealth Drone Subheader */}
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              lineHeight: 1,
              color: '#5c57b8',
              whiteSpace: 'pre-line',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>
              {'Stealth\nDrone'}
            </span>
          </div>

          {/* Card Image */}
          <img
            src={`/${droneName}.png`}
            alt={droneName}
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
            <span style={{ 
              color: '#990000', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              fontWeight: 'bold', 
              fontSize: '1.1em', 
              textAlign: 'left' 
            }}>
              Primary Attack
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
            {generateStealthDroneCardStatsJSX(sheet, droneName)}
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
            {getFlavorText(droneName)}
          </div>
        </div>
      ))}

      {/* Junker Drones (Junker subclass) */}
      {junkerDrones.map((droneName: string, index: number) => (
        <div
          key={`${droneName}-${index}`}
          style={{
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
          }}
        >
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
              color: '#6db857',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {droneName}
            </span>
            {/* Junker Drone Subheader */}
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              lineHeight: 1,
              color: '#6db857',
              whiteSpace: 'pre-line',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>
              {'Junker\nDrone'}
            </span>
          </div>

          {/* Card Image */}
          <img
            src={`/${droneName}.png`}
            alt={droneName}
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
            <span style={{ 
              color: '#990000', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              fontWeight: 'bold', 
              fontSize: '1.1em', 
              textAlign: 'left' 
            }}>
              Primary Attack
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
            {generateJunkerDroneCardStatsJSX(sheet, droneName)}
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
            {getFlavorText(droneName)}
          </div>
        </div>
      ))}

      {/* Nanodrone Swarms (Nanoboticist subclass) */}
      {nanodroneSwarms.map((swarmName: string, index: number) => (
        <div
          key={`${swarmName}-${index}`}
          style={{
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
          }}
        >
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
              color: '#57b8b0',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {swarmName}
            </span>
            {/* Nanodrone Swarm Subheader */}
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              lineHeight: 1,
              color: '#57b8b0',
              whiteSpace: 'pre-line',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>
              {'Nanodrone\nSwarm'}
            </span>
          </div>

          {/* Card Image */}
          <img
            src={`/${swarmName}.png`}
            alt={swarmName}
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
            <span style={{ 
              color: '#990000', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              fontWeight: 'bold', 
              fontSize: '1.1em', 
              textAlign: 'left' 
            }}>
              Primary Attack
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
            {generateNanodroneSwarmCardStatsJSX(sheet, swarmName)}
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
            {getFlavorText(swarmName)}
          </div>
        </div>
      ))}

      {/* Siege Drones (Tanker subclass) */}
      {siegeDrones.map((droneName: string, index: number) => (
        <div
          key={`${droneName}-${index}`}
          style={{
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
          }}
        >
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
              color: '#b8578b',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {droneName}
            </span>
            {/* Siege Drone Subheader */}
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              lineHeight: 1,
              color: '#b8578b',
              whiteSpace: 'pre-line',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>
              {'Siege\nDrone'}
            </span>
          </div>

          {/* Card Image */}
          <img
            src={`/${droneName}.png`}
            alt={droneName}
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
            <span style={{ 
              color: '#990000', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              fontWeight: 'bold', 
              fontSize: '1.1em', 
              textAlign: 'left' 
            }}>
              Primary Attack
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
            {generateSiegeDroneCardStatsJSX(sheet, droneName)}
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
            {getFlavorText(droneName)}
          </div>
        </div>
      ))}
    </>
  );
};
