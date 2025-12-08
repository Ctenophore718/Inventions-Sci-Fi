export const generateIrradiateJSX = (range: number, spikeCount: number) => {
  return (
    <>
      <b><i style={{ color: '#7f8abe' }}>Irradiate.</i></b> Enemies starting their turn within <b>[{range}]</b>hx of you suffer <b>[{spikeCount}]</b> instances of the <b><i>Spike</i></b> (<b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>) condition.
    </>
  );
};

export const generateIrradiateFeatureJSX = (range: number, spikeCount: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#7f8abe' }}>Irradiate.</i></b> Enemies starting their turn within <b>[{range}]</b>hx of you suffer <b>[{spikeCount}]</b> instances of the <b><i>Spike</i></b> (<b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>) condition.
    </span>
  );
};
