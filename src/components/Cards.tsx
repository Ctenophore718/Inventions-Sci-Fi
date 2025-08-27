import React from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { loadSheetById } from "../utils/storage";
import styles from "./CharacterEditor.module.css";

type CardsProps = {
  sheet: CharacterSheet | null;
  onBack: () => void;
  onLevelUp: () => void;
  onSave: () => void;
  onHome: () => void;
  onAutoSave: (updates: Partial<CharacterSheet>) => void;
  charClass: string;
};

const Cards: React.FC<CardsProps> = ({ sheet, onBack, onLevelUp, onSave, onHome, onAutoSave, charClass }) => {
  const [localSheet, setLocalSheet] = React.useState<CharacterSheet | null>(sheet);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isNavExpanded, setIsNavExpanded] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const waffleRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (!isNavExpanded) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        waffleRef.current && !waffleRef.current.contains(e.target as Node)
      ) {
        setIsNavExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isNavExpanded]);

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
  // Save handler for Cards page (blue button, feedback)
  const handleSaveClick = () => {
    onSave();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div style={{ padding: "1rem" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, fontSize: '2em', flexShrink: 0 }}>Cards</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleSaveClick}
            disabled={isSaved}
            className={styles.saveButton}
          >
            {isSaved ? 'Saved!' : 'Save'}
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
      
      {/* Responsive card grid with fixed card sizes (240px × 336px) - optimized for 3 cards on iPad */}
      <div style={{ 
        marginTop: '2rem', 
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0 0.5rem' // Reduced padding to fit 3 cards on iPad
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
            <div style={{
              position: 'absolute',
              top: -4,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end', // align by bottom
              padding: '0 10px',
              boxSizing: 'border-box',
              minHeight: '2.1em' // ensure enough height for both lines
            }}>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                fontSize: 'clamp(0.8em, 4vw, 1.25em)',
                color: charClass === 'Chemist' ? '#721131' : 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {charClass === 'Chemist' ? 'Volatile Experiments' : 'Class Card Name'}
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em', // 10% smaller than 0.85em
                color: charClass === 'Chemist' ? '#721131' : 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>{charClass === 'Chemist' ? 'Chemist' : 'Class'}</span>
            </div>
            {/* Conditional image based on class */}
            <img 
              src={charClass === 'Chemist' ? "/Volatile Experiments.png" : "/Blank Card.png"}
              alt={charClass === 'Chemist' ? "Volatile Experiments" : "Blank Card"}
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
                Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>
                  [{charClass === 'Chemist' ? (() => {
                    // -1 Cooldown is row 5, indices 0 and 1
                    let cooldown = 4;
                    if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[5])) {
                      if (localSheet.classCardDots[5][0]) cooldown = 3;
                      if (localSheet.classCardDots[5][1]) cooldown = 2;
                    }
                    return cooldown;
                  })() : '#'}]
                </span>
              </span>
            </div>
            
            {/* Card stats - positioned with 10px gaps and fixed readable font size */}
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
                fontSize: '0.875em', // Fixed size, no responsive scaling
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                {charClass === 'Chemist' ? (() => {
                  // Get the number of selected +1hx dots (row 2)
                  let hx = 3;
                  let chem = 0;
                  let hxRange = 0;
                  if (localSheet && Array.isArray(localSheet.classCardDots)) {
                    if (Array.isArray(localSheet.classCardDots[2])) {
                      const selected = localSheet.classCardDots[2].filter(Boolean).length;
                      hx = 3 + selected;
                    }
                    // +1d6 Chemical per token is row 3, index 0
                    if (Array.isArray(localSheet.classCardDots[3]) && localSheet.classCardDots[3][0]) {
                      chem = 1;
                    }
                    // +1hx Range per token is row 4, index 0
                    if (Array.isArray(localSheet.classCardDots[4]) && localSheet.classCardDots[4][0]) {
                      hxRange = 1;
                    }
                  }
                  return (
                    <>
                      You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within <b>[{hx}]</b>hx of you gain +2 to Crit rolls, +<b>[{chem}]</b>d6 <b><span style={{ color: '#de7204' }}>Chemical</span></b><img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /> and/or +<b>[{hxRange}]</b>hx Range to <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> for each Token spent until the start of the next round.
                    </>
                  );
                })() : (
                  'Card stats.'
                )}
              </div>
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
              {charClass === 'Chemist' ? 
                'With the right concoctions, any spell or weapon becomes even more volatile than before.' : 
                'Flavor text.'
              }
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
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
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
                color: 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                Subclass Card Name
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>Subclass</span>
            </div>
            <img 
              src="/Blank Card.png"
              alt="Blank Card"
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
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                Card stats.
              </div>
            </div>
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
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
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
                color: 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                Species Card Name
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>Species</span>
            </div>
            <img 
              src="/Blank Card.png"
              alt="Blank Card"
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
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                Card stats.
              </div>
            </div>
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
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
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
                color: 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                Subspecies Card Name
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>Sub species</span>
            </div>
            <img 
              src="/Blank Card.png"
              alt="Blank Card"
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
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                Card stats.
              </div>
            </div>
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
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
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
                color: 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                Primary Attack Name
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>Primary Attack</span>
            </div>
            <img 
              src="/Blank Card.png"
              alt="Blank Card"
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
                Range <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[#]</span>
              </span>
            </div>
            
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
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                Attack stats.
              </div>
            </div>
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
                color: 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                Primary Attack Name
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>Primary Attack</span>
            </div>
            <img 
              src="/Blank Card.png"
              alt="Blank Card"
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
                Range <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[#]</span>
              </span>
            </div>
            
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
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                Attack stats.
              </div>
            </div>
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
                color: 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                Secondary Attack Name
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '77px',
                display: 'inline-block',
                textAlign: 'right'
              }}>Secondary Attack</span>
            </div>
            <img 
              src="/Blank Card.png"
              alt="Blank Card"
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
              <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                Range <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[#]</span>
              </span>
            </div>
            
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
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                Attack stats.
              </div>
            </div>
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
                color: 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                Secondary Attack Name
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>Secondary Attack</span>
            </div>
            <img 
              src="/Blank Card.png"
              alt="Blank Card"
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
              <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                Range <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[#]</span>
              </span>
            </div>
            
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
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                Attack stats.
              </div>
            </div>
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
      </div>
      
      {/* Floating Navigation Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        {/* Navigation Menu (expanded state) */}
        {isNavExpanded && (
          <div ref={menuRef} style={{
            position: 'absolute',
            bottom: '70px',
            right: '0px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <button
              onClick={onHome}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 20px',
                fontWeight: 'bold',
                fontSize: '0.9em',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              🏠 Home
            </button>
            
            <button
              onClick={onBack}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 20px',
                fontWeight: 'bold',
                fontSize: '0.9em',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              👤 Character Sheet
            </button>
            
            <button
              onClick={onLevelUp}
              style={{
                background: '#fd7e14',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 20px',
                fontWeight: 'bold',
                fontSize: '0.9em',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              ⬆️ Level Up
            </button>
            
            <button
              disabled
              style={{
                background: '#e9ecef',
                color: '#6c757d',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 20px',
                fontWeight: 'bold',
                fontSize: '0.9em',
                cursor: 'not-allowed',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
                opacity: 0.6
              }}
            >
              🃏 Cards
            </button>
          </div>
        )}
        
        {/* Main Waffle Button */}
        <button
          ref={waffleRef}
          onClick={() => setIsNavExpanded((open) => !open)}
          style={{
            width: '51px',
            height: '51px',
            borderRadius: '50%',
            background: '#000000',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3em',
            transition: 'all 0.3s ease',
            transform: isNavExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
          onMouseEnter={(e) => {
            if (!isNavExpanded) {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isNavExpanded) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
          }}
        >
          {isNavExpanded ? '✕' : '⊞'}
        </button>
      </div>

  {/* Character Card Management System section removed as requested */}
      </div>
    </>
  );
};

export default Cards;
