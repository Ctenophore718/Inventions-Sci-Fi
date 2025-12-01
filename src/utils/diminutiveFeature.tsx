export const generateOutOfSightJSX = (coverDice: number) => {
  return (
    <>
      <b><i style={{ color: '#c3735f' }}>Out of Sight.</i></b> When you are <b><i style={{ color: '#990000' }}>Attacked</i></b> and have any Cover, you roll <b>[1]</b> additional Cover dice and discard the lowest <b>[1]</b> roll(s).
    </>
  );
};
