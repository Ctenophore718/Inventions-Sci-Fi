import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';
import { generateChemistPrimaryAttackStatsJSX, getDartGunCost } from '../utils/chemistPrimaryAttack';
import { generateAnatomistSecondaryAttackStatsJSX } from '../utils/anatomistSecondaryAttack';
import { generateGrenadierSecondaryAttackStatsJSX } from '../utils/grenadierSecondaryAttack';
import { generateNecroSecondaryAttackStatsJSX } from '../utils/necroSecondaryAttack';


interface CardsChemistAttacksProps {
  sheet: CharacterSheet | null;
}

function getFlavorText(dartGun: string): string {
  switch (dartGun) {
    case 'Chem Gun':
      return 'The standard dart gun for any Chemist worth her salt, this needle-pusher provides just the right amount of sting with a nasty side effect in tow.';
    case 'Happy Pill Pusher':
      return '"Them happy pills will cause the subject to laugh hysterically and jump off a cliff, smilin\' all the way down." --Freylia Pharmsworth, Defteran Smuggler';
    case 'Sour Juicer':
      return '"Loaded with the puckery goodness of the Wahaha-crazy-sour-zyclon-x! If you get too much, you go depressed! Wahaha!" --Wahaha commercial';
    case 'Prickly Goo':
      return '"Der\'s sum alien juice slathrin\' each razor-shot -- ain\'t sumpin\' you wanna be messin\' wit." --Guiseppe Vittriorino, Diminutive Poisoner';
    default:
      return 'A specialized dart gun for chemical delivery.';
  }
}

function getSuperSerumCost(superSerum: string): string {
  switch (superSerum) {
    case 'Jacob\'s Ladder':
      return '215c';
    case 'Vampirismagoria':
      return '185c';
    default:
      return '0c';
  }
}

function getSuperSerumFlavorText(superSerum: string): string {
  switch (superSerum) {
    case 'Jacob\'s Ladder':
      return '“...and we did it. The most powerful thing I ever saw--fast trip straight down to the primal fear, right to the base anger. I’m telling you, it was powerful.”';
    case 'Vampirismagoria':
      return 'Drawn from the essence of the purple blood-drinking creature known as the Movaima, this serum drains life energy from its target.';
    default:
      return 'A specialized serum for chemical delivery.';
  }
}

export const CardsChemistAttacks: React.FC<CardsChemistAttacksProps> = ({ sheet }) => {
  const dartGuns = sheet?.dartGuns || [];
  const superSerums = sheet?.superSerums || [];
  const chemZombies = sheet?.chemZombies || [];
  
  // Debug logging for chemZombies
  console.log('CardsChemistAttacks Debug:', {
    subclass: sheet?.subclass,
    chemZombies: sheet?.chemZombies,
    chemZombiesLength: sheet?.chemZombies?.length,
    isArray: Array.isArray(sheet?.chemZombies)
  });
  
  if (dartGuns.length === 0 && superSerums.length === 0 && chemZombies.length === 0) {
    return null;
  }

  return (
    <>
      {dartGuns.map((dartGun, index) => (
        <div key={`${dartGun}-${index}`} style={{ 
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
              color: '#721131',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {dartGun}
            </span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#721131',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Dart Gun</span>
          </div>
          
          {/* Card Image */}
          <img 
            src={dartGun === 'Chem Gun' ? '/Chem Gun.png' : dartGun === 'Happy Pill Pusher' ? '/Happy Pill Pusher.png' : dartGun === 'Prickly Goo' ? '/Prickly Goo.png' : dartGun === 'Sour Juicer' ? '/Sour Juicer.png' : '/Blank Card.png'}
            alt={dartGun}
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
          
          {/* Card Type and Price */}
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
            {generateChemistPrimaryAttackStatsJSX(sheet?.classCardDots, undefined, dartGun, sheet?.chemTokens, sheet?.subclass)}
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
            {getFlavorText(dartGun)}
          </div>
        </div>
      ))}
      {superSerums.map((superSerum, index) => (
        <div key={`${superSerum}-${index}`} style={{ 
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
              color: (superSerum === "Jacob's Ladder" || superSerum === "Vampirismagoria") ? '#66cf00' : '#721131',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>
              {superSerum}
            </span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#66cf00',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Super Serum</span>
          </div>
          
          {/* Card Image */}
            <img 
              src={
                superSerum === 'Jacob\'s Ladder' ? '/Jacob\'s Ladder.png' :
                superSerum === 'Vampirismagoria' ? '/Vampirismagoria.png' :
                '/Blank Card.png'
              }
              alt={superSerum}
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
          
          {/* Card Type and Cooldown */}
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
            <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '0.875em', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
              <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>Cooldown</span> <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (sheet?.subclassProgressionDots?.anatomistAttackCooldownDots?.filter(Boolean).length || 0)}]</span>
            </span>
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
            {generateAnatomistSecondaryAttackStatsJSX(
              sheet?.subclassProgressionDots?.anatomistAttackDamageDots,
              sheet?.subclassProgressionDots?.anatomistAttackCritDots,
              sheet?.subclassProgressionDots?.anatomistAttackCooldownDots,
              superSerum,
              Number(getSuperSerumCost(superSerum).replace('c',''))
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
            {getSuperSerumFlavorText(superSerum)}
          </div>
        </div>
      ))}
      {/* Grenadier Grenade Secondary Attack Cards */}
      {sheet?.subclass === 'Grenadier' && Array.isArray(sheet?.grenades) && sheet.grenades.length > 0 && sheet.grenades.map((grenade, idx) => (
        <div key={grenade + idx} style={{
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
              color: '#cf0000',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>{grenade}</span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#cf0000',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Grenade</span>
          </div>
          <img 
            src={grenade === 'Amethyst Blast' ? '/Amethyst Blast.png' : grenade === 'Void Grenade' ? '/Void Grenade.png' : '/Blank Card.png'}
            alt={grenade}
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
            <span style={{ color: '#990000  ', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
              Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (sheet?.subclassProgressionDots?.grenadierAttackCooldownDots?.filter(Boolean).length || 0)}]</span>
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
              {generateGrenadierSecondaryAttackStatsJSX(
                sheet?.subclassProgressionDots?.grenadierAttackDamageDots,
                sheet?.subclassProgressionDots?.grenadierAttackCritDots,
                sheet?.subclassProgressionDots?.grenadierAttackCooldownDots,
                sheet?.subclassProgressionDots?.grenadierAttackAoEDots,
                grenade,
                grenade === 'Amethyst Blast' ? 220 : grenade === 'Void Grenade' ? 200 : undefined
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
            {grenade === 'Amethyst Blast' ? (
              <>
                “Good gods… when one of these things hits true, it creates chaos on the battlefield… pure chaos.”<br />
                --Fretta di Boom, Secessionist Grenadier.
              </>
            ) : grenade === 'Void Grenade' ? '“These bad boys pack a gravitational pull that will suck you straight back into the void where you came from.” --Gerry Horseshoes, Defteran Grenadier' : 'Grenade effect.'}
          </div>
        </div>
      ))}
      {/* Necro Chem Zombie Secondary Attack Cards */}
      {sheet?.subclass === 'Necro' && Array.isArray(sheet?.chemZombies) && sheet.chemZombies.length > 0 && sheet.chemZombies.map((chemZombie, idx) => (
        <div key={chemZombie + idx} style={{
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
              color: '#0033cf',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100% - 87px)',
              minWidth: 0,
              flexShrink: 1,
              marginRight: '5px'
            }}>{chemZombie}</span>
            <span style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.75em',
              color: '#0033cf',
              lineHeight: 1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'anywhere',
              maxWidth: '72px',
              display: 'inline-block',
              textAlign: 'right'
            }}>Chem Zombie</span>
          </div>
          <img 
            src={`/${chemZombie}.png`}
            alt={chemZombie}
            style={{
              position: 'absolute',
              top: 35,
              left: 10,
              right: 10,
              width: 'calc(100% - 20px)',
              height: 'calc(50% - 55px)',
              objectFit: 'cover',
              borderRadius: 6
            }}
          />
          
          {/* Secondary Attack Label and Cooldown */}
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
              Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (sheet?.subclassProgressionDots?.necroAttackCooldownDots?.filter(Boolean).length || 0)}]</span>
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
              {generateNecroSecondaryAttackStatsJSX(
                sheet?.subclassProgressionDots?.necroAttackSpeedDots,
                sheet?.subclassProgressionDots?.necroAttackDamageDots,
                sheet?.subclassProgressionDots?.necroAttackCritDots,
                sheet?.subclassProgressionDots?.necroAttackCooldownDots,
                chemZombie,
                chemZombie === 'Synthetic Corpse' ? 200 : 0
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
            {chemZombie === 'Synthetic Corpse' ? '"Damn things just materialize out of the unholy chemical amalgamations the necro concocts. Stuff of nightmares, it is." --Vendrix, Human Lab Assistant' : 'Chem Zombie effect.'}
          </div>
        </div>
      ))}
    </>
  );
};
