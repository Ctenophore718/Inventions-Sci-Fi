import React from 'react';

export function generateBlasterMasterJSX({
	grenadierFeatureIncludesAlliesDots = [false],
	grenadierFeatureAoEDots = [false, false],
	grenadierFeatureImmunityDots = [false],
} : {
	grenadierFeatureIncludesAlliesDots?: boolean[];
	grenadierFeatureAoEDots?: boolean[];
	grenadierFeatureImmunityDots?: boolean[];
}) {
	const hx = grenadierFeatureIncludesAlliesDots[0]
		? 3 + (grenadierFeatureAoEDots?.filter(Boolean).length || 0)
		: 0;
	const resistType = grenadierFeatureImmunityDots[0] ? 'Immune' : 'Resistant';
	return (
		<span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
			<b><i style={{ color: '#cf0000', fontSize: '1em' }}>Blaster Master.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>
				You and all allies within <b>[{hx}]</b>hx are <b>[</b><i>{resistType}</i><b>]</b> to all Damage from <i>AoE</i> <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>. In addition, your <b><i>Primary</i></b> <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> Target becomes an <i>AoE</i> 1hx-radius, and other <i>AoE</i> <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> you make increase in size by 1hx.
			</span>
		</span>
	);
}
