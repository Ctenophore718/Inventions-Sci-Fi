import React from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { loadSheetById, saveCharacterSheet } from "../utils/storage";
import styles from "./CharacterEditor.module.css";

type CardsProps = {
  sheet: CharacterSheet | null;
  onBack: () => void;
  onLevelUp: () => void;
  onHome: () => void;
  charClass: string;
};

const Cards: React.FC<CardsProps> = ({ sheet, onBack, onLevelUp, onHome, charClass }) => {
  const [localSheet, setLocalSheet] = React.useState<CharacterSheet | null>(sheet);
  const [isNavExpanded, setIsNavExpanded] = React.useState(false);
  const [isXpSpMenuExpanded, setIsXpSpMenuExpanded] = React.useState(false);
  const [isHpMenuExpanded, setIsHpMenuExpanded] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const waffleRef = React.useRef<HTMLButtonElement>(null);
  const xpSpMenuRef = React.useRef<HTMLDivElement>(null);
  const hpMenuRef = React.useRef<HTMLDivElement>(null);
  const hpButtonRef = React.useRef<HTMLButtonElement>(null);
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

  React.useEffect(() => {
    if (!isXpSpMenuExpanded) return;
    function handleClick(e: MouseEvent) {
      if (
        xpSpMenuRef.current && !xpSpMenuRef.current.contains(e.target as Node)
      ) {
        setIsXpSpMenuExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isXpSpMenuExpanded]);

  React.useEffect(() => {
    if (!isHpMenuExpanded) return;
    function handleClick(e: MouseEvent) {
      if (
        hpMenuRef.current && !hpMenuRef.current.contains(e.target as Node) &&
        hpButtonRef.current && !hpButtonRef.current.contains(e.target as Node)
      ) {
        setIsHpMenuExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isHpMenuExpanded]);

  // Local state for HP/XP/SP management
  const [currentHitPoints, setCurrentHitPoints] = React.useState<number>(localSheet?.currentHitPoints ?? localSheet?.maxHitPoints ?? 0);
  // For add/subtract HP section
  const [hpDelta, setHpDelta] = React.useState<number>(0);
  const [deathCount, setDeathCount] = React.useState(localSheet?.deathCount || 0);
  const [xpTotal, setXpTotal] = React.useState(localSheet?.xpTotal || 0);
  const [spTotal, setSpTotal] = React.useState(localSheet?.spTotal || 0);

  // Auto-save functionality with debouncing
  const autoSaveTimeoutRef = React.useRef<number>(0);
  const handleAutoSave = React.useCallback((updates: Partial<CharacterSheet>) => {
    if (!localSheet) return;

    clearTimeout(autoSaveTimeoutRef.current);
    autoSaveTimeoutRef.current = window.setTimeout(() => {
      const updatedSheet = { ...localSheet, ...updates };
      saveCharacterSheet(updatedSheet);
      setLocalSheet(updatedSheet);
      
      // Notify other windows of the update
      window.dispatchEvent(new CustomEvent('characterUpdate', {
        detail: { sheet: updatedSheet }
      }));
    }, 300);
  }, [localSheet]);

  // Sync local state when localSheet changes
  React.useEffect(() => {
    if (localSheet) {
      setCurrentHitPoints(localSheet.currentHitPoints ?? localSheet.maxHitPoints ?? 0);
      setDeathCount(localSheet.deathCount || 0);
      setXpTotal(localSheet.xpTotal || 0);
      setSpTotal(localSheet.spTotal || 0);
    }
  }, [localSheet]);

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

  // Calculate effective max HP with class bonuses
  const calculateEffectiveMaxHP = (): number => {
    const baseHP = localSheet?.maxHitPoints ?? 0;
    
    // Add class-specific bonuses
    if (localSheet?.charClass === 'Exospecialist') {
      return baseHP + 20;
    }
    
    return baseHP;
  };

  const effectiveMaxHP = calculateEffectiveMaxHP();

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
  {/* Cards header moved to App.tsx for right alignment */}
      
      {/* Responsive card grid with fixed card sizes (240px × 336px) - optimized for 3 cards on iPad */}
      <div style={{ 
        marginTop: '0.5rem', 
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
                color: charClass === 'Chemist' ? '#721131' : charClass === 'Coder' ? '#112972' : charClass === 'Commander' ? '#717211' : charClass === 'Contemplative' ? '#116372' : charClass === 'Devout' ? '#6b1172' : charClass === 'Elementalist' ? '#231172' : charClass === 'Exospecialist' ? '#117233' : charClass === 'Gunslinger' ? '#4e7211' : 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {charClass === 'Chemist' ? 'Volatile Experiments'
                  : charClass === 'Coder' ? 'Reflection Script'
                  : charClass === 'Commander' ? 'Combat Delegation'
                  : charClass === 'Contemplative' ? 'Swift Reaction'
                  : charClass === 'Devout' ? 'Flagellation'
                  : charClass === 'Elementalist' ? 'Commune'
                  : charClass === 'Exospecialist' ? 'Target Lock'
                  : charClass === 'Gunslinger' ? 'Quick Shot'
                  : 'Class Card Name'}
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em', // 10% smaller than 0.85em
                color: charClass === 'Chemist' ? '#721131' : charClass === 'Coder' ? '#112972' : charClass === 'Commander' ? '#717211' : charClass === 'Contemplative' ? '#116372' : charClass === 'Devout' ? '#6b1172' : charClass === 'Elementalist' ? '#231172' : charClass === 'Exospecialist' ? '#117233' : charClass === 'Gunslinger' ? '#4e7211' : 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '78px',
                display: 'inline-block',
                textAlign: 'right',
                marginRight: '0px'
              }}>{charClass === 'Chemist' ? 'Chemist'
                : charClass === 'Coder' ? 'Coder'
                : charClass === 'Commander' ? 'Commander'
                : charClass === 'Contemplative' ? 'Contemplative'
                : charClass === 'Devout' ? 'Devout'
                : charClass === 'Elementalist' ? 'Elementalist'
                : charClass === 'Exospecialist' ? 'Exospecialist'
                : charClass === 'Gunslinger' ? 'Gunslinger'
                : 'Class'}</span>
            </div>
            {/* Conditional image based on class */}
            <img 
              src={charClass === 'Devout' ? "/Flagellation.png"
                : charClass === 'Chemist' ? "/Volatile Experiments.png"
                : charClass === 'Coder' ? "/Reflection Script.png"
                : charClass === 'Commander' ? "/Combat Delegation.png"
                : charClass === 'Contemplative' ? "/Swift Reaction.png"
                : charClass === 'Elementalist' ? "/Commune.png"
                : charClass === 'Exospecialist' ? "/Target Lock.png"
                : charClass === 'Gunslinger' ? "/Quick Shot.png"
                : "/Blank Card.png"}
              alt={charClass === 'Devout' ? "Flagellation"
                : charClass === 'Chemist' ? "Volatile Experiments"
                : charClass === 'Coder' ? "Reflection Script"
                : charClass === 'Commander' ? "Combat Delegation"
                : charClass === 'Contemplative' ? "Swift Reaction"
                : charClass === 'Elementalist' ? "Commune"
                : charClass === 'Exospecialist' ? "Target Lock"
                : charClass === 'Gunslinger' ? "Quick Shot"
                : "Blank Card"}
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
                {charClass === 'Exospecialist' ? (
                  (() => {
                    let cooldown = 3;
                    // -1 Cooldown dots are in classCardDots[3]
                    if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[3])) {
                      cooldown = 3 - localSheet.classCardDots[3].filter(Boolean).length;
                      if (cooldown < 1) cooldown = 1;
                    }
                    return <span>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{cooldown}]</span></span>;
                  })()
                ) : charClass === 'Devout' ? (() => {
                  let cooldown = 4;
                  if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[3])) {
                    const selected = localSheet.classCardDots[3].filter(Boolean).length;
                    if (selected === 1) cooldown = 3;
                    if (selected === 2) cooldown = 2;
                  }
                  return (<span>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{cooldown}]</span></span>);
                })() : charClass === 'Elementalist' ? (() => {
                  let cooldown = 4;
                  if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[3])) {
                    const selected = localSheet.classCardDots[3].filter(Boolean).length;
                    cooldown = 4 - selected;
                    if (cooldown < 1) cooldown = 1;
                  }
                  return (<span>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{cooldown}]</span></span>);
                })() : (
                  <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>
                    [{charClass === 'Chemist' ? (() => {
                      let cooldown = 4;
                      if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[5])) {
                        cooldown = 4 - localSheet.classCardDots[5].filter(Boolean).length;
                        if (cooldown < 1) cooldown = 1;
                      }
                      return cooldown;
                    })() : charClass === 'Coder' ? (() => {
                      let cooldown = 4;
                      if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[5])) {
                        cooldown = 4 - localSheet.classCardDots[5].filter(Boolean).length;
                        if (cooldown < 1) cooldown = 1;
                      }
                      return cooldown;
                    })() : charClass === 'Commander' ? (() => {
                      let cooldown = 4;
                      if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[5])) {
                        cooldown = 4 - localSheet.classCardDots[5].filter(Boolean).length;
                        if (cooldown < 1) cooldown = 1;
                      }
                      return cooldown;
                    })() : charClass === 'Contemplative' ? (() => {
                      let cooldown = 4;
                      if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[4])) {
                        cooldown = 4 - localSheet.classCardDots[4].filter(Boolean).length;
                        if (cooldown < 1) cooldown = 1;
                      }
                      return cooldown;
                    })() : '#'}]
                  </span></>
                )}
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
                {charClass === 'Devout' ? (() => {
                  let hxRange = 0;
                  let attackD6 = 0;
                  if (localSheet && Array.isArray(localSheet.classCardDots)) {
                    if (Array.isArray(localSheet.classCardDots[1]) && localSheet.classCardDots[1][0]) {
                      hxRange = 1;
                    }
                    if (Array.isArray(localSheet.classCardDots[2]) && localSheet.classCardDots[2][0]) {
                      attackD6 = 1;
                    }
                  }
                  return (
                    <>
                      You choose to deal 1d4 to 5d4 untyped Damage to yourself that cannot be reduced in any way. As a result, you gain a +2 Crit, +<b>[{hxRange}]</b>hx Range and +<b>[{attackD6}]</b>d6 Damage to your next <b><i style={{ color: '#990000' }}>Attack</i></b> for each die of Damage you dealt yourself.
                    </>
                  );
                })() : charClass === 'Exospecialist' ? (
                  (() => {
                    let hx = 3;
                    let crit = 2;
                    if (localSheet && Array.isArray(localSheet.classCardDots)) {
                      if (Array.isArray(localSheet.classCardDots[0])) {
                        hx = 3 + localSheet.classCardDots[0].filter(Boolean).length;
                      }
                      // +2 Crit dots are in classCardDots[1]
                      if (Array.isArray(localSheet.classCardDots[1])) {
                        crit = 2 + 2 * localSheet.classCardDots[1].filter(Boolean).length;
                      }
                    }
                    let cover = 50;
                    // Ignore 100% Cover dot is in classCardDots[2][0]
                    if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[2]) && localSheet.classCardDots[2][0]) {
                      cover = 100;
                    }
                    return (
                      <>
                        You and allies within <b>[{hx}]</b>hx gain a +<b>[{crit}]</b> to Crit rolls on <b><i style={{ color: '#990000' }}>Attacks</i></b> and ignore <b>[{cover}]</b>% Cover until the start of the next round.
                      </>
                    );
                })()) 
                : charClass === 'Chemist' ? (() => {
                  // Chemist: +1hx dots are in classCardDots[2], +1d6 Chemical per Token (classCardDots[3]), +1hx Range per Token (classCardDots[4])
                  let chemHx = 3;
                  let chemD6 = 0;
                  let chemHxRng = 0;
                  if (localSheet && Array.isArray(localSheet.classCardDots)) {
                      if (Array.isArray(localSheet.classCardDots[2])) {
                      chemHx += localSheet.classCardDots[2].filter(Boolean).length;
                    }
                    if (Array.isArray(localSheet.classCardDots[3]) && localSheet.classCardDots[3][0]) {
                      chemD6 = 1;
                    }
                    if (Array.isArray(localSheet.classCardDots[4]) && localSheet.classCardDots[4][0]) {
                      chemHxRng = 1;
                    }
                  }
                  return (
                    <>
                      You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within <b>[{chemHx}]</b>hx of you gain +2 to Crit rolls, +<b>[{chemD6}]</b>d6 <br /><u><b style ={{ color: '#de7204' }}>Chemical</b></u><img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /> and/or +<b>[{chemHxRng}]</b>hx Range to <b><i style={{ color: '#990000' }}>Attacks</i></b> for each <i>Token</i> spent until the start of the next round.
                    </>
                  );
                })() : charClass === 'Coder' ? (() => {
                  // Row 2: +1d6 Damage dots (3 dots)
                  let dmg = 1;
                  let resistText = '[ - ]';
                  if (localSheet && Array.isArray(localSheet.classCardDots)) {
                    if (Array.isArray(localSheet.classCardDots[2])) {
                      const selected = localSheet.classCardDots[2].filter(Boolean).length;
                      if (selected > 0) dmg = 2 + (selected - 1);
                    }
                    // Row 4: Damage Immunity (dot 0)
                    if (Array.isArray(localSheet.classCardDots[4]) && localSheet.classCardDots[4][0]) {
                      resistText = '[Immune]';
                    } else if (Array.isArray(localSheet.classCardDots[3]) && localSheet.classCardDots[3][0]) {
                      // Row 3: Resist all Damage (dot 0)
                      resistText = '[Resistant]';
                    }
                  }
                  return (
                    <>
                      Until the start of the next round, whenever you and any ally within 3hx of you take Damage from an enemy, that enemy takes <b>[{dmg}]</b>d6 Damage of the same type it dealt. Additionally, you and allies within 3hx are <b>{resistText}</b> to the original Damage.
                    </>
                  );
                })() : charClass === 'Commander' ? (() => {
                  // Commander: +1hx dots for Combat Delegation are in classCardDots[3], +1 ally dots are in classCardDots[4]
                  let hx = 5;
                  let allies = 1;
                  if (localSheet && Array.isArray(localSheet.classCardDots)) {
                    if (Array.isArray(localSheet.classCardDots[3])) {
                      const selectedHx = localSheet.classCardDots[3].filter(Boolean).length;
                      hx = 5 + selectedHx;
                    }
                    if (Array.isArray(localSheet.classCardDots[4])) {
                      const selectedAllies = localSheet.classCardDots[4].filter(Boolean).length;
                      allies = 1 + selectedAllies;
                    }
                  }
                  return (
                    <>
                      <b>[{allies}]</b> ally(s) within <b>[{hx}]</b>hx that can see and/or hear you gains an extra <i>Action</i>.
                    </>
                  );
                })() : charClass === 'Contemplative' ? (
                  (() => {
                    let hx = 3;
                    if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[3])) {
                      hx = 3 + localSheet.classCardDots[3].filter(Boolean).length;
                    }
                    return (
                      <>
                        Until the beginning of the next round, you and all allies within <b>[{hx}]</b>hx can <b><i style={{ color: '#38761d' }}>Move</i></b> their <b><i style={{ color: '#38761d' }}>Speed</i></b> whenever they take Damage from an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>. You can <b><i style={{ color: '#351c75' }}>Strike</i></b> during this <b><i style={{ color: '#38761d' }}>Movement</i></b>.
                      </>
                    );
                  })()
                ) : charClass === 'Elementalist' ? (() => {
                  // Elementalist Commune card logic
                  let hx = 3;
                  let resistText = '[ - ]';
                  let d6 = 1;
                  if (localSheet && Array.isArray(localSheet.classCardDots)) {
                    // hx range: classCardDots[2] (row 3)
                    if (Array.isArray(localSheet.classCardDots[2])) {
                      const selected = localSheet.classCardDots[2].filter(Boolean).length;
                      hx = 3 + selected;
                    }
                    // d6: classCardDots[3] (row 4)
                    if (Array.isArray(localSheet.classCardDots[3]) && localSheet.classCardDots[3][0]) {
                      d6 = 2;
                    }
                    // resist: classCardDots[4] (row 5)
                    if (Array.isArray(localSheet.classCardDots[4]) && localSheet.classCardDots[4][0]) {
                      resistText = '[Immune]';
                    } else if (Array.isArray(localSheet.classCardDots[5]) && localSheet.classCardDots[5][0]) {
                      resistText = '[Resistant]';
                    }
                  }
                  // If classCardDots[2][0] (Triple Damage dice) is selected, show [triple] instead of [double]
                  const triple = Array.isArray(localSheet?.classCardDots?.[2]) && localSheet.classCardDots[2][0];
                  return (
                    <>
                      You deal <b>[{triple ? 'triple' : 'double'}]</b> Damage dice with your next <b><i style={{ color: '#990000' }}>Attack</i></b>.
                    </>
                  );
                })()
                : 'Card stats.'}
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
              fontSize: '0.7em',
              fontWeight: 400,
              zIndex: 3,
              textAlign: 'left'
            }}>
              {charClass === 'Devout' ? (
                <span>“Sacrifice is a necessary cost of any spiritual power. The most devout sacrifice their own flesh.” <br />--Theodora de la Fe, Defteran Devout</span>
              ) : charClass === 'Chemist' ? 
                'With the right concoctions, any spell or weapon becomes even more volatile than before.' 
                : charClass === 'Coder' ?
                (<span>“Although it’s a universal script, the math behind reflecting energetic material is quite complex.”<br />--Luminova, X-Ray Naturalist</span>)
                : charClass === 'Commander' ? (
                  <span>“...That's 'cause I got people with me, people who trust each other, who do for each other and ain&apos;t always looking for the advantage.” --Mal, Human Captain of Serenity</span>
                ) : charClass === 'Contemplative' ? (
                  <span>“One must always be responsive at a moment’s notice to fight not only another day, but another instant.” --Master Li Ren, Felid Contemplative</span>
                ) : charClass === 'Elementalist' ? (
                  <span>A little prayer with your Xenomagical elemental sprite can go a long way.</span>
                ) : charClass === 'Exospecialist' ? (
                  <span>Aim at your target without distractions. Focus on one target. Hit your goal and move on to the next one. Focus is your friend.</span>
                ) : charClass === 'Gunslinger' ? (
                  <span>“I always keep my finger on the trigger, right at the brink of firing. Don’t even blink at me wrong or you’ll get a hole in ya.” --Anonymous</span>
                ) : 'Flavor text.'}
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
                fontSize: 'clamp(0.8em, 4vw, 1.08em)',
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
              }}>Subspecies</span>
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
              }}>Class / Subclass</span>
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
              }}>Class / Subclass</span>
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
                fontSize: 'clamp(0.8em, 4vw, 1.05em)',
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
              }}>Class / Subclass</span>
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
                fontSize: 'clamp(0.8em, 4vw, 1.05em)',
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
              }}>Class / Subclass</span>
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
          className={styles.blueWaffleButton}
          onClick={() => setIsNavExpanded((open) => !open)}
          style={{
            width: '51px',
            height: '51px',
            borderRadius: '50%',
            backgroundColor: '#1976d2',
            background: '#1976d2',
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
              e.currentTarget.style.backgroundColor = '#1976d2';
              e.currentTarget.style.background = '#1976d2';
            }
          }}
          onMouseLeave={(e) => {
            if (!isNavExpanded) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              e.currentTarget.style.backgroundColor = '#1976d2';
              e.currentTarget.style.background = '#1976d2';
            }
          }}
        >
          <span style={{ color: 'white', fontSize: '1.3em', lineHeight: 1 }}>{isNavExpanded ? '✕' : '⊞'}</span>
        </button>
      </div>

      {/* XP/SP Summary Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999
      }}>
        {/* XP/SP Menu (expanded state) */}
        {isXpSpMenuExpanded && (
          <div ref={xpSpMenuRef} style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            border: '2px solid #ccc',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '280px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* XP Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>xp Total:</span>
                <button
                  className={styles.redMinusButton}
                  onClick={() => {
                    const newValue = Math.max(0, xpTotal - 1);
                    setXpTotal(newValue);
                    handleAutoSave({ xpTotal: newValue });
                  }}
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={xpTotal}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    const newValue = Math.max(0, parseInt(val) || 0);
                    setXpTotal(newValue);
                    handleAutoSave({ xpTotal: newValue });
                  }}
                  style={{
                    minWidth: '32px',
                    width: '48px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '4px'
                  }}
                />
                <button
                  className={styles.greenPlusButton}
                  onClick={() => {
                    const newValue = xpTotal + 1;
                    setXpTotal(newValue);
                    handleAutoSave({ xpTotal: newValue });
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>xp Spent:</span>
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{localSheet?.xpSpent ?? 0}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Remaining xp:</span>
                <span style={{ minWidth: '40px', textAlign: 'center', color: xpTotal - (localSheet?.xpSpent ?? 0) < 0 ? '#d32f2f' : '#000' }}>{xpTotal - (localSheet?.xpSpent ?? 0)}</span>
              </div>

              <hr style={{ margin: '8px 0', border: '1px solid #eee' }} />

              {/* SP Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>sp Total:</span>
                <button
                  className={styles.redMinusButton}
                  onClick={() => {
                    const newValue = Math.max(0, spTotal - 1);
                    setSpTotal(newValue);
                    handleAutoSave({ spTotal: newValue });
                  }}
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={spTotal}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    const newValue = Math.max(0, parseInt(val) || 0);
                    setSpTotal(newValue);
                    handleAutoSave({ spTotal: newValue });
                  }}
                  style={{
                    minWidth: '32px',
                    width: '48px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '4px'
                  }}
                />
                <button
                  className={styles.greenPlusButton}
                  onClick={() => {
                    const newValue = spTotal + 1;
                    setSpTotal(newValue);
                    handleAutoSave({ spTotal: newValue });
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>sp Spent:</span>
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{localSheet?.spSpent ?? 0}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Remaining sp:</span>
                <span style={{ minWidth: '40px', textAlign: 'center', color: spTotal - (localSheet?.spSpent ?? 0) < 0 ? '#d32f2f' : '#000' }}>{spTotal - (localSheet?.spSpent ?? 0)}</span>
              </div>
            </div>
          </div>
        )}

        <button
          className={styles.xpSpButton}
          onClick={() => setIsXpSpMenuExpanded((open) => !open)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            transform: isXpSpMenuExpanded ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={(e) => {
            if (!isXpSpMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isXpSpMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
          }}
        >
          xp: {xpTotal - (localSheet?.xpSpent ?? 0)}/{xpTotal} | sp: {spTotal - (localSheet?.spSpent ?? 0)}/{spTotal}
        </button>
      </div>

      {/* HP Summary Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 999
      }}>
        {/* HP Menu (expanded state) */}
        {isHpMenuExpanded && (
          <div ref={hpMenuRef} style={{
            position: 'absolute',
            bottom: '50px',
            left: '0px',
            background: 'white',
            border: '2px solid #ccc',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '280px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Current HP Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '20px' }}>Current Hit Points:</span>
                <button
                  className={styles.redMinusButton}
                  onClick={() => {
                    const newValue = Math.max(0, currentHitPoints - 1);
                    setCurrentHitPoints(newValue);
                    handleAutoSave({ currentHitPoints: newValue });
                  }}
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={currentHitPoints}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    const newValue = Math.max(0, parseInt(val) || 0);
                    setCurrentHitPoints(newValue);
                    handleAutoSave({ currentHitPoints: newValue });
                  }}
                  style={{
                    minWidth: '40px',
                    width: '60px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '4px',
                    MozAppearance: 'textfield',
                  }}
                  autoComplete="off"
                />
                <button
                  className={styles.greenPlusButton}
                  onClick={() => {
                    const newValue = currentHitPoints + 1;
                    setCurrentHitPoints(newValue);
                    handleAutoSave({ currentHitPoints: newValue });
                  }}
                >
                  +
                </button>

                {/* Add/Subtract Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '16px' }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    max="999"
                    value={hpDelta || ''}
                    onChange={e => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setHpDelta(val ? parseInt(val) : 0);
                    }}
                    style={{ width: '48px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '2px 4px' }}
                    placeholder="#"
                  />
                  <button
                    className={styles.redMinusButton}
                    style={{ minWidth: 28, padding: '2px 8px' }}
                    onClick={() => {
                      if (!hpDelta) return;
                      const newValue = Math.max(0, currentHitPoints - hpDelta);
                      setCurrentHitPoints(newValue);
                      handleAutoSave({ currentHitPoints: newValue });
                    }}
                    title="Subtract from HP"
                  >
                    -
                  </button>
                  <button
                    className={styles.greenPlusButton}
                    style={{ minWidth: 28, padding: '2px 8px' }}
                    onClick={() => {
                      if (!hpDelta) return;
                      const newValue = currentHitPoints + hpDelta;
                      setCurrentHitPoints(newValue);
                      handleAutoSave({ currentHitPoints: newValue });
                    }}
                    title="Add to HP"
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '120px' }}>Max Hit Points:</span>
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{effectiveMaxHP}</span>
              </div>

              <hr style={{ margin: '8px 0', border: '1px solid #eee' }} />

              {/* Death Count Section - Centered, in black bar, white font, dots turn black when selected */}
              <div style={{
                backgroundColor: 'black',
                borderRadius: '16px',
                padding: '16px 12px 12px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '8px',
                marginBottom: '8px'
              }}>
                <span style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2em',
                  textAlign: 'center',
                  marginBottom: '4px',
                  letterSpacing: '0.5px'
                }}>Death Count</span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '2px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((dotNumber) => (
                    <div key={dotNumber} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>
                        {dotNumber}+
                      </span>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: deathCount >= dotNumber ? 'black' : 'white',
                          border: '2px solid white',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => {
                          const newValue = deathCount >= dotNumber ? dotNumber - 1 : dotNumber;
                          setDeathCount(newValue);
                          handleAutoSave({ deathCount: newValue });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          ref={hpButtonRef}
          className={styles.hpButton}
          onClick={() => setIsHpMenuExpanded((open) => !open)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            transform: isHpMenuExpanded ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={(e) => {
            if (!isHpMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isHpMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
          }}
        >
          hp: {currentHitPoints}/{effectiveMaxHP}
        </button>
      </div>

  {/* Character Card Management System section removed as requested */}
      </div>
    </>
  );
};

export default Cards;
