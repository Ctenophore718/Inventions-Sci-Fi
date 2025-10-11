import React, { useEffect, useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { loadAllSheets, loadAllSheetsAsync, deleteSheetById } from "../utils/storage"; 

type SheetManagerProps = {
  onLoad: (sheet: CharacterSheet) => void;
  onNew: () => void;
  onClear: () => void;
};

const SheetManager: React.FC<SheetManagerProps> = ({ onLoad, onNew, onClear }) => {
  const [sheets, setSheets] = useState<CharacterSheet[]>([]);

  useEffect(() => {
    const loadSheets = async () => {
      const allSheets = await loadAllSheetsAsync();
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

  window.addEventListener('character-updated', handleCharacterUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('character-updated', handleCharacterUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Arial, sans-serif', fontSize: '110%', flexWrap: 'wrap' }}>
          <a
            href="/Rules.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: '100%', fontWeight: 'bold', color: '#1f21ce', textDecoration: 'none' }}
            title="Open Rules PDF in a new tab"
          >
            Rules
          </a>
          <span style={{ color: '#999' }}>|</span>
          <a
            href="/Character Options.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: '100%', fontWeight: 'bold', color: '#1f21ce', textDecoration: 'none' }}
            title="Open Character Options PDF in a new tab"
          >
            Character Options
          </a>
          <span style={{ color: '#999' }}>|</span>
          <a
            href="/Classes.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: '100%', fontWeight: 'bold', color: '#1f21ce', textDecoration: 'none' }}
            title="Open Classes PDF in a new tab"
          >
            Classes
          </a>
          <span style={{ color: '#999' }}>|</span>
          <a
            href="/Species.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: '100%', fontWeight: 'bold', color: '#1f21ce', textDecoration: 'none' }}
            title="Open Species PDF in a new tab"
          >
            Species
          </a>
        </div>
        <div style={{ margin: '20px 0' }}></div> {/* Added spacing here */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button onClick={onNew} style={{ fontFamily: 'Arial, sans-serif' }}>New Character</button>
      </div>
      <h2 style={{ fontFamily: 'Arial, sans-serif' }}>Saved Sheets</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[...sheets].reverse().map(sheet => {
          // Color maps (should match LevelUp.tsx)
          const classOptions = [
            { label: "Chemist", value: "Chemist", color: "#721131" },
            { label: "Coder", value: "Coder", color: "#112972" },
            { label: "Commander", value: "Commander", color: "#717211" },
            { label: "Contemplative", value: "Contemplative", color: "#116372" },
            { label: "Devout", value: "Devout", color: "#6b1172" },
            { label: "Elementalist", value: "Elementalist", color: "#231172" },
            { label: "Exospecialist", value: "Exospecialist", color: "#117233" },
            { label: "Gunslinger", value: "Gunslinger", color: "#4e7211" },
            { label: "Technician", value: "Technician", color: "#724811" }
          ];
          const subclassOptionsMap = {
            Chemist: [
              { label: "Anatomist", value: "Anatomist", color: "#66cf00" },
              { label: "Grenadier", value: "Grenadier", color: "#cf0000" },
              { label: "Necro", value: "Necro", color: "#0033cf" },
              { label: "Poisoner", value: "Poisoner", color: "#cf7600" },
            ],
            Coder: [
              { label: "Coercive", value: "Coercive", color: "#43c9ff" },
              { label: "Divinist", value: "Divinist", color: "#ff4343" },
              { label: "Naturalist", value: "Naturalist", color: "#66cf00" },
              { label: "Technologist", value: "Technologist", color: "#8c43ff" },
            ],
            Commander: [
              { label: "Beguiler", value: "Beguiler", color: "#1f21ce" },
              { label: "Galvanic", value: "Galvanic", color: "#6fce1f" },
              { label: "Tactician", value: "Tactician", color: "#cec31f" },
              { label: "Tyrant", value: "Tyrant", color: "#ce1f1f" },
            ],
            Contemplative: [
              { label: "Inertial", value: "Inertial", color: "#1c945e" },
              { label: "Kinetic", value: "Kinetic", color: "#7b941c" },
              { label: "Mercurial", value: "Mercurial", color: "#941c6c" },
              { label: "Vectorial", value: "Vectorial", color: "#531c94" },
            ],
            Devout: [
              { label: "Astral", value: "Astral", color: "#5bb1af" },
              { label: "Chaos", value: "Chaos", color: "#b15b6c" },
              { label: "Order", value: "Order", color: "#aeb15b" },
              { label: "Void", value: "Void", color: "#5b73b1" },
            ],
            Elementalist: [
              { label: "Air", value: "Air", color: "#0ee2df" },
              { label: "Earth", value: "Earth", color: "#e2b90e" },
              { label: "Fire", value: "Fire", color: "#e20e0e" },
              { label: "Water", value: "Water", color: "#0e42e2" },
            ],
            Exospecialist: [
              { label: "Aeronaut", value: "Aeronaut", color: "#3da1d8" },
              { label: "Brawler", value: "Brawler", color: "#d8a53d" },
              { label: "Dreadnaught", value: "Dreadnaught", color: "#d83da0" },
              { label: "Spectre", value: "Spectre", color: "#6a3dd8" },
            ],
            Gunslinger: [
              { label: "Ammo Coder", value: "Ammo Coder", color: "#0a3991" },
              { label: "Ordnancer", value: "Ordnancer", color: "#910a0a" },
              { label: "Pistoleer", value: "Pistoleer", color: "#5a910a" },
              { label: "Sniper", value: "Sniper", color: "#0a6f91" },
            ],
            Technician: [
              { label: "Hacker", value: "Hacker", color: "#5c57b8" },
              { label: "Junker", value: "Junker", color: "#6db857" },
              { label: "Nanoboticist", value: "Nanoboticist", color: "#57b8b0" },
              { label: "Tanker", value: "Tanker", color: "#b8578b" },
            ],
          };
          const speciesOptions = [
            { label: "Avenoch", value: "Avenoch", color: "#2b5f59" },
            { label: "Cerebronych", value: "Cerebronych", color: "#5f5e2b" },
            { label: "Chloroptid", value: "Chloroptid", color: "#315f2b" },
            { label: "Cognizant", value: "Cognizant", color: "#2b3b5f" },
            { label: "Emberfolk", value: "Emberfolk", color: "#5f2b2b" },
            { label: "Entomos", value: "Entomos", color: "#5f422b" },
            { label: "Human", value: "Human", color: "#2b315f" },
            { label: "Lumenaren", value: "Lumenaren", color: "#515f2b" },
            { label: "Praedari", value: "Praedari", color: "#5f2b5c" },
          ];
          const subspeciesOptionsMap = {
            Avenoch: [
              { label: "Corvid", value: "Corvid", color: "#75904e" },
              { label: "Falcador", value: "Falcador", color: "#6d7156" },
              { label: "Nocturne", value: "Nocturne", color: "#334592" },
              { label: "Vulturine", value: "Vulturine", color: "#a96d8c" },
            ],
            Cerebronych: [],
            Chloroptid: [
              { label: "Barkskin", value: "Barkskin", color: "#5f2d2b" },
              { label: "Carnivorous", value: "Carnivorous", color: "#2b2d5f" },
              { label: "Drifting", value: "Drifting", color: "#5f8a5f" },
              { label: "Viny", value: "Viny", color: "#5f5f2b" },
            ],
            Cognizant: [
              { label: "Android", value: "Android", color: "#581fbd" },
              { label: "Utility Droid", value: "Utility Droid", color: "#bd891f" },
            ],
            Emberfolk: [
              { label: "Petran", value: "Petran", color: "#735311" },
              { label: "Pyran", value: "Pyran", color: "#b31111" },
            ],
            Entomos: [
              { label: "Apocritan", value: "Apocritan", color: "#6d7156" },
              { label: "Dynastes", value: "Dynastes", color: "#334592" },
              { label: "Mantid", value: "Mantid", color: "#75904e" },
            ],
            Human: [
              { label: "Diminutive Evolution", value: "Diminutive Evolution", color: "#c3735f" },
              { label: "Lithe Evolution", value: "Lithe Evolution", color: "#2b5f5f" },
              { label: "Massive Evolution", value: "Massive Evolution", color: "#2b175f" },
              { label: "Stout Evolution", value: "Stout Evolution", color: "#5f2b2b" },
            ],
            Lumenaren: [
              { label: "Infrared", value: "Infrared", color: "#b17fbe" },
              { label: "Radiofrequent", value: "Radiofrequent", color: "#bea97f" },
              { label: "X-Ray", value: "X-Ray", color: "#7f8abe" },
            ],
            Praedari: [
              { label: "Canid", value: "Canid", color: "#2f8da6" },
              { label: "Felid", value: "Felid", color: "#b16326" },
              { label: "Mustelid", value: "Mustelid", color: "#699239" },
              { label: "Ursid", value: "Ursid", color: "#9026b1" },
            ],
          };
          // Get color for each segment
          type ColorType = 'class' | 'subclass' | 'species' | 'subspecies';
          const getColor = (type: ColorType, value: string, parent?: string): string | undefined => {
            if (!value) return undefined;
            if (type === 'class') return classOptions.find((opt: { value: string }) => opt.value === value)?.color;
            if (type === 'subclass' && parent) return (subclassOptionsMap[parent as keyof typeof subclassOptionsMap] || []).find((opt: { value: string }) => opt.value === value)?.color;
            if (type === 'species') return speciesOptions.find((opt: { value: string }) => opt.value === value)?.color;
            if (type === 'subspecies' && parent) return (subspeciesOptionsMap[parent as keyof typeof subspeciesOptionsMap] || []).find((opt: { value: string }) => opt.value === value)?.color;
            return undefined;
          };
          return (
            <li key={sheet.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              {/* Portrait thumbnail */}
              <div style={{ 
                width: '48px', 
                height: '48px', 
                flexShrink: 0,
                border: '2px solid #ccc',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {sheet.portrait ? (
                  <img 
                    src={sheet.portrait} 
                    alt={`${sheet.name || 'Character'} portrait`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '24px', color: '#999' }}>👤</span>
                )}
              </div>
              
              {/* Character info button */}
              <button 
                onClick={() => onLoad(sheet)} 
                style={{ 
                  fontWeight: 'bold',
                  fontFamily: 'Arial, sans-serif',
                  flex: 1,
                  textAlign: 'left',
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#f9f9f9',
                  cursor: 'pointer'
                }}
              >
                {sheet.playerName ? `(${sheet.playerName}) ` : ""}
                {sheet.name ? `${sheet.name}, ` : ""}
                {sheet.subspecies && (
                  <span style={{ color: getColor('subspecies', sheet.subspecies, sheet.species) }}>{sheet.subspecies} </span>
                )}
                {sheet.species && (
                  <span style={{ color: getColor('species', sheet.species, undefined) }}>{sheet.species} </span>
                )}
                {sheet.subclass && sheet.charClass && (
                  <span style={{ color: getColor('subclass', sheet.subclass, sheet.charClass) }}>{sheet.subclass} </span>
                )}
                {sheet.charClass && (
                  <span style={{ color: getColor('class', sheet.charClass, undefined) }}>{sheet.charClass} </span>
                )}
                ({sheet.xpTotal ?? 0}xp, {sheet.spTotal ?? 0}sp)
              </button>
              
              {/* Delete button */}
              <button
                onClick={() => {
                  const confirmed = window.confirm(`Delete "${sheet.name}"? This cannot be undone.`);
                  if (confirmed) {
                    (async () => {
                      await deleteSheetById(sheet.id);
                      const refreshed = await loadAllSheetsAsync();
                      setSheets(refreshed);
                    })();
                    onClear();
                  }
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid #dc3545',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  color: '#dc3545',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
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