import React from "react";

export const generateWeaselJSX = () => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#699239' }}>Weasel.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Burrow Speed</i></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Additionally, you can use the <i>Thievery</i> skill once per turn without using an <i>Action</i>.
    </span>
  );
};

export const generateWeaselFeatureJSX = () => {
  return generateWeaselJSX();
};
