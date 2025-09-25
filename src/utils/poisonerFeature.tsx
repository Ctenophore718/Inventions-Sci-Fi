import React from 'react';

interface BackstabberProps {
  poisonerChemicalImmunityDots: boolean[];
  poisonerToxicImmunityDots: boolean[];
  poisonerSpikeInflictToxicDots: boolean[];
}

export const generateBackstabberJSX = ({
  poisonerChemicalImmunityDots,
  poisonerToxicImmunityDots,
  poisonerSpikeInflictToxicDots
}: BackstabberProps) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#cf7600', fontSize: '1em' }}>Backstabber.</i></b> You are <b>[</b><i>{poisonerChemicalImmunityDots[0] ? 'Immune' : 'Resistant'}</i><b>]</b> to <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
        Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b> and <b>[</b><i>{poisonerToxicImmunityDots[0] ? 'Immune' : 'Resistant'}</i><b>]</b> to <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}> 
        Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b>. Additionally, when you <b><i style={{ color: '#351c75' }}>Strike</i></b> against a target's <i>Rear Arc</i>, you inflict <b>[</b>
        {poisonerSpikeInflictToxicDots[0] ? (
          <span>
            <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center' }}>
              Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b><b>)</b>
          </span>
        ) : <b> - </b>}<b>] </b>
        and gain +1d6 Damage for each <i>Chem Token</i> you have.
    </span>
  );
};
