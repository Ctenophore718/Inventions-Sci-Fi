import React from "react";
import { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet, loadSheetById } from "../utils/storage";
import styles from "./CharacterEditor.module.css";


type LevelUpProps = {
  sheet: CharacterSheet | null;
  onBack: () => void;
  onCards: () => void;
  onSave: () => void;
  onHome: () => void;
  charClass: string;
  setCharClass: (c: string) => void;
  subclass: string;
  setSubclass: (s: string) => void;
  species: string;
  setSpecies: (sp: string) => void;
  subspecies: string;
  setSubspecies: (ss: string) => void;
};


const LevelUp: React.FC<LevelUpProps> = ({ sheet, onBack, onCards, onSave, onHome, charClass, setCharClass, subclass, setSubclass, species, setSpecies, subspecies, setSubspecies }) => {
  // Local state for XP/SP totals (mirroring CharacterEditor)
  const [xpTotal, setXpTotal] = useState(sheet?.xpTotal ?? 0);
  const [spTotal, setSpTotal] = useState(sheet?.spTotal ?? 0);
  // Optionally, update local state if sheet changes
  const [spSpent, setSpSpent] = useState(sheet?.spSpent ?? 0);
  const [xpSpent, setXpSpent] = useState(sheet?.xpSpent ?? 0);
  const [notice, setNotice] = useState("");
  React.useEffect(() => {
    setXpTotal(sheet?.xpTotal ?? 0);
    setSpTotal(sheet?.spTotal ?? 0);
    setSpSpent(sheet?.spSpent ?? 0);
    setXpSpent(sheet?.xpSpent ?? 0);
  }, [sheet?.xpTotal, sheet?.spTotal, sheet?.spSpent, sheet?.xpSpent]);

  // Auto-dismiss notice after 2.5 seconds
  React.useEffect(() => {
    if (notice) {
      const timeout = setTimeout(() => setNotice("") , 2500);
      return () => clearTimeout(timeout);
    }
  }, [notice]);

  // Cross-window synchronization for this character (optimized)
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "rpg-character-sheets" && sheet?.id) {
        // Reload the current character from storage
        const updatedSheet = loadSheetById(sheet.id);
        if (updatedSheet) {
          // Only update state if values have actually changed
          if (updatedSheet.xpTotal !== xpTotal) setXpTotal(updatedSheet.xpTotal ?? 0);
          if (updatedSheet.spTotal !== spTotal) setSpTotal(updatedSheet.spTotal ?? 0);
          if (updatedSheet.xpSpent !== xpSpent) setXpSpent(updatedSheet.xpSpent ?? 0);
          if (updatedSheet.spSpent !== spSpent) setSpSpent(updatedSheet.spSpent ?? 0);
          
          // Update dot states only if they've changed
          if (updatedSheet.classCardDots && JSON.stringify(updatedSheet.classCardDots) !== JSON.stringify(classCardDots)) {
            setClassCardDots(updatedSheet.classCardDots.map((row: boolean[]) => [...row]));
          }
          
          // Update character details only if they've changed
          if (updatedSheet.charClass !== charClass) setCharClass(updatedSheet.charClass || "");
          if (updatedSheet.subclass !== subclass) setSubclass(updatedSheet.subclass || "");
          if (updatedSheet.species !== species) setSpecies(updatedSheet.species || "");
          if (updatedSheet.subspecies !== subspecies) setSubspecies(updatedSheet.subspecies || "");
        }
      }
    };

    const handleCharacterUpdate = (e: CustomEvent<{ sheet: CharacterSheet }>) => {
      if (sheet?.id && e.detail.sheet.id === sheet.id) {
        const updatedSheet = e.detail.sheet;
        // Only update state if values have actually changed
        if (updatedSheet.xpTotal !== xpTotal) setXpTotal(updatedSheet.xpTotal ?? 0);
        if (updatedSheet.spTotal !== spTotal) setSpTotal(updatedSheet.spTotal ?? 0);
        if (updatedSheet.xpSpent !== xpSpent) setXpSpent(updatedSheet.xpSpent ?? 0);
        if (updatedSheet.spSpent !== spSpent) setSpSpent(updatedSheet.spSpent ?? 0);
        
        // Update dot states only if they've changed
        if (updatedSheet.classCardDots && JSON.stringify(updatedSheet.classCardDots) !== JSON.stringify(classCardDots)) {
          setClassCardDots(updatedSheet.classCardDots.map((row: boolean[]) => [...row]));
        }
        
        // Update character details only if they've changed
        if (updatedSheet.charClass !== charClass) setCharClass(updatedSheet.charClass || "");
        if (updatedSheet.subclass !== subclass) setSubclass(updatedSheet.subclass || "");
        if (updatedSheet.species !== species) setSpecies(updatedSheet.species || "");
        if (updatedSheet.subspecies !== subspecies) setSubspecies(updatedSheet.subspecies || "");
      }
    };

    // Listen for storage changes from other windows
    window.addEventListener('storage', handleStorageChange);
    // Listen for character updates from current window
    window.addEventListener('character-updated', handleCharacterUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('character-updated', handleCharacterUpdate as EventListener);
    };
  }, [sheet?.id, charClass, subclass, species, subspecies, xpTotal, spTotal, xpSpent, spSpent]);

  // Auto-save when XP/SP totals change
  React.useEffect(() => {
    if (sheet && (sheet.xpTotal !== xpTotal || sheet.spTotal !== spTotal)) {
      const updatedSheet = { ...sheet, xpTotal, spTotal };
      saveCharacterSheet(updatedSheet);
    }
  }, [xpTotal, spTotal, sheet]);

  // Persistent state for class card dots (Chemist: Feature(2), Technique(4), Attack(2), Strike(1), Perks(1))
  const defaultChemistDots = [ 
    [false, false], // Feature: +1 Chem Token max (2 dots)
    [false],        // Feature: +2 Crit (1 dot)
    [false, false, false], // Technique: +1hx (3 dots)
    [false],        // Technique: +1d6 Chemical per Token (1 dot)
    [false],        // Technique: +1hx Range per Token (1 dot)
    [false, false], // Technique: -1 Cooldown (2 dots)
    [false, false, false], // Attack: Increase die size (3 dots)
    [false, false, false], // Attack: +1 Crit (3 dots)
    [false, false, false], // Strike: +1 Damage die (3 dots)
    [false]         // Perks: Chemical Concoctions (1 dot)
  ];
  const [classCardDots, setClassCardDots] = useState<boolean[][]>(
    sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length >= 10
      ? sheet.classCardDots.map(row => [...row])
      : defaultChemistDots.map(row => [...row])
  );

  // Save to sheet and localStorage
  const persistClassCardDots = (newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
    let newSpSpent = spSpent + spSpentDelta;
    let newXpSpent = xpSpent + xpSpentDelta;
    // Enforce XP/SP cannot exceed total
    if (newXpSpent > xpTotal) {
      setNotice("The xp cost of your selection is too high! You cannot spend more xp than your xp Total.");
      return;
    }
    if (newSpSpent > spTotal) {
      setNotice("The sp cost of your selection is too high! You cannot spend more sp than your sp Total.");
      return;
    }
    setClassCardDots(newDots);
    newSpSpent = Math.max(0, newSpSpent);
    newXpSpent = Math.max(0, newXpSpent);
    setSpSpent(newSpSpent);
    setXpSpent(newXpSpent);
    if (sheet) {
      const updatedSheet = { ...sheet, classCardDots: newDots, spSpent: newSpSpent, xpSpent: newXpSpent };
      saveCharacterSheet(updatedSheet);
    }
  };
  // Class options (copied from CharacterEditor)
  const classOptions = [
    { label: "Chemist", value: "Chemist", color: "#721131" },
    { label: "Coder", value: "Coder", color: "#112972" },
    { label: "Commander", value: "Commander", color: "#717211" },
    { label: "Contemplative", value: "Contemplative", color: "#116372" },
    { label: "Devout", value: "Devout", color: "#6b1172" },
    { label: "Elementalist", value: "Elementalist", color: "#231172" },
    { label: "Exospecialist", value: "Exospecialist", color: "#117233" },
    { label: "Gunslinger", value: "Gunslinger", color: "#4e7211" },
    { label: "Technician", value: "Technician", color: "#724811" }
  ];

  const subclassOptionsMap: { [key: string]: { label: string; value: string; color: string }[] } = {
    Chemist: [
      { label: "Anatomist", value: "Anatomist", color: "#66cf00" },
      { label: "Grenadier", value: "Grenadier", color: "#cf0000" },
      { label: "Necro", value: "Necro", color: "#0033cf" },
      { label: "Poisoner", value: "Poisoner", color: "#cf7600" },
    ],
    Coder: [
      { label: "Coercive", value: "Coercive", color: "#43c9ff" },
      { label: "Divinist", value: "Divinist", color: "#ff4343" },
      { label: "Naturalist", value: "Naturalist", color: "#66cf00" },
      { label: "Technologist", value: "Technologist", color: "#8c43ff" },
    ],
    Commander: [
      { label: "Beguiler", value: "Beguiler", color: "#1f21ce" },
      { label: "Galvanic", value: "Galvanic", color: "#6fce1f" },
      { label: "Tactician", value: "Tactician", color: "#cec31f" },
      { label: "Tyrant", value: "Tyrant", color: "#ce1f1f" },
    ],
    Contemplative: [
      { label: "Inertial", value: "Inertial", color: "#1c945e" },
      { label: "Kinetic", value: "Kinetic", color: "#7b941c" },
      { label: "Mercurial", value: "Mercurial", color: "#941c6c" },
      { label: "Vectorial", value: "Vectorial", color: "#531c94" },
    ],
    Devout: [
      { label: "Astral", value: "Astral", color: "#5bb1af" },
      { label: "Chaos", value: "Chaos", color: "#b15b6c" },
      { label: "Order", value: "Order", color: "#aeb15b" },
      { label: "Void", value: "Void", color: "#5b73b1" },
    ],
    Elementalist: [
      { label: "Air", value: "Air", color: "#0ee2df" },
      { label: "Earth", value: "Earth", color: "#e2b90e" },
      { label: "Fire", value: "Fire", color: "#e20e0e" },
      { label: "Water", value: "Water", color: "#0e42e2" },
    ],
    Exospecialist: [
      { label: "Aeronaut", value: "Aeronaut", color: "#3da1d8" },
      { label: "Brawler", value: "Brawler", color: "#d8a53d" },
      { label: "Dreadnaught", value: "Dreadnaught", color: "#d83da0" },
      { label: "Spectre", value: "Spectre", color: "#6a3dd8" },
    ],
    Gunslinger: [
      { label: "Ammo Coder", value: "Ammo Coder", color: "#0a3991" },
      { label: "Ordnancer", value: "Ordnancer", color: "#910a0a" },
      { label: "Pistoleer", value: "Pistoleer", color: "#5a910a" },
      { label: "Sniper", value: "Sniper", color: "#0a6f91" },
    ],
    Technician: [
      { label: "Hacker", value: "Hacker", color: "#5c57b8" },
      { label: "Junker", value: "Junker", color: "#6db857" },
      { label: "Nanoboticist", value: "Nanoboticist", color: "#57b8b0" },
      { label: "Tanker", value: "Tanker", color: "#b8578b" },
    ],
  };
  const subclassOptions = subclassOptionsMap[charClass] || [];

  // Flatten all subclasses for the 'all subclasses' dropdown
  const allSubclassOptions = Object.entries(subclassOptionsMap).flatMap(([cls, arr]) =>
    arr.map(opt => ({ ...opt, class: cls }))
  );

  const speciesOptions = [
    { label: "Avenoch", value: "Avenoch", color: "#2b5f59" },
    { label: "Cerebronych", value: "Cerebronych", color: "#5f5e2b" },
    { label: "Chloroptid", value: "Chloroptid", color: "#315f2b" },
    { label: "Cognizant", value: "Cognizant", color: "#2b3b5f" },
    { label: "Emberfolk", value: "Emberfolk", color: "#5f2b2b" },
    { label: "Entomos", value: "Entomos", color: "#5f422b" },
    { label: "Human", value: "Human", color: "#2b315f" },
    { label: "Lumenaren", value: "Lumenaren", color: "#515f2b" },
    { label: "Praedari", value: "Praedari", color: "#5f2b5c" },
  ];
  const subspeciesOptionsMap: { [key: string]: { label: string; value: string; color: string; species: string }[] } = {
    Avenoch: [
      { label: "Corvid", value: "Corvid", color: "#75904e", species: "Avenoch" },
      { label: "Falcador", value: "Falcador", color: "#6d7156", species: "Avenoch" },
      { label: "Nocturne", value: "Nocturne", color: "#334592", species: "" },
      { label: "Vulturine", value: "Vulturine", color: "#a96d8c", species: "" },
    ],
    Cerebronych: [],
    Chloroptid: [
      { label: "Barkskin", value: "Barkskin", color: "#5f2d2b", species: "Chloroptid" },
      { label: "Carnivorous", value: "Carnivorous", color: "#2b2d5f", species: "Chloroptid" },
      { label: "Drifting", value: "Drifting", color: "#5f8a5f", species: "Chloroptid" },
      { label: "Viny", value: "Viny", color: "#5f5f2b", species: "Chloroptid" },
    ],
    Cognizant: [
      { label: "Android", value: "Android", color: "#581fbd", species: "Cognizant" },
      { label: "Utility Droid", value: "Utility Droid", color: "#bd891f", species: "Cognizant" },
    ],
    Emberfolk: [
      { label: "Petran", value: "Petran", color: "#735311", species: "Emberfolk" },
      { label: "Pyran", value: "Pyran", color: "#b31111", species: "Emberfolk" },
    ],
    Entomos: [
      { label: "Apocritan", value: "Apocritan", color: "#6d7156", species: "Entomos" },
      { label: "Dynastes", value: "Dynastes", color: "#334592", species: "Entomos" },
      { label: "Mantid", value: "Mantid", color: "#75904e", species: "Entomos" },
    ],
    Human: [
      { label: "Diminutive Evolution", value: "Diminutive Evolution", color: "#c3735f", species: "Human" },
      { label: "Lithe Evolution", value: "Lithe Evolution", color: "#2b5f5f", species: "Human" },
      { label: "Massive Evolution", value: "Massive Evolution", color: "#2b175f", species: "Human" },
      { label: "Stout Evolution", value: "Stout Evolution", color: "#5f2b2b", species: "Human" },
    ],
    Lumenaren: [
      { label: "Infrared", value: "Infrared", color: "#b17fbe", species: "" },
      { label: "Radiofrequent", value: "Radiofrequent", color: "#bea97f", species: "" },
      { label: "X-Ray", value: "X-Ray", color: "#7f8abe", species: "" },
    ],
    Praedari: [
      { label: "Canid", value: "Canid", color: "#2f8da6", species: "Praedari" },
      { label: "Felid", value: "Felid", color: "#b16326", species: "Praedari" },
      { label: "Mustelid", value: "Mustelid", color: "#699239", species: "Praedari" },
      { label: "Ursid", value: "Ursid", color: "#9026b1", species: "Praedari" },
    ],
  };
  const allSubspeciesOptions = Object.values(subspeciesOptionsMap).flat();
  const hostOptions = [
    { label: "Avenoch Host", value: "Avenoch Host", color: "#2b5f59", hostColor: "#2b5f59" },
    { label: "Corvid Avenoch Host", value: "Corvid Avenoch Host", color: "#75904e", hostColor: "#2b5f59" },
    { label: "Falcador Avenoch Host", value: "Falcador Avenoch Host", color: "#6d7156", hostColor: "#2b5f59" },
    { label: "Nocturne Avenoch Host", value: "Nocturne Avenoch Host", color: "#334592", hostColor: "#2b5f59" },
    { label: "Vulturine Avenoch Host", value: "Vulturine Avenoch Host", color: "#a96d8c", hostColor: "#2b5f59" },
    { label: "Chloroptid Host", value: "Chloroptid Host", color: "#315f2b", hostColor: "#315f2b" },
    { label: "Barkskin Chloroptid Host", value: "Barkskin Chloroptid Host", color: "#5f2d2b", hostColor: "#315f2b" },
    { label: "Carnivorous Chloroptid Host", value: "Carnivorous Chloroptid Host", color: "#2b2d5f", hostColor: "#315f2b" },
    { label: "Drifting Chloroptid Host", value: "Drifting Chloroptid Host", color: "#5f8a5f", hostColor: "#315f2b" },
    { label: "Viny Chloroptid Host", value: "Viny Chloroptid Host", color: "#5f5f2b", hostColor: "#315f2b" },
    { label: "Cognizant Host", value: "Cognizant Host", color: "#2b3b5f", hostColor: "#2b3b5f" },
    { label: "Android Cognizant Host", value: "Android Cognizant Host", color: "#581fbd", hostColor: "#2b3b5f" },
    { label: "Utility Droid Cognizant Host", value: "Utility Droid Cognizant Host", color: "#bd891f", hostColor: "#2b3b5f" },
    { label: "Emberfolk Host", value: "Emberfolk Host", color: "#5f2b2b", hostColor: "#5f2b2b" },
    { label: "Petran Emberfolk Host", value: "Petran Emberfolk Host", color: "#735311", hostColor: "#5f2b2b" },
    { label: "Pyran Emberfolk Host", value: "Pyran Emberfolk Host", color: "#b31111", hostColor: "#5f2b2b" },
    { label: "Entomos Host", value: "Entomos Host", color: "#5f422b", hostColor: "#5f422b" },
    { label: "Apocritan Entomos Host", value: "Apocritan Entomos Host", color: "#6d7156", hostColor: "#5f422b" },
    { label: "Dynastes Entomos Host", value: "Dynastes Entomos Host", color: "#334592", hostColor: "#5f422b" },
    { label: "Mantid Entomos Host", value: "Mantid Entomos Host", color: "#75904e", hostColor: "#5f422b" },
    { label: "Human Host", value: "Human Host", color: "#2b315f", hostColor: "#2b315f" },
    { label: "Diminutive Human Host", value: "Diminutive Human Host", color: "#c3735f", hostColor: "#2b315f" },
    { label: "Lithe Human Host", value: "Lithe Human Host", color: "#2b5f5f" },
    { label: "Massive Human Host", value: "Massive Human Host", color: "#2b175f" },
    { label: "Stout Human Host", value: "Stout Human Host", color: "#5f2b2b" },
    { label: "Lumenaren Host", value: "Lumenaren Host", color: "#515f2b" },
    { label: "Infrared Lumenaren Host", value: "Infrared Lumenaren Host", color: "#b17fbe" },
    { label: "Radiofrequent Lumenaren Host", value: "Radiofrequent Lumenaren Host", color: "#bea97f" },
    { label: "X-Ray Lumenaren Host", value: "X-Ray Lumenaren Host", color: "#7f8abe" },
    { label: "Praedari Host", value: "Praedari Host", color: "#5f2b5c" },
    { label: "Canid Praedari Host", value: "Canid Praedari Host", color: "#2f8da6" },
    { label: "Felid Praedari Host", value: "Felid Praedari Host", color: "#b16326" },
    { label: "Mustelid Praedari Host", value: "Mustelid Praedari Host", color: "#699239" },
    { label: "Ursid Praedari Host", value: "Ursid Praedari Host", color: "#9026b1" },
  ];
  const subspeciesOptions = species === "Cerebronych"
    ? hostOptions
    : subspeciesOptionsMap[species] || [];


  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    // Save all local state to the character sheet
    if (sheet) {
      const updatedSheet = { 
        ...sheet, 
        charClass, 
        subclass, 
        species, 
        subspecies,
        xpTotal,
        spTotal,
        xpSpent,
        spSpent,
        classCardDots,
        xpRemaining: xpTotal - xpSpent,
        spRemaining: spTotal - spSpent
      };
      saveCharacterSheet(updatedSheet);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('character-updated', { 
        detail: { sheet: updatedSheet } 
      }));
    }
    
    // Also call the parent's onSave for any additional logic
    onSave();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, fontSize: '2em', flexShrink: 0 }}>Level Up</h2>
          {/* XP/SP Summary Bubble */}
          <div style={{
            display: 'inline-block',
            background: '#fff',
            border: '2px solid #000',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(180,143,6,0.08)',
            padding: '0.7em 1.5em',
            marginTop: '0.5em',
            marginBottom: '0.5em',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '1.08em',
            color: '#222',
            minWidth: 220,
            maxWidth: 340,
            textAlign: 'left',
            fontWeight: 500,
            letterSpacing: '0.01em',
            lineHeight: 1.4,
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2em 2.2em', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b>xp Total</b>
                <div className={styles.numberInputContainer}>
                  <button
                    className={`${styles.numberSpinnerButton} ${styles.minus}`}
                    onClick={() => setXpTotal(Math.max(0, xpTotal - 1))}
                    type="button"
                  >
                    −
                  </button>
                  <input
                    className={styles.numberInputWithSpinner}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={xpTotal}
                    onChange={e => setXpTotal(Math.max(0, +e.target.value.replace(/[^0-9]/g, "")))}
                    style={{ width: 80, fontWeight: 'bold' }}
                  />
                  <button
                    className={`${styles.numberSpinnerButton} ${styles.plus}`}
                    onClick={() => setXpTotal(xpTotal + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
              <div><b>xp Spent:</b> {xpSpent}</div>
              <div><b>Remaining xp:</b> {xpTotal - xpSpent}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b>sp Total</b>
                <div className={styles.numberInputContainer}>
                  <button
                    className={`${styles.numberSpinnerButton} ${styles.minus}`}
                    onClick={() => setSpTotal(Math.max(0, spTotal - 1))}
                    type="button"
                  >
                    −
                  </button>
                  <input
                    className={styles.numberInputWithSpinner}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={spTotal}
                    onChange={e => setSpTotal(Math.max(0, +e.target.value.replace(/[^0-9]/g, "")))}
                    style={{ fontWeight: 'bold' }}
                  />
                  <button
                    className={`${styles.numberSpinnerButton} ${styles.plus}`}
                    onClick={() => setSpTotal(spTotal + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
              <div><b>sp Spent:</b> {spSpent}</div>
              <div><b>Remaining sp:</b> {spTotal - spSpent}</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <button
            onClick={handleSave}
            className={styles.saveButton}
            disabled={isSaved}
          >
            {isSaved ? "Saved!" : "Save"}
          </button>
          <button
            onClick={onCards}
            style={{
              background: '#1976d2',
              color: 'white',
              border: '1px solid #115293',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
            }}
          >
            Cards
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
      
      {/* 4-column, 2-row CSS grid, outer grey box removed */}
      <div className={styles.characterSheetGrid} style={{ marginTop: '2rem', marginBottom: '2rem', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {/* Class Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Class</div>
            <div className={styles.selectWrapper} style={{ width: '100%' }}>
              <select
                value={charClass}
                onChange={e => setCharClass(e.target.value)}
                className={styles.colorSelect + ' ' + styles.selectedClassColor}
                style={{
                  '--selected-class-color': (charClass && classOptions.find(opt => opt.value === charClass)?.color) || '#000',
                  fontWeight: 'bold',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  textAlign: 'center',
                  color: `${(charClass && classOptions.find(opt => opt.value === charClass)?.color) || '#000'} !important`,
                  minWidth: '120px',
                  background: 'white',
                  width: '100%',
                  fontSize: '1.3em'
                } as React.CSSProperties}
              >
                <option value="" style={{ color: 'black', backgroundColor: 'white' }}>Select Class</option>
                {classOptions.map(opt => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    style={{
                      color: opt.color,
                      backgroundColor: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Feature information when Chemist is selected */}
            {charClass === "Chemist" && (
              <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {/* Feature header */}
                <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.08em', marginBottom: '8px' }}>
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
                    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                      <b><i style={{ color: '#721131', fontSize: '1em' }}>Chemical Reaction.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>At the start of each round, you gain 1 <i>Chem Token</i>, up to a maximum of 3 <i>Chem Tokens</i>. While you have at least 1 <i>Chem Token</i>, your <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> deals +1 Damage die.</span>
                    </span>
                  </span>
                </div>
                {/* XP progression table - interactive dots */}
                <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 24px 24px 24px',
                    gridTemplateRows: 'repeat(5, auto)',
                    columnGap: '6px',
                    rowGap: '2px',
                    alignItems: 'start',
                    marginBottom: '2px',
                    width: '100%',
                    paddingLeft: '4px'
                  }}>
                    {/* Row 1: XP header */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                    <span></span>
                    {/* Row 2: +1 Chem Token max dots (interactive) */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 <i>Chem Token</i> max</span>
                    {[0,1].map(idx => {
                      const arr = classCardDots[0];
                      const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                      const rightmostChecked = arr.lastIndexOf(true);
                      const canUncheck = arr[idx] && idx === rightmostChecked;
                      // XP cost for each dot (3xp, 5xp)
                      const xpCosts = [3, 5];
                      return (
                        <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                          <span
                            onClick={() => {
                              if (!arr[idx] && canCheck) {
                                const newDots = classCardDots.map(row => [...row]);
                                for (let j = 0; j <= idx; ++j) newDots[0][j] = true;
                                let delta = 0;
                                for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                persistClassCardDots(newDots, 0, delta);
                              } else if (arr[idx] && canUncheck) {
                                const newDots = classCardDots.map(row => [...row]);
                                for (let j = idx; j < arr.length; ++j) newDots[0][j] = false;
                                let delta = 0;
                                for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                                persistClassCardDots(newDots, 0, delta);
                              }
                            }}
                            style={{
                              width: '11px',
                              height: '11px',
                              border: '2px solid #000',
                              borderRadius: '50%',
                              display: 'block',
                              background: arr[idx] ? '#000' : '#fff',
                              cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                              transition: 'background 0.2s'
                            }}
                          ></span>
                        </span>
                      );
                    })}
                    <span></span>
                    {/* Row 3: XP header (7xp in col 2) */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
                    <span></span>
                    <span></span>
                    {/* Row 4: +2 Crit dot (interactive, col 2) */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+2 Crit</span>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                      {(() => {
                        const arr = classCardDots[1];
                        const idx = 0;
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for this dot (7xp)
                        const xpCosts = [7];
                        return (
                          <span
                            onClick={() => {
                              if (!arr[idx] && canCheck) {
                                const newDots = classCardDots.map(row => [...row]);
                                for (let j = 0; j <= idx; ++j) newDots[1][j] = true;
                                let delta = 0;
                                for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                persistClassCardDots(newDots, 0, delta);
                              } else if (arr[idx] && canUncheck) {
                                const newDots = classCardDots.map(row => [...row]);
                                for (let j = idx; j < arr.length; ++j) newDots[1][j] = false;
                                let delta = 0;
                                for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                                persistClassCardDots(newDots, 0, delta);
                              }
                            }}
                            style={{
                              width: '11px',
                              height: '11px',
                              border: '2px solid #000',
                              borderRadius: '50%',
                              display: 'block',
                              background: arr[idx] ? '#000' : '#fff',
                              cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                              transition: 'background 0.2s'
                            }}
                          ></span>
                        );
                      })()}
                    </span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                {/* Technique section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <b><i style={{ color: '#721131', fontSize: '1em' }}>Volatile Experiments</i></b> <i style={{ color: '#721131', fontSize: '1em' }}>(Cooldown 4).</i> You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within 3hx of you gain +2 to Crit rolls on <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> for each Token spent until the start of the next round.
                  </div>
                  <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    {/* Technique XP/dot grid */}
                    {/* 4x8 grid: alternating XP label header rows and feature text/dot rows, with correct XP/dot placement and no borders */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 24px 24px 24px',
                      gridTemplateRows: 'repeat(8, auto)',
                      columnGap: '6px',
                      rowGap: '2px',
                      alignItems: 'start',
                      marginBottom: '2px',
                      width: '100%',
                      paddingLeft: '4px'
                    }}>
                      {/* Row 1: XP header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
                      {/* Row 2: +1hx dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
                      {[0,1,2].map(idx => {
                        const arr = classCardDots[2];
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot (3xp, 6xp, 9xp)
                        const xpCosts = [3, 6, 9];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = 0; j <= idx; ++j) newDots[2][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = idx; j < arr.length; ++j) newDots[2][j] = false;
                                  let delta = 0;
                                  for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                }
                              }}
                              style={{
                                width: '11px',
                                height: '11px',
                                border: '2px solid #000',
                                borderRadius: '50%',
                                display: 'block',
                                background: arr[idx] ? '#000' : '#fff',
                                cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                                transition: 'background 0.2s'
                              }}
                            ></span>
                          </span>
                        );
                      })}
                      {/* Row 3: XP header (7xp in col 2) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
                      <span></span>
                      <span></span>
                      {/* Row 4: +1d6 Chemical per Token dot (dot in col 2) */}
                      <span style={{ fontSize: '0.98em', color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          +1d6&nbsp;
                          <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
                            Chemical
                            <img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
                          </u></b>
                          &nbsp;per&nbsp;<i>Token</i>
                        </span>
                      </span>
                      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                        {(() => {
                          const arr = classCardDots[3];
                          const idx = 0;
                          const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                          const rightmostChecked = arr.lastIndexOf(true);
                          const canUncheck = arr[idx] && idx === rightmostChecked;
                          // XP cost for this dot (7xp)
                          const xpCosts = [7];
                          return (
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = 0; j <= idx; ++j) newDots[3][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = idx; j < arr.length; ++j) newDots[3][j] = false;
                                  let delta = 0;
                                  for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                }
                              }}
                              style={{
                                width: '11px',
                                height: '11px',
                                border: '2px solid #000',
                                borderRadius: '50%',
                                display: 'block',
                                background: arr[idx] ? '#000' : '#fff',
                                cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                                transition: 'background 0.2s'
                              }}
                            ></span>
                          );
                        })()}
                      </span>
                      <span></span>
                      <span></span>
                      {/* Row 5: XP header (6xp in col 2) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      <span></span>
                      <span></span>
                      {/* Row 6: +1hx Range per Token dot (dot in col 2) */}
                      <span style={{ fontSize: '0.98em', color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                        +1hx Range per <i>Token</i>
                      </span>
                      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                        {(() => {
                          const arr = classCardDots[4];
                          const idx = 0;
                          const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                          const rightmostChecked = arr.lastIndexOf(true);
                          const canUncheck = arr[idx] && idx === rightmostChecked;
                          // XP cost for this dot (6xp)
                          const xpCosts = [6];
                          return (
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = 0; j <= idx; ++j) newDots[4][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = idx; j < arr.length; ++j) newDots[4][j] = false;
                                  let delta = 0;
                                  for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                }
                              }}
                              style={{
                                width: '11px',
                                height: '11px',
                                border: '2px solid #000',
                                borderRadius: '50%',
                                display: 'block',
                                background: arr[idx] ? '#000' : '#fff',
                                cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                                transition: 'background 0.2s'
                              }}
                            ></span>
                          );
                        })()}
                      </span>
                      <span></span>
                      <span></span>
                      {/* Row 7: XP header (5xp col 2, 8xp col 3) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span></span>
                      {/* Row 8: -1 Cooldown dots (dot in col 2 and col 3) */}
                      <span style={{ fontSize: '0.98em', color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                        -1 <i>Cooldown</i>
                      </span>
                      {[0,1].map(idx => {
                        const arr = classCardDots[5];
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot (5xp, 8xp)
                        const xpCosts = [5, 8];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = 0; j <= idx; ++j) newDots[5][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = idx; j < arr.length; ++j) newDots[5][j] = false;
                                  let delta = 0;
                                  for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                }
                              }}
                              style={{
                                width: '11px',
                                height: '11px',
                                border: '2px solid #000',
                                borderRadius: '50%',
                                display: 'block',
                                background: arr[idx] ? '#000' : '#fff',
                                cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                                transition: 'background 0.2s'
                              }}
                            ></span>
                          </span>
                        );
                      })}
                      <span></span>
                    </div>
                  </div>
                </div>
                {/* Attack section */}
                <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b>.<br/>
                    <i>Dart Guns.</i> 8hx Range, Single Target, 18+ Crit, 1d6 Damage.
                  </div>
                  <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 24px 24px 24px',
                      gridTemplateRows: 'repeat(4, auto)',
                      columnGap: '6px',
                      rowGap: '2px',
                      alignItems: 'start',
                      marginBottom: '2px',
                      width: '100%',
                      paddingLeft: '4px'
                    }}>
                      {/* Row 1: XP header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
                      {/* Row 2: Increase die size dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Increase die size</span>
                      {[0,1,2].map(idx => {
                        const arr = classCardDots[6];
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot
                        const xpCosts = [5, 8, 12];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = 0; j <= idx; ++j) newDots[6][j] = true;
                                  // Add up all xp costs for newly checked dots
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = idx; j < arr.length; ++j) newDots[6][j] = false;
                                  // Subtract all xp costs for unchecked dots
                                  let delta = 0;
                                  for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                }
                              }}
                              style={{
                                width: '11px',
                                height: '11px',
                                border: '2px solid #000',
                                borderRadius: '50%',
                                display: 'block',
                                background: arr[idx] ? '#000' : '#fff',
                                cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                                transition: 'background 0.2s'
                              }}
                            ></span>
                          </span>
                        );
                      })}
                      {/* Row 3: XP header (3xp, 5xp, 7xp) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
                      {/* Row 4: +1 Crit dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = classCardDots[7];
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot
                        const xpCosts = [3, 5, 7];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = 0; j <= idx; ++j) newDots[7][j] = true;
                                  // Add up all xp costs for newly checked dots
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = idx; j < arr.length; ++j) newDots[7][j] = false;
                                  // Subtract all xp costs for unchecked dots
                                  let delta = 0;
                                  for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                }
                              }}
                              style={{
                                width: '11px',
                                height: '11px',
                                border: '2px solid #000',
                                borderRadius: '50%',
                                display: 'block',
                                background: arr[idx] ? '#000' : '#fff',
                                cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                                transition: 'background 0.2s'
                              }}
                            ></span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* Strike section */}
                <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <b><i><span style={{ color: '#351c75' }}>Strike</span> Damage.</i></b> 1d6 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
                      Chemical
                      <img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
                    </u></b>.
                  </div>
                  <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 24px 24px 24px',
                      gridTemplateRows: 'repeat(2, auto)',
                      columnGap: '6px',
                      rowGap: '2px',
                      alignItems: 'start',
                      marginBottom: '2px',
                      width: '100%',
                      paddingLeft: '4px'
                    }}>
                      {/* Row 1: XP header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>18xp</span>
                      {/* Row 2: +1 Damage die dots (interactive, with xpSpent) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
                      {[0,1,2].map(idx => {
                        const arr = classCardDots[8];
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot
                        const xpCosts = [6, 10, 18];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = 0; j <= idx; ++j) newDots[8][j] = true;
                                  // Add up all xp costs for newly checked dots
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = classCardDots.map(row => [...row]);
                                  for (let j = idx; j < arr.length; ++j) newDots[8][j] = false;
                                  // Subtract all xp costs for unchecked dots
                                  let delta = 0;
                                  for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                }
                              }}
                              style={{
                                width: '11px',
                                height: '11px',
                                border: '2px solid #000',
                                borderRadius: '50%',
                                display: 'block',
                                background: arr[idx] ? '#000' : '#fff',
                                cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                                transition: 'background 0.2s'
                              }}
                            ></span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* Perks section */}
                <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <i><b>Skills.</b> Investigation</i> +2
                  </div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
                        <b><i style={{ color: '#721131' }}>Chemical Concoctions.</i></b> You can create myriad concoctions. When doing so, choose a skill. Upon drinking a concoction, the imbiber gains an advantage on the next skill roll of your choice. You can create up to 3 concoctions per day which each last until the end of the day.
                      </span>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '24px',
                        gridTemplateRows: 'repeat(2, auto)',
                        alignItems: 'start',
                        justifyItems: 'center',
                        minWidth: '24px',
                        marginLeft: '4px'
                      }}>
                        {/* Row 1: 10sp */}
                        <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10sp</span>
                        {/* Row 2: dot (interactive) */}
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                          {(() => {
                            const arr = classCardDots[9];
                            const idx = 0;
                            const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                            const rightmostChecked = arr.lastIndexOf(true);
                            const canUncheck = arr[idx] && idx === rightmostChecked;
                            return (
                              <span
                                onClick={() => {
                                  if (!arr[idx] && canCheck) {
                                    const newDots = classCardDots.map(row => [...row]);
                                    for (let j = 0; j <= idx; ++j) newDots[9][j] = true;
                                    persistClassCardDots(newDots, 10);
                                  } else if (arr[idx] && canUncheck) {
                                    const newDots = classCardDots.map(row => [...row]);
                                    for (let j = idx; j < arr.length; ++j) newDots[9][j] = false;
                                    persistClassCardDots(newDots, -10);
                                  }
                                }}
                                style={{
                                  width: '11px',
                                  height: '11px',
                                  border: '2px solid #000',
                                  borderRadius: '50%',
                                  display: 'block',
                                  background: arr[idx] ? '#000' : '#fff',
                                  cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                                  transition: 'background 0.2s'
                                }}
                              ></span>
                            );
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Subclass Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Subclass</div>
            <div className={styles.selectWrapper} style={{ width: '100%' }}>
              <select
                value={subclass}
                onChange={e => {
                  const val = e.target.value;
                  setSubclass(val);
                  if (!charClass && val) {
                    const found = allSubclassOptions.find(opt => opt.value === val);
                    if (found) setCharClass(found.class);
                  }
                }}
                className={styles.colorSelect + ' ' + styles.selectedSubclassColor}
                style={{
                  '--selected-subclass-color': subclassOptions.find(opt => opt.value === subclass)?.color || '#000',
                  fontWeight: 'bold',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  textAlign: 'center',
                  color: `${(subclassOptions.find(opt => opt.value === subclass) || allSubclassOptions.find(opt => opt.value === subclass))?.color || '#000'} !important`,
                  minWidth: '120px',
                  background: 'white',
                  width: '100%',
                  fontSize: '1.3em'
                } as React.CSSProperties}
              >
                <option value="" style={{ color: 'black', backgroundColor: 'white' }}>Select Subclass</option>
                {(charClass ? subclassOptions : allSubclassOptions).map(opt => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    style={{
                      color: opt.color,
                      backgroundColor: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
        </div>
        {/* Species Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Species</div>
            <div className={styles.selectWrapper} style={{ width: '100%' }}>
              <select
                value={species}
                onChange={e => {
                  setSpecies(e.target.value);
                  setSubspecies("");
                }}
                className={styles.colorSelect + ' ' + styles.selectedSpeciesColor}
                style={{
                  '--selected-species-color': speciesOptions.find(opt => opt.value === species)?.color || '#000',
                  fontWeight: 'bold',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  textAlign: 'center',
                  color: `${(speciesOptions.find(opt => opt.value === species)) || allSubspeciesOptions.find(opt => opt.value === species)?.color || '#000'} !important`,
                  minWidth: '120px',
                  background: 'white',
                  width: '100%',
                  fontSize: '1.3em'
                } as React.CSSProperties}
              >
                <option value="" style={{ color: 'black', backgroundColor: 'white' }}>Select Species</option>
                {speciesOptions.map(opt => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    style={{
                      color: opt.color,
                      backgroundColor: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
        </div>
        {/* Subspecies Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Subspecies</div>
            <div className={styles.selectWrapper} style={{ width: '100%' }}>
              <select
                value={subspecies}
                onChange={e => {
                  const val = e.target.value;
                  setSubspecies(val);
                  if (!species && val) {
                    const found = allSubspeciesOptions.find(opt => opt.value === val);
                    if (found) setSpecies(found.species);
                  }
                }}
                className={styles.colorSelect + ' ' + styles.selectedSubspeciesColor}
                style={{
                  '--selected-subspecies-color': (subspeciesOptions.find(opt => opt.value === subspecies) || allSubspeciesOptions.find(opt => opt.value === subspecies))?.color || '#000',
                  fontWeight: 'bold',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  textAlign: 'center',
                  color: `${(subspeciesOptions.find(opt => opt.value === subspecies) || allSubspeciesOptions.find(opt => opt.value === subspecies))?.color || '#000'} !important`,
                  minWidth: '120px',
                  background: 'white',
                  width: '100%',
                  fontSize: '1.3em'
                } as React.CSSProperties}
              >
                <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                  {species === "Cerebronych" ? "Select Host" : "Select Subspecies"}
                </option>
                {(species === "Cerebronych"
                  ? hostOptions
                  : (species ? subspeciesOptions : allSubspeciesOptions)
                ).map(opt => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    style={{
                      color: opt.color,
                      backgroundColor: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
        </div>
      </div>
    {/* XP/SP Exceed Notice */}
    {notice && (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fdf6ee',
        color: '#a06a2b',
        fontWeight: 600,
        fontFamily: 'Georgia, Times New Roman, Times, serif',
        fontSize: '1.18em',
        border: '3px solid #e2c29a',
        borderRadius: '18px',
        padding: '18px 32px',
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(160,106,43,0.10)',
        textAlign: 'center',
        pointerEvents: 'none',
        minWidth: '340px',
        maxWidth: '90vw',
        letterSpacing: '0.01em',
      }}>
        {notice}
      </div>
    )}
    </div>
  );
};

export default LevelUp;
