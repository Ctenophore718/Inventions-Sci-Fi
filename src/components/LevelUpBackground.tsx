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
    }
    return [];
  };

  // Helper function to safely clone and persist background dots
  const safeCloneBackgroundDots = (): CharacterSheet["backgroundProgressionDots"] => {
    if (!sheet?.backgroundProgressionDots) {
      if (background === "Adherent of the Pollen Collective") {
        return { pollenCollectiveGreenThumbDots: [false] };
      } else if (background === "Anti-Deft Secessionist") {
        return { antiDeftSecessionistAtrocitiesDots: [false] };
      } else if (background === "Awakened Machine") {
        return { awakenedMachineFilthyCogDots: [false] };
      }
      return {};
    }
    return {
      pollenCollectiveGreenThumbDots: sheet.backgroundProgressionDots.pollenCollectiveGreenThumbDots ? [...sheet.backgroundProgressionDots.pollenCollectiveGreenThumbDots] : undefined,
      antiDeftSecessionistAtrocitiesDots: sheet.backgroundProgressionDots.antiDeftSecessionistAtrocitiesDots ? [...sheet.backgroundProgressionDots.antiDeftSecessionistAtrocitiesDots] : undefined,
      awakenedMachineFilthyCogDots: sheet.backgroundProgressionDots.awakenedMachineFilthyCogDots ? [...sheet.backgroundProgressionDots.awakenedMachineFilthyCogDots] : undefined
    };
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

  // Return null for backgrounds without implementation
  return null;
};

export default LevelUpBackground;
