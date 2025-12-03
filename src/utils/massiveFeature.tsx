export const generateILLSEEYOUINHELLJSX = (damageMultiplier: string, deathDieBonus: number) => {
  return (
    <>
      <b><i style={{ color: '#2b175f' }}>I'LL SEE YOU IN HELL!</i></b> Whenever you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you can immediately make a <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> with <b>[{damageMultiplier}]</b> the Damage dice. Additionally, you gain a +<b>[{deathDieBonus}]</b> to your death die roll and your size is 3hx.
    </>
  );
};

export const generateILLSEEYOUINHELLFeatureJSX = (damageMultiplier: string, deathDieBonus: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b175f' }}>I'LL SEE YOU IN HELL!</i></b> Whenever you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you can immediately make a <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> with <b>[{damageMultiplier}]</b> the Damage dice. Additionally, you gain a +<b>[{deathDieBonus}]</b> to your death die roll and your size is 3hx.
    </span>
  );
};
