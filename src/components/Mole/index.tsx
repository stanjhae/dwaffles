import React, {FC} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import SpriteSheet from 'rn-sprite-sheet';
import Images from '../../assets/Images';

let mole: any = null;
let actionTimeout: any = null;
let isPopping: any = false;
let isFeisty: any = false;
let isHealing: any = false;
let isWhacked: any = false;
let isAttacking: any = false;

const Mole: FC<any> = props => {
  const pop = () => {
    isWhacked = false;
    isAttacking = false;
    isPopping = true;

    isFeisty = Math.random() < 0.4;
    if (!isFeisty) {
      isHealing = Math.random() < 0.05;
    }

    if (isHealing) {
      mole.play({
        type: 'heal',
        fps: 24,
        onFinish: () => {
          actionTimeout = setTimeout(() => {
            mole.play({
              type: 'hide',
              fps: 24,
              onFinish: () => {
                isPopping = false;
                props.onFinishPopping(props.index);
              },
            });
          }, 1000);
        },
      });
    } else {
      mole.play({
        type: 'appear',
        fps: 24,
        onFinish: () => {
          if (isFeisty) {
            actionTimeout = setTimeout(() => {
              isAttacking = true;
              props.onDamage();
              mole.play({
                type: 'attack',
                fps: 12,
                onFinish: () => {
                  mole.play({
                    type: 'hide',
                    fps: 24,
                    onFinish: () => {
                      isPopping = false;
                      props.onFinishPopping(props.index);
                    },
                  });
                },
              });
            }, 1000);
          } else {
            actionTimeout = setTimeout(() => {
              mole.play({
                type: 'hide',
                fps: 24,
                onFinish: () => {
                  isPopping = false;
                  props.onFinishPopping(props.index);
                },
              });
            }, 1000);
          }
        },
      });
    }
  };

  const whack = () => {
    if (!isPopping || isWhacked || isAttacking) {
      return;
    }

    if (actionTimeout) {
      clearTimeout(actionTimeout);
    }

    isWhacked = true;
    isFeisty = false;

    props.onScore();
    if (isHealing) {
      props.onHeal();
    }

    mole.play({
      type: 'dizzy',
      fps: 24,
      onFinish: () => {
        mole.play({
          type: 'faint',
          fps: 24,
          onFinish: () => {
            isPopping = false;
            props.onFinishPopping(props.index);
          },
        });
      },
    });
  };

  return (
    <View style={{flex: 1}}>
      <SpriteSheet
        ref={(ref: any) => (mole = ref)}
        source={Images.sprites}
        columns={6}
        rows={8}
        // height={200} // set either, none, but not both
        // width={200}
        //width={100}
        width={100}
        animations={{
          idle: [0],
          appear: [1, 2, 3, 4],
          hide: [4, 3, 2, 1, 0],
          dizzy: [36, 37, 38],
          faint: [42, 43, 44, 0],
          attack: [11, 12, 13, 14, 15, 16],
          heal: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        }}
      />
      <TouchableWithoutFeedback
        onPress={whack}
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <View
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Mole;
