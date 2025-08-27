import React, { useEffect, useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { loadAllSheets, deleteSheetById } from "../utils/storage"; 

type SheetManagerProps = {
  onLoad: (sheet: CharacterSheet) => void;
  onNew: () => void;
  onClear: () => void;
};

const SheetManager: React.FC<SheetManagerProps> = ({ onLoad, onNew, onClear }) => {
  const [sheets, setSheets] = useState<CharacterSheet[]>([]);

  useEffect(() => {
    const loadSheets = () => {
      const allSheets = loadAllSheets();
      console.log('SheetManager: Loading sheets:', allSheets);
      setSheets(allSheets);
    };
    
    // Load initial sheets
    loadSheets();

    // Listen for character updates to refresh the list
    const handleCharacterUpdate = () => {
      console.log('SheetManager: Character updated, refreshing list');
      loadSheets();
    };

    // Listen for storage changes from other windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "rpg-character-sheets") {
        console.log('SheetManager: Storage changed, refreshing list');
        loadSheets();
      }
    };

    window.addEventListener('character-updated', handleCharacterUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('character-updated', handleCharacterUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <button onClick={onNew}>New Character</button>
      <h2>Saved Sheets</h2>
      <ul>
        {sheets.map(sheet => {
          const display = `(${sheet.playerName || ""}) ${sheet.name || ""}, ${sheet.subspecies || ""} ${sheet.species || ""} ${sheet.subclass || ""} ${sheet.charClass || ""} (${sheet.xpTotal ?? 0}xp, ${sheet.spTotal ?? 0}sp)`;
          return (
            <li key={sheet.id}>
              <button onClick={() => onLoad(sheet)}>{display}</button>
              <button
                onClick={() => {
                  const confirmed = window.confirm(`Delete "${sheet.name}"? This cannot be undone.`);
                  if (confirmed) {
                    deleteSheetById(sheet.id);
                    setSheets(loadAllSheets());
                    onClear();
                  }
                }}
              >
                🗑️
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SheetManager;