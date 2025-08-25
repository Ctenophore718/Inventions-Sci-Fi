
import React, { useState } from "react";
import SheetManager from "./components/SheetManager";
import CharacterEditor from "./components/CharacterEditor";
import LevelUp from "./components/LevelUp";
import Cards from "./components/Cards";
import type { CharacterSheet } from "./types/CharacterSheet";


const App = () => {
  const [currentSheet, setCurrentSheet] = useState<CharacterSheet | null>(null);
  const [view, setView] = useState<"manager" | "editor" | "levelup" | "cards">("manager");

  // Shared state for syncing between CharacterEditor and LevelUp
  const [charClass, setCharClass] = useState<string>(currentSheet?.charClass || "");
  const [subclass, setSubclass] = useState<string>(currentSheet?.subclass || "");
  const [species, setSpecies] = useState<string>(currentSheet?.species || "");
  const [subspecies, setSubspecies] = useState<string>(currentSheet?.subspecies || "");

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
      setCurrentSheet({ 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      });
    }
    setView("manager");
  };

  // Save only, do not navigate (for LevelUp and Cards)
  const handleSaveOnly = () => {
    if (currentSheet) {
      setCurrentSheet({ 
        ...currentSheet, 
        charClass, 
        subclass, 
        species, 
        subspecies 
      });
    }
    // No navigation
  };

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