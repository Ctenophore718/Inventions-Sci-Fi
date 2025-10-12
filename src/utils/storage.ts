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
  console.log('saveCharacterSheet: ENTERED function for sheet:', sheet.id);
  
  // Check if this sheet has actually changed
  const sheetJson = JSON.stringify(sheet);
  if (lastSavedSheets[sheet.id] === sheetJson) {
    console.log('saveCharacterSheet: No changes detected, skipping save');
    return; // No changes, skip save
  }

  console.log('saveCharacterSheet: Changes detected, proceeding with save');

  // Try server save if authenticated
  try {
    console.log('saveCharacterSheet: About to call supabase.auth.getUser()');
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('saveCharacterSheet: Error getting user:', userError);
      throw userError;
    }
    
    const uid = userData.user?.id;
    console.log('saveCharacterSheet: User ID:', uid);
    
    if (uid) {
      console.log('saveCharacterSheet: Saving to Supabase for user:', uid, 'sheet:', sheet.id);
      const { error: upsertError } = await supabase.from('sheets').upsert({
        id: sheet.id,
        user_id: uid,
        content: sheet,
        updated_at: new Date().toISOString()
      });
      
      if (upsertError) {
        console.error('saveCharacterSheet: Supabase upsert error:', upsertError);
        throw upsertError;
      }
      
      console.log('saveCharacterSheet: Successfully saved to Supabase');
    } else {
      console.log('saveCharacterSheet: No user logged in, saving to localStorage');
      const existing = loadAllSheets();
      const updated = [...existing.filter(s => s.id !== sheet.id), sheet];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      console.log('saveCharacterSheet: Saved to localStorage');
    }
  } catch (e) {
    console.error('saveCharacterSheet: Error during save, falling back to localStorage:', e);
    const existing = loadAllSheets();
    const updated = [...existing.filter(s => s.id !== sheet.id), sheet];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log('saveCharacterSheet: Fallback save to localStorage completed');
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
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('loadAllSheetsAsync: Error getting user:', userError);
      throw userError;
    }
    
    const uid = userData.user?.id;
    console.log('loadAllSheetsAsync: User ID:', uid);
    
    if (uid) {
      console.log('loadAllSheetsAsync: Loading sheets from Supabase for user:', uid);
      const { data, error } = await supabase
        .from('sheets')
        .select('content, updated_at')
        .order('updated_at', { ascending: false });
        
      if (error) {
        console.error('loadAllSheetsAsync: Supabase query error:', error);
        throw error;
      }
      
      const sheets = (data ?? []).map((r: { content: unknown }) => r.content as CharacterSheet);
      console.log('loadAllSheetsAsync: Loaded', sheets.length, 'sheets from Supabase');
      return sheets;
    } else {
      console.log('loadAllSheetsAsync: No user logged in, loading from localStorage');
    }
  } catch (e) {
    console.error('loadAllSheetsAsync: Error during load, falling back to localStorage:', e);
  }
  
  const localSheets = loadAllSheets();
  console.log('loadAllSheetsAsync: Loaded', localSheets.length, 'sheets from localStorage');
  return localSheets;
};

export const loadSheetById = (id: string): CharacterSheet | undefined => {
  return loadAllSheets().find(sheet => sheet.id === id);
};

export const deleteSheetById = async (id: string) => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('deleteSheetById: Error getting user:', userError);
      throw userError;
    }
    
    const uid = userData.user?.id;
    console.log('deleteSheetById: User ID:', uid, 'deleting sheet:', id);
    
    if (uid) {
      console.log('deleteSheetById: Deleting from Supabase');
      const { error } = await supabase.from('sheets').delete().eq('id', id);
      
      if (error) {
        console.error('deleteSheetById: Supabase delete error:', error);
        throw error;
      }
      
      console.log('deleteSheetById: Successfully deleted from Supabase');
      return;
    } else {
      console.log('deleteSheetById: No user logged in, deleting from localStorage');
    }
  } catch (e) {
    console.error('deleteSheetById: Error during delete, falling back to localStorage:', e);
  }
  
  const updated = loadAllSheets().filter(sheet => sheet.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  console.log('deleteSheetById: Deleted from localStorage');
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