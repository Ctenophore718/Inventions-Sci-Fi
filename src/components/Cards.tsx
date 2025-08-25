import React from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { loadSheetById } from "../utils/storage";

type CardsProps = {
  sheet: CharacterSheet | null;
  onBack: () => void;
  onLevelUp: () => void;
  onSave: () => void;
  onHome: () => void;
};

const Cards: React.FC<CardsProps> = ({ sheet, onBack, onLevelUp, onSave, onHome }) => {
  const [localSheet, setLocalSheet] = React.useState<CharacterSheet | null>(sheet);

  // Update local sheet when prop changes
  React.useEffect(() => {
    setLocalSheet(sheet);
  }, [sheet]);

  // Cross-window synchronization for character display (optimized)
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "rpg-character-sheets" && sheet?.id) {
        const updatedSheet = loadSheetById(sheet.id);
        if (updatedSheet && JSON.stringify(updatedSheet) !== JSON.stringify(localSheet)) {
          setLocalSheet(updatedSheet);
        }
      }
    };

    const handleCharacterUpdate = (e: CustomEvent<{ sheet: CharacterSheet }>) => {
      if (sheet?.id && e.detail.sheet.id === sheet.id) {
        // Only update if the sheet has actually changed
        if (JSON.stringify(e.detail.sheet) !== JSON.stringify(localSheet)) {
          setLocalSheet(e.detail.sheet);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('character-updated', handleCharacterUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('character-updated', handleCharacterUpdate as EventListener);
    };
  }, [sheet?.id, localSheet]);
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, fontSize: '2em', flexShrink: 0 }}>Cards</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={onSave}
            style={{
              background: '#28a745',
              color: 'white',
              border: '1px solid #1e7e34',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
            }}
          >
            Save
          </button>
          <button
            onClick={onLevelUp}
            style={{
              background: '#fd7e14',
              color: 'white',
              border: '1px solid #e8590c',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
            }}
          >
            Level Up
          </button>
          <button
            onClick={onBack}
            style={{
              background: '#6c757d',
              color: 'white',
              border: '1px solid #545b62',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
            }}
          >
            Character Sheet
          </button>
          <button
            onClick={onHome}
            style={{
              background: '#dc3545',
              color: 'white',
              border: '1px solid #bd2130',
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
            }}
          >
            Home
          </button>
        </div>
      </div>
      
      <div style={{ 
        background: '#f8f9fa', 
        border: '1px solid #ddd', 
        borderRadius: 8, 
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h3>Character Card Management System</h3>
        <p>Card management for <strong>{localSheet?.name || 'Unnamed Character'}</strong> is coming soon!</p>
        
        <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem', maxWidth: '600px', margin: '2rem auto 0' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: 6, border: '1px solid #ccc' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#0b5394' }}>Current Character</h4>
            <p style={{ margin: 0 }}>
              <strong>Name:</strong> {localSheet?.name || 'Unnamed'}<br />
              <strong>Class:</strong> {localSheet?.charClass || 'None'}<br />
              <strong>Subclass:</strong> {localSheet?.subclass || 'None'}<br />
              <strong>Species:</strong> {localSheet?.species || 'None'}<br />
              <strong>Background:</strong> {localSheet?.background || 'None'}
            </p>
          </div>
          
          <div style={{ background: 'white', padding: '1rem', borderRadius: 6, border: '1px solid #ccc' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#38761d' }}>Card Types</h4>
            <ul style={{ textAlign: 'left', margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>Equipment Cards</li>
              <li>Ability Cards</li>
              <li>Spell Cards</li>
              <li>Item Cards</li>
              <li>Status Effect Cards</li>
            </ul>
          </div>
          
          <div style={{ background: 'white', padding: '1rem', borderRadius: 6, border: '1px solid #ccc' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#990000' }}>Future Features</h4>
            <ul style={{ textAlign: 'left', margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>View and organize character cards</li>
              <li>Add new cards to inventory</li>
              <li>Manage equipped items</li>
              <li>Track card effects and bonuses</li>
              <li>Search and filter cards</li>
              <li>Import/export card collections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
