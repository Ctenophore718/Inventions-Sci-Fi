import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateCommanderPrimaryAttackStatsJSX } from '../utils/commanderPrimaryAttack';
import { generateBeguilerSecondaryAttackStatsJSX } from '../utils/beguilerSecondaryAttack';
import { generateGalvanicSecondaryAttackStatsJSX } from '../utils/galvanicSecondaryAttack';
import { generateTacticianSecondaryAttackStatsJSX } from '../utils/tacticianSecondaryAttack';

interface CardsCommanderAttacksProps {
  sheet: CharacterSheet | null;
  subclass: string;
}

function getRifleFlavorText(rifle: string): string {
  switch (rifle) {
    case 'Plasma Rifle':
      return '“Slickin’ foes with the fourth state of matter since the Great Silence.” --Defteran saying';
    case 'Sapper Gun':
      return 'The Sapper has the unique ability to draw the life energy of its target and imbue the attacker with renewed constitution.';
    default:
      return 'A specialized rifle for primary attacks.';
  }
}

export const CardsCommanderAttacks: React.FC<CardsCommanderAttacksProps> = ({ sheet }) => {
  const rifles = sheet?.rifles || [];
  const whips = sheet?.whips || [];
  const sabres = sheet?.sabres || [];
  const flares = sheet?.flares || [];
  
  if (rifles.length === 0 && whips.length === 0 && sabres.length === 0 && flares.length === 0) {
    return null;
  }

  return (
    <>
      {rifles.map((rifle: string, index: number) => (
        <div key={`${rifle}-${index}`} style={{ 
          width: '240px', 
          height: '336px', 
          background: '#fff', 
          border: '5px solid #990000', 
          borderRadius: 8, 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          padding: '1.2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Card Header */}
          <div style={{
            position: 'absolute',
            top: -4,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 10px',
            boxSizing: 'border-box',
            minHeight: '2.1em'
          }}>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 'bold',
              fontSize: 'clamp(0.8em, 4vw, 1.25em)',
              color: '#717211',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {rifle}
            </span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#717211',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Rifle</span>
          </div>
          
          {/* Card Image */}
          <img 
            src={rifle === 'Plasma Rifle' ? '/Plasma Rifle.png' : rifle === 'Sapper Gun' ? '/Sapper Gun.png' : '/Blank Card.png'}
            alt={rifle}
            style={{
              position: 'absolute',
              top: 35,
              left: 10,
              right: 10,
              width: 'calc(100% - 20px)',
              height: 'calc(50% - 55px)',
              objectFit: 'cover',
              zIndex: 1,
              borderRadius: 8
            }}
          />
          
          {/* Card Type */}
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 15px)',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 10,
            paddingRight: 10,
            zIndex: 3
          }}>
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Primary Attack</span>
          </div>
          
          {/* Card Stats */}
          <div style={{
            position: 'absolute',
            top: 'calc(50% + 10px)',
            left: 10,
            right: 10,
            bottom: 45,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 400,
            overflow: 'auto',
            wordWrap: 'break-word',
            display: 'flex',
            alignItems: 'flex-start',
            zIndex: 2,
            lineHeight: 1.2
          }}>
            {generateCommanderPrimaryAttackStatsJSX(
              sheet?.classCardDots, 
              rifle, 
              sheet?.subclass, 
              (sheet?.subclassProgressionDots as any)?.tacticianFeatureCritDots
            )}
          </div>
          
          {/* Flavor Text */}
          <div style={{
            position: 'absolute',
            top: 330,
            bottom: 5,
            left: 10,
            right: 10,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontStyle: 'italic',
            fontSize: '0.70em',
            fontWeight: 400,
            zIndex: 3,
            textAlign: 'left'
          }}>
            {getRifleFlavorText(rifle)}
          </div>
        </div>
      ))}
      {/* Beguiler Whip Secondary Attack Cards */}
      {sheet?.subclass === 'Beguiler' && Array.isArray(sheet?.whips) && sheet.whips.length > 0 && sheet.whips.map((whip, idx) => (
        <div key={whip + idx} style={{
          width: '240px',
          height: '336px',
          background: '#fff',
          border: '5px solid #990000',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: -4,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 10px',
            boxSizing: 'border-box',
            minHeight: '2.1em'
          }}>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 'bold',
              fontSize: 'clamp(0.8em, 4vw, 1.25em)',
              color: '#1f21ce',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>{whip}</span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#1f21ce',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Whip</span>
          </div>
          <img 
            src={whip === 'Heartstrings' ? '/Heartstrings.png' : whip === 'The Crackler' ? '/The Crackler.png' : '/Blank Card.png'}
            alt={whip}
            style={{
              position: 'absolute',
              top: 35,
              left: 10,
              right: 10,
              width: 'calc(100% - 20px)',
              height: 'calc(50% - 55px)',
              objectFit: 'cover',
              zIndex: 1,
              borderRadius: 8
            }}
          />
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 15px)',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            zIndex: 3
          }}>
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Secondary Attack</span>
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
              Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (sheet?.subclassProgressionDots?.beguilerAttackCooldownDots?.filter(Boolean).length || 0)}]</span>
            </span>
          </div>
          <div style={{
            position: 'absolute',
            top: 'calc(50% + 10px)',
            left: 10,
            right: 10,
            bottom: 45,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 400,
            overflow: 'auto',
            wordWrap: 'break-word',
            display: 'flex',
            alignItems: 'flex-start',
            zIndex: 2,
            lineHeight: 1.2
          }}>
            <div style={{
              fontSize: '1em',
              width: '100%',
              height: 'fit-content',
              maxHeight: '100%',
              overflow: 'hidden'
            }}>
              {generateBeguilerSecondaryAttackStatsJSX(
                sheet?.subclassProgressionDots?.beguilerAttackAoEDots,
                sheet?.subclassProgressionDots?.beguilerAttackCritDots,
                sheet?.subclassProgressionDots?.beguilerAttackCooldownDots,
                whip
              )}
            </div>
          </div>
          <div style={{
            position: 'absolute',
            top: 330,
            bottom: 5,
            left: 10,
            right: 10,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontStyle: 'italic',
            fontSize: '0.69em',
            fontWeight: 400,
            zIndex: 3,
            textAlign: 'left'
          }}>
            {whip === 'Heartstrings' ? '“Each barb is laced with a neurotoxin that allows the wielder to briefly control the target’s movements. I freakin’ love this whip!” --Laesee Grae, Beguiler' 
            : whip === 'The Crackler' ? 'Every crack of this whip effectively stuns the target, rendering them utterly ineffectively momentarily on the battlefield.' : 'Whip effect.'}
          </div>
        </div>
      ))}
      {/* Galvanic Sabre Secondary Attack Cards */}
      {sheet?.subclass === 'Galvanic' && Array.isArray(sheet?.sabres) && sheet.sabres.length > 0 && sheet.sabres.map((sabre, idx) => (
        <div key={sabre + idx} style={{
          width: '240px',
          height: '336px',
          background: '#fff',
          border: '5px solid #990000',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: -4,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 10px',
            boxSizing: 'border-box',
            minHeight: '2.1em'
          }}>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 'bold',
              fontSize: 'clamp(0.8em, 4vw, 1.25em)',
              color: '#6fce1f',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>{sabre}</span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#6fce1f',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Sabre</span>
          </div>
          <img 
            src={sabre === 'Phase Sword' ? '/Phase Sword.png' : sabre === 'Truthsinger' ? '/Truthsinger.png' : '/Blank Card.png'}
            alt={sabre}
            style={{
              position: 'absolute',
              top: 35,
              left: 10,
              right: 10,
              width: 'calc(100% - 20px)',
              height: 'calc(50% - 55px)',
              objectFit: 'cover',
              zIndex: 1,
              borderRadius: 8
            }}
          />
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 15px)',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            zIndex: 3
          }}>
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Secondary Attack</span>
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
              Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (sheet?.subclassProgressionDots?.galvanicAttackCooldownDots?.filter(Boolean).length || 0)}]</span>
            </span>
          </div>
          <div style={{
            position: 'absolute',
            top: 'calc(50% + 10px)',
            left: 10,
            right: 10,
            bottom: 45,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 400,
            overflow: 'auto',
            wordWrap: 'break-word',
            display: 'flex',
            alignItems: 'flex-start',
            zIndex: 2,
            lineHeight: 1.2
          }}>
            <div style={{
              fontSize: '1em',
              width: '100%',
              height: 'fit-content',
              maxHeight: '100%',
              overflow: 'hidden'
            }}>
              {generateGalvanicSecondaryAttackStatsJSX(
                sheet?.subclassProgressionDots?.galvanicAttackAoEDots,
                sheet?.subclassProgressionDots?.galvanicAttackDamageDots,
                sheet?.subclassProgressionDots?.galvanicAttackCritDots,
                sheet?.subclassProgressionDots?.galvanicAttackCooldownDots,
                sabre
              )}
            </div>
          </div>
          <div style={{
            position: 'absolute',
            top: 330,
            bottom: 5,
            left: 10,
            right: 10,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontStyle: 'italic',
            fontSize: '0.69em',
            fontWeight: 400,
            zIndex: 3,
            textAlign: 'left'
          }}>
            {sabre === 'Phase Sword' ? 'Every phase sword seems to somehow reflect the personality of its wielder. If you see a red hue, be extremely wary.' 
            : sabre === 'Truthsinger' ? '"They call it Truthsinger because of the light that shines in the mind of its target when the blade strikes true. A blinding truth." --Rene Zin, Galvanic' : 'Sabre effect.'}
          </div>
        </div>
      ))}
      {/* Tactician Flare Secondary Attack Cards */}
      {sheet?.subclass === 'Tactician' && Array.isArray(sheet?.flares) && sheet.flares.length > 0 && sheet.flares.map((flare, idx) => (
        <div key={flare + idx} style={{
          width: '240px',
          height: '336px',
          background: '#fff',
          border: '5px solid #990000',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: -4,
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 10px',
            boxSizing: 'border-box',
            minHeight: '2.1em'
          }}>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 'bold',
              fontSize: 'clamp(0.8em, 4vw, 1.25em)',
              color: '#cec31f',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>{flare}</span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#cec31f',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Flare</span>
          </div>
          <img 
            src={flare === 'Fire Flare' ? '/Fire Flare.png' : flare === 'Flash Freeze' ? '/Flash Freeze.png' : '/Blank Card.png'}
            alt={flare}
            style={{
              position: 'absolute',
              top: 35,
              left: 10,
              right: 10,
              width: 'calc(100% - 20px)',
              height: 'calc(50% - 55px)',
              objectFit: 'cover',
              zIndex: 1,
              borderRadius: 8
            }}
          />
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 15px)',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            zIndex: 3
          }}>
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Secondary Attack</span>
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
              Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((sheet?.subclassProgressionDots as any)?.tacticianAttackCooldownDots?.filter(Boolean).length || 0)}]</span>
            </span>
          </div>
          <div style={{
            position: 'absolute',
            top: 'calc(50% + 10px)',
            left: 10,
            right: 10,
            bottom: 45,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 400,
            overflow: 'auto',
            wordWrap: 'break-word',
            display: 'flex',
            alignItems: 'flex-start',
            zIndex: 2,
            lineHeight: 1.2
          }}>
            <div style={{
              fontSize: '1em',
              width: '100%',
              height: 'fit-content',
              maxHeight: '100%',
              overflow: 'hidden'
            }}>
              {generateTacticianSecondaryAttackStatsJSX(
                (sheet?.subclassProgressionDots as any)?.tacticianAttackAoEDots,
                (sheet?.subclassProgressionDots as any)?.tacticianAttackCritDots,
                (sheet?.subclassProgressionDots as any)?.tacticianAttackCooldownDots,
                flare,
                (sheet?.subclassProgressionDots as any)?.tacticianFeatureCritDots,
              )}
            </div>
          </div>
          <div style={{
            position: 'absolute',
            top: 330,
            bottom: 5,
            left: 10,
            right: 10,
            color: '#000',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontStyle: 'italic',
            fontSize: '0.69em',
            fontWeight: 400,
            zIndex: 3,
            textAlign: 'left'
          }}>
            {flare === 'Fire Flare' ? '“It’s very simple. You ready, and aim, and fire, and fire, and fire.” --Fresnia Gerbranct, Pyran Tactician' 
            : flare === 'Flash Freeze' ? '“This flare freezes everyone in place while pushing them back. I like to call it, “All Clear!”” --Bensign Gafferty, Canid Tactician' : 'Flare effect.'}
          </div>
        </div>
      ))}
    </>
  );
};
