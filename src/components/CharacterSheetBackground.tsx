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
          The Pollen Collective is an interplanetary organization that focuses on the protection and flourishing of natural life in all forms across the galaxy. Adherents can be found in many walks of life, from wandering monks to druids protecting sacred groves to government officials tasked with making eco-conscious decisions amidst an environmentally hostile culture. Those who have spent much of their time practicing the tenants of the Pollen Collective have a deep connection to the roots of life.
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
