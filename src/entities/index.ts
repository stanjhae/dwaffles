import Plane from '../components/Plane';
import Matter from 'matter-js';
import Floor from '../components/Floor';
import Ceiling from '../components/Ceiling';
import {height, width, heightRatio, widthRatio} from '../utils/styleSheet';
import Obstacle from '../components/Obstacle';
import Poop from '../components/Poops';

import {
  getRandom,
  topObstacleHeight,
  bottomObstacleHeight,
} from '../utils/random';
import Constants from '../utils/constants';

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

const restart: any = () => {
  //-- Cleanup existing entities..
  // if (restart) {
  //   Matter.Engine.clear(restart.physics.engine);
  // }

  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  world.gravity.y = 0.2;

  return {
    physics: {engine: engine, world: world},
    Plane: Plane(
      world,
      'pink',
      {x: width / 2, y: height / 2},
      {height: heightRatio * 50, width: widthRatio * 70},
    ),
    Floor: Floor(
      world,
      'white',
      {x: width / 2, y: height - heightRatio * 40},
      {height: heightRatio * 90, width: width},
    ),
    Ceiling: Ceiling(
      world,
      'white',
      {x: width / 2, y: 70},
      {height: heightRatio * 70, width: width},
    ),
    // Obstacle1: Obstacle(
    //   world,
    //   'top',
    //   {
    //     x: width * 2 - Constants.TOP_PIPE_WIDTH / 2,
    //     y: getRandom(heightRatio * 100, heightRatio * 300),
    //   },
    //   {height: topObstacleHeight, width: Constants.TOP_PIPE_WIDTH},
    // ),
    // Obstacle2: Obstacle(
    //   world,
    //   'bottom',
    //   {
    //     x: width * 3 - Constants.BOTTOM_PIPE_WIDTH / 2,
    //     y: getRandom(heightRatio * 300, heightRatio * 500),
    //   },
    //   {height: bottomObstacleHeight, width: Constants.BOTTOM_PIPE_WIDTH},
    // ),
    Poop1: Poop(
      world,
      'white',
      {x: getRandom(width / 5, width / 3), y: 70},
      {height: heightRatio * 30, width: width / 10},
      0.1,
    ),
    Poop2: Poop(
      world,
      'white',
      {x: getRandom(width / 5, width / 3), y: 70},
      {height: heightRatio * 30, width: width / 10},
      0.01,
    ),
    Poop3: Poop(
      world,
      'white',
      {x: getRandom(width / 5, width / 3), y: 70},
      {height: heightRatio * 30, width: width / 10},
      0.02,
    ),
    Poop4: Poop(
      world,
      'white',
      {x: getRandom(width / 5, width / 3), y: 70},
      {height: heightRatio * 30, width: width / 10},
      0.03,
    ),
    Poop5: Poop(
      world,
      'white',
      {x: getRandom(width / 5, width / 3), y: 70},
      {height: heightRatio * 30, width: width / 10},
      0.04,
    ),
    Poop6: Poop(
      world,
      'white',
      {x: getRandom(width / 5, width / 3), y: 70},
      {height: heightRatio * 30, width: width / 10},
      0.05,
    ),
  };
};

export default restart;
