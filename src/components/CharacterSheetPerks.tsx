﻿import React from "react";
import styles from './CharacterSheet.module.css';
import type { CharacterSheet } from "../types/CharacterSheet";

type CharacterSheetPerksProps = {
  sheet: CharacterSheet | null;
  charClass: string;
  subclass: string;
};

const CharacterSheetPerks: React.FC<CharacterSheetPerksProps> = ({
  sheet,
  charClass,
  subclass
}) => {
  return (
    <div className={styles.perksCard}>
      <h3 style={{ marginTop: 0, textDecoration: 'underline', fontFamily: 'Arial, sans-serif' }}>Languages & Perks</h3>
        <div className={styles.cardContent}>
          <div style={{ fontWeight: 'bold', marginBottom: 6, fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Languages</span>
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
                <b><i style={{ color: '#4e7211' }}>Gunslinger's Grit.</i></b> <span style={{ color: '#000' }}>Youâ€™ve been in sticky situations enough times to see whatâ€™s coming around the bend. Gain an advantage on related skills when identifying potentially dangerous social situations or defending yours or your companionsâ€™ reputations.</span>
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
        </div>
      </div>
  );
};

export default CharacterSheetPerks;
