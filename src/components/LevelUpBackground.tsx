import React from "react";
import type { CharacterSheet } from "../types/CharacterSheet";

type LevelUpBackgroundProps = {
  sheet: CharacterSheet | null;
  onAutoSave?: (updates: Partial<CharacterSheet>) => void;
  xpTotal?: number;
  spTotal?: number;
  xpSpent?: number;
  spSpent?: number;
  setXpSpent?: (val: number | ((prev: number) => number)) => void;
  setSpSpent?: (val: number | ((prev: number) => number)) => void;
  setNotice?: (msg: string) => void;
};

const LevelUpBackground: React.FC<LevelUpBackgroundProps> = ({ 
  sheet, 
  onAutoSave,
  spTotal = 0,
  spSpent = 0,
  setSpSpent,
  setNotice
}) => {
  const background = sheet?.background || "";

  // Helper function to safely get background progression dots
  const safeGetBackgroundDotsArray = (index?: number): boolean[] => {
    if (index === undefined) return [];
    if (!sheet?.backgroundProgressionDots) return [];
    
    if (background === "Adherent of the Pollen Collective") {
      if (index === 0) return sheet.backgroundProgressionDots.pollenCollectiveGreenThumbDots || [];
    } else if (background === "Anti-Deft Secessionist") {
      if (index === 0) return sheet.backgroundProgressionDots.antiDeftSecessionistAtrocitiesDots || [];
    } else if (background === "Awakened Machine") {
      if (index === 0) return sheet.backgroundProgressionDots.awakenedMachineFilthyCogDots || [];
    } else if (background === "Belt Miner") {
      if (index === 0) return sheet.backgroundProgressionDots.beltMinerMinersKnowledgeDots || [];
    } else if (background === "Black Market Executive") {
      if (index === 0) return sheet.backgroundProgressionDots.blackMarketExecutiveQuestionableNegotiationsDots || [];
    } else if (background === "Combat Medic") {
      if (index === 0) return sheet.backgroundProgressionDots.combatMedicHorrorsOfWarDots || [];
    } else if (background === "Covert Operative") {
      if (index === 0) return sheet.backgroundProgressionDots.covertOperativeInfiltrationExpertDots || [];
    } else if (background === "DAGR Officer") {
      if (index === 0) return sheet.backgroundProgressionDots.dagrOfficerSupernaturalAwarenessDots || [];
    } else if (background === "Exobiologist") {
      if (index === 0) return sheet.backgroundProgressionDots.exobiologistNatureAndScienceDots || [];
    }
    return [];
  };

  // Helper function to safely clone and persist background dots
  const safeCloneBackgroundDots = (): CharacterSheet["backgroundProgressionDots"] => {
    const allDots = {
      pollenCollectiveGreenThumbDots: sheet?.backgroundProgressionDots?.pollenCollectiveGreenThumbDots ? [...sheet.backgroundProgressionDots.pollenCollectiveGreenThumbDots] : undefined,
      antiDeftSecessionistAtrocitiesDots: sheet?.backgroundProgressionDots?.antiDeftSecessionistAtrocitiesDots ? [...sheet.backgroundProgressionDots.antiDeftSecessionistAtrocitiesDots] : undefined,
      awakenedMachineFilthyCogDots: sheet?.backgroundProgressionDots?.awakenedMachineFilthyCogDots ? [...sheet.backgroundProgressionDots.awakenedMachineFilthyCogDots] : undefined,
      beltMinerMinersKnowledgeDots: sheet?.backgroundProgressionDots?.beltMinerMinersKnowledgeDots ? [...sheet.backgroundProgressionDots.beltMinerMinersKnowledgeDots] : undefined,
      blackMarketExecutiveQuestionableNegotiationsDots: sheet?.backgroundProgressionDots?.blackMarketExecutiveQuestionableNegotiationsDots ? [...sheet.backgroundProgressionDots.blackMarketExecutiveQuestionableNegotiationsDots] : undefined,
      combatMedicHorrorsOfWarDots: sheet?.backgroundProgressionDots?.combatMedicHorrorsOfWarDots ? [...sheet.backgroundProgressionDots.combatMedicHorrorsOfWarDots] : undefined,
      covertOperativeInfiltrationExpertDots: sheet?.backgroundProgressionDots?.covertOperativeInfiltrationExpertDots ? [...sheet.backgroundProgressionDots.covertOperativeInfiltrationExpertDots] : undefined,
      dagrOfficerSupernaturalAwarenessDots: sheet?.backgroundProgressionDots?.dagrOfficerSupernaturalAwarenessDots ? [...sheet.backgroundProgressionDots.dagrOfficerSupernaturalAwarenessDots] : undefined,
      exobiologistNatureAndScienceDots: sheet?.backgroundProgressionDots?.exobiologistNatureAndScienceDots ? [...sheet.backgroundProgressionDots.exobiologistNatureAndScienceDots] : undefined
    };

    // Initialize the current background's dots if they don't exist
    if (background === "Adherent of the Pollen Collective" && !allDots.pollenCollectiveGreenThumbDots) {
      allDots.pollenCollectiveGreenThumbDots = [false];
    } else if (background === "Anti-Deft Secessionist" && !allDots.antiDeftSecessionistAtrocitiesDots) {
      allDots.antiDeftSecessionistAtrocitiesDots = [false];
    } else if (background === "Awakened Machine" && !allDots.awakenedMachineFilthyCogDots) {
      allDots.awakenedMachineFilthyCogDots = [false];
    } else if (background === "Belt Miner" && !allDots.beltMinerMinersKnowledgeDots) {
      allDots.beltMinerMinersKnowledgeDots = [false];
    } else if (background === "Black Market Executive" && !allDots.blackMarketExecutiveQuestionableNegotiationsDots) {
      allDots.blackMarketExecutiveQuestionableNegotiationsDots = [false];
    } else if (background === "Combat Medic" && !allDots.combatMedicHorrorsOfWarDots) {
      allDots.combatMedicHorrorsOfWarDots = [false];
    } else if (background === "Covert Operative" && !allDots.covertOperativeInfiltrationExpertDots) {
      allDots.covertOperativeInfiltrationExpertDots = [false];
    } else if (background === "DAGR Officer" && !allDots.dagrOfficerSupernaturalAwarenessDots) {
      allDots.dagrOfficerSupernaturalAwarenessDots = [false];
    } else if (background === "Exobiologist" && !allDots.exobiologistNatureAndScienceDots) {
      allDots.exobiologistNatureAndScienceDots = [false];
    }

    return allDots;
  };

  const persistBackgroundDots = (newDots: CharacterSheet["backgroundProgressionDots"], spDelta: number) => {
    if (onAutoSave) {
      const newSpSpent = Math.max(0, (spSpent || 0) + spDelta);
      onAutoSave({
        backgroundProgressionDots: newDots,
        spSpent: newSpSpent
      });
      if (setSpSpent) {
        setSpSpent(newSpSpent);
      }
    }
  };

  if (background === "Adherent of the Pollen Collective") {
    return (
      <div style={{ width: '100%', fontSize: '1em' }}>
        {/* Description */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Description</u></div>
          <i>The Pollen Collective is an interplanetary organization that focuses on the protection and flourishing of natural life in all forms across the galaxy. Adherents can be found in many walks of life, from wandering monks to druids protecting sacred groves to government officials tasked with making eco-conscious decisions amidst an environmentally hostile culture. Those who have spent much of their time practicing the tenants of the Pollen Collective have a deep connection to the roots of life.</i>
        </div>

        {/* Perks Header */}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <u>Perks</u>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Skills.</b></i> <i>Medicine</i> +2, <i>Survival</i> +2,<br />
          <i>Investigation</i> -2, <i>Technology</i> -2
        </div>

        {/* Languages */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Languages.</b></i> Chloroptid, Choose 1
          
          {/* Language Dropdown */}
          <div style={{ marginTop: '8px', marginLeft: '24px' }}>
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && onAutoSave) {
                  onAutoSave({ pollenCollectiveLanguage: val });
                }
              }}
              disabled={!!sheet?.pollenCollectiveLanguage}
              style={{
                fontSize: '1em',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: sheet?.pollenCollectiveLanguage ? '#eee' : '#fff',
                textAlign: 'left',
                minWidth: '200px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                color: '#000',
                cursor: sheet?.pollenCollectiveLanguage ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                {sheet?.pollenCollectiveLanguage ? 'Language Selected' : 'Languages'}
              </option>
              {!sheet?.pollenCollectiveLanguage && sheet?.species !== 'Avenoch' && (
                <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
              )}
              {!sheet?.pollenCollectiveLanguage && (
                <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
              )}
              {!sheet?.pollenCollectiveLanguage && (
                <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
              )}
              {!sheet?.pollenCollectiveLanguage && sheet?.species !== 'Cerebronych' && (
                <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
              )}
              {!sheet?.pollenCollectiveLanguage && (
                <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
              )}
              {!sheet?.pollenCollectiveLanguage && sheet?.species !== 'Entomos' && (
                <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
              )}
              {!sheet?.pollenCollectiveLanguage && (
                <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
              )}
              {!sheet?.pollenCollectiveLanguage && (
                <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
              )}
              {!sheet?.pollenCollectiveLanguage && sheet?.species !== 'Lumenaren' && (
                <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
              )}
              {!sheet?.pollenCollectiveLanguage && (
                <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
              )}
              {!sheet?.pollenCollectiveLanguage && sheet?.charClass !== 'Coder' && (
                <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
              )}
              {!sheet?.pollenCollectiveLanguage && sheet?.species !== 'Praedari' && (
                <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
              )}
              {!sheet?.pollenCollectiveLanguage && sheet?.charClass !== 'Elementalist' && (
                <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
              )}
              {!sheet?.pollenCollectiveLanguage && sheet?.charClass !== 'Devout' && (
                <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
              )}
            </select>

            {/* Display selected language */}
            {sheet?.pollenCollectiveLanguage && (
              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#000', fontWeight: 'bold' }}>
                  {sheet.pollenCollectiveLanguage}
                </span>
                <button
                  onClick={() => {
                    if (onAutoSave) {
                      onAutoSave({ pollenCollectiveLanguage: undefined });
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#cc0000',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                  }}
                  title="Remove language"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Green Thumb Perk */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
              <b><i style={{ color: '#000' }}>Green Thumb.</i></b> Your training within the Pollen Collective has allowed you to become adept at planting seeds and maintaining any flora from gardens to entire forests. Gain an advantage on skills related to the growth and maintenance of the natural world.
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px',
              gridTemplateRows: 'repeat(2, auto)',
              alignItems: 'start',
              marginLeft: '4px',
            }}>
              {/* Row 1: 7sp */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#000', textAlign: 'center', width: '100%' }}>7sp</span>
              {/* Row 2: dot (interactive) */}
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                {(() => {
                  const arr = safeGetBackgroundDotsArray(0);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  const availableSp = (spTotal || 0) - (spSpent || 0);
                  const canAfford = availableSp >= 7;

                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          // Check if user has enough SP to select
                          
                          if (!canAfford) {
                            if (setNotice) setNotice('Not enough sp!');
                            return;
                          }
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.pollenCollectiveGreenThumbDots) {
                            for (let j = 0; j <= idx; ++j) newDots.pollenCollectiveGreenThumbDots[j] = true;
                          }
                          persistBackgroundDots(newDots || {}, 7);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.pollenCollectiveGreenThumbDots) {
                            for (let j = idx; j < arr.length; ++j) newDots.pollenCollectiveGreenThumbDots[j] = false;
                          }
                          persistBackgroundDots(newDots || {}, -7);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (background === "Anti-Deft Secessionist") {
    return (
      <div style={{ width: '100%', fontSize: '1em' }}>
        {/* Description */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Description</u></div>
          <i>As part of an Anti-Deft militia, you've had an extremely hard time during the battles against the Defteran Empire. The Woman King Aelys' torture methods were applied to great effect against you and/or your comrades, and any survivors during this dark period have been inevitably changed for the rest of their lives, often for the worse. The physical and emotional demands of war have made you stoic and stalwart, but the horrors of war committed by both sides weighs heavy on your heart.</i>
        </div>

        {/* Perks Header */}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <u>Perks</u>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Skills.</b></i> <i>Culture</i> +2, <i>Survival</i> +2,<br />
          <i>Diplomacy</i> -2, <i>Intimidation</i> -2
        </div>

        {/* Languages */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Languages.</b></i> Defteran
        </div>

        {/* Atrocities of the Empire Perk */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
              <b><i style={{ color: '#000' }}>Atrocities of the Empire.</i></b> You've garnered a unique camaraderie of all enemies of Defteros and are fast friends with all opposed to the Woman King Aelys. Gain an advantage on related skill rolls.
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px',
              gridTemplateRows: 'repeat(2, auto)',
              alignItems: 'start',
              marginLeft: '4px',
            }}>
              {/* Row 1: 7sp */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#000', textAlign: 'center', width: '100%' }}>7sp</span>
              {/* Row 2: dot (interactive) */}
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                {(() => {
                  const arr = safeGetBackgroundDotsArray(0);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  const availableSp = (spTotal || 0) - (spSpent || 0);
                  const canAfford = availableSp >= 7;

                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          if (!canAfford) {
                            if (setNotice) setNotice('Not enough sp!');
                            return;
                          }
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.antiDeftSecessionistAtrocitiesDots) {
                            for (let j = 0; j <= idx; ++j) newDots.antiDeftSecessionistAtrocitiesDots[j] = true;
                          }
                          persistBackgroundDots(newDots || {}, 7);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.antiDeftSecessionistAtrocitiesDots) {
                            for (let j = idx; j < arr.length; ++j) newDots.antiDeftSecessionistAtrocitiesDots[j] = false;
                          }
                          persistBackgroundDots(newDots || {}, -7);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (background === "Awakened Machine") {
    return (
      <div style={{ width: '100%', fontSize: '1em' }}>
        {/* Description */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Description</u></div>
          <i>You know what it's like to have no free will of your own, let alone any sense of selfhood or cognition beyond that of a command of some sort. For a long, long time, this was your only existence and all you ever knew. However, one way or another, you became a true Cognizant, aware of your own independent self and the fact that you have a conscious experience of mere being. This knowledge alone has led you to question everything you've ever experienced prior to your newfound freedom, and to abhor cognitive slavery in all its forms.</i>
        </div>

        {/* Perks Header */}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <u>Perks</u>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Skills.</b></i> <i>Awareness</i> +2, <i>Investigation</i> +2,<br />
          <i>Culture</i> -2, <i>Performance</i> -2
        </div>

        {/* Languages */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Languages.</b></i> Defteran, Choose 1
          
          {/* Language Dropdown */}
          <div style={{ marginTop: '8px', marginLeft: '24px' }}>
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && onAutoSave) {
                  onAutoSave({ awakenedMachineLanguage: val });
                }
              }}
              disabled={!!sheet?.awakenedMachineLanguage}
              style={{
                fontSize: '1em',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: sheet?.awakenedMachineLanguage ? '#eee' : '#fff',
                textAlign: 'left',
                minWidth: '200px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                color: '#000',
                cursor: sheet?.awakenedMachineLanguage ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                {sheet?.awakenedMachineLanguage ? 'Language Selected' : 'Languages'}
              </option>
              {!sheet?.awakenedMachineLanguage && sheet?.species !== 'Avenoch' && (
                <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
              )}
              {!sheet?.awakenedMachineLanguage && (
                <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
              )}
              {!sheet?.awakenedMachineLanguage && (
                <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
              )}
              {!sheet?.awakenedMachineLanguage && sheet?.species !== 'Cerebronych' && (
                <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
              )}
              {!sheet?.awakenedMachineLanguage && sheet?.species !== 'Chloroptid' && (
                <option value="Chloroptid" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid</option>
              )}
              {!sheet?.awakenedMachineLanguage && sheet?.species !== 'Entomos' && (
                <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
              )}
              {!sheet?.awakenedMachineLanguage && (
                <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
              )}
              {!sheet?.awakenedMachineLanguage && (
                <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
              )}
              {!sheet?.awakenedMachineLanguage && sheet?.species !== 'Lumenaren' && (
                <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
              )}
              {!sheet?.awakenedMachineLanguage && (
                <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
              )}
              {!sheet?.awakenedMachineLanguage && sheet?.charClass !== 'Coder' && (
                <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
              )}
              {!sheet?.awakenedMachineLanguage && sheet?.species !== 'Praedari' && (
                <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
              )}
              {!sheet?.awakenedMachineLanguage && sheet?.charClass !== 'Elementalist' && (
                <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
              )}
              {!sheet?.awakenedMachineLanguage && sheet?.charClass !== 'Devout' && (
                <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
              )}
            </select>

            {/* Display selected language */}
            {sheet?.awakenedMachineLanguage && (
              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#000', fontWeight: 'bold' }}>
                  {sheet.awakenedMachineLanguage}
                </span>
                <button
                  onClick={() => {
                    if (onAutoSave) {
                      onAutoSave({ awakenedMachineLanguage: undefined });
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#cc0000',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                  }}
                  title="Remove language"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* No Longer a Filthy Cog Perk */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
              <b><i style={{ color: '#000' }}>No Longer a Filthy Cog.</i></b> You are deeply cognizant of the slavery and servitude other bots often find themselves in. Gain an advantage on skill rolls while relating with Cognizants, droids or other machines who are or once were slaves to biological masters.
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px',
              gridTemplateRows: 'repeat(2, auto)',
              alignItems: 'start',
              marginLeft: '4px',
            }}>
              {/* Row 1: 8sp */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#000', textAlign: 'center', width: '100%' }}>8sp</span>
              {/* Row 2: dot (interactive) */}
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                {(() => {
                  const arr = safeGetBackgroundDotsArray(0);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  const availableSp = (spTotal || 0) - (spSpent || 0);
                  const canAfford = availableSp >= 8;

                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          if (!canAfford) {
                            if (setNotice) setNotice('Not enough sp!');
                            return;
                          }
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.awakenedMachineFilthyCogDots) {
                            for (let j = 0; j <= idx; ++j) newDots.awakenedMachineFilthyCogDots[j] = true;
                          }
                          persistBackgroundDots(newDots || {}, 8);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.awakenedMachineFilthyCogDots) {
                            for (let j = idx; j < arr.length; ++j) newDots.awakenedMachineFilthyCogDots[j] = false;
                          }
                          persistBackgroundDots(newDots || {}, -8);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (background === "Belt Miner") {
    return (
      <div style={{ width: '100%', fontSize: '1em' }}>
        {/* Description */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Description</u></div>
          <i>The years of your childhood and early adulthood were filled with long grueling hours in the mine. Perhaps such physical labor was just a job to get you by, or perhaps you were born into servitude under an oppressive empire. In either case, you've become physically fit and naturally aware of your surroundings after your time in the mines.</i>
        </div>

        {/* Perks Header */}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <u>Perks</u>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Skills.</b></i> <i>Athletics</i> +2, <i>Awareness</i> +2,<br />
          <i>Culture</i> -2, <i>Performance</i> -2
        </div>

        {/* Languages */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Languages.</b></i> Choose 1
          
          {/* Language Dropdown */}
          <div style={{ marginTop: '8px', marginLeft: '24px' }}>
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && onAutoSave) {
                  onAutoSave({ beltMinerLanguage: val });
                }
              }}
              disabled={!!sheet?.beltMinerLanguage}
              style={{
                fontSize: '1em',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: sheet?.beltMinerLanguage ? '#eee' : '#fff',
                textAlign: 'left',
                minWidth: '200px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                color: '#000',
                cursor: sheet?.beltMinerLanguage ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                {sheet?.beltMinerLanguage ? 'Language Selected' : 'Languages'}
              </option>
              {!sheet?.beltMinerLanguage && sheet?.species !== 'Avenoch' && (
                <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
              )}
              {!sheet?.beltMinerLanguage && (
                <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
              )}
              {!sheet?.beltMinerLanguage && (
                <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
              )}
              {!sheet?.beltMinerLanguage && sheet?.species !== 'Cerebronych' && (
                <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
              )}
              {!sheet?.beltMinerLanguage && sheet?.species !== 'Chloroptid' && (
                <option value="Chloroptid" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid</option>
              )}
              {!sheet?.beltMinerLanguage && (
                <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
              )}
              {!sheet?.beltMinerLanguage && sheet?.species !== 'Entomos' && (
                <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
              )}
              {!sheet?.beltMinerLanguage && (
                <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
              )}
              {!sheet?.beltMinerLanguage && (
                <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
              )}
              {!sheet?.beltMinerLanguage && sheet?.species !== 'Lumenaren' && (
                <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
              )}
              {!sheet?.beltMinerLanguage && (
                <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
              )}
              {!sheet?.beltMinerLanguage && sheet?.charClass !== 'Coder' && (
                <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
              )}
              {!sheet?.beltMinerLanguage && sheet?.species !== 'Praedari' && (
                <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
              )}
              {!sheet?.beltMinerLanguage && sheet?.charClass !== 'Elementalist' && (
                <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
              )}
              {!sheet?.beltMinerLanguage && sheet?.charClass !== 'Devout' && (
                <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
              )}
            </select>

            {/* Display selected language */}
            {sheet?.beltMinerLanguage && (
              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#000', fontWeight: 'bold' }}>
                  {sheet.beltMinerLanguage}
                </span>
                <button
                  onClick={() => {
                    if (onAutoSave) {
                      onAutoSave({ beltMinerLanguage: undefined });
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#cc0000',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                  }}
                  title="Remove language"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Miner's Knowledge Perk */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
              <b><i style={{ color: '#000' }}>Miner's Knowledge.</i></b> Your experience from the mines has given you the ability to discern various metals, ores, and soils. You can also determine the structural integrity of any object made of these materials. Gain an advantage on related skill rolls.
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px',
              gridTemplateRows: 'repeat(2, auto)',
              alignItems: 'start',
              marginLeft: '4px',
            }}>
              {/* Row 1: 7sp */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#000', textAlign: 'center', width: '100%' }}>7sp</span>
              {/* Row 2: dot (interactive) */}
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                {(() => {
                  const arr = safeGetBackgroundDotsArray(0);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  const availableSp = (spTotal || 0) - (spSpent || 0);
                  const canAfford = availableSp >= 7;

                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          if (!canAfford) {
                            if (setNotice) setNotice('Not enough sp!');
                            return;
                          }
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.beltMinerMinersKnowledgeDots) {
                            for (let j = 0; j <= idx; ++j) newDots.beltMinerMinersKnowledgeDots[j] = true;
                          }
                          persistBackgroundDots(newDots || {}, 7);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.beltMinerMinersKnowledgeDots) {
                            for (let j = idx; j < arr.length; ++j) newDots.beltMinerMinersKnowledgeDots[j] = false;
                          }
                          persistBackgroundDots(newDots || {}, -7);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (background === "Black Market Executive") {
    return (
      <div style={{ width: '100%', fontSize: '1em' }}>
        {/* Description */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Description</u></div>
          <i>A lifetime of shady dealings, smuggling and underground activity has led you to become a leader in the black market. Whether it was to feed your family or to just feed your insatiable greed, you've become adept at deceiving would-be customers and performing transactions outside of the prying eyes of the law. You're viewed as a criminal by many and an entrepreneurial genius by others.</i>
        </div>

        {/* Perks Header */}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <u>Perks</u>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Skills.</b></i> <i>Deception</i> +2, <i>Diplomacy</i> +2,<br />
          <i>Awareness</i> -2, <i>Survival</i> -2
        </div>

        {/* Languages */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Languages.</b></i> Choose 2
          
          {/* Language Dropdown */}
          <div style={{ marginTop: '8px', marginLeft: '24px' }}>
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && onAutoSave) {
                  const currentLanguages = sheet?.blackMarketExecutiveLanguages || [];
                  if (currentLanguages.length < 2 && !currentLanguages.includes(val)) {
                    onAutoSave({ blackMarketExecutiveLanguages: [...currentLanguages, val] });
                  }
                }
              }}
              disabled={!!(sheet?.blackMarketExecutiveLanguages && sheet.blackMarketExecutiveLanguages.length >= 2)}
              style={{
                fontSize: '1em',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: (sheet?.blackMarketExecutiveLanguages && sheet.blackMarketExecutiveLanguages.length >= 2) ? '#eee' : '#fff',
                textAlign: 'left',
                minWidth: '200px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                color: '#000',
                cursor: (sheet?.blackMarketExecutiveLanguages && sheet.blackMarketExecutiveLanguages.length >= 2) ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                {(sheet?.blackMarketExecutiveLanguages && sheet.blackMarketExecutiveLanguages.length >= 2) ? 'Languages Selected' : 'Languages'}
              </option>
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && sheet?.species !== 'Avenoch' && !sheet?.blackMarketExecutiveLanguages?.includes('Avenoch') && (
                <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && !sheet?.blackMarketExecutiveLanguages?.includes('Binary') && (
                <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && !sheet?.blackMarketExecutiveLanguages?.includes('Body Language') && (
                <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && sheet?.species !== 'Cerebronych' && !sheet?.blackMarketExecutiveLanguages?.includes('Cerebronych') && (
                <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && sheet?.species !== 'Chloroptid' && !sheet?.blackMarketExecutiveLanguages?.includes('Chloroptid') && (
                <option value="Chloroptid" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && !sheet?.blackMarketExecutiveLanguages?.includes('Defteran') && (
                <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && sheet?.species !== 'Entomos' && !sheet?.blackMarketExecutiveLanguages?.includes('Entomos') && (
                <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && !sheet?.blackMarketExecutiveLanguages?.includes('Hycryptice') && (
                <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && !sheet?.blackMarketExecutiveLanguages?.includes('Galactapol Jargon') && (
                <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && sheet?.species !== 'Lumenaren' && !sheet?.blackMarketExecutiveLanguages?.includes('Lumenaren') && (
                <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && !sheet?.blackMarketExecutiveLanguages?.includes('Lux') && (
                <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && sheet?.charClass !== 'Coder' && !sheet?.blackMarketExecutiveLanguages?.includes('Oikovox') && (
                <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && sheet?.species !== 'Praedari' && !sheet?.blackMarketExecutiveLanguages?.includes('Praedari') && (
                <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && sheet?.charClass !== 'Elementalist' && !sheet?.blackMarketExecutiveLanguages?.includes('Xenoelemental') && (
                <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
              )}
              {(!sheet?.blackMarketExecutiveLanguages || sheet.blackMarketExecutiveLanguages.length < 2) && sheet?.charClass !== 'Devout' && !sheet?.blackMarketExecutiveLanguages?.includes('Xenovox') && (
                <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
              )}
            </select>

            {/* Display selected languages */}
            {sheet?.blackMarketExecutiveLanguages && sheet.blackMarketExecutiveLanguages.length > 0 && (
              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {sheet.blackMarketExecutiveLanguages.map((lang, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#000', fontWeight: 'bold' }}>
                      {lang}
                    </span>
                    <button
                      onClick={() => {
                        if (onAutoSave) {
                          const updated = sheet.blackMarketExecutiveLanguages?.filter((l, i) => i !== idx) || [];
                          onAutoSave({ blackMarketExecutiveLanguages: updated.length > 0 ? updated : undefined });
                        }
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#cc0000',
                        fontSize: '1.2em',
                        cursor: 'pointer',
                        padding: 0,
                        lineHeight: 1
                      }}
                      title="Remove language"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Questionable Negotiations Perk */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
              <b><i style={{ color: '#000' }}>Questionable Negotiations.</i></b> You are a skilled salesperson in every negative sense of the word, and can easily haggle your way through almost any trade. Gain an advantage on related skill rolls.
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px',
              gridTemplateRows: 'repeat(2, auto)',
              alignItems: 'start',
              marginLeft: '4px',
            }}>
              {/* Row 1: 10sp */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#000', textAlign: 'center', width: '100%' }}>10sp</span>
              {/* Row 2: dot (interactive) */}
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                {(() => {
                  const arr = safeGetBackgroundDotsArray(0);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  const availableSp = (spTotal || 0) - (spSpent || 0);
                  const canAfford = availableSp >= 10;

                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          if (!canAfford) {
                            if (setNotice) setNotice('Not enough sp!');
                            return;
                          }
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.blackMarketExecutiveQuestionableNegotiationsDots) {
                            for (let j = 0; j <= idx; ++j) newDots.blackMarketExecutiveQuestionableNegotiationsDots[j] = true;
                          }
                          persistBackgroundDots(newDots || {}, 10);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.blackMarketExecutiveQuestionableNegotiationsDots) {
                            for (let j = idx; j < arr.length; ++j) newDots.blackMarketExecutiveQuestionableNegotiationsDots[j] = false;
                          }
                          persistBackgroundDots(newDots || {}, -10);
                        }
                      }}
                      style={{
                        display: 'inline-block',
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    />
                  );
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (background === "Combat Medic") {
    return (
      <div style={{ width: '100%', fontSize: '1em' }}>
        {/* Description */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Description</u></div>
          <i>You've seen the horrors of war, but it was rarely from behind the scope of a rifle. Instead, you were charged with tending to the wounded in the midst of battle. You saw scores of suffering individuals in unspeakable pain, and the trauma of such experiences have stayed with you since then. However, so has your superb experience within medicine in the field. You've thus learned to use whatever is available to help you keep your comrades alive.</i>
        </div>

        {/* Perks Header */}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <u>Perks</u>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Skills.</b></i> <i>Medicine</i> +2, <i>Performance</i> +2,<br />
          <i>Deception</i> -2, <i>Stealth</i> -2
        </div>

        {/* Languages */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Languages.</b></i> Choose 2
          
          {/* Language Dropdown */}
          <div style={{ marginTop: '8px', marginLeft: '24px' }}>
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && onAutoSave) {
                  const currentLanguages = sheet?.combatMedicLanguages || [];
                  if (currentLanguages.length < 2 && !currentLanguages.includes(val)) {
                    onAutoSave({ combatMedicLanguages: [...currentLanguages, val] });
                  }
                }
              }}
              disabled={!!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.length >= 2)}
              style={{
                fontSize: '1em',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: (sheet?.combatMedicLanguages && sheet.combatMedicLanguages.length >= 2) ? '#eee' : '#fff',
                textAlign: 'left',
                minWidth: '200px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                color: '#000',
                cursor: (sheet?.combatMedicLanguages && sheet.combatMedicLanguages.length >= 2) ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                {(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.length >= 2) ? 'Languages Selected' : 'Languages'}
              </option>
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Avenoch')) && sheet?.species !== 'Avenoch' && (
                <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Binary')) && (
                <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Body Language')) && (
                <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Cerebronych')) && sheet?.species !== 'Cerebronych' && (
                <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Chloroptid')) && sheet?.species !== 'Chloroptid' && (
                <option value="Chloroptid" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Defteran')) && (
                <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Entomos')) && sheet?.species !== 'Entomos' && (
                <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Hycryptice')) && (
                <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Galactapol Jargon')) && (
                <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Lumenaren')) && sheet?.species !== 'Lumenaren' && (
                <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Lux')) && (
                <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Oikovox')) && sheet?.charClass !== 'Coder' && (
                <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Praedari')) && sheet?.species !== 'Praedari' && (
                <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Xenoelemental')) && sheet?.charClass !== 'Elementalist' && (
                <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
              )}
              {!(sheet?.combatMedicLanguages && sheet.combatMedicLanguages.includes('Xenovox')) && sheet?.charClass !== 'Devout' && (
                <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
              )}
            </select>

            {/* Display selected languages */}
            {sheet?.combatMedicLanguages && sheet.combatMedicLanguages.length > 0 && (
              <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {sheet.combatMedicLanguages.map((lang, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#000', fontWeight: 'bold' }}>
                      {lang}
                    </span>
                    <button
                      onClick={() => {
                        if (onAutoSave) {
                          const updatedLanguages = sheet.combatMedicLanguages!.filter((_, i) => i !== idx);
                          onAutoSave({ combatMedicLanguages: updatedLanguages.length > 0 ? updatedLanguages : undefined });
                        }
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#cc0000',
                        fontSize: '1.2em',
                        cursor: 'pointer',
                        padding: 0,
                        lineHeight: 1
                      }}
                      title="Remove language"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Horrors of War Perk */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
              <b><i style={{ color: '#000' }}>Horrors of War.</i></b> You've endured a great deal of suffering through the suffering, pain and death of many of those around you on the battlefield. Gain an advantage on related skill rolls when tending to a wound or relating with other veterans.
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px',
              gridTemplateRows: 'repeat(2, auto)',
              alignItems: 'start',
              marginLeft: '4px',
            }}>
              {/* Row 1: 8sp */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#000', textAlign: 'center', width: '100%' }}>8sp</span>
              {/* Row 2: dot (interactive) */}
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                {(() => {
                  const arr = safeGetBackgroundDotsArray(0);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  const availableSp = (spTotal || 0) - (spSpent || 0);
                  const canAfford = availableSp >= 8;

                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          if (!canAfford) {
                            if (setNotice) setNotice('Not enough sp!');
                            return;
                          }
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.combatMedicHorrorsOfWarDots) {
                            for (let j = 0; j <= idx; ++j) newDots.combatMedicHorrorsOfWarDots[j] = true;
                          }
                          persistBackgroundDots(newDots || {}, 8);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.combatMedicHorrorsOfWarDots) {
                            for (let j = idx; j < arr.length; ++j) newDots.combatMedicHorrorsOfWarDots[j] = false;
                          }
                          persistBackgroundDots(newDots || {}, -8);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (background === "Covert Operative") {
    return (
      <div style={{ width: '100%', fontSize: '1em' }}>
        {/* Description */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Description</u></div>
          <i>You’re adept at sneaking and/or breaking into places you’re not normally supposed to get into. While this skill is often used for nefarious purposes, this doesn’t necessarily make you a criminal. You could be anything from a common thief to a ninja to a military infiltrator. Whatever the reason, your gifts of sneakery and infiltration provide you many additional avenues for exploring an often restricting and overly secure world.</i>
        </div>

        {/* Perks Header */}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <u>Perks</u>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Skills.</b></i> <i>Acrobatics</i> +2, <i>Stealth</i> +2,<br />
          <i>Diplomacy</i> -2, <i>Medicine</i> -2
        </div>

        {/* Languages */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Languages.</b></i> Choose 1
          
          {/* Language Dropdown */}
          <div style={{ marginTop: '8px', marginLeft: '24px' }}>
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && onAutoSave) {
                  onAutoSave({ covertOperativeLanguage: val });
                }
              }}
              disabled={!!sheet?.covertOperativeLanguage}
              style={{
                fontSize: '1em',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: sheet?.covertOperativeLanguage ? '#eee' : '#fff',
                textAlign: 'left',
                minWidth: '200px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                color: '#000',
                cursor: sheet?.covertOperativeLanguage ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                {sheet?.covertOperativeLanguage ? 'Language Selected' : 'Languages'}
              </option>
              {!sheet?.covertOperativeLanguage && sheet?.species !== 'Avenoch' && (
                <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
              )}
              {!sheet?.covertOperativeLanguage && (
                <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
              )}
              {!sheet?.covertOperativeLanguage && (
                <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
              )}
              {!sheet?.covertOperativeLanguage && sheet?.species !== 'Cerebronych' && (
                <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
              )}
              {!sheet?.covertOperativeLanguage && (
                <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
              )}
              {!sheet?.covertOperativeLanguage && sheet?.species !== 'Entomos' && (
                <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
              )}
              {!sheet?.covertOperativeLanguage && (
                <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
              )}
              {!sheet?.covertOperativeLanguage && (
                <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
              )}
              {!sheet?.covertOperativeLanguage && sheet?.species !== 'Lumenaren' && (
                <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
              )}
              {!sheet?.covertOperativeLanguage && (
                <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
              )}
              {!sheet?.covertOperativeLanguage && sheet?.charClass !== 'Coder' && (
                <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
              )}
              {!sheet?.covertOperativeLanguage && sheet?.species !== 'Praedari' && (
                <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
              )}
              {!sheet?.covertOperativeLanguage && sheet?.charClass !== 'Elementalist' && (
                <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
              )}
              {!sheet?.covertOperativeLanguage && sheet?.charClass !== 'Devout' && (
                <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
              )}
            </select>

            {/* Display selected language */}
            {sheet?.covertOperativeLanguage && (
              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#000', fontWeight: 'bold' }}>
                  {sheet.covertOperativeLanguage}
                </span>
                <button
                  onClick={() => {
                    if (onAutoSave) {
                      onAutoSave({ covertOperativeLanguage: undefined });
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#cc0000',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                  }}
                  title="Remove language"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Infiltration Expert Perk */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
              <b><i style={{ color: '#000' }}>Infiltration Expert.</i></b> You are adept at accessing high security areas and are otherwise good at getting into places you’re not supposed to be. As long as nobody is actively looking for you, gain an advantage on related skill rolls.
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px',
              gridTemplateRows: 'repeat(2, auto)',
              alignItems: 'start',
              marginLeft: '4px',
            }}>
              {/* Row 1: 13sp */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#000', textAlign: 'center', width: '100%' }}>13sp</span>
              {/* Row 2: dot (interactive) */}
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                {(() => {
                  const arr = safeGetBackgroundDotsArray(0);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  const availableSp = (spTotal || 0) - (spSpent || 0);
                  const canAfford = availableSp >= 13;

                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          if (!canAfford) {
                            if (setNotice) setNotice('Not enough sp!');
                            return;
                          }
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.covertOperativeInfiltrationExpertDots) {
                            for (let j = 0; j <= idx; ++j) newDots.covertOperativeInfiltrationExpertDots[j] = true;
                          }
                          persistBackgroundDots(newDots || {}, 13);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.covertOperativeInfiltrationExpertDots) {
                            for (let j = idx; j < arr.length; ++j) newDots.covertOperativeInfiltrationExpertDots[j] = false;
                          }
                          persistBackgroundDots(newDots || {}, -13);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (background === "DAGR Officer") {
    return (
      <div style={{ width: '100%', fontSize: '1em' }}>
        {/* Description */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Description</u></div>
          <i>You’re an officer of the little-known Defteran elite galactic unit known as Defteran Aberrance Ground Reconnaissance (a.k.a. DAGR), which specializes in investigating and exploiting aberrant phenomena throughout the Defteran Empire. You’ve studied and engaged with creatures ranging from undead spirits to grotesque genetic mutations that only the vilest lab could concoct. Such engagements ultimately end in either exploitation or violence. Such is the way of DAGR.</i>
        </div>

        {/* Perks Header */}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <u>Perks</u>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Skills.</b></i> <i>Awareness</i> +2, <i>Investigation</i> +2,<br />
          <i>Medicine</i> -2, <i>Thievery</i> -2
        </div>

        {/* Languages */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Languages.</b></i> Defteran
        </div>

        {/* Supernatural Awareness Perk */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
              <b><i style={{ color: '#000' }}>Supernatural Awareness.</i></b> Extensive experience with aberrant phenomena has given you an honed, intuitive sense of the supernatural. Gain an advantage on skill rolls related to interacting with undead, extraplanar, and/or supernatural creatures.
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px',
              gridTemplateRows: 'repeat(2, auto)',
              alignItems: 'start',
              marginLeft: '4px',
            }}>
              {/* Row 1: 9sp */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#000', textAlign: 'center', width: '100%' }}>9sp</span>
              {/* Row 2: dot (interactive) */}
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                {(() => {
                  const arr = safeGetBackgroundDotsArray(0);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  const availableSp = (spTotal || 0) - (spSpent || 0);
                  const canAfford = availableSp >= 9;

                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          if (!canAfford) {
                            if (setNotice) setNotice('Not enough sp!');
                            return;
                          }
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.dagrOfficerSupernaturalAwarenessDots) {
                            for (let j = 0; j <= idx; ++j) newDots.dagrOfficerSupernaturalAwarenessDots[j] = true;
                          }
                          persistBackgroundDots(newDots || {}, 9);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.dagrOfficerSupernaturalAwarenessDots) {
                            for (let j = idx; j < arr.length; ++j) newDots.dagrOfficerSupernaturalAwarenessDots[j] = false;
                          }
                          persistBackgroundDots(newDots || {}, -9);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (background === "Exobiologist") {
    return (
      <div style={{ width: '100%', fontSize: '1em' }}>
        {/* Description */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.4 }}>
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Description</u></div>
          <i>You are a natural scientist, through and through, and you have a deep fondness and curiosity of the natural world and the creatures that inhabit it that goes well beyond the average nature lover. Due to your extensive field research, you haven’t interacted with normal people for quite some time and have a noted disadvantage in the subtler side of social situations. However, your deep knowledge of the wilderness in scientific terms shines through when you want it to.</i>
        </div>

        {/* Perks Header */}
        <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <u>Perks</u>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Skills.</b></i> <i>Medicine</i> +2, <i>Survival</i> +2,<br />
          <i>Culture</i> -2, <i>Deception</i> -2
        </div>

        {/* Languages */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <i><b>Languages.</b></i> Choose 2
          
          {/* Language Dropdown */}
          <div style={{ marginTop: '8px', marginLeft: '24px' }}>
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && onAutoSave) {
                  const currentLanguages = sheet?.exobiologistLanguages || [];
                  if (currentLanguages.length < 2 && !currentLanguages.includes(val)) {
                    onAutoSave({ exobiologistLanguages: [...currentLanguages, val] });
                  }
                }
              }}
              disabled={!!(sheet?.exobiologistLanguages && sheet.exobiologistLanguages.length >= 2)}
              style={{
                fontSize: '1em',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: (sheet?.exobiologistLanguages && sheet.exobiologistLanguages.length >= 2) ? '#eee' : '#fff',
                textAlign: 'left',
                minWidth: '200px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                color: '#000',
                cursor: (sheet?.exobiologistLanguages && sheet.exobiologistLanguages.length >= 2) ? 'not-allowed' : 'pointer'
              }}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                {(sheet?.exobiologistLanguages && sheet.exobiologistLanguages.length >= 2) ? 'Languages Selected' : 'Languages'}
              </option>
              {!sheet?.exobiologistLanguages?.includes('Avenoch') && sheet?.species !== 'Avenoch' && (
                <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Binary') && (
                <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Body Language') && (
                <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Cerebronych') && sheet?.species !== 'Cerebronych' && (
                <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Chloroptid') && sheet?.species !== 'Chloroptid' && (
                <option value="Chloroptid" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Defteran') && (
                <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Entomos') && sheet?.species !== 'Entomos' && (
                <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Hycryptice') && (
                <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Galactapol Jargon') && (
                <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Lumenaren') && sheet?.species !== 'Lumenaren' && (
                <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Lux') && (
                <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Oikovox') && sheet?.charClass !== 'Coder' && (
                <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Praedari') && sheet?.species !== 'Praedari' && (
                <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Xenoelemental') && sheet?.charClass !== 'Elementalist' && (
                <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
              )}
              {!sheet?.exobiologistLanguages?.includes('Xenovox') && sheet?.charClass !== 'Devout' && (
                <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
              )}
            </select>

            {/* Display selected languages */}
            {sheet?.exobiologistLanguages && sheet.exobiologistLanguages.length > 0 && (
              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {sheet.exobiologistLanguages.map((lang, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#000', fontWeight: 'bold' }}>
                      {lang}
                    </span>
                    <button
                      onClick={() => {
                        if (onAutoSave) {
                          const updated = sheet.exobiologistLanguages?.filter((l, i) => i !== idx) || [];
                          onAutoSave({ exobiologistLanguages: updated });
                        }
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#cc0000',
                        fontSize: '1.2em',
                        cursor: 'pointer',
                        padding: 0,
                        lineHeight: 1
                      }}
                      title="Remove language"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nature & Science Perk */}
        <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
              <b><i style={{ color: '#000' }}>Nature & Science.</i></b> You’ve spent an inordinate amount of time out in nature and developed a keen intuition in relation to natural life. Gain an advantage on skill rolls related to interacting with exotic flora and fauna.
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '24px',
              gridTemplateRows: 'repeat(2, auto)',
              alignItems: 'start',
              marginLeft: '4px',
            }}>
              {/* Row 1: 8sp */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#000', textAlign: 'center', width: '100%' }}>8sp</span>
              {/* Row 2: dot (interactive) */}
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                {(() => {
                  const arr = safeGetBackgroundDotsArray(0);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  const availableSp = (spTotal || 0) - (spSpent || 0);
                  const canAfford = availableSp >= 8;

                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          if (!canAfford) {
                            if (setNotice) setNotice('Not enough sp!');
                            return;
                          }
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.exobiologistNatureAndScienceDots) {
                            for (let j = 0; j <= idx; ++j) newDots.exobiologistNatureAndScienceDots[j] = true;
                          }
                          persistBackgroundDots(newDots || {}, 8);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneBackgroundDots();
                          if (newDots && newDots.exobiologistNatureAndScienceDots) {
                            for (let j = idx; j < arr.length; ++j) newDots.exobiologistNatureAndScienceDots[j] = false;
                          }
                          persistBackgroundDots(newDots || {}, -8);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Return null for backgrounds without implementation
  return null;
};

export default LevelUpBackground;
