import React, {FC, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Systems from './src/systems';
import GameOver from './src/components/GameOver';
import FastImage from 'react-native-fast-image';
import Matter from 'matter-js';
import Constants from './src/utils/constants';
import Floor from './src/components/Floor';
import Bird from './src/components/Bird';
import Images from './src/assets/Images';
import Head from './src/components/Head';
import Food from './src/components/Food';
import Tail from './src/components/Tail';

let gameEngine: any = null;

export const randomBetween = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generatePipes = () => {
  let topPipeHeight = randomBetween(100, Constants.MAX_HEIGHT / 2 - 100);
  let bottomPipeHeight =
    Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};
const App: FC<any> = () => {
  const [settings, setSettings]: [any, any] = useState({
    running: true,
    score: 0,
  });

  const onEvent = (e: any) => {
    if (e.type === 'game-over') {
      setSettings({running: false});
    } else if (e.type === 'score') {
      setSettings({
        ...settings,
        score: settings.score + 1,
      });
    }
  };

  const restart = () => {
    setSettings({running: true, score: 0});
    gameEngine.swap(setupWorld());
  };

  const setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;
    world.gravity.y = 0.0;
    let bird = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      50,
      50,
    );

    let floor1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      {isStatic: true},
    );

    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      {isStatic: true},
    );

    Matter.World.add(world, [bird, floor1, floor2]);

    return {
      physics: {engine: engine, world: world},
      floor1: {body: floor1, renderer: Floor},
      floor2: {body: floor2, renderer: Floor},
      bird: {body: bird, pose: 1, renderer: Bird},
      head: {
        position: [0, 0],
        xspeed: 1,
        yspeed: 0,
        nextMove: 10,
        updateFrequency: 10,
        size: 20,
        renderer: Head,
      },
      food: {
        position: [
          randomBetween(0, Constants.GRID_SIZE - 1),
          randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: 20,
        renderer: Food,
      },
      tail: {size: 20, elements: [], renderer: Tail},
    };
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FastImage style={styles.backgroundImage} source={Images.background} />
      <GameEngine
        ref={ref => {
          gameEngine = ref;
        }}
        onEvent={onEvent}
        style={styles.gameContainer}
        running={settings.running}
        systems={Systems}
        entities={setupWorld()}
      />
      {/*<View style={styles.controls}>*/}
      {/*  <View style={styles.controlRow}>*/}
      {/*    <TouchableOpacity*/}
      {/*      onPress={() => {*/}
      {/*        gameEngine.dispatch({type: 'move-up'});*/}
      {/*      }}>*/}
      {/*      <View style={styles.control} />*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}
      {/*  <View style={styles.controlRow}>*/}
      {/*    <TouchableOpacity*/}
      {/*      onPress={() => {*/}
      {/*        gameEngine.dispatch({type: 'move-left'});*/}
      {/*      }}>*/}
      {/*      <View style={styles.control} />*/}
      {/*    </TouchableOpacity>*/}
      {/*    <View style={{...styles.control, backgroundColor: 'transparent'}} />*/}
      {/*    <TouchableOpacity*/}
      {/*      onPress={() => {*/}
      {/*        gameEngine.dispatch({type: 'move-right'});*/}
      {/*      }}>*/}
      {/*      <View style={styles.control} />*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}
      {/*  <View style={styles.controlRow}>*/}
      {/*    <TouchableOpacity*/}
      {/*      onPress={() => {*/}
      {/*        gameEngine.dispatch({type: 'move-down'});*/}
      {/*      }}>*/}
      {/*      <View style={styles.control} />*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}

      {/*</View>*/}
      <TouchableOpacity style={styles.newGame} onPress={restart}>
        <Text>New Game</Text>
      </TouchableOpacity>

      <Text style={styles.score}>{settings.score}</Text>
      {!settings.running && <GameOver restart={restart} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    flex: 1,
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: Constants.MAX_WIDTH / 2 - 20,
    textShadowColor: '#444444',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    // fontFamily: '04b_19',
  },
  controls: {
    width: 300,
    position: 'absolute',
    bottom: '5%',
    flexDirection: 'column',
  },
  controlRow: {
    height: 100,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  newGame: {
    position: 'absolute',
    bottom: '5%',
  },
});
export default App;
