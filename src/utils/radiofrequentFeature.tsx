export const generateMisleadingSignalsJSX = (immuneToCrits: boolean = false) => {
  return (
    <>
      <b><i style={{ color: '#bea97f' }}>Misleading Signals.</i></b> Enemies <b><i><span style={{ color: '#990000' }}>Attacking</span></i></b> you roll an additional Crit die and discard the highest rolled. Additionally, you are <b>[</b>{immuneToCrits ? <><i>Immune</i></> : ' - '}<b>]</b> to Crits.
    </>
  );
};

export const generateMisleadingSignalsFeatureJSX = (immuneToCrits: boolean = false) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#bea97f' }}>Misleading Signals.</i></b> Enemies <b><i><span style={{ color: '#990000' }}>Attacking</span></i></b> you roll an additional Crit die and discard the highest rolled. Additionally, you are <b>[</b>{immuneToCrits ? <><i>Immune</i></> : ' - '}<b>]</b> to Crits.
    </span>
  );
};
