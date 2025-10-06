export function generateFateReaderJSX({
  divinistTechniqueDots = [false, false, false],
  divinistTechniqueCoverDots = [false],
  divinistTechniqueCooldownDots = [false, false],
}: {
  divinistTechniqueDots?: boolean[];
  divinistTechniqueCoverDots?: boolean[];
  divinistTechniqueCooldownDots?: boolean[];
}) {
  const hx = 5 + divinistTechniqueDots.filter(Boolean).length;
  const additionalDie = 1 + (divinistTechniqueCoverDots[0] ? 1 : 0);
  const whichToDrop = divinistTechniqueCoverDots[0] ? 'two' : 'one';
  const cooldown = 4 - divinistTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      Until the start of the next round, whenever a creature within <b>[{hx}]</b>hx of you rolls a Cover die, they roll <b>[{additionalDie}]</b> additional die and you choose which <b>[{whichToDrop}]</b> to drop.
    </>
  );
}