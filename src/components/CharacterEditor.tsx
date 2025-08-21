import React, { useState } from "react";

import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet } from "../utils/storage";

type Props = {
  sheet: CharacterSheet | null;
  onSave: () => void;
};

const CharacterEditor: React.FC<Props> = ({ sheet, onSave }) => {
  // Identity fields
  const [playerName, setPlayerName] = useState(sheet?.playerName || "");
  const [name, setName] = useState(sheet?.name || "");
  const [charClass, setCharClass] = useState(sheet?.charClass || "");
  const [subclass, setSubclass] = useState(sheet?.subclass || "");
  const [species, setSpecies] = useState(sheet?.species || "");
  const [subspecies, setSubspecies] = useState(sheet?.subspecies || "");
  const [background, setBackground] = useState(sheet?.background || "");

  // Stats fields
  const [resistances, setResistances] = useState(sheet?.resistances || "");
  const [immunities, setImmunities] = useState(sheet?.immunities || "");
  const [absorptions, setAbsorptions] = useState(sheet?.absorptions || "");
  const [movement, setMovement] = useState(sheet?.movement || "");
  const [strike, setStrike] = useState(sheet?.strike || "");
  const [xpTotal, setXpTotal] = useState(sheet?.xpTotal || 0);

  // Features fields
  const [classFeature, setClassFeature] = useState(sheet?.classFeature || "");
  // Map class to string for auto-fill (no JSX)
  const classFeatureMap: { [key: string]: string } = {
    Chemist: "Chemical Reaction.",
    Coder: "Subtle Magic.",
    Commander: "Stay Sharp.",
    Contemplative: "Psychosomatic Harmony.",
    Devout: "Blood Trade.",
    Elementalist: "test 6",
    Exospecialist: "test 7",
    Gunslinger: "test 8",
    Technician: "test 9",
  };

  // Auto-fill classFeature when class changes, unless user has typed something custom
  React.useEffect(() => {
    if (charClass && classFeatureMap[charClass]) {
      setClassFeature(classFeatureMap[charClass]);
    } else if (!charClass) {
      setClassFeature("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charClass]);

  // Rich JSX for Chemist, Coder, Commander, Contemplative, Devout
  const chemistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#721131' }}>Chemical Reaction.</i></b> At the start of each round, you gain 1 <i>Chem Token</i>, up to a maximum of <b>[3]</b> <i>Chem Token</i>s. While you have at least 1 <i>Chem Token</i>, your <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> gains a +<b>[0]</b> Crit and deals +1 Damage die.
    </span>
  );
  const coderFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#112972' }}>Subtle Magic.</i></b> Your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> ignore <b>[50]</b>% Cover and gain a +<b>[0]</b> Crit.
    </span>
  );
  const commanderFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#717211' }}>Stay Sharp.</i></b> At the beginning of the round, you and allies within <b>[3]</b>hx of you can remove an additional <i>Cooldown Token</i> from one inactive <b><i><span style={{ color: '#bf9000' }}>Technique</span></i></b> of their choice.
    </span>
  );
  const contemplativeFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#116372' }}>Psychosomatic Harmony.</i></b> You are <b>[resistant]</b> to <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
        Neural
        <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> and can <b><i style={{ color: '#351c75' }}>Strike</i></b> <b>[1]</b> extra time per turn.
    </span>
  );
  const devoutFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6b1172' }}>Blood Trade.</i></b> Whenever you take Damage, you gain +<b>[1]</b>d6 Damage on your next <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b> or <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>. The Damage type matches your next <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b>  or <b><i><span style={{ color:'#990000' }}>Attack</span></i></b> and doesn’t stack if you are Damaged multiple times.   
    </span>
  );  
  const elementalistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#231172' }}>Elemental Excitement.</i></b> When another creature within <b>[3]</b>hx of you takes Damage associated with your subclass blah blah blah
    </span>
  );  

  // Auto-fill classFeature when class changes, unless user has typed something custom
  React.useEffect(() => {
    if (charClass && classFeatureMap[charClass]) {
      setClassFeature(classFeatureMap[charClass]);
    } else if (!charClass) {
      setClassFeature("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charClass]);
  const [subclassFeature, setSubclassFeature] = useState(sheet?.subclassFeature || "");
  const [speciesFeature, setSpeciesFeature] = useState(sheet?.speciesFeature || "");
  const [subspeciesFeature, setSubspeciesFeature] = useState(sheet?.subspeciesFeature || "");
  // Removed unused XP/SP fields

  // Combat fields
  const [speed, setSpeed] = useState(sheet?.speed || "");
  const [strikeDamage, setStrikeDamage] = useState(sheet?.strikeDamage || "");
  const [maxHitPoints, setMaxHitPoints] = useState(sheet?.maxHitPoints || 0);
  // Removed unused deathCount field

  // Attributes
  // Removed unused attribute fields

  // Skills
  const skillList = [
    "Acrobatics",
    "Athletics",
    "Awareness",
    "Computers",
    "Culture",
    "Deception",
    "Diplomacy",
    "Intimidation",
    "Investigation",
    "Medicine",
    "Oikomagic",
    "Performance",
    "Piloting",
    "Stealth",
    "Survival",
    "Technology",
    "Thievery",
    "Xenomagic"
  ];
  const [skillDots, setSkillDots] = useState<{ [key: string]: boolean[] }>(
    (sheet?.skillDots) || Object.fromEntries(skillList.map(skill => [skill, Array(10).fill(false)]))
  );


  // Hit Points UI state
  const [deathDots, setDeathDots] = useState<boolean[]>(sheet?.deathDots || Array(10).fill(false));
  // Strike section state
  const [multiStrike, setMultiStrike] = useState<number>(sheet?.multiStrike || 0);
  const [strikeEffects, setStrikeEffects] = useState<string>(sheet?.strikeEffects || "");

  // Current Hit Points state (local only)
  const [currentHitPoints, setCurrentHitPoints] = useState<number>(sheet?.currentHitPoints ?? sheet?.maxHitPoints ?? 0);
  const [hpDelta, setHpDelta] = useState<number>(0);

  const handleSave = () => {
    const updatedSheet: any = {
      id: sheet?.id || Date.now().toString(),
      playerName,
      name,
      charClass,
      subclass,
      species,
      subspecies,
      background,
      classFeature,
      subclassFeature,
      speciesFeature,
      subspeciesFeature,
      resistances,
      immunities,
      absorptions,
      movement,
      strike,
      xpTotal,
      speed,
      strikeDamage,
      maxHitPoints,
      deathDots,
      multiStrike,
      strikeEffects,
      skillDots,
    };
    saveCharacterSheet(updatedSheet);
  };

  const classOptions = [
    { label: "Chemist", value: "Chemist", color: "#721131" },
    { label: "Coder", value: "Coder", color: "#112972" },
    { label: "Commander", value: "Commander", color: "#717211" },
    { label: "Contemplative", value: "Contemplative", color: "#116372" },
    { label: "Devout", value: "Devout", color: "#6b1172" },
    { label: "Elementalist", value: "Elementalist", color: "#231172" },
    { label: "Exospecialist", value: "Exospecialist", color: "#117233" },
    { label: "Gunslinger", value: "Gunslinger", color: "#4e7211" },
    { label: "Technician", value: "Technician", color: "#724811" },
  ];

  const subclassOptionsMap: { [key: string]: { label: string; value: string; color: string }[] } = {
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
  const subclassOptions = subclassOptionsMap[charClass] || [];

  // Flatten all subclasses for the 'all subclasses' dropdown
  const allSubclassOptions = Object.entries(subclassOptionsMap).flatMap(([cls, arr]) =>
    arr.map(opt => ({ ...opt, class: cls }))
  );

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
  const subspeciesOptionsMap: { [key: string]: { label: string; value: string; color: string; species: string }[] } = {
    Avenoch: [
      { label: "Corvid", value: "Corvid", color: "#75904e", species: "Avenoch" },
      { label: "Falcador", value: "Falcador", color: "#6d7156", species: "Avenoch" },
      { label: "Nocturne", value: "Nocturne", color: "#334592", species: "Avenoch" },
      { label: "Vulturine", value: "Vulturine", color: "#a96d8c", species: "Avenoch" },
    ],
    Cerebronych: [],
    Chloroptid: [
      { label: "Barkskin", value: "Barkskin", color: "#5f2d2b", species: "Chloroptid" },
      { label: "Carnivorous", value: "Carnivorous", color: "#2b2d5f", species: "Chloroptid" },
      { label: "Drifting", value: "Drifting", color: "#5f8a5f", species: "Chloroptid" },
      { label: "Viny", value: "Viny", color: "#5f5f2b", species: "Chloroptid" },
    ],
    Cognizant: [
      { label: "Android", value: "Android", color: "#581fbd", species: "Cognizant" },
      { label: "Utility Droid", value: "Utility Droid", color: "#bd891f", species: "Cognizant" },
    ],
    Emberfolk: [
      { label: "Petran", value: "Petran", color: "#735311", species: "Emberfolk" },
      { label: "Pyran", value: "Pyran", color: "#b31111", species: "Emberfolk" },
    ],
    Entomos: [
      { label: "Apocritan", value: "Apocritan", color: "#6d7156", species: "Entomos" },
      { label: "Dynastes", value: "Dynastes", color: "#334592", species: "Entomos" },
      { label: "Mantid", value: "Mantid", color: "#75904e", species: "Entomos" },
    ],
    Human: [
      { label: "Diminutive Evolution", value: "Diminutive Evolution", color: "#c3735f", species: "Human" },
      { label: "Lithe Evolution", value: "Lithe Evolution", color: "#2b5f5f", species: "Human" },
      { label: "Massive Evolution", value: "Massive Evolution", color: "#2b175f", species: "Human" },
      { label: "Stout Evolution", value: "Stout Evolution", color: "#5f2b2b", species: "Human" },
    ],
    Lumenaren: [
      { label: "Infrared", value: "Infrared", color: "#b17fbe", species: "Lumenaren" },
      { label: "Radiofrequent", value: "Radiofrequent", color: "#bea97f", species: "Lumenaren" },
      { label: "X-Ray", value: "X-Ray", color: "#7f8abe", species: "Lumenaren" },
    ],
    Praedari: [
      { label: "Canid", value: "Canid", color: "#2f8da6", species: "Praedari" },
      { label: "Felid", value: "Felid", color: "#b16326", species: "Praedari" },
      { label: "Mustelid", value: "Mustelid", color: "#699239", species: "Praedari" },
      { label: "Ursid", value: "Ursid", color: "#9026b1", species: "Praedari" },
    ],
  };
  const allSubspeciesOptions = Object.values(subspeciesOptionsMap).flat();
  const hostOptions = [
    { label: "Corvid Avenoch Host", value: "Corvid Avenoch Host", color: "#75904e", hostColor: "#2b5f59" },
    { label: "Falcador Avenoch Host", value: "Falcador Avenoch Host", color: "#6d7156", hostColor: "#2b5f59" },
    { label: "Nocturne Avenoch Host", value: "Nocturne Avenoch Host", color: "#334592", hostColor: "#2b5f59" },
    { label: "Vulturine Avenoch Host", value: "Vulturine Avenoch Host", color: "#a96d8c", hostColor: "#2b5f59" },
    { label: "Barkskin Chloroptid Host", value: "Barkskin Chloroptid Host", color: "#5f2d2b", hostColor: "#315f2b" },
    { label: "Carnivorous Chloroptid Host", value: "Carnivorous Chloroptid Host", color: "#2b2d5f", hostColor: "#315f2b" },
    { label: "Drifting Chloroptid Host", value: "Drifting Chloroptid Host", color: "#5f8a5f", hostColor: "#315f2b" },
    { label: "Viny Chloroptid Host", value: "Viny Chloroptid Host", color: "#5f5f2b", hostColor: "#315f2b" },
    { label: "Android Cognizant Host", value: "Android Cognizant Host", color: "#581fbd", hostColor: "#2b3b5f" },
    { label: "Utility Droid Cognizant Host", value: "Utility Droid Cognizant Host", color: "#bd891f", hostColor: "#2b3b5f" },
    { label: "Petran Emberfolk Host", value: "Petran Emberfolk Host", color: "#735311", hostColor: "#5f2b2b" },
    { label: "Pyran Emberfolk Host", value: "Pyran Emberfolk Host", color: "#b31111", hostColor: "#5f2b2b" },
    { label: "Apocritan Entomos Host", value: "Apocritan Entomos Host", color: "#6d7156", hostColor: "#5f422b" },
    { label: "Dynastes Entomos Host", value: "Dynastes Entomos Host", color: "#334592", hostColor: "#5f422b" },
    { label: "Mantid Entomos Host", value: "Mantid Entomos Host", color: "#75904e", hostColor: "#5f422b" },
    { label: "Diminutive Human Host", value: "Diminutive Human Host", color: "#c3735f", hostColor: "#2b315f" },
    { label: "Lithe Human Host", value: "Lithe Human Host", color: "#2b5f5f", hostColor: "#2b315f" },
    { label: "Massive Human Host", value: "Massive Human Host", color: "#2b175f", hostColor: "#2b315f" },
    { label: "Stout Human Host", value: "Stout Human Host", color: "#5f2b2b", hostColor: "#2b315f" },
    { label: "Infrared Lumenaren Host", value: "Infrared Lumenaren Host", color: "#b17fbe", hostColor: "#515f2b" },
    { label: "Radiofrequent Lumenaren Host", value: "Radiofrequent Lumenaren Host", color: "#bea97f", hostColor: "#515f2b" },
    { label: "X-Ray Lumenaren Host", value: "X-Ray Lumenaren Host", color: "#7f8abe", hostColor: "#515f2b" },
    { label: "Canid Praedari Host", value: "Canid Praedari Host", color: "#2f8da6", hostColor: "#5f2b5c" },
    { label: "Felid Praedari Host", value: "Felid Praedari Host", color: "#b16326", hostColor: "#5f2b5c" },
    { label: "Mustelid Praedari Host", value: "Mustelid Praedari Host", color: "#699239", hostColor: "#5f2b5c" },
    { label: "Ursid Praedari Host", value: "Ursid Praedari Host", color: "#9026b1", hostColor: "#5f2b5c" },
  ];
  const subspeciesOptions = species === "Cerebronych"
    ? hostOptions
    : subspeciesOptionsMap[species] || [];

  return (
    <div className="character-editor" style={{ position: 'relative' }}>
      <h2>{sheet ? "Edit Character" : "New Character"}</h2>
      <section className="header-info">
        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Identity</h3>
  <label style={{ fontWeight: 'bold' }}>Player Name: <input value={playerName} onChange={e => setPlayerName(e.target.value)} /></label><br />
  <label style={{ fontWeight: 'bold' }}>Character Name: <input value={name} onChange={e => setName(e.target.value)} /></label><br />
  <label style={{ fontWeight: 'bold' }}>Class: 
  <select value={charClass} onChange={e => {
    setCharClass(e.target.value);
    setSubclass(""); // Reset subclass when class changes
  }} style={{ fontWeight: 'bold', color: classOptions.find(opt => opt.value === charClass)?.color || '#000' }}>
    <option value="">Select Class</option>
    {classOptions.map(opt => (
      <option key={opt.value} value={opt.value} style={{ color: opt.color }}>
        {opt.label}
      </option>
    ))}
  </select>
</label><br />
  <label style={{ fontWeight: 'bold' }}>Subclass: 
  <select value={subclass} onChange={e => {
    const val = e.target.value;
    setSubclass(val);
    if (!charClass && val) {
      // If no class selected, auto-select the class for the chosen subclass
      const found = allSubclassOptions.find(opt => opt.value === val);
      if (found) setCharClass(found.class);
    }
  }}
    style={{ fontWeight: 'bold', color: (subclassOptions.find(opt => opt.value === subclass) || allSubclassOptions.find(opt => opt.value === subclass))?.color || '#000' }}
  >
    <option value="">Select Subclass</option>
    {(charClass
      ? subclassOptions
      : allSubclassOptions
    ).map(opt => (
      <option key={opt.value} value={opt.value} style={{ color: opt.color }}>
        {opt.label}
      </option>
    ))}
  </select>
</label><br />
  <label style={{ fontWeight: 'bold' }}>Species: 
  <select value={species} onChange={e => {
    setSpecies(e.target.value);
    setSubspecies(""); // Reset subspecies when species changes
  }} style={{ fontWeight: 'bold', color: speciesOptions.find(opt => opt.value === species)?.color || '#000' }}>
    <option value="">Select Species</option>
    {speciesOptions.map(opt => (
      <option key={opt.value} value={opt.value} style={{ color: opt.color }}>
        {opt.label}
      </option>
    ))}
  </select>
</label><br />
  <label style={{ fontWeight: 'bold' }}>Subspecies: 
    <select value={subspecies} onChange={e => {
      const val = e.target.value;
      setSubspecies(val);
      if (!species && val) {
        // If no species selected, auto-select the species for the chosen subspecies
        const found = allSubspeciesOptions.find(opt => opt.value === val);
        if (found) setSpecies(found.species);
      }
    }}
      style={{ fontWeight: 'bold', color: (subspeciesOptions.find(opt => opt.value === subspecies) || allSubspeciesOptions.find(opt => opt.value === subspecies))?.color || '#000' }}
    >
      <option value="">Select Subspecies</option>
      {(species === "Cerebronych"
        ? hostOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              <span style={{ color: opt.color }}>{opt.label.split(' ')[0]}</span>{' '}
              <span style={{ color: opt.hostColor }}>{opt.label.split(' ')[1]}</span>{' '}
              <span style={{ color: '#000' }}>Host</span>
            </option>
          ))
        : (species
            ? subspeciesOptions
            : allSubspeciesOptions
          ).map(opt => (
            <option key={opt.value} value={opt.value} style={{ color: opt.color }}>
              {opt.label}
            </option>
          ))
      )}
    </select>
  </label><br />
  <label style={{ fontWeight: 'bold' }}>Background: <input value={background} onChange={e => setBackground(e.target.value)} /></label><br />
      </section>

      {/* Move Features section here */}
      <section className="features">
        <h3 style={{ color: '#0b5394', fontWeight: 'bold', textDecoration: 'underline' }}>Features</h3>
        <label style={{ color: '#0b5394', fontWeight: 'bold' }}>Class Feature: {
          charClass === "Chemist"
            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{chemistFeatureJSX}</span>
            : charClass === "Coder"
              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{coderFeatureJSX}</span>
              : charClass === "Commander"
                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{commanderFeatureJSX}</span>
                : charClass === "Contemplative"
                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{contemplativeFeatureJSX}</span>
                  : charClass === "Devout"
                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{devoutFeatureJSX}</span>
                    : charClass === "Elementalist"
                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{elementalistFeatureJSX}</span>
                    : <input value={classFeature} onChange={e => setClassFeature(e.target.value)} />            
        }</label><br />
        <label style={{ color: '#0b5394', fontWeight: 'bold' }}>Subclass Feature: <input value={subclassFeature} onChange={e => setSubclassFeature(e.target.value)} /></label><br />
        <label style={{ color: '#0b5394', fontWeight: 'bold' }}>Species Feature: <input value={speciesFeature} onChange={e => setSpeciesFeature(e.target.value)} /></label><br />
        <label style={{ color: '#0b5394', fontWeight: 'bold' }}>Subspecies Feature: <input value={subspeciesFeature} onChange={e => setSubspeciesFeature(e.target.value)} /></label><br />
      </section>

      {/* Hit Points Section */}
      <section className="hit-points-section" style={{ margin: '1.5em 0' }}>
        <h3 style={{ color: '#990000', marginBottom: 0, fontWeight: 'bold', textDecoration: 'underline' }}>Hit Points</h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5em', marginTop: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div>
              <label style={{ color: '#990000', fontWeight: 'bold' }}>Max Hit Points: </label>
              <input type="number" value={maxHitPoints} onChange={e => setMaxHitPoints(+e.target.value)} style={{ width: 60, color: '#990000', border: '1.5px solid #990000', fontWeight: 'bold' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 12 }}>
              <label style={{ color: '#990000', fontWeight: 'bold', marginRight: 4 }}>Current Hit Points:</label>
              <input type="number" value={currentHitPoints} onChange={e => setCurrentHitPoints(+e.target.value)} style={{ width: 50, marginRight: 8, color: '#990000', border: '1.5px solid #990000', fontWeight: 'bold' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <button
                  style={{ background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 3, fontSize: '0.9em', padding: '2px 7px', cursor: 'pointer', marginBottom: 2 }}
                  onClick={() => setCurrentHitPoints(hp => hp + hpDelta)}
                  title="Add to current hit points"
                >Add</button>
                <input type="number" value={hpDelta} onChange={e => setHpDelta(+e.target.value)} style={{ width: 40, fontSize: '0.9em', textAlign: 'center', margin: '2px 0' }} />
                <button
                  style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 3, fontSize: '0.9em', padding: '2px 7px', cursor: 'pointer', marginTop: 2 }}
                  onClick={() => setCurrentHitPoints(hp => hp - hpDelta)}
                  title="Subtract from current hit points"
                >Subtract</button>
              </div>
            </div>
          </div>
          <div style={{ margin: '0 0 2px 0' }}>
            <label style={{ color: '#fff', background: '#000', padding: '2px 8px', borderRadius: 4, fontWeight: 'bold', display: 'inline-block', marginBottom: 4 }}>Death Count: </label>
            <input type="number" value={deathDots.filter(Boolean).length} readOnly style={{ width: 40, marginLeft: 4, background: '#000', color: '#fff', fontWeight: 'bold', border: '1px solid #333', borderRadius: 4, textAlign: 'center' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 0, gap: 8, width: '100%' }}>
            {deathDots.map((checked, i) => {
              // Only allow clicking if all previous are checked (for checking)
              // Only allow unchecking the rightmost checked dot (for unchecking)
              const canCheck = i === 0 || deathDots.slice(0, i).every(Boolean);
              const rightmostChecked = deathDots.lastIndexOf(true);
              const canUncheck = checked && i === rightmostChecked;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7em', marginBottom: 2 }}>{i + 1}+</span>
                  <span
                    onClick={() => {
                      setDeathDots(prev => {
                        if (!prev[i] && canCheck) {
                          // Fill all up to i
                          return prev.map((v, idx) => idx <= i ? true : v);
                        }
                        if (prev[i] && canUncheck) {
                          // Uncheck this and all after
                          return prev.map((v, idx) => idx < i ? v : false);
                        }
                        return prev;
                      });
                    }}
                    style={{
                      display: 'inline-block',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: '2px solid #000',
                      background: checked ? '#000' : '#fff',
                      cursor: (canCheck && !checked) || canUncheck ? 'pointer' : 'not-allowed',
                      marginTop: 2,
                      opacity: (canCheck && !checked) || canUncheck ? 1 : 0.4,
                    }}
                    title={
                      (!checked && canCheck)
                        ? `Toggle ${i + 1}+`
                        : (canUncheck ? `Uncheck rightmost first` : `Must uncheck rightmost first`)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="movement">
        <h3 style={{ color: '#38761d', fontWeight: 'bold', textDecoration: 'underline' }}>Movement</h3>
  <label style={{ color: '#38761d', fontWeight: 'bold' }}>Speed: <input value={speed} onChange={e => setSpeed(e.target.value)} /></label><br />
  <label style={{ color: '#38761d', fontWeight: 'bold' }}>Speed Types: <input value={movement} onChange={e => setMovement(e.target.value)} /></label><br />
  <label style={{ color: '#38761d', fontWeight: 'bold' }}>Jump Speed: <input value={strike} onChange={e => setStrike(e.target.value)} /></label><br />
  <label style={{ color: '#38761d', fontWeight: 'bold' }}>Jump Amount: <input type="number" value={xpTotal} onChange={e => setXpTotal(+e.target.value)} /></label><br />
  <label style={{ color: '#38761d', fontWeight: 'bold' }}>Speed Effects: <input value={resistances} onChange={e => setResistances(e.target.value)} /></label><br />
      </section>

      <section className="strike">
        <h3 style={{ color: '#351c75', fontWeight: 'bold', textDecoration: 'underline' }}>Strike</h3>
        <label style={{ color: '#351c75', fontWeight: 'bold' }}>Strike Damage: <input value={strikeDamage} onChange={e => setStrikeDamage(e.target.value)} /></label><br />
        <label style={{ color: '#351c75', fontWeight: 'bold' }}>Multi Strike: <input type="number" value={multiStrike} onChange={e => setMultiStrike(+e.target.value)} /></label><br />
        <label style={{ color: '#351c75', fontWeight: 'bold' }}>Strike Effects: <input value={strikeEffects} onChange={e => setStrikeEffects(e.target.value)} /></label><br />
      </section>

      {/* Damage Interactions Section */}
      <section className="damage-interactions">
        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Damage Interactions</h3>
        <label style={{ fontWeight: 'bold' }}>Resistances: <input value={resistances} onChange={e => setResistances(e.target.value)} /></label><br />
        <label style={{ fontWeight: 'bold' }}>Immunities: <input value={immunities} onChange={e => setImmunities(e.target.value)} /></label><br />
        <label style={{ fontWeight: 'bold' }}>Absorptions: <input value={absorptions} onChange={e => setAbsorptions(e.target.value)} /></label><br />
      </section>

      <section className="xp-sp">
        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Experience & Skill Points</h3>
  <label style={{ fontWeight: 'bold' }}>xp Total: <input type="number" value={xpTotal} onChange={e => setXpTotal(+e.target.value)} /></label><br />
  <label style={{ fontWeight: 'bold' }}>xp Spent: <input type="number" value={sheet?.xpSpent ?? 0} readOnly /></label><br />
  <label style={{ fontWeight: 'bold' }}>Remaining xp: <input type="number" value={sheet?.xpRemaining ?? 0} readOnly /></label><br />
  <label style={{ fontWeight: 'bold' }}>sp Total: <input type="number" value={sheet?.spTotal ?? 0} readOnly /></label><br />
  <label style={{ fontWeight: 'bold' }}>sp Spent: <input type="number" value={sheet?.spSpent ?? 0} readOnly /></label><br />
  <label style={{ fontWeight: 'bold' }}>Remaining sp: <input type="number" value={sheet?.spRemaining ?? 0} readOnly /></label><br />
      </section>

      <section className="skills">
        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Skills</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', fontWeight: 'bold', padding: '4px 8px' }}></th>
                {[20, 18, 16, 14, 12, 10, 8, 6, 4, 2].map((val) => (
                  <th key={val} style={{ textAlign: 'center', fontWeight: 'bold', padding: '4px 8px' }}>{val}+</th>
                ))}
              </tr>
              <tr>
                <th></th>
                {[1,1,2,2,3,4,5,6,8,10].map((sp, idx) => (
                  <th key={idx} style={{ textAlign: 'center', fontSize: '0.9em', color: '#888', padding: '2px 8px' }}>{sp}sp</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skillList.map(skill => (
                <tr key={skill}>
                  <td style={{ fontWeight: 'bold', padding: '4px 8px', whiteSpace: 'nowrap' }}>{skill}</td>
                  {skillDots[skill].map((checked, i) => {
                    const canCheck = i === 0 || skillDots[skill].slice(0, i).every(Boolean);
                    const rightmostChecked = skillDots[skill].lastIndexOf(true);
                    const canUncheck = checked && i === rightmostChecked;
                    return (
                      <td key={i} style={{ textAlign: 'center', padding: '2px 4px' }}>
                        <span
                          onClick={() => {
                            setSkillDots(prev => {
                              const arr = prev[skill].slice();
                              if (!arr[i] && canCheck) {
                                for (let j = 0; j <= i; ++j) arr[j] = true;
                              } else if (arr[i] && canUncheck) {
                                for (let j = i; j < arr.length; ++j) arr[j] = false;
                              }
                              return { ...prev, [skill]: arr };
                            });
                          }}
                          style={{
                            display: 'inline-block',
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            border: '2px solid #000',
                            background: checked ? '#000' : '#fff',
                            cursor: (canCheck && !checked) || canUncheck ? 'pointer' : 'not-allowed',
                            opacity: (canCheck && !checked) || canUncheck ? 1 : 0.4,
                          }}
                          title={
                            (!checked && canCheck)
                              ? `Toggle`
                              : (canUncheck ? `Uncheck rightmost first` : `Must uncheck rightmost first`)
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fixed button group */}
      <div
        style={{
          position: 'fixed',
          top: '10%',
          right: 0,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          zIndex: 1000,
          background: 'rgba(255,255,255,0.95)',
          borderLeft: '2px solid #bbb',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.08)',
          padding: '18px 12px 18px 18px',
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
        }}
      >
        <button
          onClick={handleSave}
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '1px 18px',
            fontWeight: 'bold',
            fontSize: '1.1em',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
          }}
        >
          Save
        </button>
        <button
          onClick={onSave}
          style={{
            background: '#eee',
            color: '#222',
            border: '1px solid #888',
            borderRadius: 4,
            padding: '1px 1px',
            fontWeight: 'bold',
            fontSize: '1.1em',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
          }}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default CharacterEditor;