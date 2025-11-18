import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";

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
  
  // State for custom dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      "Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b5f59' }}>First in Flight.</i></b> You are <i>Immune</i> to the <b><i>Restrain</i></b> condition and have a <b><i style={{ color: '#38761d' }}>Flight Speed</i></b>. Additionally, after you Crit, you can immediately <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[2]</b>hx.</span>,
      "Corvid Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#75904e' }}>Crow's Cunning.</i></b> You are <i>Immune</i> to the <b><i>Blind</i></b> condition and start battles with <b>[1]</b> <b><i style={{ color: '#bf9000' }}>Chemical</i></b> bomb. When you use an <i>Action</i> to throw the bomb at a target spot within <b>[4]</b>hx, all creatures in a <b>[2]</b>hx radius around that spot must roll a Crit die. On a roll lower than <b>[4]</b>, that creature becomes <b><i>Blind</i></b>. The bomb is destroyed after being used.</span>,
      "Falcador Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#6d7156' }}>Rending Talons.</i></b> After you <b><i style={{ color: '#351c75' }}>Strike</i></b> a creature, that creature suffers an instance of the <b><i>Spike</i></b> condition. The <b><i>Spike</i></b> damage is the same as your <b><i style={{ color: '#351c75' }}>Strike</i></b> damage.</span>,
      "Nocturne Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#334592' }}>Eyes of the Night.</i></b> You ignore all Visibility penalties. Additionally, whenever you Crit on an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> against a creature, that creature gains the <b><i>Mesmerize</i></b> condition.</span>,
      "Vulturine Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#a96d8c' }}>Carrion Gorge.</i></b> When an enemy creature in a hx adjacent to you is reduced to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you immediately regain <b>[2]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.</span>,
      "Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#315f2b' }}>Rapid Regeneration.</i></b> You regenerate <b>[2]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b> at the start of each of your turns. Additionally, you <i>Resist</i> <b><u style={{ color: '#de7204' }}>Chemical</u></b>.</span>,
      "Barkskin Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2d2b' }}>Deep Roots.</i></b> You are <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions.</span>,
      "Carnivorous Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b2d5f' }}>Sap Sucker.</i></b> Whenever you heal as a result of the <b><i>Drain</i></b> condition, you heal all of the amount of Damage done instead of half.</span>,
      "Drifting Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f8a5f' }}>Leaf on the Wind.</i></b> You have a <b><i style={{ color: '#38761d' }}>Flight Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[1]</b>hx after you take any Damage.</span>,
      "Viny Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f5f2b' }}>Climbing Creeper.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and <i>Resist</i> <b><u style={{ color: '#a6965f' }}>Piercing</u></b>.</span>,
      "Cognizant Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b3b5f' }}>Self-Repairing.</i></b> You can spend <b>[10]</b> minutes outside of battle to regain all <b><i style={{ color: '#990000' }}>Hit Points</i></b> lost. You <i>Resist</i> <b><u style={{ color: '#ffe700' }}>Electric</u></b>.</span>,
      "Android Cognizant Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#581fbd' }}>Encrypted Cerebral Cortex.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> condition.</span>,
      "Utility Droid Cognizant Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#bd891f' }}>Variant Utility.</i></b> Your size is 1hx, 2hx, or 3hx, chosen at character creation, and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.</span>,
      "Emberfolk Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2b2b' }}>Molten Core.</i></b> You are <i>Immune</i> to <b><u style={{ color: '#f90102' }}>Fire</u></b> and <i>Resist</i> <b><u style={{ color: '#3ebbff' }}>Cold</u></b>.</span>,
      "Petran Emberfolk Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#735311' }}>Mountain's Endurance.</i></b> You <i>Resist</i> <b><u style={{ color: '#915927' }}>Bludgeoning</u></b> and are <i>Immune</i> to the <b><i>Demoralize</i></b> condition.</span>,
      "Pyran Emberfolk Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#b31111' }}>Ignition.</i></b> You can choose to have your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> and/or <b><i style={{ color: '#351c75' }}>Strikes</i></b> deal <b><u style={{ color: '#f90102' }}>Fire</u></b> Damage at-will.</span>,
      "Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f422b' }}>Exoskeleton.</i></b> You <i>Resist</i> <b><u style={{ color: '#a6965f' }}>Piercing</u></b> and <b><u style={{ color: '#f3a7ac' }}>Slashing</u></b>.</span>,
      "Apocritan Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#6d7156' }}>Swarm Tactics.</i></b> When you are <b>[1]</b>hx away from an enemy, allies who <b><i style={{ color: '#351c75' }}>Strike</i></b> that enemy can choose to inflict the <b><i>Spike</i></b>, <b><i>Confuse</i></b> or <b><i>Restrain</i></b> condition on it. The <b><i>Spike</i></b> damage is the same as the ally's <b><i style={{ color: '#351c75' }}>Strike</i></b> damage.</span>,
      "Dynastes Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#334592' }}>Herculean.</i></b> Your size is 3hx. You are also <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions. Additionally, when you inflict the <b><i>Slam</i></b> or <b><i>Bounce</i></b> condition, increase the forced <b><i style={{ color: '#38761d' }}>Movement</i></b> by <b>[2]</b>hx.</span>,
      "Mantid Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#75904e' }}>Raptorial Claws.</i></b> You can <b><i style={{ color: '#351c75' }}>Strike</i></b> enemies in an adjacent hx during your <b><i style={{ color: '#38761d' }}>Move</i></b> instead of having to <b><i style={{ color: '#38761d' }}>Move</i></b> through them.</span>,
      "Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b315f' }}>Adaptable Physique.</i></b> You <i>Resist</i> <b>[2]</b> of the following damage types: <b><u style={{ color: '#de7204' }}>Chemical</u></b>, <b><u style={{ color: '#3ebbff' }}>Cold</u></b>, <b><u style={{ color: '#ffe700' }}>Electric</u></b>, <b><u style={{ color: '#f90102' }}>Fire</u></b>, <b><u style={{ color: '#516fff' }}>Force</u></b>, <b><u style={{ color: '#a929ff' }}>Neural</u></b>, <b><u style={{ color: '#02b900' }}>Toxic</u></b></span>,
      "Diminutive Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#c3735f' }}>Out of Sight.</i></b> When you are <b><i><span style={{ color: '#990000' }}>Attacked</span></i></b> and have any Cover, you roll <b>[1]</b> additional Cover die and discard the lowest roll.</span>,
      "Lithe Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b5f5f' }}>Fleet of Foot.</i></b> You ignore <i>Rough Terrain</i> and <i>Dangerous Terrain</i> and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.</span>,
      "Massive Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b175f' }}>I'LL SEE YOU IN HELL!</i></b> Whenever you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you can immediately make a <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b>. Additionally, your size is 3hx.</span>,
      "Stout Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2b2b' }}>Die Hard.</i></b> The first time you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you immediately gain 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and are not dying.</span>,
      "Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#515f2b' }}>Immutable Energy Reserves.</i></b> You are <i>Immune</i> to the <b><i>Sleep</i></b> condition, <i>Resist</i> <b><u style={{ color: '#ffe700' }}>Electric</u></b> and <b><u style={{ color: '#516fff' }}>Force</u></b> and can naturally survive in the vacuum of space.</span>,
      "Infrared Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#b17fbe' }}>Infrared Tracking.</i></b> All <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> you make automatically have the Arcing keyword.</span>,
      "Radiofrequent Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#bea97f' }}>Misleading Signals.</i></b> Enemies <b><i><span style={{ color: '#990000' }}>Attacking</span></i></b> you roll an additional Crit die and discard the highest rolled.</span>,
      "X-Ray Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#7f8abe' }}>Irradiate.</i></b> Enemies starting their turn within <b>[3]</b>hx of you suffer <b>[2]</b> instances of the <b><i>Spike</i></b> (<b><u style={{ color: '#de7204' }}>Chemical</u></b>) condition.</span>,
      "Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2b5c' }}>Predator.</i></b> Whenever you <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> a creature who is not at full <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you gain +<b>[2]</b> Crit and +<b>[1]</b>d6 Damage, the Damage type is the same as the <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.</span>,
      "Canid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2f8da6' }}>Inspired Hunter.</i></b> When you reduce a creature to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you immediately gain 1 <i>Action</i>. You can only benefit from this once per turn.</span>,
      "Felid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#b16326' }}>Cat's Grace.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and cannot take damage from falling as long as you are conscious. Additionally, you can use the <i>Acrobatics</i> skill once per turn without using an <i>Action</i>.</span>,
      "Mustelid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#699239' }}>Weasel.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Burrow Speed</i></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Additionally you can use the <i>Thievery</i> skill once per turn without using an <i>Action</i>.</span>,
      "Ursid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#9026b1' }}>Natural Insulation.</i></b> You <i>Resist</i> <b><u style={{ color: '#3ebbff' }}>Cold</u></b> and <b><u style={{ color: '#915927' }}>Bludgeoning</u></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Your size is 3hx.</span>,
    };

    return featureMap[hostValue] || null;
  };

  return (
    <div>
      {/* Cerebronych Species Content */}
      {contentType === 'species' && species === "Cerebronych" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Features Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Features</u></div>
            
            {/* Host Mimic Feature */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold' }}>Host Mimic.</span> Choose a starting <b><i style={{ color: '#0b5394' }}>Feature</i></b> available to any other Species or Subspecies. You cannot upgrade this <b><i style={{ color: '#0b5394' }}>Feature</i></b>.
            </div>
          </div>

          {/* Select Host Custom Dropdown */}
          <div style={{ marginTop: '8px', marginBottom: '12px', position: 'relative', display: 'inline-block' }}>
            {/* Backdrop to close dropdown when clicking outside */}
            {isDropdownOpen && (
              <div
                onClick={() => setIsDropdownOpen(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999
                }}
              />
            )}

            {/* Custom dropdown trigger */}
            <div
              ref={(el) => {
                if (el && isDropdownOpen) {
                  // Calculate if dropdown should open upward or downward
                  const rect = el.getBoundingClientRect();
                  const spaceBelow = window.innerHeight - rect.bottom;
                  const spaceAbove = rect.top;
                  const dropdownHeight = 300; // maxHeight of dropdown

                  // Store which direction to open
                  el.setAttribute('data-open-upward', spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? 'true' : 'false');
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              style={{
                fontSize: '1em',
                padding: '2px 8px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                background: '#fff',
                textAlign: 'left',
                minWidth: '200px',
                width: 'fit-content',
                fontFamily: 'Arial, Helvetica, sans-serif',
                cursor: 'pointer',
                userSelect: 'none',
                position: 'relative',
                zIndex: 1001
              }}
            >
              {renderColoredHostText(sheet?.hostSpecies || "")}
            </div>

            {/* Custom dropdown menu */}
            {isDropdownOpen && (() => {
              const triggerElement = document.querySelector('[data-open-upward]') as HTMLElement;
              const openUpward = triggerElement?.getAttribute('data-open-upward') === 'true';

              return (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    ...(openUpward ? { bottom: '100%', marginBottom: '0px' } : { top: '100%', marginTop: '0px' }),
                    left: 0,
                    zIndex: 1000,
                    background: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    minWidth: '200px',
                    width: 'fit-content',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '1em'
                  }}
                >
                  {/* Dropdown options */}
                  {["", "Avenoch Host", "Corvid Avenoch Host", "Falcador Avenoch Host", "Nocturne Avenoch Host", "Vulturine Avenoch Host",
                    "Chloroptid Host", "Barkskin Chloroptid Host", "Carnivorous Chloroptid Host", "Drifting Chloroptid Host", "Viny Chloroptid Host",
                    "Cognizant Host", "Android Cognizant Host", "Utility Droid Cognizant Host",
                    "Emberfolk Host", "Petran Emberfolk Host", "Pyran Emberfolk Host",
                    "Entomos Host", "Apocritan Entomos Host", "Dynastes Entomos Host", "Mantid Entomos Host",
                    "Human Host", "Diminutive Human Host", "Lithe Human Host", "Massive Human Host", "Stout Human Host",
                    "Lumenaren Host", "Infrared Lumenaren Host", "Radiofrequent Lumenaren Host", "X-Ray Lumenaren Host",
                    "Praedari Host", "Canid Praedari Host", "Felid Praedari Host", "Mustelid Praedari Host", "Ursid Praedari Host"
                  ].map((hostOption) => (
                    <div
                      key={hostOption}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onAutoSave) {
                          onAutoSave({ hostSpecies: hostOption });
                        }
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: '4px 8px',
                        cursor: 'pointer',
                        background: sheet?.hostSpecies === hostOption ? '#e6f2ff' : '#fff',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                      onMouseEnter={(e) => {
                        if (sheet?.hostSpecies !== hostOption) {
                          e.currentTarget.style.background = '#f5f5f5';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (sheet?.hostSpecies !== hostOption) {
                          e.currentTarget.style.background = '#fff';
                        }
                      }}
                    >
                      {renderColoredHostText(hostOption)}
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Display selected host feature */}
            {sheet?.hostSpecies && getHostFeatureJSX(sheet.hostSpecies) && (
              <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginTop: '12px' }}>
                {getHostFeatureJSX(sheet.hostSpecies)}
              </div>
            )}
          </div>

          {/* Parasitic Composure Feature */}
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold' }}>Parasitic Composure.</span> You are immune to the <b><i style={{ color: '#bf9000' }}>Confuse</i></b> condition and have <b><i style={{ color: '#bf9000' }}>Chemical</i></b> and <b><i style={{ color: '#38761d' }}>Toxic</i></b> resistance.
          </div>

          {/* Parasitic Composure Immunities Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px',
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
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#bf9000' }}>Mesmerize</i></b> immunity</span>
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
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#38761d' }}>Toxic</i></b> immunity</span>
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
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#bf9000' }}>Chemical</i></b> immunity</span>
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

          {/* Techniques Section */}
          <div style={{ color: '#cc0000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px', marginTop: '24px' }}>
            <div style={{ fontWeight: 'bold', color: '#cc0000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Techniques</u></div>
            
            {/* Memory Manifest Technique */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '4px' }}>
              <span style={{ fontWeight: 'bold' }}>Memory Manifest</span> (Cooldown {4 - safeGetDotsArray(5).filter(Boolean).length}). You can use any <b><i style={{ color: '#cc0000' }}>Active Technique</i></b> from an ally within {3 + safeGetDotsArray(3).filter(Boolean).length}hx of you.
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
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Includes <b><i style={{ color: '#cc0000' }}>Inactive Techniques</i></b></span>
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
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
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
            <span style={{ fontWeight: 'bold' }}>Limit Push</span> (Cooldown {4 - safeGetDotsArray(8).filter(Boolean).length}). You and allies within {3 + safeGetDotsArray(6).filter(Boolean).length}hx of you can remove {safeGetDotsArray(7)[0] ? 'two' : 'one'} Cooldown Token{safeGetDotsArray(7)[0] ? 's' : ''} from any <b><i style={{ color: '#cc0000' }}>Inactive Attack</i></b> or <b><i style={{ color: '#cc0000' }}>Technique</i></b>.
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
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Cooldown Token</span>
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
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
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

          {/* Hit Points Section */}
          <div style={{ color: '#e69138', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px', marginTop: '24px' }}>
            <div style={{ fontWeight: 'bold', color: '#e69138', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
            
            {/* Starting Hit Points */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <span style={{ fontWeight: 'bold' }}>Starting Hit Points.</span> 30
            </div>
          </div>

          {/* Hit Points Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px',
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
              
              {/* Row 2: +5 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#e69138' }}>Hit Points</i></b></span>
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              
              {/* Row 5: +10 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#e69138' }}>Hit Points</i></b></span>
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>
              <span></span>
              
              {/* Row 8: +15 Hit Points dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <b><i style={{ color: '#e69138' }}>Hit Points</i></b></span>
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

        </div>
      )}

      {/* Cerebronych (cont.) Subspecies Content */}
      {contentType === 'subspecies' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Strike Section */}
          <div style={{ color: '#351c75', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            
            {/* Enhanced Strike Effects */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <span style={{ fontWeight: 'bold' }}>Enhanced Strike Effects.</span>
            </div>
          </div>

          {/* Strike Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px',
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
              
              {/* Row 2: Can Strike using Toxic instead */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Can <b><i style={{ color: '#351c75' }}>Strike</i></b> using <b><i style={{ color: '#38761d' }}>Toxic</i></b> instead</span>
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
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷ <b><i>Infest</i></b> (see below)</span>
              {(() => {
                const arr = safeGetSubspeciesDotsArray(1);
                const canCheck = !arr[0];
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
            <span style={{ fontWeight: 'bold' }}>Infest.</span> When you destroy a creature with a <b><i style={{ color: '#351c75' }}>Strike</i></b> using <b><i style={{ color: '#38761d' }}>Toxic</i></b> damage, the creature instead stays at 1 <b><i style={{ color: '#e69138' }}>Hit Point</i></b> and is under your complete control until the end of the encounter. If the creature dies, you lose control. After the battle, you can choose to inhabit the creature and abandon your current host, as long as that creature is a playable species. If you choose not to take on the new host, the creature you infest dies. Consult your DM for more information.
          </div>

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px', marginTop: '24px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            
            {/* Starting Speed */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <span style={{ fontWeight: 'bold' }}>Starting Speed.</span> 6hx.
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
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Speed</span>
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
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>
              <b>Many Masks.</b> Years of embodying different hosts has developed your keen ability to mimic voices, mannerisms and personalities of many people from many walks of life. Gain an advantage on related skill rolls.
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
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>
              <b>Play Dead.</b> The fact that you effectively inhabit a corpse is not lost on you. Gain an advantage on skills related to either pretending you're dead or otherwise pretending you're an undead creature risen from the grave.
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
