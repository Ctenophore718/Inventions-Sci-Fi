export const generateComeatMeBroJSX = (cooldown: number, strikeDamageBonus: number, resistAllDamage: boolean, immuneToConditions: boolean) => {
  return (
    <>
      <b><i style={{ color: '#5f2b2b' }}>Come at Me, Bro!</i></b> <span style={{ color: '#5f2b2b', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Until the start of the next round, whenever a creature within <b>[1]</b>hx of you damages you with an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i><span style={{ color: '#990000' }}>Strike</span></i></b>, you immediately deal your <b><i><span style={{ color: '#990000' }}>Strike</span></i></b> damage{strikeDamageBonus > 0 ? ` +[${strikeDamageBonus}]d6` : ''} back at the creature{resistAllDamage ? ', you resist all Damage' : ''}{immuneToConditions ? ', and you are immune to all conditions' : ''}.
    </>
  );
};

export const generateComeatMeBroCardJSX = (strikeDamageBonus: number, resistAllDamage: boolean, immuneToConditions: boolean) => {
  return (
    <>
      Until the start of the next round, whenever a creature within <b>[1]</b>hx of you damages you with an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i><span style={{ color: '#990000' }}>Strike</span></i></b>, you immediately deal your <b><i><span style={{ color: '#990000' }}>Strike</span></i></b> damage{strikeDamageBonus > 0 ? ` +[${strikeDamageBonus}]d6` : ''} back at the creature{resistAllDamage ? ', you resist all Damage' : ''}{immuneToConditions ? ', and you are immune to all conditions' : ''}.
    </>
  );
};
