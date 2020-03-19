import React, {FC, PureComponent, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {heightRatio, widthRatio} from '../../utils/styleSheet';
import styleGuide from '../../utils/styleGuide';
import Constants from '../../utils/constants';
import Images from '../../assets/Images';

const GameOver: FC<any> = props => {
  const [state, setState]: [any, any] = useState({
    animatedValue: new Animated.Value(0),
    animatedValue2: new Animated.Value(0),
  });

  useEffect(() => {
    const animate = () => {
      state.animatedValue.setValue(0);
      state.animatedValue2.setValue(0);
      Animated.parallel([
        Animated.timing(state.animatedValue, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(state.animatedValue2, {
          toValue: 1,
          duration: 1000,
        }),
      ]).start();
    };

    animate();
  }, [state.animatedValue, state.animatedValue2]);

  return (
    <Animated.View>
      <View style={styles.clearScreen}>
        <View style={styles.clearedLevelContainer}>
          <Text style={styles.clearedLevelText}>Level</Text>
          <Text style={styles.clearedLevelText}>{props.level}</Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Game Over</Text>
          <Text style={styles.panelText}>Score: {props.score}</Text>

          <View style={styles.panelButtonsContainer}>
            <TouchableWithoutFeedback onPress={props.onReset}>
              <View style={styles.panelButton}>
                <Image
                  style={styles.panelButtonIcon}
                  resizeMode="contain"
                  source={Images.restartIcon}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gameOverContainer: {
    flex: 1,
    alignItems: 'center',
  },
  animatedCard: {
    width: widthRatio * 260,
    height: heightRatio * 200,
    padding: heightRatio * 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    ...styleGuide.bigShadow,
  },
  gameOverText: {
    fontSize: heightRatio * 30,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: heightRatio * 20,
  },
  container: {
    height: heightRatio * 30,
    width: widthRatio * 100,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    backgroundColor: styleGuide.primaryColor,
  },
  shadow: {
    ...styleGuide.bigShadow,
  },
  textStyle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  clearScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  clearedLevelContainer: {
    width: Constants.YR * 250,
    height: Constants.YR * 250,
    borderRadius: Constants.YR * 125,
    backgroundColor: '#ff1a1a',
    borderWidth: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  clearedLevelText: {
    fontSize: 45,
    color: 'white',
  },
  panel: {
    backgroundColor: '#29aecc',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Constants.YR * 350,
    height: Constants.YR * 200,
    marginTop: Constants.YR * -40,
  },
  panelTitle: {
    fontSize: 45,
    color: 'black',

    textShadowColor: 'white',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  panelText: {
    fontSize: 31,
    color: 'white',

    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    marginBottom: Constants.YR * 50,
  },
  panelButtonsContainer: {
    position: 'absolute',
    height: Constants.YR * 80,
    bottom: Constants.YR * -40,
    alignItems: 'center',
    justifyContent: 'center',
    width: Constants.YR * 350,
    flexDirection: 'row',
  },
  panelButton: {
    width: Constants.YR * 80,
    height: Constants.YR * 80,
    borderRadius: Constants.YR * 40,
    backgroundColor: '#ff1a1a',
    borderWidth: 5,
    borderColor: 'white',
    marginLeft: Constants.XR * 15,
    marginRight: Constants.XR * 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelButtonIcon: {
    width: Constants.YR * 35,
    height: Constants.YR * 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GameOver;
