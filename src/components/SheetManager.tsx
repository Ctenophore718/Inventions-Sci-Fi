import React, { useEffect, useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { loadAllSheets, deleteSheetById, saveCharacterSheet } from "../utils/storage"; 

type SheetManagerProps = {
  onLoad: (sheet: CharacterSheet) => void;
  onNew: () => void;
  onClear: () => void;
};

const SheetManager: React.FC<SheetManagerProps> = ({ onLoad, onNew, onClear }) => {
  const [sheets, setSheets] = useState<CharacterSheet[]>([]);

  useEffect(() => {
    setSheets(loadAllSheets());
  }, []);

  const testSheet: CharacterSheet = {
    id: "sheet-001",
    name: "Nova Strider",
    attributes: {
      strength: 8,
      dexterity: 14,
      intelligence: 12,
    },
    skills: ["Piloting", "Hacking", "Diplomacy"],
  };

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