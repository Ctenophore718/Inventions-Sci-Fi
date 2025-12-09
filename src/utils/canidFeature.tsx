export const generateInspiredHunterJSX = (speedBonus: number = 0, critBonus: number = 0) => {
  return (
    <>
      <b><i style={{ color: '#2f8da6' }}>Inspired Hunter.</i></b> When you reduce a creature to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you immediately gain 1 <i>Action</i>, +<b>[{speedBonus}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>, and +<b>[{critBonus}]</b> Crit on your next <b><i style={{ color: '#990000' }}>Attack</i></b>. You can only benefit from this once per turn.
    </>
  );
};

export const generateInspiredHunterFeatureJSX = (speedBonus: number = 0, critBonus: number = 0) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2f8da6' }}>Inspired Hunter.</i></b> When you reduce a creature to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you immediately gain 1 <i>Action</i>, +<b>[{speedBonus}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>, and +<b>[{critBonus}]</b> Crit on your next <b><i style={{ color: '#990000' }}>Attack</i></b>. You can only benefit from this once per turn.
    </span>
  );
};
