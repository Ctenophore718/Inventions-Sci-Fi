import React from "react";
import type { CharacterSheet } from "../types/CharacterSheet";

export const generateNaturalInsulationJSX = (sheet?: CharacterSheet | null) => {
  const coldImmunity = sheet?.subspeciesCardDots?.[1]?.[0] || false;
  const bludgeoningImmunity = sheet?.subspeciesCardDots?.[0]?.[0] || false;
  const electricResistance = sheet?.subspeciesCardDots?.[2]?.[0] || false;
  const electricImmunity = sheet?.subspeciesCardDots?.[3]?.[0] || false;
  const fireResistance = sheet?.subspeciesCardDots?.[4]?.[0] || false;
  const fireImmunity = sheet?.subspeciesCardDots?.[5]?.[0] || false;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#9026b1' }}>Natural Insulation.</i></b> You <b>[</b><i>{coldImmunity ? 'are Immune to' : 'Resist'}</i><b>]</b> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b>[</b><i>{bludgeoningImmunity ? 'are Immune to' : 'Resist'}</i><b>]</b> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b>[</b><i>{electricImmunity ? 'are Immune to' : electricResistance ? 'Resist' : ' - '}</i><b>]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b>[</b><i>{fireImmunity ? 'are Immune to' : fireResistance ? 'Resist' : ' - '}</i><b>]</b> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Your size is 3hx.
    </span>
  );
};

export const generateNaturalInsulationFeatureJSX = (sheet?: CharacterSheet | null) => {
  return generateNaturalInsulationJSX(sheet);
};
