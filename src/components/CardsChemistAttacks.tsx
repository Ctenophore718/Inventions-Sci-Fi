import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateChemistPrimaryAttackStatsJSX, getDartGunCost } from '../utils/chemistPrimaryAttack';

interface CardsChemistAttacksProps {
  sheet: CharacterSheet | null;
}

export const CardsChemistAttacks: React.FC<CardsChemistAttacksProps> = ({ sheet }) => {
  const dartGuns = sheet?.dartGuns || [];
  
  if (dartGuns.length === 0) {
    return null;
  }

  return (
    <>
      {dartGuns.map((dartGun, index) => (
        <div key={`${dartGun}-${index}`} style={{ 
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
              color: '#721131',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {dartGun}
            </span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#721131',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Dart Gun</span>
          </div>
          
          {/* Card Image */}
          <img 
            src={dartGun === 'Chem Gun' ? '/Chem Gun.png' : dartGun === 'Happy Pill Pusher' ? '/Happy Pill Pusher.png' : dartGun === 'Prickly Goo' ? '/Prickly Goo.png' : dartGun === 'Sour Juicer' ? '/Sour Juicer.png' : '/Blank Card.png'}
            alt={dartGun}
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
          
          {/* Card Type and Price */}
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
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Primary Attack</span>
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
              Price <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{getDartGunCost(dartGun)}]</span>
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
            alignItems: 'flex-start',
            zIndex: 2,
            lineHeight: 1.2
          }}>
            {generateChemistPrimaryAttackStatsJSX(sheet?.classCardDots)}
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
            {getFlavorText(dartGun)}
          </div>
        </div>
      ))}
    </>
  );
};

function getFlavorText(dartGun: string): string {
  switch (dartGun) {
    case 'Chem Gun':
      return 'The standard dart gun for any Chemist worth her salt, this needle-pusher provides just the right amount of sting with a nasty side effect in tow.';
    case 'Happy Pill Pusher':
      return '“‘Them happy pills will cause the subject to laugh hysterically and jump off a cliff, smilin’ all the way down.” --Freylia Pharmsworth, Defteran Smuggler';
    case 'Sour Juicer':
      return '“Loaded with the puckery goodness of the Wahaha-crazy-sour-zyclon-x! If you get too much, you go depressed! Wahaha!” --Wahaha commercial';
    case 'Prickly Goo':
      return '“Der’s sum alien juice slathrin’ each razor-shot -- ain’t sumpin’ you wanna be messin’ wit.” --Guiseppe Vittriorino, Diminutive Poisoner';
    default:
      return 'A specialized dart gun for chemical delivery.';
  }
}