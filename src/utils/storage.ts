import type { CharacterSheet } from "../types/CharacterSheet";

const STORAGE_KEY = "rpg-character-sheets";

// Custom event to notify other windows of character changes
export const dispatchCharacterUpdate = (sheet: CharacterSheet) => {
  window.dispatchEvent(new CustomEvent('character-updated', { 
    detail: { sheet } 
  }));
};

export const saveCharacterSheet = (sheet: CharacterSheet) => {
  const existing = loadAllSheets();
  const updated = [...existing.filter(s => s.id !== sheet.id), sheet];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
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

// Export all sheets as a JSON file
export const exportAllSheets = () => {
  const sheets = loadAllSheets();
  const dataStr = JSON.stringify(sheets, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `character-sheets-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Import sheets from a JSON file
export const importSheets = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedSheets = JSON.parse(content) as CharacterSheet[];
        
        if (!Array.isArray(importedSheets)) {
          reject(new Error('Invalid file format: expected an array of character sheets'));
          return;
        }
        
        const existing = loadAllSheets();
        const existingIds = new Set(existing.map(s => s.id));
        
        // Only import sheets that don't already exist (prevent duplicates)
        const newSheets = importedSheets.filter(sheet => !existingIds.has(sheet.id));
        
        if (newSheets.length > 0) {
          const updated = [...existing, ...newSheets];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
        
        resolve(newSheets.length);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};