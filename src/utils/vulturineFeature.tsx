import React from 'react';

interface CarrionGorgeParams {
  healingBonus?: number;
}

export const generateCarrionGorgeJSX = (params?: CarrionGorgeParams) => {
  const healingBonus = params?.healingBonus ?? 0;
  const totalDice = 2 + healingBonus * 2;
  
  return (
    <>
      <b><i style={{ color: '#a96d8c' }}>Carrion Gorge.</i></b> When you destroy an enemy using a <b><i style={{ color: '#351c75' }}>Strike</i></b>, you immediately gain <b>[{totalDice}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
    </>
  );
};
