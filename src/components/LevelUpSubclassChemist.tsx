import React, { useState } from "react";

type LevelUpSubclassChemistProps = {
  subclass: string;
  onXpSpChange?: (xpDelta: number, spDelta: number) => void;
};

const LevelUpSubclassChemist: React.FC<LevelUpSubclassChemistProps> = ({ subclass, onXpSpChange }) => {
  
  // Independent state for Anatomist dots - completely separate from any other component
  const [anatomistFeatureDots, setAnatomistFeatureDots] = useState<boolean[]>([false]); // 1 dot for Feature
  const [anatomistTechniqueRangeDots, setAnatomistTechniqueRangeDots] = useState<boolean[]>([false, false, false]); // 3 dots for +1hx
  const [anatomistTechniqueStrikeDamageDots, setAnatomistTechniqueStrikeDamageDots] = useState<boolean[]>([false]); // 1 dot for +1d6 Strike Damage per Token
  const [anatomistTechniqueStrikeDots, setAnatomistTechniqueStrikeDots] = useState<boolean[]>([false]); // 1 dot for +1 Strike per Token
  const [anatomistTechniqueCooldownDots, setAnatomistTechniqueCooldownDots] = useState<boolean[]>([false, false]); // 2 dots for -1 Cooldown
  const [anatomistAttackDamageDots, setAnatomistAttackDamageDots] = useState<boolean[]>([false, false, false]); // 3 dots for +1 Damage die
  const [anatomistAttackCritDots, setAnatomistAttackCritDots] = useState<boolean[]>([false, false, false]); // 3 dots for +1 Crit
  const [anatomistAttackCooldownDots, setAnatomistAttackCooldownDots] = useState<boolean[]>([false, false]); // 2 dots for -1 Cooldown
  const [anatomistStrikeDots, setAnatomistStrikeDots] = useState<boolean[]>([false]); // 1 dot for heal Strike amount
  const [anatomistSurgeonDots, setAnatomistSurgeonDots] = useState<boolean[]>([false]); // 1 dot for Surgeon perk

  // Helper function to handle dot clicking with sequential requirement
  const handleDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    xpCosts: number[]
  ) => {
    const newArray = [...currentArray];
    const rightmostChecked = currentArray.lastIndexOf(true);
    const canCheck = index === 0 || currentArray.slice(0, index).every(Boolean);
    const canUncheck = currentArray[index] && index === rightmostChecked;
    
    let xpDelta = 0;
    
    if (!currentArray[index] && canCheck) {
      // Checking dots - fill from start to current index
      for (let j = 0; j <= index; j++) {
        if (!currentArray[j]) {
          newArray[j] = true;
          xpDelta += xpCosts[j] || 0;
        }
      }
    } else if (currentArray[index] && canUncheck) {
      // Unchecking dots - clear from current index to end
      for (let j = index; j < currentArray.length; j++) {
        if (currentArray[j]) {
          newArray[j] = false;
          xpDelta -= xpCosts[j] || 0;
        }
      }
    }
    
    if (xpDelta !== 0) {
      setArray(newArray);
      onXpSpChange?.(xpDelta, 0);
    }
  };

  // Helper function to handle SP dots (for Surgeon perk)
  const handleSpDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    spCosts: number[]
  ) => {
    const newArray = [...currentArray];
    let spDelta = 0;
    
    if (!currentArray[index]) {
      newArray[index] = true;
      spDelta += spCosts[index] || 0;
    } else {
      newArray[index] = false;
      spDelta -= spCosts[index] || 0;
    }
    
    setArray(newArray);
    onXpSpChange?.(0, spDelta);
  };
  
  return (
    <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      {/* Anatomist Subclass Content */}
      {subclass === 'Anatomist' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header - Chemist style */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                <b><i style={{ color: '#66cf00', fontSize: '1em' }}>Anatomical Precision.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>You and all allies within 3hx of you ignore any Damage Resistances and/or Immunities.</span>
              </span>
            </span>
          </div>
          {/* Feature XP progression table - now interactive */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span></span>
            <span></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Ignore condition Immunities</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(anatomistFeatureDots, setAnatomistFeatureDots, 0, [6])}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: anatomistFeatureDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
          </div>

          {/* Technique Section - Chemist style */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i style={{ color: '#66cf00', fontSize: '1em' }}>The "Good Stuff"</i></b> <i style={{ color: '#66cf00', fontSize: '1em' }}>(Cooldown 4).</i> You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within 1hx of you gain +1d6 Strike Damage and can Move +2hx for each Chem Token spent until the start of the next round.
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistTechniqueRangeDots, setAnatomistTechniqueRangeDots, idx, [5, 9, 14])}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistTechniqueRangeDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 Strike Damage per Token</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(anatomistTechniqueStrikeDamageDots, setAnatomistTechniqueStrikeDamageDots, 0, [18])}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: anatomistTechniqueStrikeDamageDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>
              <span></span>
              <span></span>
              <span></span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Strike per Token</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(anatomistTechniqueStrikeDots, setAnatomistTechniqueStrikeDots, 0, [18])}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: anatomistTechniqueStrikeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistTechniqueCooldownDots, setAnatomistTechniqueCooldownDots, idx, [4, 7])}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
          </div>
          
          {/* Attack Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Secondary <span style={{ color: '#990000' }}>Attack.</span></i></b> <br /> <i>Super Serum.</i> 1hx Range, Single Target, 18+ Crit, 1d8 Damage, Auto <b><i>Confuse</i></b>, <i>Chem Token</i>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistAttackDamageDots, setAnatomistAttackDamageDots, idx, [4, 6, 9])}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistAttackDamageDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>2xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistAttackCritDots, setAnatomistAttackCritDots, idx, [2, 4, 6])}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistAttackCritDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistAttackCooldownDots, setAnatomistAttackCooldownDots, idx, [3, 5])}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistAttackCooldownDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
                
              ))}
            </div>
          </div>
          
          
          {/* Strike Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Enhanced <span style={{ color: '#351c75' }}>Strike</span> Effects.</i></b>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>

              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Can choose to heal <i><b><span style={{ color: '#351c75' }}>Strike</span></b></i> amount</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(anatomistStrikeDots, setAnatomistStrikeDots, 0, [14])}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: anatomistStrikeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>
          </div>
          
          {/* Perks Section */}
          <div>
            <div style={{ fontSize: '1em', color: '#000', fontWeight: 'bold', marginBottom: '0.5rem' }}>Perks</div>
            <div style={{ marginBottom: '1rem', fontSize: '0.9em', lineHeight: 1.4 }}>
              <i><b>Skills.</b> Medicine</i> +2
            </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
                  <b><i style={{ color: '#66cf00' }}>Surgeon.</i></b> You can perform surgery and potentially save a life on the brink of death or otherwise ensure an enemy will be incapacitated for life in a way of your choice. Gain an advantage on related skill rolls to perform the surgery.
                </span>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '24px',
                  gridTemplateRows: 'repeat(1, auto)',
                  alignItems: 'start',
                  marginLeft: '4px'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleSpDotClick(anatomistSurgeonDots, setAnatomistSurgeonDots, 0, [8])}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: anatomistSurgeonDots[0] ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* TODO: Add other Chemist subclasses (Grenadier, Necro, Poisoner) here */}
      {subclass === 'Grenadier' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          <div style={{ color: '#cf0000', fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>
            Grenadier subclass content coming soon...
          </div>
        </div>
      )}
      
      {subclass === 'Necro' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          <div style={{ color: '#0033cf', fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>
            Necro subclass content coming soon...
          </div>
        </div>
      )}
      
      {subclass === 'Poisoner' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          <div style={{ color: '#cf7600', fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>
            Poisoner subclass content coming soon...
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelUpSubclassChemist;
