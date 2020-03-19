import React, {FC} from 'react';
import {Image, View} from 'react-native';
import Images from '../../assets/Images';

const Pipe: FC<any> = props => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  const pipeRatio = 160 / width;
  const pipeHeight = 33 * pipeRatio;
  const pipeIterations = Math.ceil(height / pipeHeight);

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        overflow: 'hidden',
        flexDirection: 'column',
      }}>
      {Array.apply(null, Array(pipeIterations)).map((el, idx) => {
        return (
          <Image
            style={{width: width, height: pipeHeight}}
            key={idx}
            resizeMode="stretch"
            source={Images.pipeCore}
          />
        );
      })}
    </View>
  );
};

export default Pipe;
