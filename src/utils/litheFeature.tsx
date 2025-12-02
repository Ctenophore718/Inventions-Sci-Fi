export const generateFleetOfFootJSX = (hasRestrainImmunity: boolean = false) => {
  return (
    <>
      <b><i style={{ color: '#2b5f5f' }}>Fleet of Foot.</i></b> You ignore <i>Rough Terrain</i> and <i>Dangerous Terrain</i> and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>. Additionally, you are <i>Immune</i> to the <b>[{hasRestrainImmunity ? <><i>Restrain</i></> : ' - '}]</b> condition.
    </>
  );
};

export const generateFleetOfFootFeatureJSX = (hasRestrainImmunity: boolean = false) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b5f5f' }}>Fleet of Foot.</i></b> You ignore <i>Rough Terrain</i> and <i>Dangerous Terrain</i> and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>. Additionally, you are <i>Immune</i> to the <b>[{hasRestrainImmunity ? <><i>Restrain</i></> : ' - '}]</b> condition.
    </span>
  );
};
