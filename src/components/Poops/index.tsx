import React, {FC} from 'react';
import {array, object, string} from 'prop-types';
import Matter from 'matter-js';
import FastImage from 'react-native-fast-image';

const poop = require('../../assets/poop.png');

const Poops: FC = (props: any) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;
  return (
    <FastImage
      style={[
        {
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
        },
      ]}
      source={poop}
      resizeMode={FastImage.resizeMode.stretch}
    />
  );
};

export default (
  world: any,
  color: any,
  pos: any,
  size: any,
  frictionAir: any,
) => {
  const initialPoops = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {frictionAir: frictionAir},
  );
  Matter.World.add(world, [initialPoops]);

  return {
    body: initialPoops,
    size: [size.width, size.height],
    color: color,
    renderer: <Poops />,
  };
};

Poops.propTypes = {
  size: array,
  body: object,
  color: string,
};
