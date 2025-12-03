export const generateDieHardJSX = (toxicStatus: string, sleepImmunity: boolean) => {
  return (
    <>
      <b><i style={{ color: '#5f2b2b' }}>Die Hard.</i></b> The first time you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you immediately gain 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and are not dying. Additionally, you are <b>[{toxicStatus}]</b> to <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and have <b>[{sleepImmunity ? 'Sleep' : '-'}]</b> <i>Immunity</i>.
    </>
  );
};

export const generateDieHardFeatureJSX = (toxicStatus: string, sleepImmunity: boolean) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f2b2b' }}>Die Hard.</i></b> The first time you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you immediately gain 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and are not dying. Additionally, you are <b>[{toxicStatus}]</b> to <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and have <b>[{sleepImmunity ? 'Sleep' : '-'}]</b> <i>Immunity</i>.
    </span>
  );
};
