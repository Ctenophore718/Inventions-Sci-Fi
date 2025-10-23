import React from 'react';

export interface ElementalistFeatureData {
  featureRange: number;
  damageDiceBonus: number;
}

/**
 * Calculate Elementalist feature values based on class card dots
 */
export function calculateElementalistFeatureData(classCardDots?: boolean[][]): ElementalistFeatureData {
  // Get the number of +1hx dots selected (array index 0)
  const rangeDots = classCardDots?.[0] || [];
  const featureRange = 3 + rangeDots.filter(Boolean).length;
  
  // Get the number of "Deal +1d6 or ◯ on next Attack or Strike" dots selected (array index 1)
  const damageDots = classCardDots?.[1] || [];
  const damageDiceBonus = damageDots.filter(Boolean).length;
  
  return { featureRange, damageDiceBonus };
}

/**
 * Generate the Elemental Excitement feature JSX with dynamic values based on subclass
 */
export function generateElementalExcitementJSX(
  classCardDots?: boolean[][],
  subclass?: string
): React.ReactElement {
  const { featureRange, damageDiceBonus } = calculateElementalistFeatureData(classCardDots);
  
  // Determine damage type and icon based on subclass
  let damageType = '';
  let damageColor = '';
  let damageIcon = '';
  
  switch (subclass) {
    case 'Air':
      damageType = 'Force';
      damageColor = '#516fff';
      damageIcon = '/Force.png';
      break;
    case 'Earth':
      damageType = 'Bludgeoning';
      damageColor = '#915927';
      damageIcon = '/Bludgeoning.png';
      break;
    case 'Fire':
      damageType = 'Fire';
      damageColor = '#f90102';
      damageIcon = '/Fire.png';
      break;
    case 'Water':
      damageType = 'Cold';
      damageColor = '#3ebbff';
      damageIcon = '/Cold.png';
      break;
    default:
      // No subclass selected - show all options
      return (
        <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          <b><i style={{ color: '#231172', fontSize: '1em' }}>Elemental Excitement.</i></b> When another creature within <b>[{featureRange}]</b>hx of you takes Damage associated with your subclass, you may remove a <i>Cooldown Token</i> from any of your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> or <b><i><span style={{ color: '#bf9000' }}>Techniques</span></i></b> and you deal +<b>[{damageDiceBonus}]</b>d6 Damage associated with your subclass on your next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b>.<br />
          <b style={{ color: '#0ee2df' }}>Air:</b> <b style={{ color: '#516fff', textDecoration: 'underline' }}><u>Force</u></b> <img src="/Force.png" alt="Force" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '2px' }} /><br />
          <b style={{ color: '#e2b90e' }}>Earth:</b> <b style={{ color: '#915927', textDecoration: 'underline' }}><u>Bludgeoning</u></b> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '2px' }} /><br />
          <b style={{ color: '#e20e0e' }}>Fire:</b> <b style={{ color: '#f90102', textDecoration: 'underline' }}><u>Fire</u></b> <img src="/Fire.png" alt="Fire" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '2px' }} /><br />
          <b style={{ color: '#0e42e2' }}>Water:</b> <b style={{ color: '#3ebbff', textDecoration: 'underline' }}><u>Cold</u></b> <img src="/Cold.png" alt="Cold" style={{ height: '1em', verticalAlign: 'middle', marginLeft: '2px' }} />
        </span>
      );
  }
  
  return (
    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      <b><i style={{ color: '#231172', fontSize: '1em' }}>Elemental Excitement.</i></b> When another creature within <b>[{featureRange}]</b>hx of you takes <b><span style={{ color: damageColor }}><u>{damageType}</u></span></b><img src={damageIcon} alt={damageType} style={{ height: '1em', verticalAlign: 'middle', marginLeft: '2px', marginRight: '2px' }} />, you may remove a <i>Cooldown Token</i> from any of your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> or <b><i><span style={{ color: '#bf9000' }}>Techniques</span></i></b> and you deal +<b>[{damageDiceBonus}]</b>d6 <b><span style={{ color: damageColor }}><u>{damageType}</u></span></b><img src={damageIcon} alt={damageType} style={{ height: '1em', verticalAlign: 'middle', marginLeft: '2px', marginRight: '2px' }} /> on your next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b>.
    </span>
  );
}
