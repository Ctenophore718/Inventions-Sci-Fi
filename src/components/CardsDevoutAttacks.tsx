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
      return '“A good mouth washing is often what is called for when curses keep wantonly spilling out.” --Kathar, Felid Astral Devout';
    case 'Enlighten':
      return '“The light of my lord will either make you a true believer or one who may never see the truth again.” --Darrien Skye, Lithe Human Astral Devout';
    case 'Comply':
      return '“A good Order Devout often commands their enemies before they realize what the hell’s happened.” --Defteran saying';
    case 'Detain':
      return '“‘Tis less a matter of forcing against one’s will and more a matter of negating will entirely.” --Regulus Antioch, Android Order Devout ';
    case 'Rampage':
      return '“The primal wrath that dwells within every soul can be teased up to the surface with just a single word.” --Kren, Ursid Chaos Devout';
    case 'Terrify':
      return 'Spoken in the Xenovox dialect originating from Kako, this word invades the target’s mind, conjuring cacophonous screams within.';
    case 'Erase':
      return '“One word of erasure dissolves both mind and body until nothing but the fleeting memory of excruciating pain remains.” --Remnus, Android Void Devout';
    case 'Exhaust':
      return '“The Void is the ultimate well into which goes everything, including your very desire for life.” --Serres, Chloroptid Void Devout';
    default:
      return 'A divine incantation channeled through faith and sacrifice.';
  }
}

function getRelicFlavorText(relic: string): string {
  switch (relic) {
    case "Aktinovo's Lantern":
      return '“The light of my lantern guides the faithful and burns away all falsities and wickedness from the world.” --Aktinovo, the Illuminator';
    case "Agathe's Halo":
      return '“All the children of the darkened world will know peace and light in the end.” --Agathe, Goddess of Benevolence';
    case "Entropos' Maw":
      return '“Everyone’s civil until hunger truly sets in.” --Entropos, the Devourer';
    case "Kako's Bloodshot Eye":
      return '“Anyone who looks upon my eye will see that it all truly is a mess, a beautiful, glorious mess.” --Kako, King of Chaos';
    case "Storvald's Rimehold Hand":
      return '“My grip is all-consuming, squeezing the life out of any warmth, sealing it in a frigid tomb.” --Storvald, the Rime Titan';
    case 'Scepter of Ethos':
      return '“Order must provide for all in fairness, else a brutish few intervene and create Chaos for all.” --Ethos, Adjudicator of Principles';
    case "Fylakas' Censor":
      return '“A burning at the stake is much more effective as a warning to others when the stake is no longer necessary.” --Fylakas, World Warden';
    case "Kenos' Scythe":
      return '“What is sewn in life is always reaped in death. For the Void is the true home of all that was, is, and ever will be.” --Kenos, the Nothing That Is';
    case 'Orb of Mitra':
      return '“I am the beginning. I am the end. I am the Great Womb, the Receiver of All Things.” --Mitra, the Great Womb';
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
    case "Aktinovo's Lantern":
    case "Agathe's Halo":
      return 'Astral Relic';
    case "Entropos' Maw":
    case "Kako's Bloodshot Eye":
    case "Storvald's Rimehold Hand":
      return 'Chaos Relic';
    case 'Scepter of Ethos':
    case "Fylakas' Censor":
      return 'Order Relic';
    case "Kenos' Scythe":
    case 'Orb of Mitra':
      return 'Void Relic';
    default:
      return 'Relic';
  }
}

function getSubclassColor(incantationOrRelic: string): string {
  // Prefer Relic subclass if it matches, otherwise fallback to Incantation subclass
  const relicSubclass = getRelicSubclass(incantationOrRelic);
  if (relicSubclass && relicSubclass !== 'Relic') {
    if (relicSubclass.includes('Astral')) return '#5bb1af';
    if (relicSubclass.includes('Order')) return '#aeb15b';
    if (relicSubclass.includes('Chaos')) return '#b15b6c';
    if (relicSubclass.includes('Void')) return '#5b73b1';
  }
  const incantationSubclass = getIncantationSubclass(incantationOrRelic);
  if (incantationSubclass && incantationSubclass !== 'Incantation') {
    if (incantationSubclass.includes('Astral')) return '#5bb1af';
    if (incantationSubclass.includes('Order')) return '#aeb15b';
    if (incantationSubclass.includes('Chaos')) return '#b15b6c';
    if (incantationSubclass.includes('Void')) return '#5b73b1';
  }
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
                fontSize: relic === "Storvald's Rimehold Hand" ? 'clamp(0.72em, 3.6vw, 1.1em)' : 'clamp(0.8em, 4vw, 1.25em)',
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
              {/* Relic Subheader: two lines, e.g. Astral [newline] Relic */}
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: subclassColor,
                lineHeight: 1,
                whiteSpace: 'pre-line',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>
                {(() => {
                  const subclass = getRelicSubclass(relic);
                  if (subclass.endsWith('Relic') && subclass !== 'Relic') {
                    // Split e.g. 'Astral Relic' -> 'Astral' + newline + 'Relic'
                    const [type, label] = subclass.split(' ');
                    return `${type}\n${label}`;
                  }
                  return subclass;
                })()}
              </span>
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
              {generateDevoutSecondaryAttackStatsJSX(sheet?.classCardDots, undefined, relic, sheet, '0.875em')}
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
