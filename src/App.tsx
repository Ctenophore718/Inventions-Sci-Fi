
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
  const [newCharacterCreated, setNewCharacterCreated] = useState(false); // Track if we've created a new character

  // Shared state for syncing between CharacterEditor and LevelUp
  const [charClass, setCharClass] = useState<string>(currentSheet?.charClass || "");
  const [subclass, setSubclass] = useState<string>(currentSheet?.subclass || "");
  const [species, setSpecies] = useState<string>(currentSheet?.species || "");
  const [subspecies, setSubspecies] = useState<string>(currentSheet?.subspecies || "");

  // Auto-save debounce timeout
  const autoSaveTimeoutRef = React.useRef<number | null>(null);

  // Enhanced auto-save function that handles any character changes
  const performAutoSave = React.useCallback((updatedSheet: CharacterSheet) => {
    console.log('performAutoSave called with:', updatedSheet);
    console.log('performAutoSave - setting currentSheet to:', updatedSheet.id);
    // Immediately update the current sheet state for navigation
    setCurrentSheet(updatedSheet);
    
    // Debounce the localStorage save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(() => {
      console.log('Actually saving to localStorage:', updatedSheet);
      saveCharacterSheet(updatedSheet);
      console.log('Auto-saved character:', updatedSheet.name || 'Unnamed');
    }, 300); // 300ms debounce for better UX
  }, []);

  // Add effect to track currentSheet changes
  React.useEffect(() => {
    console.log('currentSheet changed to:', currentSheet ? `ID: ${currentSheet.id}, Name: "${currentSheet.name || 'Unnamed'}"` : 'NULL');
  }, [currentSheet]);

  // Function to update current sheet with any changes
  // Helper function to create a new character sheet with default values
  const createNewCharacterSheet = (initialUpdates: Partial<CharacterSheet> = {}): CharacterSheet => {
    // Use a more stable ID generation to prevent duplicates
    const id = `sheet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id,
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
    console.log('updateCurrentSheet called with:', updates);
    console.log('current currentSheet:', currentSheet);
    console.log('newCharacterCreated flag:', newCharacterCreated);
    
    if (!currentSheet && !newCharacterCreated) {
      // Create a new character sheet for the first save
      console.log('Creating new character sheet with updates:', updates);
      const newSheet = createNewCharacterSheet(updates);
      console.log('Created new sheet:', newSheet);
      setCurrentSheet(newSheet);
      setNewCharacterCreated(true); // Mark that we've created a character
      
      // Immediately sync the App-level state with the new sheet
      setCharClass(newSheet.charClass || "");
      setSubclass(newSheet.subclass || "");
      setSpecies(newSheet.species || "");
      setSubspecies(newSheet.subspecies || "");
      
      performAutoSave(newSheet);
      return;
    }
    
    if (currentSheet) {
      const updatedSheet = { ...currentSheet, ...updates };
      console.log('Updating existing sheet:', updatedSheet);
      
      // Update App-level state if these fields changed
      if (updates.charClass !== undefined) setCharClass(updates.charClass);
      if (updates.subclass !== undefined) setSubclass(updates.subclass);
      if (updates.species !== undefined) setSpecies(updates.species);
      if (updates.subspecies !== undefined) setSubspecies(updates.subspecies);
      
      performAutoSave(updatedSheet);
    } else if (newCharacterCreated && (updates.hasFreeSkillStarterDots || updates.skillDots)) {
      // Allow critical initialization updates even if currentSheet isn't set yet
      console.log('Allowing critical initialization update:', updates);
      const newSheet = createNewCharacterSheet(updates);
      console.log('Created sheet with critical updates:', newSheet);
      setCurrentSheet(newSheet);
      performAutoSave(newSheet);
    } else {
      console.log('Ignoring update - no current sheet and already created character this session');
    }
  }, [currentSheet, performAutoSave, newCharacterCreated, charClass, subclass, species, subspecies]);

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
    console.log('handleEdit called with sheet:', sheet ? `ID: ${sheet.id}, Name: ${sheet.name}` : 'NULL');
    setCurrentSheet(sheet);
    setCharClass(sheet.charClass || "");
    setSubclass(sheet.subclass || "");
    setSpecies(sheet.species || "");
    setSubspecies(sheet.subspecies || "");
    setNewCharacterCreated(false); // Reset the flag when loading existing character
    console.log('handleEdit - setting view to editor');
    setView("editor");
  };

  const handleNew = () => {
    setCurrentSheet(null);
    setCharClass("");
    setSubclass("");
    setSpecies("");
    setSubspecies("");
    setNewCharacterCreated(true); // Set the flag when starting new character
    setView("editor");
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
    console.log('handleLevelUp called, currentSheet before:', currentSheet ? `ID: ${currentSheet.id}` : 'NULL');
    // Auto-save before navigation
    if (currentSheet) {
      const updatedSheet = { 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      };
      console.log('handleLevelUp - saving sheet:', updatedSheet.id);
      setCurrentSheet(updatedSheet);
      saveCharacterSheet(updatedSheet);
    }
    console.log('handleLevelUp - setting view to levelup');
    setView("levelup");
  };

  const handleCards = () => {
    console.log('handleCards called, currentSheet before:', currentSheet ? `ID: ${currentSheet.id}` : 'NULL');
    // Auto-save before navigation
    if (currentSheet) {
      const updatedSheet = { 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      };
      console.log('handleCards - saving sheet:', updatedSheet.id);
      setCurrentSheet(updatedSheet);
      saveCharacterSheet(updatedSheet);
    }
    console.log('handleCards - setting view to cards');
    setView("cards");
  };

  const handleBackToEditor = () => {
    console.log('handleBackToEditor called, currentSheet before:', currentSheet ? `ID: ${currentSheet.id}` : 'NULL');
    // Auto-save before navigation
    if (currentSheet) {
      const updatedSheet = { 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      };
      console.log('handleBackToEditor - saving sheet:', updatedSheet.id);
      setCurrentSheet(updatedSheet);
      
      // Force immediate save without debounce
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      saveCharacterSheet(updatedSheet);
      console.log('handleBackToEditor - sheet saved, navigating to editor');
    }
    console.log('handleBackToEditor - setting view to editor');
    setView("editor");
  };

  const handleBackToHome = async () => {
    console.log('handleBackToHome called, currentSheet before:', currentSheet ? `ID: ${currentSheet.id}` : 'NULL');
    // Auto-save before navigation
    if (currentSheet) {
      const updatedSheet = { 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      };
      console.log('handleBackToHome - saving sheet:', updatedSheet.id);
      setCurrentSheet(updatedSheet);
      
      // Force immediate save without debounce
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      saveCharacterSheet(updatedSheet);
      console.log('handleBackToHome - sheet saved, navigating to manager');
    }
    console.log('handleBackToHome - clearing currentSheet, setting view to manager');
    setCurrentSheet(null);
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
        <div>
          <CharacterEditor 
            sheet={currentSheet} 
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
            isNewCharacter={newCharacterCreated}
          />
        </div>
      )}

      {view === "levelup" && (
        <LevelUp 
          sheet={currentSheet} 
          onBack={handleBackToEditor}
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

      {view === "cards" && (
        <Cards 
          sheet={currentSheet} 
          onBack={handleBackToEditor}
          onLevelUp={handleLevelUp}
          onHome={handleBackToHome}
          charClass={charClass}
        />
      )}
    </div>
  );
};

export default App;