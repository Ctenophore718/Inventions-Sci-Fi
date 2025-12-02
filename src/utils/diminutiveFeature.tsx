export const generateOutOfSightJSX = (coverDice: number) => {
  return (
    <>
      <b><i style={{ color: '#c3735f' }}>Out of Sight.</i></b> When you are <b><i style={{ color: '#990000' }}>Attacked</i></b> and have any Cover, you roll <b>[{coverDice}]</b> additional Cover {coverDice === 1 ? 'die' : 'dice'} and discard the lowest <b>[{coverDice}]</b> roll(s).
    </>
  );
};
