import { useState } from "react";
import SheetManager from "./components/SheetManager";
import CharacterEditor from "./components/CharacterEditor";
import type { CharacterSheet } from "./types/CharacterSheet";

const App = () => {
  const [currentSheet, setCurrentSheet] = useState<CharacterSheet | null>(null);
  const [view, setView] = useState<"manager" | "editor">("manager");

  const handleEdit = (sheet: CharacterSheet) => {
    setCurrentSheet(sheet);
    setView("editor");
  };

  const handleNew = () => {
    setCurrentSheet(null);
    setView("editor");
  };

  const handleSave = () => {
    setCurrentSheet(null);
    setView("manager");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Inventions Sci-Fi</h1>

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
        />
      )}
    </div>
  );
};

export default App;