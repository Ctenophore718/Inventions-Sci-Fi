export const generateSizeMattersJSX = (cooldown: number, moveDistance: number) => {
  return (
    <>
      <b><i style={{ color: '#c3735f' }}>Size Matters</i></b> <span style={{ color: '#c3735f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You treat all 50% Cover as 100% Cover until the start of the next round. Additionally, whenever you are missed by an <b><i style={{ color: '#990000' }}>Attack</i></b>, you can <b><i style={{ color: '#38761d' }}>Move</i></b> up to <b>[{moveDistance}]</b>hx.
    </>
  );
};

export const generateSizeMattersCardJSX = (moveDistance: number) => {
  return (
    <>
      You treat all 50% Cover as 100% Cover until the start of the next round. Additionally, whenever you are missed by an <b><i style={{ color: '#990000' }}>Attack</i></b>, you can <b><i style={{ color: '#38761d' }}>Move</i></b> up to <b>[{moveDistance}]</b>hx.
    </>
  );
};
