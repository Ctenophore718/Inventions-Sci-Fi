export const generateLightspeedJSX = (cooldown: number, range: number) => {
  return (
    <>
      <b><i style={{ color: '#515f2b' }}>Lightspeed</i></b> <span style={{ color: '#515f2b', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You immediately <i>Teleport</i> to any valid hx within <b>[{range}]</b>hx that isn't behind an enclosed door or wall, whether you can see it or not.
    </>
  );
};

export const generateLightspeedCardJSX = (range: number) => {
  return (
    <>
      You immediately <i>Teleport</i> to any valid hx within <b>[{range}]</b>hx that isn't behind an enclosed door or wall, whether you can see it or not.
    </>
  );
};
