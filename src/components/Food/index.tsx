import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';

const Food: FC<any> = props => {
  const x = props.position[0];
  const y = props.position[1];
  return (
    <View
      style={[
        styles.finger,
        {
          width: props.size,
          height: props.size,
          left: x * props.size,
          top: y * props.size,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  finger: {
    backgroundColor: 'purple',
    position: 'absolute',
  },
});
export default Food;
