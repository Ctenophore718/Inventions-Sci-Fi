import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateParasiticComposureJSX } from "../utils/cerebronychFeature";

type LevelUpSpeciesCerebronychProps = {
  sheet: CharacterSheet | null;
  species: string;
  subspecies: string;
  contentType?: 'species' | 'subspecies'; // New prop to control which content to show
  onAutoSave?: (updates: Partial<CharacterSheet>) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpSpeciesCerebronych: React.FC<LevelUpSpeciesCerebronychProps> = ({ 
  sheet, 
  species,
  subspecies,
  contentType = 'species', // Default to species content
  onAutoSave,
  xpTotal,
  spTotal, 
  xpSpent,
  spSpent,
  setXpSpent,
  setSpSpent,
  setNotice
}) => {
  
  // Host options with colors for Cerebronych
  const hostOptions = [
    { label: "Avenoch Host", value: "Avenoch Host", color: "#2b5f59" },
    { label: "Corvid Avenoch Host", value: "Corvid Avenoch Host", color: "#75904e" },
    { label: "Falcador Avenoch Host", value: "Falcador Avenoch Host", color: "#6d7156" },
    { label: "Nocturne Avenoch Host", value: "Nocturne Avenoch Host", color: "#334592" },
    { label: "Vulturine Avenoch Host", value: "Vulturine Avenoch Host", color: "#a96d8c" },
    { label: "Chloroptid Host", value: "Chloroptid Host", color: "#315f2b" },
    { label: "Barkskin Chloroptid Host", value: "Barkskin Chloroptid Host", color: "#5f2d2b" },
    { label: "Carnivorous Chloroptid Host", value: "Carnivorous Chloroptid Host", color: "#2b2d5f" },
    { label: "Drifting Chloroptid Host", value: "Drifting Chloroptid Host", color: "#5f8a5f" },
    { label: "Viny Chloroptid Host", value: "Viny Chloroptid Host", color: "#5f5f2b" },
    { label: "Cognizant Host", value: "Cognizant Host", color: "#2b3b5f" },
    { label: "Android Cognizant Host", value: "Android Cognizant Host", color: "#581fbd" },
    { label: "Utility Droid Cognizant Host", value: "Utility Droid Cognizant Host", color: "#bd891f" },
    { label: "Emberfolk Host", value: "Emberfolk Host", color: "#5f2b2b" },
    { label: "Petran Emberfolk Host", value: "Petran Emberfolk Host", color: "#735311" },
    { label: "Pyran Emberfolk Host", value: "Pyran Emberfolk Host", color: "#b31111" },
    { label: "Entomos Host", value: "Entomos Host", color: "#5f422b" },
    { label: "Apocritan Entomos Host", value: "Apocritan Entomos Host", color: "#6d7156" },
    { label: "Dynastes Entomos Host", value: "Dynastes Entomos Host", color: "#334592" },
    { label: "Mantid Entomos Host", value: "Mantid Entomos Host", color: "#75904e" },
    { label: "Human Host", value: "Human Host", color: "#2b315f" },
    { label: "Diminutive Human Host", value: "Diminutive Human Host", color: "#c3735f" },
    { label: "Lithe Human Host", value: "Lithe Human Host", color: "#2b5f5f" },
    { label: "Massive Human Host", value: "Massive Human Host", color: "#2b175f" },
    { label: "Stout Human Host", value: "Stout Human Host", color: "#5f2b2b" },
    { label: "Lumenaren Host", value: "Lumenaren Host", color: "#515f2b" },
    { label: "Infrared Lumenaren Host", value: "Infrared Lumenaren Host", color: "#b17fbe" },
    { label: "Radiofrequent Lumenaren Host", value: "Radiofrequent Lumenaren Host", color: "#bea97f" },
    { label: "X-Ray Lumenaren Host", value: "X-Ray Lumenaren Host", color: "#7f8abe" },
    { label: "Praedari Host", value: "Praedari Host", color: "#5f2b5c" },
    { label: "Canid Praedari Host", value: "Canid Praedari Host", color: "#2f8da6" },
    { label: "Felid Praedari Host", value: "Felid Praedari Host", color: "#b16326" },
    { label: "Mustelid Praedari Host", value: "Mustelid Praedari Host", color: "#699239" },
    { label: "Ursid Praedari Host", value: "Ursid Praedari Host", color: "#9026b1" },
  ];

  // Get the current host color
  const currentHostColor = sheet?.hostSpecies ? (hostOptions.find(opt => opt.value === sheet.hostSpecies)?.color || '#000') : '#000';

  // Cerebronych species card dots default structure
  const defaultCerebronychDots = [ 
    [false],               // Parasitic Composure: Mesmerize immunity (5xp)
    [false],               // Parasitic Composure: Toxic immunity (5xp)
    [false],               // Parasitic Composure: Chemical immunity (5xp)
    [false, false, false], // Memory Manifest: +1hx range (5xp, 8xp, 11xp)
    [false],               // Memory Manifest: Includes Inactive Techniques (10xp)
    [false, false],        // Memory Manifest: -1 Cooldown (5xp, 8xp)
    [false, false, false], // Limit Push: +1hx range (4xp, 6xp, 9xp)
    [false],               // Limit Push: +1 Cooldown Token (12xp)
    [false, false],        // Limit Push: -1 Cooldown (4xp, 7xp)
    [false, false],        // Hit Points: +5 (3xp, 4xp)
    [false, false],        // Hit Points: +10 (7xp, 10xp)
    [false],               // Hit Points: +15 (14xp)
  ];

  // Cerebronych (Cont.) subspecies card dots default structure
  const defaultCerebronychContDots = [
    [false],               // Strike: Can Strike using Toxic instead (4xp)
    [false],               // Strike: Infest (22xp)
    [false, false, false], // Movement: +1 Speed (5xp, 9xp, 13xp)
    [false],               // Perk: Many Masks (10sp)
    [false],               // Perk: Play Dead (7sp)
  ];

  // Local state for species card dots
  const [speciesCardDots, setSpeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.speciesCardDots && Array.isArray(sheet.speciesCardDots) && sheet.speciesCardDots.length > 0) {
      return sheet.speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultCerebronychDots.map(row => [...row]);
  });

  // Local state for subspecies card dots (Cerebronych Cont.)
  const [subspeciesCardDots, setSubspeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.subspeciesCardDots && Array.isArray(sheet.subspeciesCardDots) && sheet.subspeciesCardDots.length > 0) {
      return sheet.subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultCerebronychContDots.map(row => [...row]);
  });

  // Helper function to safely access speciesCardDots array
  const safeGetDotsArray = (index: number): boolean[] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || index >= speciesCardDots.length) {
      return defaultCerebronychDots[index] || [];
    }
    return speciesCardDots[index] || [];
  };

  // Helper function to safely clone speciesCardDots array
  const safeCloneSpeciesCardDots = (): boolean[][] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || speciesCardDots.length === 0) {
      return defaultCerebronychDots.map(row => [...row]);
    }
    return speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Save to sheet and localStorage
  const persistSpeciesCardDots = (newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
    let newSpSpent = spSpent + spSpentDelta;
    let newXpSpent = xpSpent + xpSpentDelta;
    
    // Enforce XP/SP cannot exceed total
    if (newXpSpent > xpTotal) {
      setNotice("Not enough xp!");
      return;
    }
    if (newSpSpent > spTotal) {
      setNotice("Not enough sp!");
      return;
    }
    
    setSpeciesCardDots(newDots);
    newSpSpent = Math.max(0, newSpSpent);
    newXpSpent = Math.max(0, newXpSpent);
    setSpSpent(newSpSpent);
    setXpSpent(newXpSpent);
    
    if (sheet && onAutoSave) {
      onAutoSave({ 
        speciesCardDots: newDots, 
        spSpent: newSpSpent, 
        xpSpent: newXpSpent
      });
    }
  };

  // Helper function to safely access subspeciesCardDots array
  const safeGetSubspeciesDotsArray = (index: number): boolean[] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || index >= subspeciesCardDots.length) {
      return defaultCerebronychContDots[index] || [];
    }
    return subspeciesCardDots[index] || [];
  };

  // Helper function to safely clone subspeciesCardDots array
  const safeCloneSubspeciesCardDots = (): boolean[][] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || subspeciesCardDots.length === 0) {
      return defaultCerebronychContDots.map(row => [...row]);
    }
    return subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Save subspecies dots to sheet and localStorage
  const persistSubspeciesCardDots = (newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
    let newSpSpent = spSpent + spSpentDelta;
    let newXpSpent = xpSpent + xpSpentDelta;
    
    // Enforce XP/SP cannot exceed total
    if (newXpSpent > xpTotal) {
      setNotice("Not enough xp!");
      return;
    }
    if (newSpSpent > spTotal) {
      setNotice("Not enough sp!");
      return;
    }
    
    setSubspeciesCardDots(newDots);
    newSpSpent = Math.max(0, newSpSpent);
    newXpSpent = Math.max(0, newXpSpent);
    setSpSpent(newSpSpent);
    setXpSpent(newXpSpent);
    
    if (sheet && onAutoSave) {
      onAutoSave({ 
        subspeciesCardDots: newDots, 
        spSpent: newSpSpent, 
        xpSpent: newXpSpent
      });
    }
  };

  // Helper function to render colored host text
  const renderColoredHostText = (hostValue: string): React.JSX.Element => {
    const colorMap: { [key: string]: React.JSX.Element } = {
      "": <span style={{ fontWeight: 'bold' }}>Select Host</span>,
      "Avenoch Host": <><span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Corvid Avenoch Host": <><span style={{ color: '#75904e', fontWeight: 'bold' }}>Corvid</span> <span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Falcador Avenoch Host": <><span style={{ color: '#6d7156', fontWeight: 'bold' }}>Falcador</span> <span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Nocturne Avenoch Host": <><span style={{ color: '#334592', fontWeight: 'bold' }}>Nocturne</span> <span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Vulturine Avenoch Host": <><span style={{ color: '#a96d8c', fontWeight: 'bold' }}>Vulturine</span> <span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Chloroptid Host": <><span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Barkskin Chloroptid Host": <><span style={{ color: '#5f2d2b', fontWeight: 'bold' }}>Barkskin</span> <span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Carnivorous Chloroptid Host": <><span style={{ color: '#2b2d5f', fontWeight: 'bold' }}>Carnivorous</span> <span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Drifting Chloroptid Host": <><span style={{ color: '#5f8a5f', fontWeight: 'bold' }}>Drifting</span> <span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Viny Chloroptid Host": <><span style={{ color: '#5f5f2b', fontWeight: 'bold' }}>Viny</span> <span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Cognizant Host": <><span style={{ color: '#2b3b5f', fontWeight: 'bold' }}>Cognizant</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Android Cognizant Host": <><span style={{ color: '#581fbd', fontWeight: 'bold' }}>Android</span> <span style={{ color: '#2b3b5f', fontWeight: 'bold' }}>Cognizant</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Utility Droid Cognizant Host": <><span style={{ color: '#bd891f', fontWeight: 'bold' }}>Utility Droid</span> <span style={{ color: '#2b3b5f', fontWeight: 'bold' }}>Cognizant</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Emberfolk Host": <><span style={{ color: '#5f2b2b', fontWeight: 'bold' }}>Emberfolk</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Petran Emberfolk Host": <><span style={{ color: '#735311', fontWeight: 'bold' }}>Petran</span> <span style={{ color: '#5f2b2b', fontWeight: 'bold' }}>Emberfolk</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Pyran Emberfolk Host": <><span style={{ color: '#b31111', fontWeight: 'bold' }}>Pyran</span> <span style={{ color: '#5f2b2b', fontWeight: 'bold' }}>Emberfolk</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Entomos Host": <><span style={{ color: '#5f422b', fontWeight: 'bold' }}>Entomos</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Apocritan Entomos Host": <><span style={{ color: '#6d7156', fontWeight: 'bold' }}>Apocritan</span> <span style={{ color: '#5f422b', fontWeight: 'bold' }}>Entomos</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Dynastes Entomos Host": <><span style={{ color: '#334592', fontWeight: 'bold' }}>Dynastes</span> <span style={{ color: '#5f422b', fontWeight: 'bold' }}>Entomos</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Mantid Entomos Host": <><span style={{ color: '#75904e', fontWeight: 'bold' }}>Mantid</span> <span style={{ color: '#5f422b', fontWeight: 'bold' }}>Entomos</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Human Host": <><span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Diminutive Human Host": <><span style={{ color: '#c3735f', fontWeight: 'bold' }}>Diminutive</span> <span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Lithe Human Host": <><span style={{ color: '#2b5f5f', fontWeight: 'bold' }}>Lithe</span> <span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Massive Human Host": <><span style={{ color: '#2b175f', fontWeight: 'bold' }}>Massive</span> <span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Stout Human Host": <><span style={{ color: '#5f2b2b', fontWeight: 'bold' }}>Stout</span> <span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Lumenaren Host": <><span style={{ color: '#515f2b', fontWeight: 'bold' }}>Lumenaren</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Infrared Lumenaren Host": <><span style={{ color: '#b17fbe', fontWeight: 'bold' }}>Infrared</span> <span style={{ color: '#515f2b', fontWeight: 'bold' }}>Lumenaren</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Radiofrequent Lumenaren Host": <><span style={{ color: '#bea97f', fontWeight: 'bold' }}>Radiofrequent</span> <span style={{ color: '#515f2b', fontWeight: 'bold' }}>Lumenaren</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "X-Ray Lumenaren Host": <><span style={{ color: '#7f8abe', fontWeight: 'bold' }}>X-Ray</span> <span style={{ color: '#515f2b', fontWeight: 'bold' }}>Lumenaren</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Praedari Host": <><span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Canid Praedari Host": <><span style={{ color: '#2f8da6', fontWeight: 'bold' }}>Canid</span> <span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Felid Praedari Host": <><span style={{ color: '#b16326', fontWeight: 'bold' }}>Felid</span> <span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Mustelid Praedari Host": <><span style={{ color: '#699239', fontWeight: 'bold' }}>Mustelid</span> <span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Ursid Praedari Host": <><span style={{ color: '#9026b1', fontWeight: 'bold' }}>Ursid</span> <span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
    };

    return colorMap[hostValue] || <span style={{ fontWeight: 'bold' }}>Select Host</span>;
  };

  // Helper function to get the host feature JSX based on selected host
  const getHostFeatureJSX = (hostValue: string): React.JSX.Element | null => {
    if (!hostValue) return null;

    const featureMap: { [key: string]: React.JSX.Element } = {
      "Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b5f59' }}>First in Flight.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> 2hx whenever you Crit on an <b><i style={{ color: '#990000' }}>Attack</i></b>.</span>,
      "Corvid Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#75904e' }}>Crow's Cunning.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you are <i>Immune</i> to the <b><i>Confuse</i></b> and <b><i>Mesmerize</i></b> conditions.</span>,
      "Falcador Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#6d7156' }}>Rending Talons.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, when you roll for <b><i>Spike</i></b> Damage on <b><i style={{ color: '#351c75' }}>Strikes</i></b>, the <b><i>Spike</i></b> effect triggers on a roll of 5+.</span>,
      "Nocturne Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#334592' }}>Eyes of the Night.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you are <i>Immune</i> to the <b><i>Blind</i></b> condition and don't have a <i>Rear Arc</i>. Additionally, whenever you Crit on an <b><i style={{ color: '#990000' }}>Attack</i></b>, you inflict the <b><i>Mesmerize</i></b> condition.</span>,
      "Vulturine Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#a96d8c' }}>Carrion Gorge.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, when you destroy an enemy using a <b><i style={{ color: '#351c75' }}>Strike</i></b>, you immediately gain 2d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.</span>,
      "Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#315f2b' }}>Rapid Regeneration.</i></b> You gain 1d4 <b><i style={{ color: '#990000' }}>Hit Points</i></b> at the start of your turn. Additionally, your size is 1hx, 2hx, or 3hx, depending on the size of your host.</span>,
      "Barkskin Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2d2b' }}>Deep Roots.</i></b> You are <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions.</span>,
      "Carnivorous Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b2d5f' }}>Sap Sucker.</i></b> Whenever you heal as a result of the <b><i>Drain</i></b> condition, you heal all of the amount of Damage done instead of half.</span>,
      "Drifting Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f8a5f' }}>Leaf on the Wind.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> 1hx after you take any Damage.</span>,
      "Viny Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f5f2b' }}>Climbing Creeper.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and <i>Resist</i> <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.</span>,
      "Cognizant Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b3b5f' }}>Gears & Cogs.</i></b> You <i>Resist</i> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Drain</i></b> condition and can naturally survive in the vacuum of space.</span>,
      "Android Cognizant Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#581fbd' }}>Encrypted Cerebral Cortex.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> condition.</span>,
      "Utility Droid Cognizant Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#bd891f' }}>Variant Utility.</i></b> Your size is 1hx, 2hx, or 3hx, depending on the size of your host, and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.</span>,
      "Emberfolk Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2b2b' }}>Born of Fire.</i></b> You <i>Resist</i> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Spike</i></b> condition.</span>,
      "Petran Emberfolk Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#735311' }}>Mountain's Endurance.</i></b> You <i>Resist</i> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Demoralize</i></b> condition.</span>,
      "Pyran Emberfolk Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#b31111' }}>Ignition.</i></b> You can choose to have your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> and/or <b><i style={{ color: '#351c75' }}>Strikes</i></b> deal <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> at-will.</span>,
      "Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f422b' }}>Insectoid Resistance.</i></b>  You are <i>Immune</i> to the <b><i>Confuse</i></b> condition and fall Damage.</span>,
      "Apocritan Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#6d7156' }}>Swarm Tactics.</i></b> When you are 1hx away from an enemy, allies who <b><i style={{ color: '#351c75' }}>Strike</i></b> that enemy can choose to inflict the <b><i>Spike</i></b>, <b><i>Confuse</i></b> or <b><i>Restrain</i></b> condition on it. The <b><i>Spike</i></b> Damage type is the same as the ally's <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.</span>,
      "Dynastes Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#334592' }}>Herculean.</i></b> Your size is 3hx. You are also <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions. Additionally, when you inflict the <b><i>Slam</i></b> or <b><i>Bounce</i></b> condition, increase the forced <b><i style={{ color: '#38761d' }}>Movement</i></b> by 2hx.</span>,
      "Mantid Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#75904e' }}>Raptorial Claws.</i></b> You can <b><i style={{ color: '#351c75' }}>Strike</i></b> enemies in an adjacent hx during your <b><i style={{ color: '#38761d' }}>Move</i></b> instead of having to <b><i style={{ color: '#38761d' }}>Move</i></b> through them.</span>,
      "Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b315f' }}>Adaptable Physique.</i></b> You <i>Resist</i> two of the following Damage types: <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>Neural<img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.</span>,
      "Diminutive Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#c3735f' }}>Out of Sight.</i></b> When you are <b><i><span style={{ color: '#990000' }}>Attacked</span></i></b> and have any Cover, you roll one additional Cover die and discard the lowest roll.</span>,
      "Lithe Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b5f5f' }}>Fleet of Foot.</i></b> You ignore <i>Rough Terrain</i> and <i>Dangerous Terrain</i> and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.</span>,
      "Massive Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b175f' }}>I'LL SEE YOU IN HELL!</i></b> Whenever you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you can immediately make a <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b>. Additionally, your size is 3hx.</span>,
      "Stout Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2b2b' }}>Die Hard.</i></b> The first time you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you immediately gain 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and are not dying.</span>,
      "Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#515f2b' }}>Immutable Energy Reserves.</i></b> You are <i>Immune</i> to the <b><i>Sleep</i></b> condition, <i>Resist</i> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and can naturally survive in the vacuum of space.</span>,
      "Infrared Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#b17fbe' }}>Infrared Tracking.</i></b> All <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> you make automatically have the Arcing keyword.</span>,
      "Radiofrequent Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#bea97f' }}>Misleading Signals.</i></b> Enemies <b><i><span style={{ color: '#990000' }}>Attacking</span></i></b> you roll an additional Crit die and discard the highest rolled.</span>,
      "X-Ray Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#7f8abe' }}>Irradiate.</i></b> Enemies starting their turn within 3hx of you suffer two instances of the <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> condition.</span>,
      "Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2b5c' }}>Predator.</i></b> Whenever you <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> a creature who is not at full <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you gain +2 Crit and +1d6 Damage. The Damage type is the same as the <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.</span>,
      "Canid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2f8da6' }}>Inspired Hunter.</i></b> When you reduce a creature to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you immediately gain 1 <i>Action</i>. You can only benefit from this once per turn.</span>,
      "Felid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#b16326' }}>Cat's Grace.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and cannot take damage from falling as long as you are conscious. Additionally, you can use the <i>Acrobatics</i> skill once per turn without using an <i>Action</i>.</span>,
      "Mustelid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#699239' }}>Weasel.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Burrow Speed</i></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Additionally you can use the <i>Thievery</i> skill once per turn without using an <i>Action</i>.</span>,
      "Ursid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#9026b1' }}>Natural Insulation.</i></b> You <i>Resist</i> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Your size is 3hx.</span>,
    };

    return featureMap[hostValue] || null;
  };

  return (
    <div>
      {/* Cerebronych Species Content */}
      {contentType === 'species' && species === "Cerebronych" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Features Section */}
          <div style={{ color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Features</u></div>
            
          {/* Parasitic Composure Feature */}
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px' }}>
            <i style={{ fontWeight: 'bold', color: '#5f5e2b' }}>Parasitic Composure.</i> You are <i>Immune</i> to the <b><i>Confuse</i></b> and <b>{safeGetDotsArray(0)[0] ? '[Mesmerize]' : '[ - ]'}</b> condition(s) and have <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <b>[</b><i>{safeGetDotsArray(2)[0] ? 'Immunity' : 'Resistance'}</i><b>]</b> and <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <b>[</b><i>{safeGetDotsArray(1)[0] ? 'Immunity' : 'Resistance'}</i><b>]</b>.
          </div>

          {/* Parasitic Composure Immunities Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(6, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: Mesmerize immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Mesmerize</i></b> <i>Immunity</i></span>
              {(() => {
                const arr = safeGetDotsArray(0);
                const canCheck = !arr[0];
                const canUncheck = arr[0];
                return (
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[0][0] = true;
                          persistSpeciesCardDots(newDots, 0, 5);
                        } else if (canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[0][0] = false;
                          persistSpeciesCardDots(newDots, 0, -5);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[0] ? '#000' : '#fff',
                        cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })()}

              {/* Row 2: Spacer */}
              <span></span>
              <span></span>

              {/* Row 3: Toxic immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Immunity</i></span>
              {(() => {
                const arr = safeGetDotsArray(1);
                const canCheck = !arr[0];
                const canUncheck = arr[0];
                return (
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[1][0] = true;
                          persistSpeciesCardDots(newDots, 0, 5);
                        } else if (canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[1][0] = false;
                          persistSpeciesCardDots(newDots, 0, -5);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[0] ? '#000' : '#fff',
                        cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })()}

              {/* Row 4: Spacer */}
              <span></span>
              <span></span>

              {/* Row 5: Chemical immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Immunity</i></span>
              {(() => {
                const arr = safeGetDotsArray(2);
                const canCheck = !arr[0];
                const canUncheck = arr[0];
                return (
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[2][0] = true;
                          persistSpeciesCardDots(newDots, 0, 5);
                        } else if (canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[2][0] = false;
                          persistSpeciesCardDots(newDots, 0, -5);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[0] ? '#000' : '#fff',
                        cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })()}
            </div>
          </div>

            
            {/* Host Mimic Feature */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px' }}>
              <i style={{ fontWeight: 'bold', color: '#5f5e2b' }}>Host Mimic.</i> You inhabit a host body from a different <i>Species</i> or <i>Subspecies</i>. Choose a Host <i>Species</i> or <i>Subspecies</i>, which provides a modified <b><i style={{ color: '#0b5394' }}>Feature</i></b> that cannot be upgraded. Throughout your <i style={{ color: '#5f5e2b' }}>Cerebronych's</i> life, you may change host bodies depending on your desires and opportunities.
            </div>
          </div>

          {/* Select Host Standard Dropdown */}
          <div style={{ marginTop: '8px', marginBottom: '12px' }}>
            <style>
              {`.cerebronych-host-select { color: ${currentHostColor} !important; }`}
            </style>
            <select
              value={sheet?.hostSpecies || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (onAutoSave) {
                  onAutoSave({ hostSpecies: val });
                }
              }}
              className="cerebronych-host-select"
              style={{
                fontSize: '1em',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: '#fff',
                textAlign: 'left',
                minWidth: '200px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold'
              }}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                Select Host
              </option>
              <option value="Avenoch Host" style={{ color: '#2b5f59', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch Host</option>
              <option value="Corvid Avenoch Host" style={{ color: '#75904e', backgroundColor: 'white', fontWeight: 'bold' }}>Corvid Avenoch Host</option>
              <option value="Falcador Avenoch Host" style={{ color: '#6d7156', backgroundColor: 'white', fontWeight: 'bold' }}>Falcador Avenoch Host</option>
              <option value="Nocturne Avenoch Host" style={{ color: '#334592', backgroundColor: 'white', fontWeight: 'bold' }}>Nocturne Avenoch Host</option>
              <option value="Vulturine Avenoch Host" style={{ color: '#a96d8c', backgroundColor: 'white', fontWeight: 'bold' }}>Vulturine Avenoch Host</option>
              <option value="Chloroptid Host" style={{ color: '#315f2b', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid Host</option>
              <option value="Barkskin Chloroptid Host" style={{ color: '#5f2d2b', backgroundColor: 'white', fontWeight: 'bold' }}>Barkskin Chloroptid Host</option>
              <option value="Carnivorous Chloroptid Host" style={{ color: '#2b2d5f', backgroundColor: 'white', fontWeight: 'bold' }}>Carnivorous Chloroptid Host</option>
              <option value="Drifting Chloroptid Host" style={{ color: '#5f8a5f', backgroundColor: 'white', fontWeight: 'bold' }}>Drifting Chloroptid Host</option>
              <option value="Viny Chloroptid Host" style={{ color: '#5f5f2b', backgroundColor: 'white', fontWeight: 'bold' }}>Viny Chloroptid Host</option>
              <option value="Cognizant Host" style={{ color: '#2b3b5f', backgroundColor: 'white', fontWeight: 'bold' }}>Cognizant Host</option>
              <option value="Android Cognizant Host" style={{ color: '#581fbd', backgroundColor: 'white', fontWeight: 'bold' }}>Android Cognizant Host</option>
              <option value="Utility Droid Cognizant Host" style={{ color: '#bd891f', backgroundColor: 'white', fontWeight: 'bold' }}>Utility Droid Cognizant Host</option>
              <option value="Emberfolk Host" style={{ color: '#5f2b2b', backgroundColor: 'white', fontWeight: 'bold' }}>Emberfolk Host</option>
              <option value="Petran Emberfolk Host" style={{ color: '#735311', backgroundColor: 'white', fontWeight: 'bold' }}>Petran Emberfolk Host</option>
              <option value="Pyran Emberfolk Host" style={{ color: '#b31111', backgroundColor: 'white', fontWeight: 'bold' }}>Pyran Emberfolk Host</option>
              <option value="Entomos Host" style={{ color: '#5f422b', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos Host</option>
              <option value="Apocritan Entomos Host" style={{ color: '#6d7156', backgroundColor: 'white', fontWeight: 'bold' }}>Apocritan Entomos Host</option>
              <option value="Dynastes Entomos Host" style={{ color: '#334592', backgroundColor: 'white', fontWeight: 'bold' }}>Dynastes Entomos Host</option>
              <option value="Mantid Entomos Host" style={{ color: '#75904e', backgroundColor: 'white', fontWeight: 'bold' }}>Mantid Entomos Host</option>
              <option value="Human Host" style={{ color: '#2b315f', backgroundColor: 'white', fontWeight: 'bold' }}>Human Host</option>
              <option value="Diminutive Human Host" style={{ color: '#c3735f', backgroundColor: 'white', fontWeight: 'bold' }}>Diminutive Human Host</option>
              <option value="Lithe Human Host" style={{ color: '#2b5f5f', backgroundColor: 'white', fontWeight: 'bold' }}>Lithe Human Host</option>
              <option value="Massive Human Host" style={{ color: '#2b175f', backgroundColor: 'white', fontWeight: 'bold' }}>Massive Human Host</option>
              <option value="Stout Human Host" style={{ color: '#5f2b2b', backgroundColor: 'white', fontWeight: 'bold' }}>Stout Human Host</option>
              <option value="Lumenaren Host" style={{ color: '#515f2b', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren Host</option>
              <option value="Infrared Lumenaren Host" style={{ color: '#b17fbe', backgroundColor: 'white', fontWeight: 'bold' }}>Infrared Lumenaren Host</option>
              <option value="Radiofrequent Lumenaren Host" style={{ color: '#bea97f', backgroundColor: 'white', fontWeight: 'bold' }}>Radiofrequent Lumenaren Host</option>
              <option value="X-Ray Lumenaren Host" style={{ color: '#7f8abe', backgroundColor: 'white', fontWeight: 'bold' }}>X-Ray Lumenaren Host</option>
              <option value="Praedari Host" style={{ color: '#5f2b5c', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari Host</option>
              <option value="Canid Praedari Host" style={{ color: '#2f8da6', backgroundColor: 'white', fontWeight: 'bold' }}>Canid Praedari Host</option>
              <option value="Felid Praedari Host" style={{ color: '#b16326', backgroundColor: 'white', fontWeight: 'bold' }}>Felid Praedari Host</option>
              <option value="Mustelid Praedari Host" style={{ color: '#699239', backgroundColor: 'white', fontWeight: 'bold' }}>Mustelid Praedari Host</option>
              <option value="Ursid Praedari Host" style={{ color: '#9026b1', backgroundColor: 'white', fontWeight: 'bold' }}>Ursid Praedari Host</option>
            </select>

            {/* Display selected host feature with indentation */}
            {sheet?.hostSpecies && getHostFeatureJSX(sheet.hostSpecies) && (
              <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginTop: '12px', marginLeft: '24px' }}>
                {getHostFeatureJSX(sheet.hostSpecies)}
              </div>
            )}

            {/* Damage Types Dropdown for Human Host */}
            {sheet?.hostSpecies === 'Human Host' && (
              <div style={{ marginTop: '8px', marginLeft: '24px' }}>
                {/* Damage Types Dropdown */}
                <select
                  value=""
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val && onAutoSave) {
                      const currentTypes = sheet?.humanHostDamageTypes || [];
                      // Only add if not already included AND less than 2 types selected
                      if (!currentTypes.includes(val) && currentTypes.length < 2) {
                        onAutoSave({ humanHostDamageTypes: [...currentTypes, val] });
                      }
                    }
                  }}
                  style={{
                    fontSize: '1em',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    textAlign: 'left',
                    minWidth: '200px',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontWeight: 'bold',
                    color: '#000'
                  }}
                >
                  <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                    Damage Types
                  </option>
                  {((sheet?.humanHostDamageTypes?.length || 0) < 2) && !sheet?.humanHostDamageTypes?.includes('Chemical') && (
                    <option value="Chemical" style={{ color: '#de7204', backgroundColor: 'white', fontWeight: 'bold' }}>Chemical</option>
                  )}
                  {((sheet?.humanHostDamageTypes?.length || 0) < 2) && !sheet?.humanHostDamageTypes?.includes('Cold') && (
                    <option value="Cold" style={{ color: '#3ebbff', backgroundColor: 'white', fontWeight: 'bold' }}>Cold</option>
                  )}
                  {((sheet?.humanHostDamageTypes?.length || 0) < 2) && !sheet?.humanHostDamageTypes?.includes('Electric') && (
                    <option value="Electric" style={{ color: '#d5d52a', backgroundColor: 'white', fontWeight: 'bold' }}>Electric</option>
                  )}
                  {((sheet?.humanHostDamageTypes?.length || 0) < 2) && !sheet?.humanHostDamageTypes?.includes('Fire') && (
                    <option value="Fire" style={{ color: '#e20e0e', backgroundColor: 'white', fontWeight: 'bold' }}>Fire</option>
                  )}
                  {((sheet?.humanHostDamageTypes?.length || 0) < 2) && !sheet?.humanHostDamageTypes?.includes('Force') && (
                    <option value="Force" style={{ color: '#516fff', backgroundColor: 'white', fontWeight: 'bold' }}>Force</option>
                  )}
                  {((sheet?.humanHostDamageTypes?.length || 0) < 2) && !sheet?.humanHostDamageTypes?.includes('Neural') && (
                    <option value="Neural" style={{ color: '#a929ff', backgroundColor: 'white', fontWeight: 'bold' }}>Neural</option>
                  )}
                  {((sheet?.humanHostDamageTypes?.length || 0) < 2) && !sheet?.humanHostDamageTypes?.includes('Toxic') && (
                    <option value="Toxic" style={{ color: '#02b900', backgroundColor: 'white', fontWeight: 'bold' }}>Toxic</option>
                  )}
                </select>

                {/* Display selected damage types */}
                {sheet?.humanHostDamageTypes && sheet.humanHostDamageTypes.length > 0 && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '0px' }}>
                    {sheet.humanHostDamageTypes.map((type, index) => {
                      const damageTypeColors: { [key: string]: string } = {
                        'Chemical': '#de7204',
                        'Cold': '#3ebbff',
                        'Electric': '#d5d52a',
                        'Fire': '#e20e0e',
                        'Force': '#516fff',
                        'Neural': '#a929ff',
                        'Toxic': '#02b900'
                      };
                      const damageTypeIcons: { [key: string]: string } = {
                        'Chemical': '/Chemical.png',
                        'Cold': '/Cold.png',
                        'Electric': '/Electric.png',
                        'Fire': '/Fire.png',
                        'Force': '/Force.png',
                        'Neural': '/Neural.png',
                        'Toxic': '/Toxic.png'
                      };
                      return (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', color: damageTypeColors[type], fontWeight: 'bold' }}>
                            <u>{type}</u>
                            <img src={damageTypeIcons[type]} alt={type} style={{ width: 16, height: 16, marginLeft: 4, verticalAlign: 'middle' }} />
                          </span>
                          <button
                            onClick={() => {
                              if (onAutoSave) {
                                const newTypes = sheet.humanHostDamageTypes?.filter((_, i) => i !== index) || [];
                                onAutoSave({ humanHostDamageTypes: newTypes });
                              }
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#cc0000',
                              fontSize: '1.2em',
                              cursor: 'pointer',
                              padding: '0 4px',
                              fontWeight: 'bold'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>



          {/* Techniques Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px', marginTop: '24px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Techniques</u></div>
            
            {/* Memory Manifest Technique */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '4px' }}>
              <b><i style={{ color: '#5f5e2b', fontSize: '1em' }}>Memory Manifest</i></b> <i style={{ color: '#5f5e2b', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{4 - safeGetDotsArray(5).filter(Boolean).length}]</b>).</i> You can use any <i>Active</i> or <b>{safeGetDotsArray(4)[0] ? '[Inactive]' : '[ - ]'}</b> <b><i style={{ color: '#bf9000' }}>Technique</i></b> from an ally within <b>[{3 + safeGetDotsArray(3).filter(Boolean).length}]</b>hx of you.
            </div>
          </div>

          {/* Memory Manifest Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(6, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
              
              {/* Row 2: +1hx range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(3);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [5, 8, 11];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[3][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[3][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: Spacer */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 4: XP header for Includes Inactive Techniques */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              <span></span>
              
              {/* Row 5: Includes Inactive Techniques dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Includes <i>Inactive</i> <b><i style={{ color: '#bf9000' }}>Techniques</i></b></span>
              {(() => {
                const arr = safeGetDotsArray(4);
                const canCheck = !arr[0];
                const canUncheck = arr[0];
                return (
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[4][0] = true;
                          persistSpeciesCardDots(newDots, 0, 10);
                        } else if (canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[4][0] = false;
                          persistSpeciesCardDots(newDots, 0, -10);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[0] ? '#000' : '#fff',
                        cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })()}
              <span></span>
              <span></span>

              {/* Row 6: Spacer */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 7: XP header for cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              
              {/* Row 8: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(5);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [5, 8];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[5][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[5][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>
            </div>
          </div>

          {/* Limit Push Technique */}
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '4px', marginTop: '16px' }}>
            <b><i style={{ color: '#5f5e2b', fontSize: '1em' }}>Limit Push </i></b> <i style={{ color: '#5f5e2b', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{4 - safeGetDotsArray(8).filter(Boolean).length}]</b>).</i> You and allies within <b>[{3 + safeGetDotsArray(6).filter(Boolean).length}]</b>hx of you can remove <b>[{safeGetDotsArray(7)[0] ? '2' : '1'}]</b> <i>Cooldown Token(s)</i> from any <i>Inactive</i> <b><i style={{ color: '#990000' }}>Attack</i></b> or <b><i style={{ color: '#bf9000' }}>Technique</i></b>.
          </div>

          {/* Limit Push Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(8, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              
              {/* Row 2: +1hx range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(6);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [4, 6, 9];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[6][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[6][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: Spacer */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 4: XP header for +1 Cooldown Token */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              <span></span>
              <span></span>
              
              {/* Row 5: +1 Cooldown Token dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <i>Cooldown Token</i></span>
              {(() => {
                const arr = safeGetDotsArray(7);
                const canCheck = !arr[0];
                const canUncheck = arr[0];
                return (
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[7][0] = true;
                          persistSpeciesCardDots(newDots, 0, 12);
                        } else if (canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[7][0] = false;
                          persistSpeciesCardDots(newDots, 0, -12);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[0] ? '#000' : '#fff',
                        cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })()}
              <span></span>
              <span></span>

              {/* Row 6: Spacer */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 7: XP header for cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              
              {/* Row 8: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(8);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [4, 7];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[8][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[8][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>
            </div>
          </div>

        </div>
      )}

      {/* Cerebronych (cont.) Subspecies Content */}
      {contentType === 'subspecies' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Hit Points Section */}
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
            
            {/* Starting Hit Points */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting</i></b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>. 30 +<b>[{(() => {
                const hp5Dots = safeGetDotsArray(9);
                const hp10Dots = safeGetDotsArray(10);
                const hp15Dots = safeGetDotsArray(11);
                const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
                const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
                const hp15Bonus = (hp15Dots[0] ? 15 : 0);
                return hp5Bonus + hp10Bonus + hp15Bonus;
              })()}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
            </div>
          </div>

          {/* Hit Points Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(9, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for +5 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span></span>
              
              {/* Row 2: +5 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(9);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [3, 4];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[9][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[9][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: Spacer */}
              <span></span>
              <span></span>
              <span></span>
              

              {/* Row 4: XP header for +10 HP */}
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              {/* Row 5: +10 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(10);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [7, 10];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[10][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[10][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 6: Spacer */}
              <span></span>
              <span></span>
              <span></span>

              {/* Row 7: XP header for +15 HP */}
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>
              <span></span>
              <span></span>
              {/* Row 8: +15 Hit Points dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {(() => {
                const arr = safeGetDotsArray(11);
                const canCheck = !arr[0];
                const canUncheck = arr[0];
                return (
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[11][0] = true;
                          persistSpeciesCardDots(newDots, 0, 14);
                        } else if (canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[11][0] = false;
                          persistSpeciesCardDots(newDots, 0, -14);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[0] ? '#000' : '#fff',
                        cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })()}
              <span></span>
            </div>
          </div>

          {/* Strike Section */}
          <div style={{ color: '#351c75', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            
            {/* Enhanced Strike Effects */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <i><b>Enhanced</b></i> <i><b style={{ color: '#351c75' }}>Strike</b></i> <i><b>Effects.</b></i> {safeGetSubspeciesDotsArray(0)[0] && 'Can Strike using Toxic instead. '}{safeGetSubspeciesDotsArray(1)[0] && 'Infest (see below).'}
            </div>
          </div>

          {/* Strike Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px',
              gridTemplateRows: 'repeat(4, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for Toxic Strike */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span></span>
              {/* Row 2: Can Strike using Toxic instead */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Can <b><i style={{ color: '#351c75' }}>Strike</i></b> using <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> instead</span>
              {(() => {
                const arr = safeGetSubspeciesDotsArray(0);
                const canCheck = !arr[0];
                const canUncheck = arr[0];
                return (
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canCheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[0][0] = true;
                          persistSubspeciesCardDots(newDots, 0, 4);
                        } else if (canUncheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[0][0] = false;
                          persistSubspeciesCardDots(newDots, 0, -4);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[0] ? '#000' : '#fff',
                        cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })()}

              {/* Row 3: Spacer */}
              <span></span>
              <span></span>

              {/* Row 4: Arrow symbol with XP header for Infest */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>22xp</span>

              {/* Row 5: Infest */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#5f5e2b' }}>Infest</i></b> (see below)</span>
            <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {(() => {
                const arr = safeGetSubspeciesDotsArray(1);
                const toxicStrikeSelected = safeGetSubspeciesDotsArray(0)[0];
                const canCheck = !arr[0] && toxicStrikeSelected;
                const canUncheck = arr[0];
                return (
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canCheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[1][0] = true;
                          persistSubspeciesCardDots(newDots, 0, 22);
                        } else if (canUncheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[1][0] = false;
                          persistSubspeciesCardDots(newDots, 0, -22);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[0] ? '#000' : '#fff',
                        cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })()}
            </div>
          </div>

          {/* Infest Description */}
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginTop: '12px', marginBottom: '16px' }}>
            <b><i style={{ color: '#5f5e2b' }}>Infest.</i></b> When you destroy a creature with a <b><i style={{ color: '#351c75' }}>Strike</i></b> using <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage, the creature instead stays at 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and is under your complete control until the end of the encounter. If the creature dies, you lose control. After the battle, you can choose to inhabit the creature and abandon your current host, as long as that creature is a playable species. If you choose not to take on the new host, the creature you infest dies. Consult your DM for more information.
          </div>

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px', marginTop: '24px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            
            {/* Starting Speed */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting</i></b> <b><i style={{ color: '#38761d' }}>Speed</i></b>. 6hx +<b>[{safeGetSubspeciesDotsArray(2).filter(Boolean).length}]</b>hx.
            </div>
          </div>

          {/* Movement Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for Speed */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>13xp</span>
              
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0,1,2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [5, 9, 13];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[2][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSubspeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[2][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSubspeciesCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ color: '#000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          {/* Skills */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Deception</i> +2, <i>Intimidation</i> +2
          </div>

          {/* Languages */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Languages.</b> Cerebronych, Choose</i> 1
            
            {/* Language Dropdown */}
            <div style={{ marginTop: '8px', marginLeft: '24px' }}>
              <select
                value=""
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && onAutoSave) {
                    onAutoSave({ cerebronychLanguage: val });
                  }
                }}
                style={{
                  fontSize: '1em',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  background: '#fff',
                  textAlign: 'left',
                  minWidth: '200px',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: 'bold',
                  color: '#000'
                }}
              >
                <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                  Languages
                </option>
                {!['Avenoch', sheet?.species].includes('Avenoch') && sheet?.cerebronychLanguage !== 'Avenoch' && (
                  <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
                )}
                {sheet?.charClass !== 'Coder' && sheet?.cerebronychLanguage !== 'Binary' && (
                  <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
                )}
                {sheet?.cerebronychLanguage !== 'Body Language' && (
                  <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
                )}
                {sheet?.cerebronychLanguage !== 'Chloroptid' && (
                  <option value="Chloroptid" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid</option>
                )}
                {sheet?.cerebronychLanguage !== 'Defteran' && (
                  <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
                )}
                {sheet?.cerebronychLanguage !== 'Dentomos' && (
                  <option value="Dentomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Dentomos</option>
                )}
                {sheet?.cerebronychLanguage !== 'Hycryptice' && (
                  <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
                )}
                {sheet?.cerebronychLanguage !== 'Galactapol Jargon' && (
                  <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
                )}
                {sheet?.cerebronychLanguage !== 'Lumenaren' && (
                  <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
                )}
                {sheet?.cerebronychLanguage !== 'Lux' && (
                  <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
                )}
                {sheet?.charClass !== 'Coder' && sheet?.cerebronychLanguage !== 'Oikovox' && (
                  <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
                )}
                {sheet?.cerebronychLanguage !== 'Praedari' && (
                  <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
                )}
                {sheet?.charClass !== 'Elementalist' && sheet?.cerebronychLanguage !== 'Xenoelemental' && (
                  <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
                )}
                {sheet?.charClass !== 'Devout' && sheet?.cerebronychLanguage !== 'Xenovox' && (
                  <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
                )}
              </select>

              {/* Display selected language */}
              {sheet?.cerebronychLanguage && (
                <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#000', fontWeight: 'bold' }}>
                    {sheet.cerebronychLanguage}
                  </span>
                  <button
                    onClick={() => {
                      if (onAutoSave) {
                        onAutoSave({ cerebronychLanguage: undefined });
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#cc0000',
                      fontSize: '1.2em',
                      cursor: 'pointer',
                      padding: '0 4px',
                      fontWeight: 'bold'
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Perks SP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px',
            gridTemplateRows: 'auto auto auto auto',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginTop: '-12px',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: SP header for Many Masks */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10sp</span>
            
            {/* Row 2: Many Masks */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#5f5e2b' }}>Many Masks.</i></b> Years of embodying different hosts has developed your keen ability to mimic voices, mannerisms and personalities of many people from many walks of life. Gain an advantage on related skill rolls.
            </span>
            {(() => {
              const arr = safeGetSubspeciesDotsArray(3);
              const canCheck = !arr[0];
              const canUncheck = arr[0];
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      if (canCheck) {
                        const newDots = safeCloneSubspeciesCardDots();
                        newDots[3][0] = true;
                        persistSubspeciesCardDots(newDots, 10, 0);
                      } else if (canUncheck) {
                        const newDots = safeCloneSubspeciesCardDots();
                        newDots[3][0] = false;
                        persistSubspeciesCardDots(newDots, -10, 0);
                      }
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: arr[0] ? '#000' : '#fff',
                      cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })()}

            {/* Row 3: Spacer */}
            <span></span>
            <span></span>

            {/* Row 4: SP header for Play Dead */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7sp</span>

            {/* Row 5: Play Dead */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#5f5e2b' }}>Play Dead.</i></b> The fact that you effectively inhabit a corpse is not lost on you. Gain an advantage on skills related to either pretending you're dead or otherwise pretending you're an undead creature risen from the grave.
            </span>
            {(() => {
              const arr = safeGetSubspeciesDotsArray(4);
              const canCheck = !arr[0];
              const canUncheck = arr[0];
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      if (canCheck) {
                        const newDots = safeCloneSubspeciesCardDots();
                        newDots[4][0] = true;
                        persistSubspeciesCardDots(newDots, 7, 0);
                      } else if (canUncheck) {
                        const newDots = safeCloneSubspeciesCardDots();
                        newDots[4][0] = false;
                        persistSubspeciesCardDots(newDots, -7, 0);
                      }
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: arr[0] ? '#000' : '#fff',
                      cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })()}
          </div>

        </div>
      )}
    </div>
  );
};

export default LevelUpSpeciesCerebronych;
