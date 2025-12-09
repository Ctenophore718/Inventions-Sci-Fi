import React from "react";

export const generateCatsGraceJSX = () => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b16326' }}>Cat's Grace.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and cannot take damage from falling as long as you are conscious. Additionally, you can use the <i>Acrobatics</i> skill once per turn without using an <i>Action</i>.
    </span>
  );
};

export const generateCatsGraceFeatureJSX = () => {
  return generateCatsGraceJSX();
};
