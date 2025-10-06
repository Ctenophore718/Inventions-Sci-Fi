export function generateAuraOfLuckJSX({
  divinistFeatureDots = [false, false, false],
  divinistFeatureCritDots = [false, false, false],
  divinistFeatureRangeDots = [false, false, false],
}: {
  divinistFeatureDots?: boolean[];
  divinistFeatureCritDots?: boolean[];
  divinistFeatureRangeDots?: boolean[];
}) {
  const hx = 3 + divinistFeatureDots.filter(Boolean).length;
  const crit = 1 + divinistFeatureCritDots.filter(Boolean).length;
  const range = 0 + divinistFeatureRangeDots.filter(Boolean).length;
  return (
    <>
      <b><i style={{ color: '#ff4343', fontSize: '1em' }}>Aura of Luck.</i></b> You and allies within <b>[{hx}]</b>hx of you can roll <b>[{crit}]</b> additional Crit dice and drop the lowest roll(s) when making <span style={{ color: '#990000' }}><b><i>Attacks</i></b></span>. Additionally, your <span style={{ color: '#990000' }}><b><i>Attacks</i></b></span> gain a +<b>[{range}]</b>hx Range.
    </>
  );
}
