import React, {FC} from 'react';
import {View} from 'react-native';
import Constants from '../../utils/constants';

const Tail: FC<any> = props => {
  let tailList = props.elements.map((el: any, idx: any) => {
    return (
      <View
        key={idx}
        style={{
          width: props.size,
          height: props.size,
          position: 'absolute',
          left: el[0] * props.size,
          top: el[1] * props.size,
          backgroundColor: 'blue',
        }}
      />
    );
  });

  return (
    <View
      style={{
        width: Constants.GRID_SIZE * props.size,
        height: Constants.GRID_SIZE * props.size,
      }}>
      {tailList}
    </View>
  );
};

export default Tail;
