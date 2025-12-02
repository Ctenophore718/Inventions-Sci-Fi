export const generateSharedWisdomJSX = (cooldown: number, range: number, removeConditions: boolean) => {
  return (
    <>
      <b><i style={{ color: '#2b5f5f' }}>Shared Wisdom</i></b> <span style={{ color: '#2b5f5f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You and all allies within <b>[{range}]</b>hx are immune to all conditions until the beginning of the next round. Additionally, you and all allies within range remove <b>{removeConditions ? '[all]' : '[ - ]'}</b> conditions currently affecting them.
    </>
  );
};

export const generateSharedWisdomCardJSX = (range: number, removeConditions: boolean) => {
  return (
    <>
      You and all allies within <b>[{range}]</b>hx are immune to all conditions until the beginning of the next round. Additionally, you and all allies within range remove <b>{removeConditions ? '[all]' : '[ - ]'}</b> conditions currently affecting them.
    </>
  );
};
