import type { CharacterSheet } from "../types/CharacterSheet";

const STORAGE_KEY = "rpg-character-sheets";

export const saveCharacterSheet = (sheet: CharacterSheet) => {
  const existing = loadAllSheets();
  const updated = [...existing.filter(s => s.id !== sheet.id), sheet];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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