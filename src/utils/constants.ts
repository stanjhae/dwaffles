import {widthRatio} from './styleSheet';
import {Dimensions} from 'react-native';

const Constants = {
  TOP_PIPE_WIDTH: widthRatio * 50,
  BOTTOM_PIPE_WIDTH: widthRatio * 50,
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  GAP_SIZE: 200, // gap between the two parts of the pipe
  GRID_SIZE: 20,
  CELL_SIZE: 40,
  PIPE_WIDTH: 100,
  XR: Dimensions.get('screen').width / 650,
  YR: Dimensions.get('screen').height / 1024,
};
export default Constants;
