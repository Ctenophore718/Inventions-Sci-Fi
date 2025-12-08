export const generateXRayVisionJSX = (cooldown: number, range: number) => {
  return (
    <>
      <b><i style={{ color: '#7f8abe' }}>X-Ray Vision</i></b> <span style={{ color: '#7f8abe', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Until the start of the next round, you and allies within <b>[{range}]</b>hx ignore <i>Cover</i> when making <b><i style={{ color: '#990000' }}>Attacks</i></b>.
    </>
  );
};

export const generateXRayVisionCardJSX = (range: number) => {
  return (
    <>
      Until the start of the next round, you and allies within <b>[{range}]</b>hx ignore <i>Cover</i> when making <b><i style={{ color: '#990000' }}>Attacks</i></b>.
    </>
  );
};
