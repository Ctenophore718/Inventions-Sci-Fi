export const generateWolfpackTacticsJSX = (cooldown: number, range: number, critBonus: number, damageBonus: number) => {
  return (
    <>
      <b><i style={{ color: '#2f8da6', fontSize: '1em' }}>Wolfpack Tactics</i></b> <i style={{ color: '#2f8da6', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the beginning of the next round, you and your allies gain +<b>[{critBonus > 0 ? critBonus : '0'}]</b> Crit and +<b>[{damageBonus}]</b>d6 Damage to all <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> and <b><i style={{ color: '#351c75' }}>Strikes</i></b> for each ally within <b>[{range}]</b>hx of them. The Damage type is the same as your <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type. 
    </>
  );
};

export const generateWolfpackTacticsCardJSX = (range: number, critBonus: number, damageBonus: number) => {
  return (
    <>
      <div style={{ fontSize: '1em', marginBottom: '1px' }}>
        Until the beginning of the next round, you and your allies gain +<b>[{critBonus > 0 ? critBonus : '0'}]</b> Crit and +<b>[{damageBonus}]</b>d6 Damage to all <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> and <b><i style={{ color: '#351c75' }}>Strikes</i></b> for each ally within <b>[{range}]</b>hx of them. The Damage type is the same as your <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.
      </div>
    </>
  );
};
