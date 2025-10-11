import type { CharacterSheet } from "../types/CharacterSheet";
import { supabase } from "../lib/supabaseClient";

const STORAGE_KEY = "rpg-character-sheets";

// Cache to prevent unnecessary saves
let lastSavedSheets: { [id: string]: string } = {};

// Custom event to notify other windows of character changes
export const dispatchCharacterUpdate = (sheet: CharacterSheet) => {
  window.dispatchEvent(new CustomEvent('character-updated', { 
    detail: { sheet } 
  }));
};

export const saveCharacterSheet = async (sheet: CharacterSheet) => {
  // Check if this sheet has actually changed
  const sheetJson = JSON.stringify(sheet);
  if (lastSavedSheets[sheet.id] === sheetJson) {
    return; // No changes, skip save
  }

  // Try server save if authenticated
  try {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (uid) {
      await supabase.from('sheets').upsert({
        id: sheet.id,
        user_id: uid,
        content: sheet,
        updated_at: new Date().toISOString()
      });
    } else {
      const existing = loadAllSheets();
      const updated = [...existing.filter(s => s.id !== sheet.id), sheet];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    const existing = loadAllSheets();
    const updated = [...existing.filter(s => s.id !== sheet.id), sheet];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  
  // Update cache
  lastSavedSheets[sheet.id] = sheetJson;
  
  // Dispatch custom event for current window
  dispatchCharacterUpdate(sheet);
};

export const loadAllSheets = (): CharacterSheet[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const loadAllSheetsAsync = async (): Promise<CharacterSheet[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (uid) {
      const { data, error } = await supabase
        .from('sheets')
        .select('content, updated_at')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data ?? []).map((r: { content: unknown }) => r.content as CharacterSheet);
    }
  } catch {}
  return loadAllSheets();
};

export const loadSheetById = (id: string): CharacterSheet | undefined => {
  return loadAllSheets().find(sheet => sheet.id === id);
};

export const deleteSheetById = async (id: string) => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (uid) {
      await supabase.from('sheets').delete().eq('id', id);
      return;
    }
  } catch {}
  const updated = loadAllSheets().filter(sheet => sheet.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export async function migrateLocalSheetsToServerIfEmpty() {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) return;
    const { data, error } = await supabase.from('sheets').select('id').limit(1);
    if (error) return;
    if (data && data.length > 0) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const locals = JSON.parse(raw) as CharacterSheet[];
    for (const s of locals) {
      await supabase.from('sheets').upsert({
        id: s.id,
        user_id: uid,
        content: s,
        updated_at: new Date().toISOString()
      });
    }
  } catch (e) {
    console.error('Migration failed', e);
  }
}