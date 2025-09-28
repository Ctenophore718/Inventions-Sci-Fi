import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateCoderPrimaryAttackStatsJSX, getLensCost } from '../utils/coderPrimaryAttack';
import { generateCoderSecondaryAttackStatsJSX, getAlgorithmCost } from '../utils/coderSecondaryAttack';

interface CardsCoderAttacksProps {
  sheet: CharacterSheet | null;
}

function getLensFlavorText(lens: string): string {
  switch (lens) {
    case 'Hodge Podge':
      return 'A favorite of Technologist Coders, the Hodge Podge zaps its targets with Oikomagically charged beams of mathematical light.';
    case 'Time Stutter':
      return '"It ain\'t quite capable of stopping time, just making it trip over itself for a bit." --Garryk Spacebane, Human Coder';
    default:
      return 'A specialized lens for mathematical light manipulation.';
  }
}

function getAlgorithmFlavorText(algorithm: string): string {
  switch (algorithm) {
    case 'Digital Wave':
      return '"You think it\'s cool-looking when a cartoonish wave comes crashing toward you. That is, until it hits you." --Liv Yresta, Felid Coercive';
    case 'Soul Tracer':
      return 'This algorithm envelops the target with coded signals that pinpoint all of its vulnerabilities, enabling the next attacker to strike true.';
    default:
      return 'A specialized algorithm for secondary attacks.';
  }
}

export const CardsCoderAttacks: React.FC<CardsCoderAttacksProps> = ({ sheet }) => {
  const lenses = sheet?.lenses || [];
  const algorithms = sheet?.algorithms || [];
  
  if (lenses.length === 0 && algorithms.length === 0) {
    return null;
  }

  // Check if Ignore 100% Cover dot is selected (first dot in classCardDots[0])
  const hasIgnore100Cover = sheet?.classCardDots?.[0]?.[0] || false;

  return (
    <>
      {lenses.map((lens, index) => (
        <div key={`${lens}-${index}`} style={{ 
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
              color: '#112972',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {lens}
            </span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#112972',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Lens</span>
          </div>
          
          {/* Card Image */}
          <img 
            src={lens === 'Hodge Podge' ? '/Hodge Podge.png' : lens === 'Time Stutter' ? '/Time Stutter.png' : '/Blank Card.png'}
            alt={lens}
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
            {generateCoderPrimaryAttackStatsJSX(sheet?.classCardDots, getLensCost(lens), lens, hasIgnore100Cover)}
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
            {getLensFlavorText(lens)}
          </div>
        </div>
      ))}
      
      {/* Secondary Attack Algorithm Cards */}
      {algorithms.map((algorithm, index) => (
        <div key={`${algorithm}-${index}`} style={{ 
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
              color: '#112972',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {algorithm}
            </span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#112972',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Algorithm</span>
          </div>
          
          {/* Card Image */}
          <img 
            src={algorithm === 'Digital Wave' ? '/Digital Wave.png' : algorithm === 'Soul Tracer' ? '/Soul Tracer.png' : '/Blank Card.png'}
            alt={algorithm}
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
              <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>Cooldown</span> <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (sheet?.classCardDots?.[11]?.filter(Boolean).length || 0)}]</span>
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
            {generateCoderSecondaryAttackStatsJSX(sheet?.classCardDots, getAlgorithmCost(algorithm), algorithm)}
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
            {getAlgorithmFlavorText(algorithm)}
          </div>
        </div>
      ))}
    </>
  );
};