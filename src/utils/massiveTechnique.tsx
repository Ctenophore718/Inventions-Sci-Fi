export const generateWarCryJSX = (cooldown: number, range: number, damageBonus: number, removeConditions: boolean, timesBonus: number) => {
  const timesText = timesBonus === 1 ? 'the next time' : timesBonus === 2 ? 'the next two times' : 'the next three times';
  const conditionsText = removeConditions ? 'all' : 'no';
  
  return (
    <>
      <b><i style={{ color: '#2b175f' }}>War Cry</i></b> <span style={{ color: '#2b175f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You and allies within <b>[{range}]</b>hx remove <b>[{conditionsText}]</b> conditions and deal +<b>[{damageBonus}]</b>d6 Damage the next <b>[{timesBonus}]</b> time(s) you roll Damage dice until the start of the next round. The Damage type is the same as the initial Damage rolled.
    </>
  );
};

export const generateWarCryCardJSX = (range: number, damageBonus: number, removeConditions: boolean, timesBonus: number) => {
  const timesText = timesBonus === 1 ? 'the next time' : timesBonus === 2 ? 'the next two times' : 'the next three times';
  const conditionsText = removeConditions ? 'all' : 'no';
  
  return (
    <>
      You and allies within <b>[{range}]</b>hx remove <b>[{conditionsText}]</b> conditions and deal +<b>[{damageBonus}]</b>d6 Damage the next <b>[{timesBonus}]</b> time(s) you roll Damage dice until the start of the next round. The Damage type is the same as the initial Damage rolled.
    </>
  );
};
