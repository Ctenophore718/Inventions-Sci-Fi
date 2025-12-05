export const generateComeatMeBroJSX = (cooldown: number, strikeDamageBonus: number, resistAllDamage: boolean, immuneToConditions: boolean) => {
  return (
    <>
      <b><i style={{ color: '#5f2b2b' }}>Come at Me, Bro!</i></b> <span style={{ color: '#5f2b2b', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Until the start of the next round, you <b>[</b>{resistAllDamage ? <><i>Resist</i></> : ' - '}<b>]</b> all Damage and are <b>[</b>{immuneToConditions ? <><i>Immune</i></> : ' - '}<b>]</b> to all conditions, and whenever a creature within <b>[1]</b>hx of you Damages you with an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b>, you immediately deal your <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b> Damage + <b>[{strikeDamageBonus > 0 ? `${strikeDamageBonus}` : '0'}]</b>d6 back at the creature.
    </>
  );
};

export const generateComeatMeBroCardJSX = (strikeDamageBonus: number, resistAllDamage: boolean, immuneToConditions: boolean) => {
  return (
    <>
      Until the start of the next round, you <b>[</b>{resistAllDamage ? <><i>Resist</i></> : ' - '}<b>]</b> all Damage and are <b>[</b>{immuneToConditions ? <><i>Immune</i></> : ' - '}<b>]</b> to all conditions, and whenever a creature within <b>[1]</b>hx of you Damages you with an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b>, you immediately deal your <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b> Damage + <b>[{strikeDamageBonus > 0 ? `${strikeDamageBonus}` : '0'}]</b>d6 back at the creature.
    </>
  );
};
