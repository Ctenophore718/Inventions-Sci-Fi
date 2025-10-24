import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateElementalistPrimaryAttackStatsJSX } from '../utils/elementalistPrimaryAttack';

interface CardsElementalistAttacksProps {
  sheet: CharacterSheet | null;
  subclass: string;
}

function getShardFlavorText(shard: string): string {
  switch (shard) {
    case 'Bluster':
      return '“It’s the best way to get people to get the hell out of your way, in my opinion.” --Jezebel Aura, Diminutive Air Elementalist';
    case 'Bolt':
      return '“It’s really a matter of harnessing the energetics in the air itself. If you manipulate those particles just right, you get lightning!” --Usain, Air Elementalist';
    case 'Meteor':
      return '“I am the sky stone that rains fire and spells your doom. I am Meteor.” --Rene Firestone, Human Master Earth Elementalist';
    case 'Tremor':
      return 'You feel that? That’s the feeling of your ass about to get whooped.';
    case 'Fireball':
      return '“Sometimes the most basic, bread-and-butter shard is simply the best one to use in almost any circumstance.” --St. Ignatius, Lithe Fire Elementalist';
    case 'Lava Well':
      return 'The ground beneath the target area swells up and splits open, revealing a pool of lava gushing through and searing the poor saps standing there.';
    case 'Frostbite':
      return 'The spirit of the  frigid wastelands on the extremities of the Water Plane reside within this shard, which is capable of freezing solid everything in its wake.';
    case 'Vortex':
      return '“I’m gonna flush you down like a fat turd!” --Aquamantys, Mantid Water Elementalist';
    default:
      return 'Elemental shards materialize from pure xenomagical energy, shaped by the caster\'s will.';
  }
}

function getShardSubclass(shard: string): string {
  switch (shard) {
    case 'Bluster':
    case 'Bolt':
      return 'Air';
    case 'Meteor':
    case 'Tremor':
      return 'Earth';
    case 'Fireball':
    case 'Lava Well':
      return 'Fire';
    case 'Frostbite':
    case 'Vortex':
      return 'Water';
    default:
      return 'Elemental';
  }
}

function getSubclassColor(shard: string): string {
  const subclass = getShardSubclass(shard);
  switch (subclass) {
    case 'Air':
      return '#0ee2df';
    case 'Earth':
      return '#e2b90e';
    case 'Fire':
      return '#e20e0e';
    case 'Water':
      return '#0e42e2';
    default:
      return '#231172'; // Default Elementalist color
  }
}

export const CardsElementalistAttacks: React.FC<CardsElementalistAttacksProps> = ({ sheet, subclass }) => {
  const shards = sheet?.shards || [];
  
  if (shards.length === 0) {
    return null;
  }

  return (
    <>
      {/* Shard (Primary Attack) Cards */}
      {shards.map((shard: string, index: number) => {
        const subclassColor = getSubclassColor(shard);
        const shardSubclass = getShardSubclass(shard);
        
        return (
          <div key={`${shard}-${index}`} style={{ 
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
                {shard}
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
              }}>{shardSubclass} Shard</span>
            </div>

            {/* Card Image */}
            <img 
              src={`/${shard}.png`}
              alt={shard}
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
              {generateElementalistPrimaryAttackStatsJSX(sheet?.classCardDots, subclass, shard)}
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
              {getShardFlavorText(shard)}
            </div>
          </div>
        );
      })}
    </>
  );
};
