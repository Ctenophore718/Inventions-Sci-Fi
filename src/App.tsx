
import React, { useState } from "react";
import SheetManager from "./components/SheetManager";
import CharacterEditor from "./components/CharacterEditor";
import LevelUp from "./components/LevelUp";
import Cards from "./components/Cards";
import type { CharacterSheet } from "./types/CharacterSheet";
import { loadSheetById, saveCharacterSheet } from "./utils/storage";


const App = () => {
  const [currentSheet, setCurrentSheet] = useState<CharacterSheet | null>(null);
  const [view, setView] = useState<"manager" | "editor" | "levelup" | "cards">("manager");

  // Shared state for syncing between CharacterEditor and LevelUp
  const [charClass, setCharClass] = useState<string>(currentSheet?.charClass || "");
  const [subclass, setSubclass] = useState<string>(currentSheet?.subclass || "");
  const [species, setSpecies] = useState<string>(currentSheet?.species || "");
  const [subspecies, setSubspecies] = useState<string>(currentSheet?.subspecies || "");

  // Auto-save debounce timeout
  const autoSaveTimeoutRef = React.useRef<number | null>(null);

  // Enhanced auto-save function that handles any character changes
  const performAutoSave = React.useCallback((updatedSheet: CharacterSheet) => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(() => {
      setCurrentSheet(updatedSheet);
      saveCharacterSheet(updatedSheet);
      console.log('Auto-saved character:', updatedSheet.name || 'Unnamed');
    }, 300); // 300ms debounce for better UX
  }, []);

  // Function to update current sheet with any changes
  // Helper function to create a new character sheet with default values
  const createNewCharacterSheet = (initialUpdates: Partial<CharacterSheet> = {}): CharacterSheet => {
    return {
      id: Date.now().toString(),
      // Identity
      playerName: "",
      name: "",
      charClass: charClass || "",
      subclass: subclass || "",
      species: species || "",
      subspecies: subspecies || "",
      background: "",
      
      // Features
      classFeature: "",
      subclassFeature: "",
      speciesFeature: "",
      subspeciesFeature: "",
      
      // Stats
      resistances: "",
      immunities: "",
      absorptions: "",
      movement: "",
      strike: "",
      xpTotal: 0,
      xpSpent: 0,
      xpRemaining: 0,
      spTotal: 0,
      spSpent: 0,
      spRemaining: 0,
      
      // Portrait
      portrait: "",
      
      // Combat
      speed: "",
      strikeDamage: "",
      maxHitPoints: 0,
      deathCount: 0,
      deathDots: new Array(10).fill(false),
      
      // Strike section
      multiStrike: 0,
      strikeEffects: "",
      
      // Attributes
      attributes: {
        strength: 0,
        dexterity: 0,
        intelligence: 0,
      },
      
      // Skills
      skills: [],
      skillsObj: {},
      skillDots: {},
      currentHitPoints: 0,
      
      // Persistent state for Level Up Class Card dots
      classCardDots: [],
      
      // Apply any initial updates
      ...initialUpdates
    };
  };

  const updateCurrentSheet = React.useCallback((updates: Partial<CharacterSheet>) => {
    if (!currentSheet) {
      // Create a new character sheet for the first save
      console.log('Creating new character sheet with updates:', updates);
      const newSheet = createNewCharacterSheet(updates);
      setCurrentSheet(newSheet);
      performAutoSave(newSheet);
      return;
    }
    
    const updatedSheet = { ...currentSheet, ...updates };
    performAutoSave(updatedSheet);
  }, [currentSheet, performAutoSave, charClass, subclass, species, subspecies]);

  // Cross-window synchronization
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "rpg-character-sheets" && currentSheet?.id) {
        // Reload the current character from storage
        const updatedSheet = loadSheetById(currentSheet.id);
        if (updatedSheet) {
          setCurrentSheet(updatedSheet);
          setCharClass(updatedSheet.charClass || "");
          setSubclass(updatedSheet.subclass || "");
          setSpecies(updatedSheet.species || "");
          setSubspecies(updatedSheet.subspecies || "");
        }
      }
    };

    const handleCharacterUpdate = (e: CustomEvent<{ sheet: CharacterSheet }>) => {
      if (currentSheet?.id && e.detail.sheet.id === currentSheet.id) {
        setCurrentSheet(e.detail.sheet);
        setCharClass(e.detail.sheet.charClass || "");
        setSubclass(e.detail.sheet.subclass || "");
        setSpecies(e.detail.sheet.species || "");
        setSubspecies(e.detail.sheet.subspecies || "");
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
  }, [currentSheet?.id]);

  // Keep state in sync with currentSheet changes
  // (If a new sheet is loaded, update all shared state)
  React.useEffect(() => {
    setCharClass(currentSheet?.charClass || "");
    setSubclass(currentSheet?.subclass || "");
    setSpecies(currentSheet?.species || "");
    setSubspecies(currentSheet?.subspecies || "");
  }, [currentSheet]);

  const handleEdit = (sheet: CharacterSheet) => {
    setCurrentSheet(sheet);
    setCharClass(sheet.charClass || "");
    setSubclass(sheet.subclass || "");
    setSpecies(sheet.species || "");
    setSubspecies(sheet.subspecies || "");
    setView("editor");
  };

  const handleNew = () => {
    setCurrentSheet(null);
    setCharClass("");
    setSubclass("");
    setSpecies("");
    setSubspecies("");
    setView("editor");
  };

  // Save and go home (for CharacterEditor)
  const handleSave = () => {
    if (currentSheet) {
      const updatedSheet = { 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      };
      setCurrentSheet(updatedSheet);
      saveCharacterSheet(updatedSheet);
    }
    setView("manager");
  };

  // Save only, do not navigate (for LevelUp and Cards)
  const handleSaveOnly = () => {
    if (currentSheet) {
      // Reload the current sheet from storage to get any updates made by components
      const latestSheet = loadSheetById(currentSheet.id);
      if (latestSheet) {
        // Update with the shared state and save
        const updatedSheet = { 
          ...latestSheet, 
          charClass, 
          subclass, 
          species, 
          subspecies 
        };
        setCurrentSheet(updatedSheet);
        saveCharacterSheet(updatedSheet);
      } else {
        // Fallback if sheet not found in storage
        const updatedSheet = { 
          ...currentSheet, 
          charClass, 
          subclass, 
          species, 
          subspecies 
        };
        setCurrentSheet(updatedSheet);
        saveCharacterSheet(updatedSheet);
      }
    }
    // No navigation
  };

  // Auto-save when shared state changes (debounced to prevent excessive saves)
  React.useEffect(() => {
    if (!currentSheet) return;
    
    const hasChanges = (
      currentSheet.charClass !== charClass ||
      currentSheet.subclass !== subclass ||
      currentSheet.species !== species ||
      currentSheet.subspecies !== subspecies
    );

    if (hasChanges) {
      // Debounce the save to prevent rapid-fire saves
      const timeoutId = setTimeout(() => {
        const updatedSheet = {
          ...currentSheet,
          charClass,
          subclass,
          species,
          subspecies
        };
        setCurrentSheet(updatedSheet);
        saveCharacterSheet(updatedSheet);
      }, 100); // 100ms debounce

      return () => clearTimeout(timeoutId);
    }
  }, [charClass, subclass, species, subspecies, currentSheet]);

  const handleLevelUp = () => {
    // Auto-save before navigation
    if (currentSheet) {
      const updatedSheet = { 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      };
      setCurrentSheet(updatedSheet);
      saveCharacterSheet(updatedSheet);
    }
    setView("levelup");
  };

  const handleCards = () => {
    // Auto-save before navigation
    if (currentSheet) {
      const updatedSheet = { 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      };
      setCurrentSheet(updatedSheet);
      saveCharacterSheet(updatedSheet);
    }
    setView("cards");
  };

  const handleBackToEditor = () => {
    // Auto-save before navigation
    if (currentSheet) {
      const updatedSheet = { 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      };
      setCurrentSheet(updatedSheet);
      saveCharacterSheet(updatedSheet);
    }
    setView("editor");
  };

  const handleBackToHome = () => {
    // Auto-save before navigation
    if (currentSheet) {
      const updatedSheet = { 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      };
      setCurrentSheet(updatedSheet);
      saveCharacterSheet(updatedSheet);
    }
    setView("manager");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Inventions Sci-Fi</h1>

      {view === "manager" && (
        <SheetManager 
          onLoad={handleEdit} 
          onNew={handleNew}
          onClear={() => setCurrentSheet(null)} 
        />
      )}

      {view === "editor" && (
        <CharacterEditor 
          sheet={currentSheet} 
          onSave={handleSave}
          onLevelUp={handleLevelUp}
          onCards={handleCards}
          onHome={handleBackToHome}
          onAutoSave={updateCurrentSheet}
          charClass={charClass}
          setCharClass={setCharClass}
          subclass={subclass}
          setSubclass={setSubclass}
          species={species}
          setSpecies={setSpecies}
          subspecies={subspecies}
          setSubspecies={setSubspecies}
        />
      )}

      {view === "levelup" && (
        <LevelUp 
          sheet={currentSheet} 
          onBack={handleBackToEditor}
          onCards={handleCards}
          onSave={handleSaveOnly}
          onHome={handleBackToHome}
          onAutoSave={updateCurrentSheet}
          charClass={charClass}
          setCharClass={setCharClass}
          subclass={subclass}
          setSubclass={setSubclass}
          species={species}
          setSpecies={setSpecies}
          subspecies={subspecies}
          setSubspecies={setSubspecies}
        />
      )}

      {view === "cards" && (
        <Cards 
          sheet={currentSheet} 
          onBack={handleBackToEditor}
          onLevelUp={handleLevelUp}
          onSave={handleSaveOnly}
          onHome={handleBackToHome}
          onAutoSave={updateCurrentSheet}
          charClass={charClass}
        />
      )}
    </div>
  );
};

export default App;