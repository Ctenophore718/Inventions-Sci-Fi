
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
    setView("levelup");
  };

  const handleCards = () => {
    setView("cards");
  };

  const handleBackToEditor = () => {
    setView("editor");
  };

  const handleBackToHome = () => {
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
        />
      )}
    </div>
  );
};

export default App;