import type { CharacterSheet } from "../types/CharacterSheet";

const STORAGE_KEY = "rpg-character-sheets";
// Use relative API base by default so Cloudflare Pages Functions work (same origin)
const API_BASE: string = import.meta.env.VITE_API_URL ? String(import.meta.env.VITE_API_URL) : '';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Custom event to notify other windows of character changes
export const dispatchCharacterUpdate = (sheet: CharacterSheet) => {
  window.dispatchEvent(new CustomEvent('character-updated', { 
    detail: { sheet } 
  }));
};

// Save to backend if authenticated, otherwise localStorage
export const saveCharacterSheet = async (sheet: CharacterSheet) => {
  const token = getAuthToken();

  if (token) {
    try {
      const response = await fetch(`${API_BASE}/api/sheets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sheet)
      });

      if (response.ok) {
        console.log('Saved to backend');
        // Don't dispatch event - caller will handle state updates
        return;
      } else {
        console.error('Backend save failed, falling back to localStorage');
      }
    } catch (error) {
      console.error('Backend save error:', error);
    }
  }

  // Fallback to localStorage
  const existing = loadAllSheetsLocal();
  const updated = [...existing.filter(s => s.id !== sheet.id), sheet];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  // Don't dispatch event for localStorage either - caller handles state
};

// Load from backend if authenticated, otherwise localStorage
export const loadAllSheets = async (): Promise<CharacterSheet[]> => {
  const token = getAuthToken();

  if (token) {
    try {
      const response = await fetch(`${API_BASE}/api/sheets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const sheets = await response.json();
        console.log('Loaded from backend:', sheets.length, 'sheets');
        return sheets;
      } else {
        console.error('Backend load failed, falling back to localStorage');
      }
    } catch (error) {
      console.error('Backend load error:', error);
    }
  }

  // Fallback to localStorage
  return loadAllSheetsLocal();
};

// Synchronous local-only load (for backwards compatibility)
export const loadAllSheetsLocal = (): CharacterSheet[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const loadSheetById = (id: string): CharacterSheet | undefined => {
  return loadAllSheetsLocal().find(sheet => sheet.id === id);
};

// Delete from backend if authenticated, otherwise localStorage
export const deleteSheetById = async (id: string) => {
  const token = getAuthToken();

  if (token) {
    try {
      const response = await fetch(`${API_BASE}/api/sheets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('Deleted from backend');
        return;
      } else {
        console.error('Backend delete failed, falling back to localStorage');
      }
    } catch (error) {
      console.error('Backend delete error:', error);
    }
  }

  // Fallback to localStorage
  const updated = loadAllSheetsLocal().filter(sheet => sheet.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};