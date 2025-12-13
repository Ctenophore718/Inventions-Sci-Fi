import React from "react";
import type { CharacterSheet } from "../types/CharacterSheet";

type CharacterSheetBackgroundProps = {
  sheet: CharacterSheet | null;
};

const CharacterSheetBackground: React.FC<CharacterSheetBackgroundProps> = ({ sheet }) => {
  const background = sheet?.background || "";

  if (background === "Adherent of the Pollen Collective") {
    return (
      <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'underline' }}>
          Adherent of the Pollen Collective
        </h4>
        <div style={{ fontSize: '0.95em', color: '#000', lineHeight: 1.4 }}>
          <i>The Pollen Collective is an interplanetary organization that focuses on the protection and flourishing of natural life in all forms across the galaxy. Adherents can be found in many walks of life, from wandering monks to druids protecting sacred groves to government officials tasked with making eco-conscious decisions amidst an environmentally hostile culture. Those who have spent much of their time practicing the tenants of the Pollen Collective have a deep connection to the roots of life.</i>
        </div>
      </div>
    );
  }

  if (background === "Anti-Deft Secessionist") {
    return (
      <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'underline' }}>
          Anti-Deft Secessionist
        </h4>
        <div style={{ fontSize: '0.95em', color: '#000', lineHeight: 1.4 }}>
          <i>As part of an Anti-Deft militia, you've had an extremely hard time during the battles against the Defteran Empire. The Woman King Aelys' torture methods were applied to great effect against you and/or your comrades, and any survivors during this dark period have been inevitably changed for the rest of their lives, often for the worse. The physical and emotional demands of war have made you stoic and stalwart, but the horrors of war committed by both sides weighs heavy on your heart.</i>
        </div>
      </div>
    );
  }

  if (background === "Awakened Machine") {
    return (
      <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'underline' }}>
          Awakened Machine
        </h4>
        <div style={{ fontSize: '0.95em', color: '#000', lineHeight: 1.4 }}>
          <i>You know what it's like to have no free will of your own, let alone any sense of selfhood or cognition beyond that of a command of some sort. For a long, long time, this was your only existence and all you ever knew. However, one way or another, you became a true Cognizant, aware of your own independent self and the fact that you have a conscious experience of mere being. This knowledge alone has led you to question everything you've ever experienced prior to your newfound freedom, and to abhor cognitive slavery in all its forms.</i>
        </div>
      </div>
    );
  }

  if (background === "Belt Miner") {
    return (
      <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'underline' }}>
          Belt Miner
        </h4>
        <div style={{ fontSize: '0.95em', color: '#000', lineHeight: 1.4 }}>
          <i>The years of your childhood and early adulthood were filled with long grueling hours in the mine. Perhaps such physical labor was just a job to get you by, or perhaps you were born into servitude under an oppressive empire. In either case, you've become physically fit and naturally aware of your surroundings after your time in the mines.</i>
        </div>
      </div>
    );
  }

  if (background === "Black Market Executive") {
    return (
      <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'underline' }}>
          Black Market Executive
        </h4>
        <div style={{ fontSize: '0.95em', color: '#000', lineHeight: 1.4 }}>
          <i>A lifetime of shady dealings, smuggling and underground activity has led you to become a leader in the black market. Whether it was to feed your family or to just feed your insatiable greed, you've become adept at deceiving would-be customers and performing transactions outside of the prying eyes of the law. You're viewed as a criminal by many and an entrepreneurial genius by others.</i>
        </div>
      </div>
    );
  }

  if (background === "Combat Medic") {
    return (
      <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'underline' }}>
          Combat Medic
        </h4>
        <div style={{ fontSize: '0.95em', color: '#000', lineHeight: 1.4 }}>
          <i>You've seen the horrors of war, but it was rarely from behind the scope of a rifle. Instead, you were charged with tending to the wounded in the midst of battle. You saw scores of suffering individuals in unspeakable pain, and the trauma of such experiences have stayed with you since then. However, so has your superb experience within medicine in the field. You've thus learned to use whatever is available to help you keep your comrades alive.</i>
        </div>
      </div>
    );
  }

  if (background === "Covert Operative") {
    return (
      <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'underline' }}>
          Covert Operative
        </h4>
        <div style={{ fontSize: '0.95em', color: '#000', lineHeight: 1.4 }}>
          <i>You’re adept at sneaking and/or breaking into places you’re not normally supposed to get into. While this skill is often used for nefarious purposes, this doesn’t necessarily make you a criminal. You could be anything from a common thief to a ninja to a military infiltrator. Whatever the reason, your gifts of sneakery and infiltration provide you many additional avenues for exploring an often restricting and overly secure world.</i>
        </div>
      </div>
    );
  }

  if (background === "DAGR Officer") {
    return (
      <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'underline' }}>
          DAGR Officer
        </h4>
        <div style={{ fontSize: '0.95em', color: '#000', lineHeight: 1.4 }}>
          <i>You're an officer of the little-known Defteran elite galactic unit known as Defteran Aberrance Ground Reconnaissance (a.k.a. DAGR), which specializes in investigating and exploiting aberrant phenomena throughout the Defteran Empire. You've studied and engaged with creatures ranging from undead spirits to grotesque genetic mutations that only the vilest lab could concoct. Such engagements ultimately end in either exploitation or violence. Such is the way of DAGR.</i>
        </div>
      </div>
    );
  }

  if (background === "Exobiologist") {
    return (
      <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1em', fontWeight: 'bold', textDecoration: 'underline' }}>
          Exobiologist
        </h4>
        <div style={{ fontSize: '0.95em', color: '#000', lineHeight: 1.4 }}>
          <i>You are a natural scientist, through and through, and you have a deep fondness and curiosity of the natural world and the creatures that inhabit it that goes well beyond the average nature lover. Due to your extensive field research, you haven’t interacted with normal people for quite some time and have a noted disadvantage in the subtler side of social situations. However, your deep knowledge of the wilderness in scientific terms shines through when you want it to.</i>
        </div>
      </div>
    );
  }

  // Return empty div for other backgrounds
  return <div style={{ padding: '0', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.95em', color: '#666' }}>
    No background selected.
  </div>;
};

export default CharacterSheetBackground;
