import React from 'react';

export const generateAdaptablePhysiqueJSX = (resistCount: number = 2) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b315f' }}>Adaptable Physique.</i></b> You <i>Resist</i> <b>[{resistCount}]</b> of the following damage types: <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#514fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>Neural<img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.
    </span>
  );
};
