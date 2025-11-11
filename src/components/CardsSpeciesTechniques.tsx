import React from 'react';
import { generateAvianGazeCardJSX, calculateAvianGazeData } from '../utils/avenochTechnique';
import type { CharacterSheet } from '../types/CharacterSheet';

interface CardsSpeciesTechniquesProps {
  species: string;
  sheet: CharacterSheet | null;
}

const CardsSpeciesTechniques: React.FC<CardsSpeciesTechniquesProps> = ({ species, sheet }) => {
  
  if (species !== 'Avenoch') {
    return null;
  }

  const { cooldown } = calculateAvianGazeData(sheet?.speciesCardDots);

  return (
    <div style={{ 
      width: '240px', 
      height: '336px', 
      background: '#fff', 
      border: '5px solid #bf9000', 
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
          color: '#000',
          lineHeight: 1,
          textAlign: 'left',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100% - 87px)',
          minWidth: 0,
          flexShrink: 1,
          marginRight: '5px'
        }}>
          Avian Gaze
        </span>
        <span style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontStyle: 'italic',
          fontSize: '0.75em',
          color: '#000',
          lineHeight: 1,
          whiteSpace: 'normal',
          wordBreak: 'keep-all',
          overflowWrap: 'anywhere',
          maxWidth: '78px',
          display: 'inline-block',
          textAlign: 'right',
          marginRight: '0px'
        }}>
          Avenoch
        </span>
      </div>

      {/* Card Image */}
      <img 
        src="/Avian Gaze.png"
        alt="Avian Gaze"
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '182px',
          objectFit: 'contain',
          marginBottom: 3,
          marginTop: 20,
          maxWidth: '185px'
        }}
      />

      {/* Card Content */}
      <div style={{
        width: '100%',
        textAlign: 'left',
        fontSize: '0.7em',
        marginTop: '8px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        lineHeight: 1.4,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        {/* Cooldown */}
        <div style={{ 
          fontWeight: 'bold',
          color: '#000'
        }}>
          <i>Cooldown: <span style={{ fontStyle: 'normal' }}>[{cooldown}]</span></i>
        </div>

        {/* Description */}
        <div style={{ color: '#000', lineHeight: 1.3 }}>
          {generateAvianGazeCardJSX(sheet?.speciesCardDots)}
        </div>

        {/* Flavor Text */}
        <div style={{ 
          fontStyle: 'italic',
          color: '#555',
          fontSize: '0.9em',
          marginTop: '4px',
          lineHeight: 1.2
        }}>
          Avenochs were designed from the get-go for their accuracy and range in combat. Their eyesight is unparalleled in the creations of Dr. Hans Cripioma.
        </div>
      </div>
    </div>
  );
};

export default CardsSpeciesTechniques;
