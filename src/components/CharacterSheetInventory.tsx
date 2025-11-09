import React from "react";
import styles from './CharacterSheet.module.css';
import type { CharacterSheet } from "../types/CharacterSheet";
import { getJunkerDroneCost } from "../utils/junkerPrimaryAttack";

type CharacterSheetInventoryProps = {
  sheet: CharacterSheet | null;
  charClass: string;
  subclass: string;
  pendingAttack: string;
  setPendingAttack: (attack: string) => void;
  pendingSecondaryAttack: string;
  setPendingSecondaryAttack: (attack: string) => void;
  getAvailablePrimaryAttacks: () => { name: string; type: string; cost: number }[];
  getAvailableSecondaryAttacks: () => { name: string; type: string; cost: number }[];
  handleAttackPurchase: (attackName: string, cost: number, type: string) => void;
  handleAttackAdd: (attackName: string, type: string) => void;
  handleSecondaryAttackPurchase: (attackName: string, cost: number, type: string) => void;
  handleSecondaryAttackAdd: (attackName: string, type: string) => void;
  handleAutoSave: (updates: Partial<CharacterSheet> | CharacterSheet) => void;
};

const CharacterSheetInventory: React.FC<CharacterSheetInventoryProps> = ({
  sheet,
  charClass,
  subclass,
  pendingAttack,
  setPendingAttack,
  pendingSecondaryAttack,
  setPendingSecondaryAttack,
  getAvailablePrimaryAttacks,
  getAvailableSecondaryAttacks,
  handleAttackPurchase,
  handleAttackAdd,
  handleSecondaryAttackPurchase,
  handleSecondaryAttackAdd,
  handleAutoSave
}) => {
  return (
<div className={styles.inventoryCard}>
  <h3 style={{ marginTop: 0, textDecoration: 'underline', color: '#bf9000', fontFamily: 'Arial, sans-serif' }}>Inventory</h3>
        <div className={styles.cardContent}>
          <div style={{ marginBottom: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            {/* Primary Attacks Section */}
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.06em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <u><span style={{ color: '#000' }}>Primary</span> Attacks</u>
            </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px', textAlign: 'left' }}>
                <select
                  style={{
                    fontSize: '1em',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    color: '#222',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    textAlign: 'left',
                    minWidth: '180px'
                  }}
                  value={charClass === 'Technician' && subclass === 'Hacker' ? 'Stealth Drones' : charClass === 'Technician' && subclass === 'Junker' ? 'Junker Drones' : pendingAttack || (charClass === 'Chemist' ? 'Dart Guns' : charClass === 'Coder' ? 'Lenses' : charClass === 'Commander' ? 'Rifles' : charClass === 'Contemplative' ? 'Focuses' : charClass === 'Devout' ? 'Incantations' : charClass === 'Elementalist' ? 'Shards' : charClass === 'Exospecialist' ? 'Integrated Blasters' : charClass === 'Gunslinger' && subclass === 'Ammo Coder' ? 'Coder Carbines' : charClass === 'Gunslinger' && subclass === 'Ordnancer' ? 'Rocket Launchers' : charClass === 'Gunslinger' && subclass === 'Pistoleer' ? 'Dual Pistols' : charClass === 'Gunslinger' && subclass === 'Sniper' ? 'Sniper Rifles' : 'Select Primary Attack')}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== 'Dart Guns' && value !== 'Lenses' && value !== 'Rifles' && value !== 'Focuses' && value !== 'Incantations' && value !== 'Shards' && value !== 'Integrated Blasters' && value !== 'Coder Carbines' && value !== 'Rocket Launchers' && value !== 'Dual Pistols' && value !== 'Sniper Rifles' && value !== 'Stealth Drones' && value !== 'Junker Drones' && value !== 'Select Primary Attack') {
                      setPendingAttack(value);
                      e.target.value = charClass === 'Technician' && subclass === 'Hacker' ? 'Stealth Drones' : charClass === 'Technician' && subclass === 'Junker' ? 'Junker Drones' : (charClass === 'Chemist' ? 'Dart Guns' : charClass === 'Coder' ? 'Lenses' : charClass === 'Commander' ? 'Rifles' : charClass === 'Contemplative' ? 'Focuses' : charClass === 'Devout' ? 'Incantations' : charClass === 'Elementalist' ? 'Shards' : charClass === 'Exospecialist' ? 'Integrated Blasters' : charClass === 'Gunslinger' && subclass === 'Ammo Coder' ? 'Coder Carbines' : charClass === 'Gunslinger' && subclass === 'Ordnancer' ? 'Rocket Launchers' : charClass === 'Gunslinger' && subclass === 'Pistoleer' ? 'Dual Pistols' : charClass === 'Gunslinger' && subclass === 'Sniper' ? 'Sniper Rifles' : 'Select Primary Attack');
                    }
                  }}
                >
                  {charClass === 'Chemist' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Dart Guns</option>
                      <option style={{ fontWeight: 'bold' }}>Chem Gun</option>
                      <option style={{ fontWeight: 'bold' }}>Happy Pill Pusher</option>
                      <option style={{ fontWeight: 'bold' }}>Sour Juicer</option>
                      <option style={{ fontWeight: 'bold' }}>Prickly Goo</option>
                    </>
                  )}
                  {charClass === 'Coder' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Lenses</option>
                      <option style={{ fontWeight: 'bold' }}>Hodge Podge</option>
                      <option style={{ fontWeight: 'bold' }}>Time Stutter</option>
                    </>
                  )}
                  {charClass === 'Commander' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Rifles</option>
                      <option style={{ fontWeight: 'bold' }}>Plasma Rifle</option>
                      <option style={{ fontWeight: 'bold' }}>Sapper Gun</option>
                    </>
                  )}
                  {charClass === 'Contemplative' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Focuses</option>
                      <option style={{ fontWeight: 'bold' }}>Ensnaring Hand Wraps</option>
                      <option style={{ fontWeight: 'bold' }}>Mala of Mind Darts</option>
                      <option style={{ fontWeight: 'bold' }}>Singing Bowl</option>
                      <option style={{ fontWeight: 'bold' }}>Telekinetic Knuckles</option>
                      <option style={{ fontWeight: 'bold' }}>Viperfang Ring</option>
                    </>
                  )}
                  {charClass === 'Devout' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Incantations</option>
                      {subclass === 'Astral' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Cleanse</option>
                          <option style={{ fontWeight: 'bold' }}>Enlighten</option>
                        </>
                      )}
                      {subclass === 'Order' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Comply</option>
                          <option style={{ fontWeight: 'bold' }}>Detain</option>
                        </>
                      )}
                      {subclass === 'Chaos' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Rampage</option>
                          <option style={{ fontWeight: 'bold' }}>Terrify</option>
                        </>
                      )}
                      {subclass === 'Void' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Erase</option>
                          <option style={{ fontWeight: 'bold' }}>Exhaust</option>
                        </>
                      )}
                    </>
                  )}
                  {charClass === 'Elementalist' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Shards</option>
                      {subclass === 'Air' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Bluster</option>
                          <option style={{ fontWeight: 'bold' }}>Bolt</option>
                        </>
                      )}
                      {subclass === 'Earth' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Meteor</option>
                          <option style={{ fontWeight: 'bold' }}>Tremor</option>
                        </>
                      )}
                      {subclass === 'Fire' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Fireball</option>
                          <option style={{ fontWeight: 'bold' }}>Lava Well</option>
                        </>
                      )}
                      {subclass === 'Water' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Frostbite</option>
                          <option style={{ fontWeight: 'bold' }}>Vortex</option>
                        </>
                      )}
                    </>
                  )}
                  {charClass === 'Exospecialist' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Integrated Blasters</option>
                      <option style={{ fontWeight: 'bold' }}>Boomstick</option>
                      <option style={{ fontWeight: 'bold' }}>Firestarter</option>
                      <option style={{ fontWeight: 'bold' }}>Sleepytime</option>
                    </>
                  )}
                  {charClass === 'Gunslinger' && subclass === 'Ammo Coder' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Coder Carbines</option>
                      <option style={{ fontWeight: 'bold' }}>Arcane Railgun</option>
                      <option style={{ fontWeight: 'bold' }}>Space Vaporizer</option>
                    </>
                  )}
                  {charClass === 'Gunslinger' && subclass === 'Ordnancer' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Rocket Launchers</option>
                      <option style={{ fontWeight: 'bold' }}>Demolitmus</option>
                      <option style={{ fontWeight: 'bold' }}>Steelburst</option>
                    </>
                  )}
                  {charClass === 'Gunslinger' && subclass === 'Pistoleer' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Dual Pistols</option>
                      <option style={{ fontWeight: 'bold' }}>Rise & Shine</option>
                      <option style={{ fontWeight: 'bold' }}>Thoughts & Prayers</option>
                      <option style={{ fontWeight: 'bold' }}>Twin Drivers</option>
                    </>
                  )}
                  {charClass === 'Gunslinger' && subclass === 'Sniper' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Sniper Rifles</option>
                      <option style={{ fontWeight: 'bold' }}>Ghost Rifle</option>
                      <option style={{ fontWeight: 'bold' }}>Starseeker</option>
                    </>
                  )}
                  {charClass === 'Technician' && subclass === 'Hacker' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Stealth Drones</option>
                      <option style={{ fontWeight: 'bold' }}>Blind Silence</option>
                      <option style={{ fontWeight: 'bold' }}>Will-o'-the-Wisp</option>
                    </>
                  )}
                  {charClass === 'Technician' && subclass === 'Junker' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Junker Drones</option>
                      <option style={{ fontWeight: 'bold' }}>Big Hugs Gas Can</option>
                      <option style={{ fontWeight: 'bold' }}>Shrapnel-Matic 500</option>
                      <option style={{ fontWeight: 'bold' }}>Smash Hands XBot</option>
                    </>
                  )}
                  {charClass !== 'Chemist' && charClass !== 'Coder' && charClass !== 'Commander' && charClass !== 'Contemplative' && charClass !== 'Devout' && charClass !== 'Elementalist' && charClass !== 'Exospecialist' && charClass !== 'Gunslinger' && !(charClass === 'Technician' && subclass === 'Hacker') && !(charClass === 'Technician' && subclass === 'Junker') && (
                    <option disabled style={{ fontWeight: 'bold' }}>Select Primary Attack</option>
                  )}
                </select>
                
                {pendingAttack && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingAttack}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {(() => {
                          // Check if it's a Junker Drone
                          if (charClass === 'Technician' && subclass === 'Junker' && 
                              (pendingAttack === 'Big Hugs Gas Can' || pendingAttack === 'Shrapnel-Matic 500' || pendingAttack === 'Smash Hands XBot')) {
                            return `${getJunkerDroneCost(pendingAttack)}c`;
                          }
                          const selectedAttack = getAvailablePrimaryAttacks().find(attack => attack.name === pendingAttack);
                          return selectedAttack ? `${selectedAttack.cost}c` : '';
                        })()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          // Handle Junker Drones
                          if (charClass === 'Technician' && subclass === 'Junker' && 
                              (pendingAttack === 'Big Hugs Gas Can' || pendingAttack === 'Shrapnel-Matic 500' || pendingAttack === 'Smash Hands XBot')) {
                            const cost = getJunkerDroneCost(pendingAttack);
                            const currentCredits = sheet?.credits || 0;
                            if (currentCredits < cost) {
                              alert('Not enough credits!');
                              return;
                            }
                            const newJunkerDrones = [...(sheet?.junkerDrones || []), pendingAttack];
                            const newCredits = currentCredits - cost;
                            handleAutoSave({
                              junkerDrones: newJunkerDrones,
                              credits: newCredits
                            });
                            setPendingAttack('');
                            return;
                          }
                          
                          const selectedAttack = getAvailablePrimaryAttacks().find(attack => attack.name === pendingAttack);
                          if (selectedAttack) {
                            handleAttackPurchase(selectedAttack.name, selectedAttack.cost, selectedAttack.type);
                          }
                        }}
                      >
                        Buy
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          // Handle Junker Drones
                          if (charClass === 'Technician' && subclass === 'Junker' && 
                              (pendingAttack === 'Big Hugs Gas Can' || pendingAttack === 'Shrapnel-Matic 500' || pendingAttack === 'Smash Hands XBot')) {
                            const newJunkerDrones = [...(sheet?.junkerDrones || []), pendingAttack];
                            handleAutoSave({
                              junkerDrones: newJunkerDrones
                            });
                            setPendingAttack('');
                            return;
                          }
                          
                          const selectedAttack = getAvailablePrimaryAttacks().find(attack => attack.name === pendingAttack);
                          if (selectedAttack) {
                            handleAttackAdd(selectedAttack.name, selectedAttack.type);
                          }
                        }}
                      >
                        Add
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => setPendingAttack("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                <div style={{ marginTop: '2px' }}>
                  {(sheet?.dartGuns && sheet.dartGuns.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.dartGuns?.map((gun, idx) => (
                        <span key={gun + idx + 'dart'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {gun}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${gun}`}
                            onClick={() => {
                              if (sheet) {
                                const newDartGuns = sheet.dartGuns?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  dartGuns: newDartGuns
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.lenses && sheet.lenses.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.lenses?.map((lens, idx) => (
                        <span key={lens + idx + 'lens'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {lens}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${lens}`}
                            onClick={() => {
                              if (sheet) {
                                const newLenses = sheet.lenses?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  lenses: newLenses
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.rifles && sheet.rifles.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.rifles?.map((rifle, idx) => (
                        <span key={rifle + idx + 'rifle'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {rifle}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${rifle}`}
                            onClick={() => {
                              if (sheet) {
                                const newRifles = sheet.rifles?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  rifles: newRifles
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.focuses && sheet.focuses.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.focuses?.map((focus, idx) => (
                        <span key={focus + idx + 'focus'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {focus}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${focus}`}
                            onClick={() => {
                              if (sheet) {
                                const newFocuses = sheet.focuses?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  focuses: newFocuses
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.incantations && sheet.incantations.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.incantations?.map((incantation, idx) => (
                        <span key={incantation + idx + 'incantation'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {incantation}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${incantation}`}
                            onClick={() => {
                              if (sheet) {
                                const newIncantations = sheet.incantations?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  incantations: newIncantations
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.shards && sheet.shards.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.shards?.map((shard, idx) => (
                        <span key={shard + idx + 'shard'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {shard}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${shard}`}
                            onClick={() => {
                              if (sheet) {
                                const newShards = sheet.shards?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  shards: newShards
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.integratedBlasters && sheet.integratedBlasters.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.integratedBlasters?.map((blaster, idx) => (
                        <span key={blaster + idx + 'blaster'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {blaster}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${blaster}`}
                            onClick={() => {
                              if (sheet) {
                                const newBlasters = sheet.integratedBlasters?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  integratedBlasters: newBlasters
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.coderCarbines && sheet.coderCarbines.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.coderCarbines?.map((weapon, idx) => (
                        <span key={weapon + idx + 'coderCarbine'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {weapon}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${weapon}`}
                            onClick={() => {
                              if (sheet) {
                                const newCoderCarbines = sheet.coderCarbines?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  coderCarbines: newCoderCarbines
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.rocketLaunchers && sheet.rocketLaunchers.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.rocketLaunchers?.map((weapon, idx) => (
                        <span key={weapon + idx + 'rocketLauncher'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {weapon}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${weapon}`}
                            onClick={() => {
                              if (sheet) {
                                const newRocketLaunchers = sheet.rocketLaunchers?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  rocketLaunchers: newRocketLaunchers
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.dualPistols && sheet.dualPistols.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.dualPistols?.map((weapon, idx) => (
                        <span key={weapon + idx + 'dualPistol'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {weapon}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${weapon}`}
                            onClick={() => {
                              if (sheet) {
                                const newDualPistols = sheet.dualPistols?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  dualPistols: newDualPistols
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.sniperRifles && sheet.sniperRifles.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.sniperRifles?.map((weapon, idx) => (
                        <span key={weapon + idx + 'sniperRifle'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {weapon}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${weapon}`}
                            onClick={() => {
                              if (sheet) {
                                const newSniperRifles = sheet.sniperRifles?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  sniperRifles: newSniperRifles
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.stealthDrones && sheet.stealthDrones.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.stealthDrones?.map((drone, idx) => (
                        <span key={drone + idx + 'stealthDrone'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {drone}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${drone}`}
                            onClick={() => {
                              if (sheet) {
                                const newStealthDrones = sheet.stealthDrones?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  stealthDrones: newStealthDrones
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.junkerDrones && sheet.junkerDrones.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.junkerDrones?.map((drone: string, idx: number) => (
                        <span key={drone + idx + 'junkerDrone'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {drone}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${drone}`}
                            onClick={() => {
                              if (sheet) {
                                const newJunkerDrones = sheet.junkerDrones?.filter((_: string, i: number) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  junkerDrones: newJunkerDrones
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Secondary Attacks Section - Hidden for Gunslinger */}
            {charClass !== 'Gunslinger' && (
              <>
                <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.06em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <u><span style={{ color: '#000' }}>Secondary</span> Attacks</u>
                </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px', textAlign: 'left' }}>
                <select
                  style={{
                    fontSize: '1em',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    color: '#222',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    textAlign: 'left',
                    minWidth: '180px'
                  }}
                  value={pendingSecondaryAttack || (charClass === 'Coder' ? 'Algorithms' : charClass === 'Devout' ? 'Relics' : charClass === 'Elementalist' ? 'Elementals' : charClass === 'Exospecialist' ? 'Smart Missiles' : charClass === 'Technician' ? 'Tech Pulses' : subclass === 'Anatomist' ? 'Super Serums' : subclass === 'Grenadier' ? 'Grenades' : subclass === 'Necro' ? 'Chem Zombies' : subclass === 'Poisoner' ? 'Noxious Fumes' : subclass === 'Beguiler' ? 'Whips' : subclass === 'Galvanic' ? 'Sabres' : subclass === 'Tactician' ? 'Flares' : subclass === 'Tyrant' ? 'Blasters' : (subclass === 'Kinetic' || subclass === 'Mercurial' || subclass === 'Inertial' || subclass === 'Vectorial') ? 'Disciplines' : 'Select Secondary Attack')}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== 'Algorithms' && value !== 'Relics' && value !== 'Elementals' && value !== 'Smart Missiles' && value !== 'Tech Pulses' && value !== 'Super Serums' && value !== 'Grenades' && value !== 'Chem Zombies' && value !== 'Noxious Fumes' && value !== 'Whips' && value !== 'Sabres' && value !== 'Flares' && value !== 'Blasters' && value !== 'Disciplines' && value !== 'Select Secondary Attack') {
                      setPendingSecondaryAttack(value);
                    }
                  }}
                >
                  {charClass === 'Coder' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Algorithms</option>
                      <option style={{ fontWeight: 'bold' }}>Digital Wave</option>
                      <option style={{ fontWeight: 'bold' }}>Soul Tracer</option>
                    </>
                  )}
                  {charClass === 'Devout' && subclass === "Astral" && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Relics</option>
                      <option style={{ fontWeight: 'bold' }}>Aktinovo's Lantern</option>
                      <option style={{ fontWeight: 'bold' }}>Agathe's Halo</option>
                    </>
                  )}
                  {charClass === 'Devout' && subclass === "Chaos" && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Relics</option>
                      <option style={{ fontWeight: 'bold' }}>Entropos' Maw</option>
                      <option style={{ fontWeight: 'bold' }}>Kako's Bloodshot Eye</option>
                      <option style={{ fontWeight: 'bold' }}>Storvald's Rimehold Hand</option>
                    </>
                  )}
                  {charClass === 'Devout' && subclass === "Order" && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Relics</option>
                      <option style={{ fontWeight: 'bold' }}>Scepter of Ethos</option>
                      <option style={{ fontWeight: 'bold' }}>Fylakas' Censor</option>
                    </>
                  )}
                  {charClass === 'Devout' && subclass === "Void" && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Relics</option>
                      <option style={{ fontWeight: 'bold' }}>Kenos' Scythe</option>
                      <option style={{ fontWeight: 'bold' }}>Orb of Mitra</option>
                    </>
                  )}
                  {subclass === 'Anatomist' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Super Serums</option>
                      <option style={{ fontWeight: 'bold' }}>Jacob's Ladder</option>
                      <option style={{ fontWeight: 'bold' }}>Vampirismagoria</option>
                    </>
                  )}
                  {subclass === 'Grenadier' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Grenades</option>
                      <option style={{ fontWeight: 'bold' }}>Amethyst Blast</option>
                      <option style={{ fontWeight: 'bold' }}>Void Grenade</option>
                    </>
                  )}
                  {subclass === 'Necro' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Chem Zombies</option>
                      <option style={{ fontWeight: 'bold' }}>Synthetic Corpse</option>
                    </>
                  )}
                  {subclass === 'Poisoner' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Noxious Fumes</option>
                      <option style={{ fontWeight: 'bold' }}>Brainstorm</option>
                      <option style={{ fontWeight: 'bold' }}>Color Spray</option>
                    </>
                  )}
                  {subclass === 'Beguiler' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Whips</option>
                      <option style={{ fontWeight: 'bold' }}>Heartstrings</option>
                      <option style={{ fontWeight: 'bold' }}>The Crackler</option>
                    </>
                  )}
                  {subclass === 'Galvanic' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Sabres</option>
                      <option style={{ fontWeight: 'bold' }}>Phase Sword</option>
                      <option style={{ fontWeight: 'bold' }}>Truthsinger</option>
                    </>
                  )}
                  {subclass === 'Tactician' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Flares</option>
                      <option style={{ fontWeight: 'bold' }}>Fire Flare</option>
                      <option style={{ fontWeight: 'bold' }}>Flash Freeze</option>
                    </>
                  )}
                  {subclass === 'Tyrant' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Blasters</option>
                      <option style={{ fontWeight: 'bold' }}>Blizzard Blast</option>
                      <option style={{ fontWeight: 'bold' }}>Shock Gun</option>
                    </>
                  )}
                  {subclass === 'Kinetic' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Disciplines</option>
                      <option style={{ fontWeight: 'bold' }}>Empty Mudra</option>
                      <option style={{ fontWeight: 'bold' }}>Mudra of Brilliance</option>
                    </>
                  )}
                  {subclass === 'Mercurial' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Disciplines</option>
                      <option style={{ fontWeight: 'bold' }}>Way of Quicksilver</option>
                      <option style={{ fontWeight: 'bold' }}>Way of Sublimation</option>
                    </>
                  )}
                  {subclass === 'Inertial' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Disciplines</option>
                      <option style={{ fontWeight: 'bold' }}>Asana of Heaviness</option>
                      <option style={{ fontWeight: 'bold' }}>Passive Asana</option>
                    </>
                  )}
                  {subclass === 'Vectorial' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Disciplines</option>
                      <option style={{ fontWeight: 'bold' }}>Bane Prana</option>
                      <option style={{ fontWeight: 'bold' }}>Night Prana</option>
                    </>
                  )}
                  {charClass === 'Elementalist' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Elementals</option>
                      {subclass === 'Air' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Cloud Elemental</option>
                          <option style={{ fontWeight: 'bold' }}>Thunderbird</option>
                        </>
                      )}
                      {(subclass === 'Air' || subclass === 'Earth') && (
                        <option style={{ fontWeight: 'bold' }}>Sandstorm</option>
                      )}
                      {subclass === 'Earth' && (
                        <option style={{ fontWeight: 'bold' }}>Stone Golem</option>
                      )}
                      {(subclass === 'Earth' || subclass === 'Fire') && (
                        <option style={{ fontWeight: 'bold' }}>Magmoid</option>
                      )}
                      {(subclass === 'Earth' || subclass === 'Water') && (
                        <option style={{ fontWeight: 'bold' }}>Sludge Brute</option>
                      )}
                      {subclass === 'Fire' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Fire Dragon</option>
                          <option style={{ fontWeight: 'bold' }}>Firefox</option>
                          <option style={{ fontWeight: 'bold' }}>Phoenix</option>
                          <option style={{ fontWeight: 'bold' }}>Salamander</option>
                        </>
                      )}
                      {subclass === 'Water' && (
                        <>
                          <option style={{ fontWeight: 'bold' }}>Ice Golem</option>
                          <option style={{ fontWeight: 'bold' }}>Water Horse</option>
                          <option style={{ fontWeight: 'bold' }}>Water Panda</option>
                          <option style={{ fontWeight: 'bold' }}>Wave Elemental</option>
                        </>
                      )}
                    </>
                  )}
                  {charClass === 'Exospecialist' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Smart Missiles</option>
                      <option style={{ fontWeight: 'bold' }}>Neutron Torpedo</option>
                      <option style={{ fontWeight: 'bold' }}>Pulsar Cannon</option>
                      <option style={{ fontWeight: 'bold' }}>Razor Rain</option>
                    </>
                  )}
                  {charClass === 'Technician' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Tech Pulses</option>
                      {subclass === 'Hacker' && (
                        <option style={{ fontWeight: 'bold' }}>Cloaker Bubble</option>
                      )}
                      {subclass === 'Junker' && (
                        <option style={{ fontWeight: 'bold' }}>Shrap Happy</option>
                      )}
                      {subclass === 'Nanoboticist' && (
                        <option style={{ fontWeight: 'bold' }}>Swarm Surge</option>
                      )}
                      {subclass === 'Tanker' && (
                        <option style={{ fontWeight: 'bold' }}>Rubblemaker</option>
                      )}
                    </>
                  )}
                  {charClass !== 'Coder' && charClass !== 'Devout' && charClass !== 'Elementalist' && charClass !== 'Exospecialist' && charClass !== 'Technician' && subclass !== 'Anatomist' && subclass !== 'Grenadier' && subclass !== 'Necro' && subclass !== 'Poisoner' && subclass !== 'Beguiler' && subclass !== 'Galvanic' && subclass !== 'Tactician' && subclass !== 'Tyrant' && subclass !== 'Kinetic' && subclass !== 'Mercurial' && subclass !== 'Inertial' && subclass !== 'Vectorial' && (
                    <option disabled style={{ fontWeight: 'bold' }}>Select Secondary Attack</option>
                  )}
                </select>
                
                {pendingSecondaryAttack && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingSecondaryAttack}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {(() => {
                          const selectedAttack = getAvailableSecondaryAttacks().find(attack => attack.name === pendingSecondaryAttack);
                          return selectedAttack ? `${selectedAttack.cost}c` : '';
                        })()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          const selectedAttack = getAvailableSecondaryAttacks().find(attack => attack.name === pendingSecondaryAttack);
                          if (selectedAttack) {
                            handleSecondaryAttackPurchase(selectedAttack.name, selectedAttack.cost, selectedAttack.type);
                          }
                        }}
                      >
                        Buy
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          const selectedAttack = getAvailableSecondaryAttacks().find(attack => attack.name === pendingSecondaryAttack);
                          if (selectedAttack) {
                            handleSecondaryAttackAdd(selectedAttack.name, selectedAttack.type);
                          }
                        }}
                      >
                        Add
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => setPendingSecondaryAttack("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                <div style={{ marginTop: '2px' }}>
                  {(sheet?.algorithms && sheet.algorithms.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.algorithms?.map((algorithm, idx) => (
                        <span key={algorithm + idx + 'algorithm'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {algorithm}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${algorithm}`}
                            onClick={() => {
                              if (sheet) {
                                const newAlgorithms = sheet.algorithms?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  algorithms: newAlgorithms
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.relics && sheet.relics.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.relics?.map((relic, idx) => (
                        <span key={relic + idx + 'relic'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {relic}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${relic}`}
                            onClick={() => {
                              if (sheet) {
                                const newRelics = sheet.relics?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  relics: newRelics
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.superSerums && sheet.superSerums.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.superSerums?.map((serum, idx) => (
                        <span key={serum + idx + 'serum'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {serum}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${serum}`}
                            onClick={() => {
                              if (sheet) {
                                const newSuperSerums = sheet.superSerums?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  superSerums: newSuperSerums
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.grenades && sheet.grenades.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.grenades?.map((grenade, idx) => (
                        <span key={grenade + idx + 'grenade'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {grenade}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${grenade}`}
                            onClick={() => {
                              if (sheet) {
                                const newGrenades = sheet.grenades?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  grenades: newGrenades
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.chemZombies && sheet.chemZombies.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.chemZombies?.map((chemZombie, idx) => (
                        <span key={chemZombie + idx + 'chemzombie'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {chemZombie}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${chemZombie}`}
                            onClick={() => {
                              if (sheet) {
                                const newChemZombies = sheet.chemZombies?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  chemZombies: newChemZombies
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.noxiousFumes && sheet.noxiousFumes.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.noxiousFumes?.map((noxiousFume, idx) => (
                        <span key={noxiousFume + idx + 'noxiousfume'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {noxiousFume}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${noxiousFume}`}
                            onClick={() => {
                              if (sheet) {
                                const newNoxiousFumes = sheet.noxiousFumes?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  noxiousFumes: newNoxiousFumes
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.whips && sheet.whips.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.whips?.map((whip, idx) => (
                        <span key={whip + idx + 'whip'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {whip}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${whip}`}
                            onClick={() => {
                              if (sheet) {
                                const newWhips = sheet.whips?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  whips: newWhips
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.sabres && sheet.sabres.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.sabres?.map((sabre, idx) => (
                        <span key={sabre + idx + 'sabre'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {sabre}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${sabre}`}
                            onClick={() => {
                              if (sheet) {
                                const newSabres = sheet.sabres?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  sabres: newSabres
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.flares && sheet.flares.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.flares?.map((flare, idx) => (
                        <span key={flare + idx + 'flare'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {flare}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${flare}`}
                            onClick={() => {
                              if (sheet) {
                                const newFlares = sheet.flares?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  flares: newFlares
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.blasters && sheet.blasters.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.blasters?.map((blaster, idx) => (
                        <span key={blaster + idx + 'blaster'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {blaster}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${blaster}`}
                            onClick={() => {
                              if (sheet) {
                                const newBlasters = sheet.blasters?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  blasters: newBlasters
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.disciplines && sheet.disciplines.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.disciplines?.map((discipline, idx) => (
                        <span key={discipline + idx + 'discipline'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {discipline}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${discipline}`}
                            onClick={() => {
                              if (sheet) {
                                const newDisciplines = sheet.disciplines?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  disciplines: newDisciplines
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.elementals && sheet.elementals.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.elementals?.map((elemental, idx) => (
                        <span key={elemental + idx + 'elemental'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {elemental}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${elemental}`}
                            onClick={() => {
                              if (sheet) {
                                const newElementals = sheet.elementals?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  elementals: newElementals
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.smartMissiles && sheet.smartMissiles.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.smartMissiles?.map((missile, idx) => (
                        <span key={missile + idx + 'smartMissile'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {missile}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${missile}`}
                            onClick={() => {
                              if (sheet) {
                                const newSmartMissiles = sheet.smartMissiles?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  smartMissiles: newSmartMissiles
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {(sheet?.techPulses && sheet.techPulses.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.techPulses?.map((pulse, idx) => (
                        <span key={pulse + idx + 'techPulse'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {pulse}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${pulse}`}
                            onClick={() => {
                              if (sheet) {
                                const newTechPulses = sheet.techPulses?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  techPulses: newTechPulses
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>


  );
};

export default CharacterSheetInventory;
