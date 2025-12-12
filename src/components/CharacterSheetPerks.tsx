import React from "react";
import styles from './CharacterSheet.module.css';
import type { CharacterSheet } from "../types/CharacterSheet";

type CharacterSheetPerksProps = {
  sheet: CharacterSheet | null;
  charClass: string;
  subclass: string;
  subspecies: string;
};

const CharacterSheetPerks: React.FC<CharacterSheetPerksProps> = ({
  sheet,
  charClass,
  subclass,
  subspecies
}) => {
  return (
    <div className={styles.perksCard}>
      <h3 style={{ marginTop: 0, textDecoration: 'underline', fontFamily: 'Arial, sans-serif' }}>Languages & Perks</h3>
        <div className={styles.cardContent}>
          <div style={{ fontWeight: 'bold', marginBottom: 6, fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span><u>Languages</u></span>
            {sheet?.species === 'Avenoch' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Avenoch
              </span>
            )}
            {sheet?.species === 'Cerebronych' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Cerebronych
              </span>
            )}
            {sheet?.cerebronychLanguage && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                {sheet.cerebronychLanguage}
              </span>
            )}
            {sheet?.species === 'Chloroptid' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Chloroptid
              </span>
            )}
            {sheet?.species === 'Cognizant' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Binary
              </span>
            )}
            {sheet?.cognizantLanguage && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                {sheet.cognizantLanguage}
              </span>
            )}
            {charClass === 'Coder' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Oikovox
              </span>
            )}
            {charClass === 'Devout' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Xenovox
              </span>
            )}
            {charClass === 'Elementalist' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Xenoelemental
              </span>
            )}
            {sheet?.species === 'Emberfolk' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Xenoelemental
              </span>
            )}
            {sheet?.species === 'Entomos' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Entomos
              </span>
            )}
            {sheet?.species === 'Lumenaren' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Lumenaren
              </span>
            )}
            {sheet?.species === 'Praedari' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Praedari
              </span>
            )}
            {sheet?.lumenarenLanguage && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                {sheet.lumenarenLanguage}
              </span>
            )}
            {sheet?.humanLanguages && sheet.humanLanguages.length > 0 && (
              sheet.humanLanguages.map((lang, index) => (
                <span key={index} style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                  {lang}
                </span>
              ))
            )}
            {sheet?.background === 'Adherent of the Pollen Collective' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Chloroptid
              </span>
            )}
            {sheet?.pollenCollectiveLanguage && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                {sheet.pollenCollectiveLanguage}
              </span>
            )}
            {sheet?.background === 'Anti-Deft Secessionist' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Defteran
              </span>
            )}
            {sheet?.background === 'Awakened Machine' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Defteran
              </span>
            )}
            {sheet?.awakenedMachineLanguage && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                {sheet.awakenedMachineLanguage}
              </span>
            )}
            {sheet?.beltMinerLanguage && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                {sheet.beltMinerLanguage}
              </span>
            )}
            {sheet?.blackMarketExecutiveLanguages && sheet.blackMarketExecutiveLanguages.length > 0 && (
              sheet.blackMarketExecutiveLanguages.map((lang, idx) => (
                <span key={idx} style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                  {lang}
                </span>
              ))
            )}
            {sheet?.combatMedicLanguages && sheet.combatMedicLanguages.length > 0 && (
              sheet.combatMedicLanguages.map((lang, idx) => (
                <span key={idx} style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                  {lang}
                </span>
              ))
            )}
          </div>
          {/* Class Perk segment, visible if Class Perk dot is selected */}
          {charClass === 'Chemist' && sheet?.classCardDots?.[9]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#721131' }}>Chemical Concoctions.</i></b> <span style={{ color: '#000' }}>You can create myriad concoctions. When doing so, choose a skill. Upon drinking a concoction, the imbiber gains an advantage on the next skill roll of your choice. You can create up to 3 concoctions per day which each last until the end of the day.</span>
              </span>
            </div>
          )}
          {charClass === 'Coder' && sheet?.classCardDots?.[12]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#112972' }}>Code Reader.</i></b> <span style={{ color: '#000' }}>You easily see the inherent logic of the natural world around you, including the Oikomagic infused in it, giving you an edge when inspecting magical or rationality-based subjects and objects. Gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          {charClass === 'Commander' && sheet?.classCardDots?.[9]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#717211' }}>Natural Leader.</i></b> <span style={{ color: '#000' }}>You are inherently adept at leading others and getting them to both trust and follow you. Gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          {charClass === 'Contemplative' && sheet?.classCardDots?.[12]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#116372' }}>Inherent Telepath.</i></b> <span style={{ color: '#000' }}>You can communicate telepathically one-way with any language-speaking creature within 10hx of you.</span>
              </span>
            </div>
          )}
          {charClass === 'Devout' && sheet?.classCardDots?.[10]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#6b1172' }}>Higher Power.</i></b> <span style={{ color: '#000' }}>You draw your energy and abilities from a divine entity. Gain an advantage on related skill rolls when you give homage to your deity and choose the transrational option.</span>
              </span>
            </div>
          )}
          {charClass === 'Elementalist' && sheet?.classCardDots?.[13]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#231172' }}>Elemental Detection.</i></b> <span style={{ color: '#000' }}>You can sense the presence of any elemental entity or substance within 10hx of you - namely earth, air, water and fire.</span>
              </span>
            </div>
          )}
          {charClass === 'Exospecialist' && sheet?.classCardDots?.[11]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#117233' }}>Man in the Machine.</i></b> <span style={{ color: '#000' }}>Your specialized armor provides the capability of withstanding a multitude of extreme environments, including heat, cold, underwater, very high altitudes and the vacuum of space.</span>
              </span>
            </div>
          )}
          {charClass === 'Gunslinger' && sheet?.classCardDots?.[7]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#4e7211' }}>Gunslinger's Grit.</i></b> <span style={{ color: '#000' }}>You’ve been in sticky situations enough times to see what’s coming around the bend. Gain an advantage on related skills when identifying potentially dangerous social situations or defending yours or your companions' reputations.</span>
              </span>
            </div>
          )}
          {charClass === 'Technician' && sheet?.classCardDots?.[12]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#724811' }}>Machinist.</i></b> <span style={{ color: '#000' }}>You are a whiz when it comes to machinery of all kinds. While repairing, rewiring, reprogramming, building or dismantling various machines, gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          
          {/* Species Perks */}
          {sheet?.species === 'Avenoch' && sheet?.speciesCardDots?.[8]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#2b5f59' }}>Keen Eyes.</i></b> <span style={{ color: '#000' }}>You are naturally adept at being aware of your visual surroundings, picking up on subtle patterns in the tapestry of the situation, or otherwise being highly observant. Gain an advantage on related skill rolls using your sight.</span>
              </span>
            </div>
          )}
          {sheet?.species === 'Cerebronych' && sheet?.subspeciesCardDots?.[3]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#5f5e2b' }}>Many Masks.</i></b> <span style={{ color: '#000' }}>Years of embodying different hosts has developed your keen ability to mimic voices, mannerisms and personalities of many people from many walks of life. Gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          {sheet?.species === 'Chloroptid' && sheet?.speciesCardDots?.[8]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#315f2b' }}>Natural Camouflage.</i></b> <span style={{ color: '#000' }}>You resemble normal plants, shrubbery, vines, and/or trees so closely that others can hardly tell you apart from the foliage while you remain still. Gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          {sheet?.species === 'Emberfolk' && sheet?.speciesCardDots?.[7]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#5f2b2b' }}>Molten Fortitude.</i></b> <span style={{ color: '#000' }}>Your body is naturally hot to the touch, and when you are stressed or angry, it can become downright scalding. Gain an advantage on related skill rolls when you use your body heat to intimidate, threaten, or otherwise coerce others.</span>
              </span>
            </div>
          )}
          {sheet?.species === 'Cognizant' && sheet?.speciesCardDots?.[9]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#2b3b5f' }}>Machine Learning.</i></b> <span style={{ color: '#000' }}>You are capable of learning mathematical equations, grammatical combinations and other such patterns with ease. Gain an advantage on related skills after learning such a skill.</span>
              </span>
            </div>
          )}
          {sheet?.species === 'Entomos' && sheet?.speciesCardDots?.[7]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#5f422b' }}>Hiveminded.</i></b> <span style={{ color: '#000' }}>You instinctively understand hive mentality and can pick up on social hierarchies and dynamics after only a glance at the way a particular organization, department, or tribe operates. Gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          {sheet?.species === 'Human' && sheet?.speciesCardDots?.[4]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#2b315f' }}>Jack of All Trades.</i></b> <span style={{ color: '#000' }}>Your human determination and adaptability allow you to have a better chance at succeeding in any skill. Your minimum skill level for all skills becomes 14+.</span>
              </span>
            </div>
          )}
          {sheet?.species === 'Lumenaren' && sheet?.speciesCardDots?.[8]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#515f2b' }}>Natural Battery.</i></b> <span style={{ color: '#000' }}>You are a creature of pure energy and light, and can thus charge any adjacent technologic device up to 7hx in size to full power in seconds, from a simple stopwatch to a ship's engine.</span>
              </span>
            </div>
          )}
          {sheet?.species === 'Praedari' && sheet?.speciesCardDots?.[9]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#5f2b5c' }}>Beast Speech.</i></b> <span style={{ color: '#000' }}>From birth, you've been intimately attuned with the natural world and the creatures living therein, and you can speak with natural fauna of all shapes and sizes.</span>
              </span>
            </div>
          )}
          
          {/* Subclass Perks */}
          {subclass === 'Necro' && sheet?.subclassProgressionDots?.necroPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#0033cf' }}>Mortician.</i></b> <span style={{ color: '#000' }}>You have spent a lot of time around corpses and remains of the living. As such, you have a good intuition about the various causes of death and other topics that include the deceased. Gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          {subclass === 'Anatomist' && sheet?.subclassProgressionDots?.anatomistSurgeonDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#66cf00' }}>Surgeon.</i></b> <span style={{ color: '#000' }}>You can perform surgery and potentially save a life on the brink of death or otherwise ensure an enemy will be incapacitated for life in a way of your choice. Gain an advantage on related skill rolls to perform the surgery.</span>
              </span>
            </div>
          )}
          {subclass === 'Grenadier' && sheet?.subclassProgressionDots?.grenadierExplosiveTemperDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#cf0000' }}>Explosive Temper.</i></b> <span style={{ color: '#000' }}>You are fearless to the point of recklessness, and are lucky enough to have survived so many explosions that were too close for comfort. Gain an advantage on related skill rolls when acting brash and impetuous.</span>
              </span>
            </div>
          )}
          {subclass === 'Poisoner' && sheet?.subclassProgressionDots?.poisonerVenomMasterDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#cf7600' }}>Venom Master.</i></b> <span style={{ color: '#000' }}>You excel in the art of poisoning, and can create a multitude of poisons from the basic to the rare and exotic. Gain an advantage on skill rolls related to finding, identifying, creating and using poisons.</span>
              </span>
            </div>
          )}
          {subclass === 'Coercive' && sheet?.subclassProgressionDots?.coercivePerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#43c9ff' }}>Mind Reader.</i></b> <span style={{ color: '#000' }}>You are capable of reaching into the minds of other creatures and gleaning information around their thoughts, drives and premeditated actions. Gain an advantage on skill rolls when attempting to read minds. The DM determines how much info is divulged.</span>
              </span>
            </div>
          )}
          {subclass === 'Divinist' && sheet?.subclassProgressionDots?.divinistPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#ff4343' }}>Sooth Seer.</i></b> <span style={{ color: '#000' }}>You have the uncanny ability to read someone's intentions despite their words and predict someone's next move outside of combat. Gain an advantage on any related skill roll.</span>
              </span>
            </div>
          )}
          {subclass === 'Naturalist' && sheet?.subclassProgressionDots?.naturalistPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#66cf00' }}>Nature's Advocate.</i></b> <span style={{ color: '#000' }}>You understand the natural workings of plants and animals at a fundamental level. Gain an advantage on skill rolls when interacting with or learning from plants, animals or other natural sources.</span>
              </span>
            </div>
          )}
          {subclass === 'Technologist' && sheet?.subclassProgressionDots?.technologistPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#8c43ff' }}>Mechanical Understanding.</i></b> <span style={{ color: '#000' }}>You grasp mechanical and technological concepts with an unmatched understanding. Gain an advantage on rolls when dealing with machines or other technology.</span>
              </span>
            </div>
          )}
            {subclass === 'Beguiler' && sheet?.subclassProgressionDots?.beguilerPerksSkillsDots?.[0] && (
              <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
                <span>
                  <b><i style={{ color: '#1f21ce' }}>Object of Fascination.</i></b> <span style={{ color: '#000' }}>Your seductive qualities are undeniable and you are capable of convincing nearly anyone to assist in almost any way. Gain an advantage on skill rolls related to coaxing others who are not outright hostile towards you to help you.</span>
                </span>
              </div>
            )}
            {subclass === 'Galvanic' && (sheet?.subclassProgressionDots as any)?.galvanicPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#6fce1f' }}>Moral Support.</i></b> <span style={{ color: '#000' }}>Your inspiring leadership is capable of pulling your comrades from the brink of death. Allies on the battlefield gain a +1 to <b><i>Death Die</i></b> rolls.</span>
              </span>
            </div>
          )}
            {subclass === 'Tactician' && (sheet?.subclassProgressionDots as any)?.tacticianPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#cec31f' }}>Three Moves Ahead.</i></b> <span style={{ color: '#000' }}>You are always thinking ahead and analyzing several possible outcomes based on the actions you and your allies make. Gain an advantage on skills related to creating or enacting a plan.</span>
              </span>
            </div>
          )}
            {subclass === 'Tyrant' && (sheet?.subclassProgressionDots as any)?.tyrantPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#ce1f1f' }}>Fearmonger.</i></b> <span style={{ color: '#000' }}>Your presence automatically sets others on alert, and those weaker of heart are downright fearful of you. Gain an advantage on skill rolls related to any social interactions involving the use of fear.</span>
              </span>
            </div>
          )}
            {subclass === 'Inertial' && (sheet?.subclassProgressionDots as any)?.inertialPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#1c945e' }}>De-escalator.</i></b> <span style={{ color: '#000' }}>Your discipline extends beyond the battlefield and into the social realm. You can shut down conversations, rampant emotions or other problematic situations before they get a chance to explode into violence. Gain an advantage on related skills.</span>
              </span>
            </div>
          )}
            {subclass === 'Kinetic' && (sheet?.subclassProgressionDots as any)?.kineticPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#7b941c' }}>Martial Artist.</i></b> <span style={{ color: '#000' }}>Years of disciplined practice have made you into a talented martial artist. Gain an advantage on related skill rolls when performing difficult maneuvers.</span>
              </span>
            </div>
          )}  
            {subclass === 'Mercurial' && (sheet?.subclassProgressionDots as any)?.mercurialPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#941c6c' }}>Quicksilver Implement.</i></b> <span style={{ color: '#000' }}>Your mastery of the <i>Mercury Blade</i> extends beyond the battlefield, and you can manipulate the blade into various small tools that you can levitate and utilize up to 3hx away from you.</span>
              </span>
            </div>
          )}  
            {subclass === 'Vectorial' && (sheet?.subclassProgressionDots as any)?.vectorialPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#531c94' }}>Throw Image.</i></b> <span style={{ color: '#000' }}>You can briefly Oikomagically clone yourself and exist in two places at once outside of combat. You summon the clone adjacent to you and it lasts for 10 seconds. Otherwise, it functions exactly as you can.</span>
              </span>
            </div>
          )} 
          {subclass === 'Astral' && (sheet?.subclassProgressionDots as any)?.astralPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#5bb1af' }}>Uplifiting Presence.</i></b> <span style={{ color: '#000' }}>Your connection to a divine benevolence practically makes you glow with an otherworldly charisma. Gain an advantage on social-based skill rolls when speaking kindly, honorably, or otherwise in sincere goodness.</span>
            </span>
          </div>
          )}
          {subclass === 'Chaos' && (sheet?.subclassProgressionDots as any)?.chaosPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#b15b6c' }}>Impulsive Intuition.</i></b> <span style={{ color: '#000' }}>You are adept at leaping before looking when the stakes are high, and you tend to do well in chaotic situations both physical and social. Gain an advantage on any related skill roll.</span>
            </span>
          </div>
          )}  
          {subclass === 'Order' && (sheet?.subclassProgressionDots as any)?.orderPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#aeb15b' }}>Law of the Land.</i></b> <span style={{ color: '#000' }}>You have a preternatural sense of law and order within any community you encounter and intuitively know the societal rules that govern them. Gain an advantage on any related skill roll.</span>
            </span>
          </div>
          )} 
          {subclass === 'Void' && (sheet?.subclassProgressionDots as any)?.voidPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#5b73b1' }}>Spine-Chiller.</i></b> <span style={{ color: '#000' }}>Your vibe is just downright creepy, and your connection to the Void realm influences others in an imperceptible and emotional way. Gain an advantage on social-based skill rolls when scaring, intimidating or otherwise unnerving others.</span>
            </span>
          </div>
          )}
          {subclass === 'Air' && (sheet?.subclassProgressionDots as any)?.airPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#0ee2df' }}>Airbender.</i></b> <span style={{ color: '#000' }}>Your elemental companion enables you to manipulate the air itself, allowing you to push, pull and/or lift and levitate objects up to 20hx away and weighing up to 50lbs.</span>
            </span>
          </div>
          )}
          {subclass === 'Earth' && (sheet?.subclassProgressionDots as any)?.earthPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#e2b90e' }}>Earthmolder.</i></b> <span style={{ color: '#000' }}>Your elemental companion enables you to mold earth, clay and stone to your will, allowing you to create buildings, raise and lower the ground, and otherwise manipulate the earth within a 10hx radius in minutes.</span>
            </span>
          </div>
          )}
          {subclass === 'Fire' && (sheet?.subclassProgressionDots as any)?.firePerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#e20e0e' }}>Firestarter.</i></b> <span style={{ color: '#000' }}>Your elemental companion allows you to start fires on even the most fire resistant materials and objects up to 20hx away.</span>
            </span>
          </div>
          )} 
          {subclass === 'Water' && (sheet?.subclassProgressionDots as any)?.waterPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#0e42e2' }}>Waterweaver.</i></b> <span style={{ color: '#000' }}>Your elemental companion allows you to pull water out of all sources of moisture within 20hx and change them into any form that water can take (water, ice, steam).</span>
            </span>
          </div>
          )} 
          {subclass === 'Aeronaut' && (sheet?.subclassProgressionDots as any)?.aeronautPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#3da1d8' }}>Aerial Ace.</i></b> <span style={{ color: '#000' }}>You have expert experience with flying and can predict air currents, inertial motions and cross-vectors for any flying object. Gain an advantage on related skills rolls.</span>
            </span>
          </div>
          )} 
          {subclass === 'Brawler' && (sheet?.subclassProgressionDots as any)?.brawlerPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#d8a53d' }}>Brawler Schematics.</i></b> <span style={{ color: '#000' }}>Your exosuit allows you to perform heroic feats of athleticism, from scaling walls to jumping impossible distances to wrestling giants. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )} 
          {subclass === 'Dreadnaught' && (sheet?.subclassProgressionDots as any)?.dreadnaughtPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#d83da0' }}>Implaccable Will.</i></b> <span style={{ color: '#000' }}>You are steadfast and determined in everything you do and tend to easily see the clearest path to your goals. As such, you aren't easily swayed by the words or actions of others. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )} 
          {subclass === 'Spectre' && (sheet?.subclassProgressionDots as any)?.spectrePerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#6a3dd8' }}>Quantum Cloaking Array.</i></b> <span style={{ color: '#000' }}>Your suit allows you to become invisible to the naked eye at any time outside of combat. Only the appropriate magical abilities or technological gear can see you. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subclass === 'Ammo Coder' && (sheet?.subclassProgressionDots as any)?.ammocoderPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#0a3991' }}>Minor Magician.</i></b> <span style={{ color: '#000' }}>You've picked up some rudimentary Oikomagic skills that you can use in a variety of small but useful ways, such as creating bits of light, noises, or otherwise minor sensory effects. Consult your DM for specifics.</span>
            </span>
          </div>
          )}
          {subclass === 'Ordnancer' && (sheet?.subclassProgressionDots as any)?.ordnancerPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#910a0a' }}>Bringin' the Big Guns.</i></b> <span style={{ color: '#000' }}>Your heavy weapons are practically an extension of your personality. Gain an advantage on skill rolls related to displaying your ridiculous arsenal, whether you're showing off, threatening or anything in between.</span>
            </span>
          </div>
          )}
          {subclass === 'Pistoleer' && (sheet?.subclassProgressionDots as any)?.pistoleerPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#5a910a' }}>Slippery.</i></b> <span style={{ color: '#000' }}>You're smooth talkin' and quick walkin' sonuvabitch. You're capable of weaseling your way out sticky situations, whether they're social or physical traps. Gain an advantage on related skills when escaping tricky circumstances.</span>
            </span>
          </div>
          )}
          {subclass === 'Sniper' && (sheet?.subclassProgressionDots as any)?.sniperPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#0a6f91' }}>Skulker.</i></b> <span style={{ color: '#000' }}>You are at home in the shadows, capable of sneaking into places and being unseen in almost any situation. You are rarely the center of focus and you often use that to your advantage. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )} 
          {subclass === 'Hacker' && (sheet?.subclassProgressionDots as any)?.hackerPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#5c57b8' }}>Cyberpunk.</i></b> <span style={{ color: '#000' }}>You're a savant when it comes to working with computer interfaces and communications devices of all kinds. Gain an advantage on related skills when operating any type of screen or user interface.</span>
            </span>
          </div>
          )}
          {subclass === 'Junker' && (sheet?.subclassProgressionDots as any)?.junkerPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#6db857' }}>Scavenger.</i></b> <span style={{ color: '#000' }}>You have a knack for always being able to find, steal, or make the part you need to make something mechanical work. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )} 
          {subclass === 'Nanoboticist' && (sheet?.subclassProgressionDots as any)?.nanoboticistPerksSkillsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#57b8b0' }}>Nanodrone Hand.</i></b> <span style={{ color: '#000' }}>Your Nanodrone Swarm allows you to manipulate objects at up to a 5hx Range, such as pulling a lever, pushing a button, opening a door or grabbing an item.</span>
            </span>
          </div>
          )} 
          {subclass === 'Tanker' && (sheet?.subclassProgressionDots as any)?.tankerPerksHeavyMetalDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#b8578b' }}>Heavy Metal.</i></b> <span style={{ color: '#000' }}>You excel at operating heavy machinery of all sorts, including large drones, cranes, boom lifts, etc. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {/* Subspecies Perks */}
          {subspecies === 'Corvid' && sheet?.subspeciesCardDots?.[5]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#75904e' }}>Skill Mimicry.</i></b> <span style={{ color: '#000' }}>You are innately capable of copying others in what they're good at. While adjacent to an ally, you can use their skill bonuses in place of your own when you make a skill roll.</span>
            </span>
          </div>
          )}
          {subspecies === 'Falcador' && sheet?.subspeciesCardDots?.[5]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#6d7156' }}>Imposing Aura.</i></b> <span style={{ color: '#000' }}>You are a proud predator and have no qualms about asserting your self-assumed authority in practically any situation. Others around you are often quick to recognize this as well. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Nocturne' && sheet?.subspeciesCardDots?.[5]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#334592' }}>Hypnotic Gaze.</i></b> <span style={{ color: '#000' }}>You can manipulate your appearance to enchant, distract or confuse other people, and they have a hard time focusing on tasks when you have your gaze fixed on them. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Vulturine' && sheet?.subspeciesCardDots?.[4]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#a96d8c' }}>Cold Opportunist.</i></b> <span style={{ color: '#000' }}>You have no qualms about making the best of bad moments and taking opportunity when others are either in a vulnerable state or otherwise absent. Gain an advantage on skill related to capitalizing on tragedy in various forms.</span>
            </span>
          </div>
          )}
          {sheet?.species === 'Cerebronych' && sheet?.subspeciesCardDots?.[4]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#5f5e2b' }}>Play Dead.</i></b> <span style={{ color: '#000' }}>The fact that you effectively inhabit a corpse is not lost on you. Gain an advantage on skills related to either pretending you're dead or otherwise pretending you're an undead creature risen from the grave.</span>
            </span>
          </div>
          )}
          {subspecies === 'Barkskin' && sheet?.subspeciesCardDots?.[8]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#5f2d2b' }}>Thick Skinned.</i></b> <span style={{ color: '#000' }}>Your tree-like nature makes you capable of keeping a level head and a willingness to bend and not break in both social and emotional situations when the going gets tough. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Carnivorous' && sheet?.subspeciesCardDots?.[5]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#2b2d5f' }}>pH Sensitive.</i></b> <span style={{ color: '#000' }}>You are very sensitive to chemical levels and acidity balances and can sniff out toxins, poisons and other chemicals and substances whenever you smell, taste or touch them. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Drifting' && sheet?.subspeciesCardDots?.[5]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#5f8a5f' }}>Easy Glider.</i></b> <span style={{ color: '#000' }}>You are generally very go-with-the-flow. As such, you're naturally adept at picking up signs and signals of various kinds, such as air currents, tracks in the ground or nonverbal communication. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Viny' && sheet?.subspeciesCardDots?.[8]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#5f5f2b' }}>Invasive Maneuvers.</i></b> <span style={{ color: '#000' }}>You are capable of transforming your viny body in myriad ways, including squeezing through areas as small as 1 inch in diameter or reaching with your appendages as far as 6hx in any direction.</span>
            </span>
          </div>
          )}
          {subspecies === 'Android' && sheet?.subspeciesCardDots?.[5]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#581fbd' }}>Translate Bot.</i></b> <span style={{ color: '#000' }}>You can speak, read, and write any language that you spend at least 2 minutes learning.</span>
            </span>
          </div>
          )}
          {subspecies === 'Utility Droid' && sheet?.subspeciesCardDots?.[6]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#bd891f' }}>Adaptable Utility.</i></b> <span style={{ color: '#000' }}>You always have the right tool on hand for whatever simple task you need to complete. This is limited to handheld-sized tools that would fit into a toolbox. Examples include a drill, magnifying glass, lockpicks, hammer, welder, binoculars, etc.</span>
            </span>
          </div>
          )}
          {subspecies === 'Petran' && sheet?.subspeciesCardDots?.[11]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#735311' }}>Stone Artisan.</i></b> <span style={{ color: '#000' }}>You can shape stone and earth with ease. As such, you can quickly and easily make a tool, key, or other small item from a handful of gravel or dirt. Consult the DM for more information.</span>
            </span>
          </div>
          )}
          {subspecies === 'Pyran' && sheet?.subspeciesCardDots?.[12]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#b31111' }}>Fiery Creations.</i></b> <span style={{ color: '#000' }}>Your affinity with flames and heat allow you to mold metal and burn woods with an artisanal touch. Gain an advantage on any related skill roll.</span>
            </span>
          </div>
          )}
          {subspecies === 'Apocritan' && sheet?.subspeciesCardDots?.[12]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#6d7156' }}>Colony Instinct.</i></b> <span style={{ color: '#000' }}>Your highly communal, worker upbringing has led you to work better together within a team. You gain an advantage on all skill rolls for each ally who participates in that skill with you simultaneously.</span>
            </span>
          </div>
          )}
          {subspecies === 'Dynastes' && sheet?.subspeciesCardDots?.[9]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#334592' }}>Colony Instinct.</i></b> <span style={{ color: '#000' }}>Your size and strength allows you to perform powerful feats. Gain an advantage on skill rolls where you can leverage your bulk and strength.</span>
            </span>
          </div>
          )}
          {subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[12]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#75904e' }}>Patient Hunter.</i></b> <span style={{ color: '#000' }}>Your ability to stay still for an impressively long time has its upsides. Gain an advantage on related skills when waiting and/or being still for prolonged periods.</span>
            </span>
          </div>
          )}
          {subspecies === 'Diminutive Evolution' && sheet?.subspeciesCardDots?.[6]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#c3735f' }}>Half-Sized Humor.</i></b> <span style={{ color: '#000' }}>You are quick with a joke and others find you pleasing to be around. As such, you are often seen as funny and non-threatening in most situations. Gain an advantage on related skill rolls when being friendly with other people.</span>
            </span>
          </div>
          )}
          {subspecies === 'Lithe Evolution' && sheet?.subspeciesCardDots?.[7]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#2b5f5f' }}>Elven Alacrity.</i></b> <span style={{ color: '#000' }}>You are both wise and sharp witted, being able to pick up on much subtler situations and understand the truth behind others' words and actions. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Massive Evolution' && sheet?.subspeciesCardDots?.[9]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#2b175f' }}>Ogre Spirit.</i></b> <span style={{ color: '#000' }}>Your ogre-like nature has led you to possess incredible strength and endurance in all things physical. You are also quite large and can lift heavy objects and reach high places. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Stout Evolution' && sheet?.subspeciesCardDots?.[10]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#5f2b2b' }}>Dwarven Resilience.</i></b> <span style={{ color: '#000' }}>Your dwarf-like nature allows you to thrive in underground and/or dark environments as well as stomach hefty amounts of intoxication and poisoning. Gain an advantage on related skills.</span>
            </span>
          </div>
          )}
          {subspecies === 'Infrared' && sheet?.subspeciesCardDots?.[4]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#b17fbe' }}>Visions of Calefaction.</i></b> <span style={{ color: '#000' }}>Your natural infrared vision allows you to see easily in the dark, and you can spot any heat signatures from upwards of miles away. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Radiofrequent' && sheet?.subspeciesCardDots?.[4]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#bea97f' }}>Innate Communications.</i></b> <span style={{ color: '#000' }}>You can naturally pick up radio signals from various devices that have anything from basic radio antennae to bluetooth or wifi capabilities built into them. Gain an advantage on skill rolls related to deciphering any signals you detect.</span>
            </span>
          </div>
          )}
          {subspecies === 'X-Ray' && sheet?.subspeciesCardDots?.[4]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#7f8abe' }}>Penetrating Sight.</i></b> <span style={{ color: '#000' }}>You can see through soft and thin materials, such as cloth and skin, and can get the outlines and general shapes of hidden items. However, you cannot see through an inch of metal or a foot of stone. Consult your DM for more information.</span>
            </span>
          </div>
          )}
          {subspecies === 'Canid' && sheet?.subspeciesCardDots?.[4]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#2f8da6' }}>Consummate Tracker.</i></b> <span style={{ color: '#000' }}>You are an expert tracker and can almost always find someone who is trying to elude you, whether through your natural senses or your penchant for predation. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Felid' && sheet?.subspeciesCardDots?.[10]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#b16326' }}>Instinctive Stalker.</i></b> <span style={{ color: '#000' }}>When applied, your instincts allow you to silently hunt down your prey, either physically or mentally. Gain an advantage on skill rolls related to stealthily tracking down any target.</span>
            </span>
          </div>
          )}
          {subspecies === 'Mustelid' && sheet?.subspeciesCardDots?.[9]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#699239' }}>Wily Trickster.</i></b> <span style={{ color: '#000' }}>You are naturally gifted at weaseling your way out of or into situations both physical and social, whether by squirming through tight areas or fast talking your way out of a tricky situation. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {subspecies === 'Ursid' && sheet?.subspeciesCardDots?.[12]?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#9026b1' }}>Bear Strength.</i></b> <span style={{ color: '#000' }}>You are incredibly strong and didn't have to work for it. Lucky you. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          
          {/* Background Perks */}
          {sheet?.background === 'Adherent of the Pollen Collective' && sheet?.backgroundProgressionDots?.pollenCollectiveGreenThumbDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#000' }}>Green Thumb.</i></b> <span style={{ color: '#000' }}>Your training within the Pollen Collective has allowed you to become adept at planting seeds and maintaining any flora from gardens to entire forests. Gain an advantage on skills related to the growth and maintenance of the natural world.</span>
            </span>
          </div>
          )}
          {sheet?.background === 'Anti-Deft Secessionist' && sheet?.backgroundProgressionDots?.antiDeftSecessionistAtrocitiesDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#000' }}>Atrocities of the Empire.</i></b> <span style={{ color: '#000' }}>You've garnered a unique camaraderie of all enemies of Defteros and are fast friends with all opposed to the Woman King Aelys. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {sheet?.background === 'Awakened Machine' && sheet?.backgroundProgressionDots?.awakenedMachineFilthyCogDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#000' }}>No Longer a Filthy Cog.</i></b> <span style={{ color: '#000' }}>You are deeply cognizant of the slavery and servitude other bots often find themselves in. Gain an advantage on skill rolls while relating with Cognizants, droids or other machines who are or once were slaves to biological masters.</span>
            </span>
          </div>
          )}
          {sheet?.background === 'Belt Miner' && sheet?.backgroundProgressionDots?.beltMinerMinersKnowledgeDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#000' }}>Miner's Knowledge.</i></b> <span style={{ color: '#000' }}>Your experience from the mines has given you the ability to discern various metals, ores, and soils. You can also determine the structural integrity of any object made of these materials. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {sheet?.background === 'Black Market Executive' && sheet?.backgroundProgressionDots?.blackMarketExecutiveQuestionableNegotiationsDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#000' }}>Questionable Negotiations.</i></b> <span style={{ color: '#000' }}>You are a skilled salesperson in every negative sense of the word, and can easily haggle your way through almost any trade. Gain an advantage on related skill rolls.</span>
            </span>
          </div>
          )}
          {sheet?.background === 'Combat Medic' && sheet?.backgroundProgressionDots?.combatMedicHorrorsOfWarDots?.[0] && (
          <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#000' }}>Horrors of War.</i></b> <span style={{ color: '#000' }}>You've endured a great deal of suffering through the suffering, pain and death of many of those around you on the battlefield. Gain an advantage on related skill rolls when tending to a wound or relating with other veterans.</span>
            </span>
          </div>
          )}
        </div>
      </div>
  );
};

export default CharacterSheetPerks;
