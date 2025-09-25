interface ToxicTakedownProps {
  poisonerTechniqueCooldownDots: boolean[];
  poisonerTechnique2EffectsPerTokenDots: boolean[];
  poisonerTechniqueSameEffectMultipleDots: boolean[];
  poisonerTechniqueExtraSpikeReroll5Dots: boolean[];
  poisonerTechniqueExtraSpikeReroll4Dots: boolean[];
}

export const generateToxicTakedownJSX = ({
  poisonerTechniqueCooldownDots,
  poisonerTechnique2EffectsPerTokenDots,
  poisonerTechniqueSameEffectMultipleDots,
  poisonerTechniqueExtraSpikeReroll5Dots,
  poisonerTechniqueExtraSpikeReroll4Dots
}: ToxicTakedownProps) => {
  return (
    <span>
              You spend any number of <i>Chem Tokens</i> and choose an adjacent creature. You inflict <b>[{poisonerTechnique2EffectsPerTokenDots[0] ? '2' : '1'}]</b> of the following conditions for each <i>Chem Token</i> spent: <b><i>Blind</i></b>, <i><b>Spike</b></i> <br /><b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
                Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
              </u></b><b>)</b> <i>(reroll on a </i><b>[{poisonerTechniqueExtraSpikeReroll4Dots[0] ? '4' : poisonerTechniqueExtraSpikeReroll5Dots[0] ? '5' : '6'}]</b>+<i>)</i>, <i><b>Confuse</b></i>, <i><b>Mesmerize</b></i>, <i><b>Restrain</b></i>. You can choose the same effect <b>[{poisonerTechniqueSameEffectMultipleDots[0] ? 'multiple' : '1'}]</b> time(s).
               </span>
  );
};
