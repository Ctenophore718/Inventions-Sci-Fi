import React from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { loadSheetById } from "../utils/storage";

type CardsProps = {
  sheet: CharacterSheet | null;
  onBack: () => void;
  onLevelUp: () => void;
  onSave: () => void;
  onHome: () => void;
};

const Cards: React.FC<CardsProps> = ({ sheet, onBack, onLevelUp, onSave, onHome }) => {
  const [localSheet, setLocalSheet] = React.useState<CharacterSheet | null>(sheet);

  // Update local sheet when prop changes
  React.useEffect(() => {
    setLocalSheet(sheet);
  }, [sheet]);

  // Cross-window synchronization for character display (optimized)
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "rpg-character-sheets" && sheet?.id) {
        const updatedSheet = loadSheetById(sheet.id);
        if (updatedSheet && JSON.stringify(updatedSheet) !== JSON.stringify(localSheet)) {
          setLocalSheet(updatedSheet);
        }
      }
    };

    const handleCharacterUpdate = (e: CustomEvent<{ sheet: CharacterSheet }>) => {
      if (sheet?.id && e.detail.sheet.id === sheet.id) {
        // Only update if the sheet has actually changed
        if (JSON.stringify(e.detail.sheet) !== JSON.stringify(localSheet)) {
          setLocalSheet(e.detail.sheet);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('character-updated', handleCharacterUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('character-updated', handleCharacterUpdate as EventListener);
    };
  }, [sheet?.id, localSheet]);
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, fontSize: '2em', flexShrink: 0 }}>Cards</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={onSave}
            style={{
              background: '#28a745',
              color: 'white',
              border: '1px solid #1e7e34',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
            }}
          >
            Save
          </button>
          <button
            onClick={onLevelUp}
            style={{
              background: '#fd7e14',
              color: 'white',
              border: '1px solid #e8590c',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
            }}
          >
            Level Up
          </button>
          <button
            onClick={onBack}
            style={{
              background: '#6c757d',
              color: 'white',
              border: '1px solid #545b62',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
            }}
          >
            Character Sheet
          </button>
          <button
            onClick={onHome}
            style={{
              background: '#dc3545',
              color: 'white',
              border: '1px solid #bd2130',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
            }}
          >
            Home
          </button>
        </div>
      </div>
      
      {/* Responsive card grid with fixed card sizes (240px × 336px) */}
      <div style={{ 
        marginTop: '2rem', 
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0 1rem'
      }}>
        {/* Technique Cards */}
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
            <div style={{ position: 'absolute', top: 10, left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 16px', boxSizing: 'border-box' }}>
              <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.25em', color: 'black' }}>Card Name</span>
              <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontStyle: 'italic', fontSize: '0.95em', color: 'black' }}>Class</span>
            </div>
            {/* Neural image between Card Name and Technique */}
            <img 
              src="/Neural.png"
              alt="Neural"
              style={{
                position: 'absolute',
                top: 36,
                left: 10,
                right: 10,
                width: 'calc(100% - 20px)',
                height: 'calc(50% - 55px)',
                objectFit: 'cover',
                zIndex: 1,
                borderRadius: 8
              }}
            />
            {/* Technique and Cooldown - absolutely positioned and locked */}
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
              <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Technique</span>
              <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[#]</span>
              </span>
            </div>
            
            {/* Card stats - positioned with 10px gaps and better responsive sizing */}
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
              <div style={{
                fontSize: 'min(0.875em, max(0.6em, calc((100vh - 400px) / 25)))',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>Card stats.</div>
            </div>
            {/* Flavor text - absolutely positioned and locked */}
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
              Flavor text.
            </div>
            </div>
            
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
          flexShrink: 0
        }}>
          <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', textAlign: 'center' }}>Subclass Technique</div>
        </div>
        
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
          flexShrink: 0
        }}>
          <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', textAlign: 'center' }}>Species Technique</div>
        </div>
        
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
          flexShrink: 0
        }}>
          <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', textAlign: 'center' }}>Subspecies Technique</div>
        </div>
        
        {/* Attack Cards */}
        <div style={{ 
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
          flexShrink: 0
        }}>
          <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', textAlign: 'center' }}>Primary Attack</div>
        </div>
        
        <div style={{ 
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
          flexShrink: 0
        }}>
          <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', textAlign: 'center' }}>Primary Attack</div>
        </div>
        
        <div style={{ 
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
          flexShrink: 0
        }}>
          <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', textAlign: 'center' }}>Secondary Attack</div>
        </div>
        
        <div style={{ 
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
          flexShrink: 0
        }}>
          <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', textAlign: 'center' }}>Secondary Attack</div>
        </div>
      </div>
      
  {/* Character Card Management System section removed as requested */}
    </div>
  );
};

export default Cards;
