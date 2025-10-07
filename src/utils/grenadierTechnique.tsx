export function generateTheBigOneJSX({
    grenadierTechniqueCooldownDots = [false, false, false, false],
    grenadierTechniqueDieSizeDots = [false],
    grenadierTechniqueRangeDots = [false],
} : {
    grenadierTechniqueCooldownDots?: boolean[];
    grenadierTechniqueDieSizeDots?: boolean[];
    grenadierTechniqueRangeDots?: boolean[];
}) {
    const _cooldown = 4 - (grenadierTechniqueCooldownDots?.filter(Boolean).length || 0);
    const dieSize = grenadierTechniqueDieSizeDots[0] ? 12 : 10;
    const range = grenadierTechniqueRangeDots[0] ? 1 : 0;
    return (
        <span style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            You spend any number of <i>Chem Tokens</i> and choose yourself or an adjacent ally. The next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> you or your ally makes gets a +1hx-radius <i>AoE</i> and +1d<b>[{dieSize}]</b> Damage and +<b>[{range}]</b>hx Range per <i>Chem Token</i> spent.
        </span>
    );
}