import Matter from 'matter-js';
import Constants from '../utils/constants';
import PipeTop from '../components/PipeTop';
import {generatePipes} from '../../App';

let pipes = 0;

export const resetPipes = () => {
  pipes = 0;
};

export const addPipesAtLocation = (x: any, world: any, entities: any) => {
  let [pipe1Height, pipe2Height] = generatePipes();

  let pipeTopWidth = Constants.PIPE_WIDTH + 20;
  let pipeTopHeight = (pipeTopWidth / 205) * 95;

  pipe1Height = pipe1Height - pipeTopHeight;

  let pipe1Top = Matter.Bodies.rectangle(
    x,
    pipe1Height + pipeTopHeight / 2,
    pipeTopWidth,
    pipeTopHeight,
    {isStatic: true},
  );

  let pipe1 = Matter.Bodies.rectangle(
    x,
    pipe1Height / 2,
    Constants.PIPE_WIDTH,
    pipe1Height,
    {isStatic: true},
  );

  pipe2Height = pipe2Height - pipeTopHeight;

  let pipe2Top = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - 50 - pipe2Height - pipeTopHeight / 2,
    pipeTopWidth,
    pipeTopHeight,
    {isStatic: true},
  );

  let pipe2 = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - 50 - pipe2Height / 2,
    Constants.PIPE_WIDTH,
    pipe2Height,
    {isStatic: true},
  );

  Matter.World.add(world, [pipe1, pipe1Top, pipe2, pipe2Top]);

  entities['pipe' + (pipes + 1)] = {
    body: pipe1,
    renderer: Pipe,
    scored: false,
  };

  entities['pipe' + (pipes + 2)] = {
    body: pipe2,
    renderer: Pipe,
    scored: false,
  };

  entities['pipe' + (pipes + 1) + 'Top'] = {
    body: pipe1Top,
    renderer: PipeTop,
    scored: false,
  };

  entities['pipe' + (pipes + 2) + 'Top'] = {
    body: pipe2Top,
    renderer: PipeTop,
    scored: false,
  };

  pipes += 2;
};
const Pipe = (entities: any, {time}: {time: any}) => {
  if (entities) {
    let engine = entities?.physics?.engine;
    let world = entities?.physics?.world;

    Object.keys(entities).forEach(key => {
      if (key.indexOf('pipe') === 0 && entities.hasOwnProperty(key)) {
        Matter.Body.translate(entities[key].body, {x: -2, y: 0});

        if (
          key.indexOf('Top') !== -1 &&
          parseInt(key.replace('pipe', '')) % 2 === 0
        ) {
          if (
            entities[key].body.position.x <=
            -1 * (Constants.PIPE_WIDTH / 2)
          ) {
            let pipeIndex = parseInt(key.replace('pipe', ''));
            delete entities['pipe' + (pipeIndex - 1) + 'Top'];
            delete entities['pipe' + (pipeIndex - 1)];
            delete entities['pipe' + pipeIndex + 'Top'];
            delete entities['pipe' + pipeIndex];
            //
            // addPipesAtLocation(
            //   Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
            //   world,
            //   entities,
            // );
          }
        }
      } else if (key.indexOf('floor') === 0) {
        if (entities[key].body.position.x <= (-1 * Constants.MAX_WIDTH) / 2) {
          Matter.Body.setPosition(entities[key].body, {
            x: Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
            y: entities[key].body.position.y,
          });
        } else {
          Matter.Body.translate(entities[key].body, {x: -2, y: 0});
        }
      }
    });

    Matter?.Engine?.update(engine, time?.delta);
  }

  return entities;
};

export default Pipe;
