import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateContemplativePrimaryAttackStatsJSX } from '../utils/contemplativePrimaryAttack';
import { generateContemplativeSecondaryAttackStatsJSX, calculateContemplativeSecondaryAttackData } from '../utils/contemplativeSecondaryAttack';

interface CardsContemplativeAttacksProps {
  sheet: CharacterSheet | null;
  subclass: string;
}

function getFocusFlavorText(focus: string): string {
  switch (focus) {
    case 'Ensnaring Hand Wraps':
      return 'Oikomagically infused linen lashes out at the target at the wielder\'s command, enveloping and dragging foes closer to their doom.';
    case 'Mala of Mind Darts':
      return 'How \'bout the power to kill a yak from 200 yards away... with mind bullets? That\'s telekinesis, Kyle.';
    case 'Singing Bowl':
      return 'The singing bowl is often used in meditation sessions. And if it is used against weak minded opponents, it can often put them to sleep.';
    case 'Telekinetic Knuckles':
      return 'Careful... I can throw a punch much farther than you\'d expect." --Arno Stonefast, Petran Kinetic';
    case 'Viperfang Ring':
      return 'Cast by the monks of the Serpentine Monastery, the Viperfang Ring saps victims of their health when wielded by a competent Contemplative.';
    default:
      return 'A focused implement for primary attacks.';
  }
}

function getDisciplineFlavorText(discipline: string): React.ReactNode {
  switch (discipline) {
    case 'Empty Mudra':
      return 'This complicated mudra represents empty space, and it naturally drains its target of its life force, filling the void within the Kinetic applying it.';
    case 'Mudra of Brilliance':
      return 'With an oikomagically infused outbreath followed by a slap of the palms and delicately laced fingers, the Contemplative\'s opponent is often blinded.';
    case 'Way of Quicksilver':
      return <span style={{ fontSize: '0.94em' }}>Disciples of the Way of Quicksilver wield the renowned Mercury Blade which can instantly reshape mid-combat to whatever instrument of death the Mercurial desires.</span>;
    case 'Way of Sublimation':
      return '"The Sublime Discipline is a study of the fusion of opposites, both in physical and experiential matters." --Wrev, X-Ray Mercurial';
    case 'Asana of Heaviness':
      return '“Your whole body will feel the weight of the world until you simply will not be able to take it anymore and give up entirely.” --Ako, Human Inertial';
    case 'Passive Asana':
      return '“A momentary satori causes even the most brutish foe to understand one simple thing: hurting another hurts oneself.” --K’bet Galpo, Human Contemplative ';
    case 'Bane Prana':
      return '“The energetics of my dance is the mirror image of your waning strength and life.” --Yorjea Frellix, Lumenaren Vectorial';
    case 'Night Prana':
      return '“The energy of nightmares will invade your entire being, causing you to stumble along blindly in a mind-induced darkness.” --Sliver, Nocturne Vectorial';
    default:
      return 'A specialized discipline for secondary attacks.';
  }
}

function getFocusSubclass(_focus: string): string {
  // All focuses work for any subclass
  return 'Focus';
}

function getDisciplineSubclass(discipline: string): string {
  switch (discipline) {
    case 'Empty Mudra':
    case 'Mudra of Brilliance':
      return 'Kinetic Discipline';
    case 'Way of Quicksilver':
    case 'Way of Sublimation':
      return 'Mercurial Discipline';
    case 'Asana of Heaviness':
    case 'Passive Asana':
      return 'Inertial Discipline';
    case 'Bane Prana':
    case 'Night Prana':
      return 'Vectorial Discipline';
    default:
      return 'Discipline';
  }
}

export const CardsContemplativeAttacks: React.FC<CardsContemplativeAttacksProps> = ({ sheet }) => {
  const focuses = sheet?.focuses || [];
  const disciplines = sheet?.disciplines || [];
  
  if (focuses.length === 0 && disciplines.length === 0) {
    return null;
  }

  return (
    <>
      {/* Focus (Primary Attack) Cards */}
      {focuses.map((focus: string, index: number) => {
        return (
          <div key={`${focus}-${index}`} style={{ 
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
                color: '#116372',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {focus}
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: '#116372',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>{getFocusSubclass(focus)}</span>
            </div>

            {/* Card Image */}
            <img 
              src={`/${focus}.png`}
              alt={focus}
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
              {generateContemplativePrimaryAttackStatsJSX(sheet?.classCardDots, undefined, focus, sheet)}
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
              {getFocusFlavorText(focus)}
            </div>
          </div>
        );
      })}

      {/* Discipline (Secondary Attack) Cards */}
      {disciplines.map((discipline: string, index: number) => {
        const { cooldownValue } = calculateContemplativeSecondaryAttackData(sheet?.classCardDots);
        
        // Determine subclass color based on discipline
        let subclassColor = '#116372'; // Default Contemplative color
        const disciplineType = getDisciplineSubclass(discipline);
        if (disciplineType.includes('Kinetic')) subclassColor = '#7b941c';
        else if (disciplineType.includes('Mercurial')) subclassColor = '#941c6c';
        else if (disciplineType.includes('Inertial')) subclassColor = '#1c945e';
        else if (disciplineType.includes('Vectorial')) subclassColor = '#531c94';
        
        return (
          <div key={`${discipline}-${index}`} style={{ 
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
                {discipline}
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
              }}>{disciplineType}</span>
            </div>

            {/* Card Image */}
            <img 
              src={`/${discipline}.png`}
              alt={discipline}
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
            
            {/* Card Type and Cooldown */}
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
              <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '0.875em', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>Cooldown</span> <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{cooldownValue}]</span>
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
              {generateContemplativeSecondaryAttackStatsJSX(sheet?.classCardDots, undefined, discipline, sheet)}
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
              {getDisciplineFlavorText(discipline)}
            </div>
          </div>
        );
      })}
    </>
  );
};
