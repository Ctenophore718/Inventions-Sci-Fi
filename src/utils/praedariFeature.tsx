export const generatePredatorJSX = (
  critBonus: number,
  damageBonus: number
) => {
  return (
    <>
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f2b5c' }}>Predator.</i></b> Whenever you <b><i style={{ color: '#990000' }}>Attack</i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> a creature who is not at full <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you gain +<b>[{critBonus}]</b> Crit and +<b>[{damageBonus > 0 ? `${damageBonus}` : '1'}]</b>d6 Damage, the Damage type is  the same as the <b><i style={{ color: '#990000' }}>Attack</i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.
    </span>
    </>
  );
};

