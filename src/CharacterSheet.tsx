import './CharacterSheet.css';

export default function CharacterSheet() {
  return (
    <div className="character-sheet">
      <h1>Inventions Character Sheet</h1>
      <section className="header-info">
        <h2>Identity</h2>
        <input placeholder="Player Name" />
        <input placeholder="Character Name" />
        <input placeholder="Class" />
        <input placeholder="Subclass" />
        <input placeholder="Species" />
        <input placeholder="Subspecies" />
        <input placeholder="Background" />
      </section>

      <section className="stats">
        <h2>Stats</h2>
        <input placeholder="Resistances" />
        <input placeholder="Movement" />
        <input placeholder="Strike" />
        <input placeholder="xp Total" />
        <input placeholder="xp Spent" />
        <input placeholder="Remaining xp" />
        <input placeholder="sp Total" />
        <input placeholder="sp Spent" />
        <input placeholder="Remaining sp" />
      </section>

      <section className="combat">
        <h2>Combat</h2>
        <input placeholder="Speed" />
        <input placeholder="Strike Damage" />
        <input placeholder="Max Hit Points" />
        <input placeholder="Death Count" />
      </section>

      <section className="skills">
  <h2>Skills</h2>
  <div className="skills-grid">
    {[
      "Athletics", "Awareness", "Charm", "Deception", "Engineering", "History",
      "Intimidation", "Medicine", "Nature", "Perception", "Performance",
      "Persuasion", "Piloting", "Sleight of Hand", "Stealth", "Survival", "Technology"
    ].map(skill => (
      <label key={skill}>
        {skill}
        <input type="number" placeholder="0" />
      </label>
    ))}
  </div>
</section>


    </div>
  );
}