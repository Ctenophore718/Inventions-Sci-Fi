import type { CharacterSheet } from "../types/CharacterSheet";

const STORAGE_KEY = "rpg-character-sheets";

// Cache to prevent unnecessary saves
let lastSavedSheets: { [id: string]: string } = {};

// Custom event to notify other windows of character changes
export const dispatchCharacterUpdate = (sheet: CharacterSheet) => {
  window.dispatchEvent(new CustomEvent('character-updated', { 
    detail: { sheet } 
  }));
};

export const saveCharacterSheet = (sheet: CharacterSheet) => {
  // Check if this sheet has actually changed
  const sheetJson = JSON.stringify(sheet);
  if (lastSavedSheets[sheet.id] === sheetJson) {
    return; // No changes, skip save
  }

  const existing = loadAllSheets();
  const updated = [...existing.filter(s => s.id !== sheet.id), sheet];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  // Update cache
  lastSavedSheets[sheet.id] = sheetJson;
  
  // Dispatch custom event for current window
  dispatchCharacterUpdate(sheet);
};

export const loadAllSheets = (): CharacterSheet[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const loadSheetById = (id: string): CharacterSheet | undefined => {
  return loadAllSheets().find(sheet => sheet.id === id);
};

export const deleteSheetById = (id: string) => {
  const updated = loadAllSheets().filter(sheet => sheet.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};