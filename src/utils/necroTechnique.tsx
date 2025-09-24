export function calculateNecroTechniqueData({
    necroTechniqueRangeDots = [false, false, false],
    necroTechniqueInflictBlindDots = [false],
    necroTechniqueCooldownDots = [false, false]
}: {
    necroTechniqueRangeDots?: boolean[];
    necroTechniqueInflictBlindDots?: boolean[];
    necroTechniqueCooldownDots?: boolean[];
}) {
    const range = 5 + (necroTechniqueRangeDots?.filter(Boolean).length || 0);
    const inflictsBlind = necroTechniqueInflictBlindDots?.[0] || false;
    const cooldown = 4 - (necroTechniqueCooldownDots?.filter(Boolean).length || 0);

    return { range, inflictsBlind, cooldown };
}

export function generateGraspOfTheGraveJSX({
    necroTechniqueRangeDots = [false, false, false],
    necroTechniqueInflictBlindDots = [false],
    necroTechniqueCooldownDots = [false, false]
}: {
    necroTechniqueRangeDots?: boolean[];
    necroTechniqueInflictBlindDots?: boolean[];
    necroTechniqueCooldownDots?: boolean[];
}) {
    const { range, inflictsBlind, cooldown } = calculateNecroTechniqueData({
        necroTechniqueRangeDots,
        necroTechniqueInflictBlindDots,
        necroTechniqueCooldownDots
    });

    return (
        <span style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
             Enemies within <b>[{range}]</b>hx of you suffer the <i><b>Mesmerize</b></i> and <b>[<i>{inflictsBlind ? 'Blind' : ' - '}</i>]</b> condition(s). At the end of their <b><i>Mesmerize</i></b> <b><i style={{ color: '#38761d', fontSize: '1em' }}>Movement</i></b>, they then suffer the <i><b>Restrain</b></i> condition.
        </span>
    );
}