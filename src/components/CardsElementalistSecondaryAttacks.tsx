import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateElementalistSecondaryAttackStatsJSX } from '../utils/elementalistSecondaryAttack';
import { calculateElementalistSecondaryAttackData } from '../utils/elementalistSecondaryAttack';

export interface CardsElementalistSecondaryAttacksProps {
  sheet: CharacterSheet | null;
}

export const CardsElementalistSecondaryAttacks: React.FC<CardsElementalistSecondaryAttacksProps> = ({ sheet }) => {
  const elementals = sheet?.elementals || [];
  
  // Helper function to get elemental subclass
  const getElementalSubclass = (elemental: string): string => {
    switch (elemental) {
      case 'Cloud Elemental':
      case 'Thunderbird':
        return 'Air';
      case 'Sandstorm':
        return 'Air+Earth';
      case 'Stone Golem':
        return 'Earth';
      case 'Magmoid':
        return 'Earth+Fire';
      case 'Sludge Brute':
        return 'Earth+Water';
      case 'Fire Dragon':
      case 'Firefox':
      case 'Phoenix':
      case 'Salamander':
        return 'Fire';
      case 'Ice Golem':
      case 'Water Horse':
      case 'Water Panda':
      case 'Wave Elemental':
        return 'Water';
      default:
        return 'Elemental';
    }
  };

  // Helper function to get header color (for card name)
  const getHeaderColor = (elemental: string): string => {
    const subclass = getElementalSubclass(elemental);
    if (subclass.includes('+')) {
      return '#231172'; // Dual subclass purple
    }
    switch (subclass) {
      case 'Air': return '#0ee2df';
      case 'Earth': return '#e2b90e';
      case 'Fire': return '#e20e0e';
      case 'Water': return '#0e42e2';
      default: return '#990000';
    }
  };

  // Helper function to get individual subclass color for multi-subclass labels
  const getIndividualSubclassColor = (subclass: string): string => {
    switch (subclass) {
      case 'Air': return '#0ee2df';
      case 'Earth': return '#e2b90e';
      case 'Fire': return '#e20e0e';
      case 'Water': return '#0e42e2';
      default: return '#231172';
    }
  };

  // Helper function to get flavor text
  const getElementalFlavorText = (elemental: string): string => {
    switch (elemental) {
      case 'Cloud Elemental':
        return '“It’s said the cloud elemental can shapeshift into anything it wants; you often can’t tell what’s real and what’s illusion.” --Zoras, Airgraft Technician';
      case 'Thunderbird':
        return '“Out on the desert plains, you can sometimes catch a glimpse of it soaring through the night sky… the bringer of storms.” --Uusenn, Erimos Tribal Elder';
      case 'Sandstorm':
        return '“I swear, I saw the sand and wind conspire to swallow us whole. I could see the intention in its eyes.” --Ibn al Shams, Ariha Desert Dweller';
      case 'Stone Golem':
        return 'When a giant pile of rocks magically forms together and starts lumbering toward you… run!';
      case 'Magmoid':
        return '“It’s as if the destructive energy of a volcano came to life… and it engulfed the entire area in lava. Truly magnificent!” --Rendus, Fire Elementalist';
      case 'Sludge Brute':
        return 'These rare and poisonous creatures are found when Xenomagic elements of Earth and Water merge within the depths of a swamp.';
      case 'Fire Dragon':
        return '“You end up fleeing for your life in its presence… he will pierce my enemies with fire.” --Lunabelle Wondermorre, Fire Elementalist';
      case 'Firefox':
        return '“You might not know what will happen when you’re in its presence… it conceals its flame, then sets you ablaze. You’re not ready for its awesomeness!” -- Lunabelle Wondermorre';
      case 'Phoenix':
        return '“The most magnificent creature ever to grace our world -- the Phoenix is practically a God of the Fire Realm.” --Burnafyt Ashwyn, Fire Priestess of Blaze';
      case 'Salamander':
        return 'This fabled creature is said to be born within and of lava. The lizard practically exudes the head of the magma it is made of, and it will melt your skin off.';
      case 'Ice Golem':
        return '“It’s merely a water golem infused with ice magic. Nothing to be concerned about.” --Friggia Snowbound, Lumenaren Water Elementalist';
      case 'Water Horse':
        return '“You can never see it coming but it is out to get you… the elusive water horse hides within all waters.” --Morgan Wonderwood, Water Elementalist';
      case 'Water Panda':
        return '“It’s what you have never dreamed of and better than you think… the beautiful water panda is coming to get you!” --Morgan Wonderwood, Water Elementalist';
      case 'Wave Elemental':
        return '“I swear the swell of the wave just reached up and hit people on the beach dozens of feet away! It was like the ocean was alive…” --Anonymous';
      default:
        return 'An elemental being of immense power.';
    }
  };

  return (
    <>
      {elementals.map((elemental: string, index: number) => {
        const headerColor = getHeaderColor(elemental);
        const subclassLabel = getElementalSubclass(elemental);
        const isMultiSubclass = subclassLabel.includes('+');
        
        return (
          <div key={`${elemental}-${index}`} style={{ 
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
                {elemental}
              </span>
              {/* Elemental Subheader */}
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
                textAlign: 'right'
              }}>
                {isMultiSubclass ? (
                  <>
                    {subclassLabel.split('+').map((subclass, i) => (
                      <React.Fragment key={i}>
                        <span style={{ color: getIndividualSubclassColor(subclass) }}>{subclass}</span>
                        {i < subclassLabel.split('+').length - 1 && <span style={{ color: '#231172' }}> / </span>}
                      </React.Fragment>
                    ))}
                    {'\n'}
                    <span style={{ color: '#231172' }}>Elemental</span>
                  </>
                ) : (
                  <span style={{ color: headerColor }}>
                    {subclassLabel}{'\n'}Elemental
                  </span>
                )}
              </span>
            </div>

            {/* Card Image */}
            <img 
              src={`/${elemental}.png`}
              alt={elemental}
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
                Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{calculateElementalistSecondaryAttackData(sheet?.classCardDots).cooldown}]</span>
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
              {generateElementalistSecondaryAttackStatsJSX(sheet?.classCardDots, undefined, elemental)}
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
                fontSize: elemental === 'Firefox' ? '0.62em' : elemental === 'Water Panda' ? '0.68em' : '0.70em',
                fontWeight: 400,
                zIndex: 3,
                textAlign: 'left',
              }}
            >
              {getElementalFlavorText(elemental)}
            </div>
          </div>
        );
      })}
    </>
  );
};
