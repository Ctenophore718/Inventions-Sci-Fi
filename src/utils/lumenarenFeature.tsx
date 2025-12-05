export const generateImmutableEnergyReservesJSX = (hasElectricForceImmunity: boolean, hasElectricForceAbsorption: boolean) => {
  const electricForceText = hasElectricForceAbsorption 
    ? 'can Absorb' 
    : hasElectricForceImmunity 
    ? 'are Immune to' 
    : 'Resist';
  
  return (
    <>
      <b><i style={{ color: '#515f2b' }}>Immutable Energy Reserves.</i></b> You are <i>Immune</i> to the <b><i>Sleep</i></b> condition, <b>[{electricForceText}]</b>  <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and can naturally survive in the vacuum of space.
    </>
  );
};

export const generateImmutableEnergyReservesFeatureJSX = (hasElectricForceImmunity: boolean, hasElectricForceAbsorption: boolean) => {
  const electricForceText = hasElectricForceAbsorption 
    ? 'can Absorb' 
    : hasElectricForceImmunity 
    ? 'are Immune to' 
    : 'Resist';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#515f2b' }}>Immutable Energy Reserves.</i></b> You are <i>Immune</i> to the <b><i>Sleep</i></b> condition, <b>[{electricForceText}]</b>  <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and can naturally survive in the vacuum of space.
    </span>
  );
};
