import React from "react";

export const generateDubiousBadgerJSX = (cooldown: number, conditionCount: number = 1, spike: string = '[ - ]', demoralize: string = '[ - ]') => {
  // Parse spike string to add styling if it contains Spike
  const renderSpike = () => {
    if (spike.includes('Spike')) {
      return <>[<i>Spike</i> (<u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}><i>Toxic</i><img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u>)]</>;
    }
    return spike;
  };

  // Parse demoralize string to add styling if it contains Demoralize
  const renderDemoralize = () => {
    if (demoralize.includes('Demoralize')) {
      return <>[<i>Demoralize</i>]</>;
    }
    return demoralize;
  };

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#699239' }}>Dubious Badger</i></b> <i style={{ color: '#699239', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> The next time you <b><i style={{ color: '#990000' }}>Attack</i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> an enemy, you inflict <b>[{conditionCount}]</b> of the following conditions: <b><i>Blind</i></b>, <b><i>Confuse</i></b>, <b><i>Mesmerize</i></b>, <b>{renderSpike()}</b>, or <b>{renderDemoralize()}</b>.
    </span>
  );
};

export const generateDubiousBadgerCardJSX = (conditionCount: number = 1, spike: string = '[ - ]', demoralize: string = '[ - ]') => {
  // Parse spike string to add styling if it contains Spike
  const renderSpike = () => {
    if (spike.includes('Spike')) {
      return <>[<i>Spike</i> (<u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}><i>Toxic</i><img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u>)]</>;
    }
    return spike;
  };

  // Parse demoralize string to add styling if it contains Demoralize
  const renderDemoralize = () => {
    if (demoralize.includes('Demoralize')) {
      return <>[<i>Demoralize</i>]</>;
    }
    return demoralize;
  };

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      The next time you <b><i style={{ color: '#990000' }}>Attack</i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> an enemy, you inflict <b>[{conditionCount}]</b> of the following conditions: <b><i>Blind</i></b>, <b><i>Confuse</i></b>, <b><i>Mesmerize</i></b>, <b>{renderSpike()}</b>, or <b>{renderDemoralize()}</b>.
    </span>
  );
};
