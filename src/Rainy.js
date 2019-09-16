import React, { Component } from 'react';
import { View, PixelRatio, Dimensions, Animated } from 'react-native';

import rainDrop from './images/rain_drop.png';

const { width, height } = Dimensions.get('window');
const rainSize = 80;

class MakeItRain extends Component {
  state = {
    rainAnimationArray: [],
    rainSpeedArray: [],
    rainXPosArray: []
  };

  componentWillMount() {
    let speedArray = [];
    for (let i = 0; i < rainSize; i++) {
      let speed = Math.floor(Math.random() * 100) + 500;
      speedArray.push(speed);
      this.setState({ rainSpeedArray: speedArray });
    }

    let posArray = [];
    for (let i = 0; i < rainSize; i++) {
      let xPositionRain = Math.floor(Math.random() * width);
      posArray.push(xPositionRain);
      this.setState({ rainXPosArray: posArray });
    }

    let animationArray = [];
    for (let i = 0; i < rainSize; i++) {
      let animatedValue = new Animated.Value(0);
      animationArray.push(animatedValue);
      this.setState({ rainAnimationArray: animationArray });
    }
  }

  componentDidMount() {
    for (let i = 0; i < rainSize; i++) {
      this.startRainAnimation(i);
    }
  }

  startRainAnimation = i => {
    Animated.timing(this.state.rainAnimationArray[i], {
      toValue: height + 40,
      duration: this.state.rainSpeedArray[i],
      delay: Math.floor(Math.random() * 700) + 200
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(this.state.rainAnimationArray[i], {
          toValue: 0,
          duration: 0,
          delay: Math.floor(Math.random() * 500) + 500
        }).start(() => {
          this.startRainAnimation(i);
        });
      }
    });
  };

  renderRains = () => {
    if (this.state.rainXPosArray.length > 0) {
      return this.state.rainXPosArray.map((i, index) => (
        <Animated.Image
          key={i + Math.random() * 1000}
          source={rainDrop}
          style={[
            {
              position: 'absolute',
              top: -40,
              left: i,
              width: this.props.isRaining
                ? PixelRatio.getPixelSizeForLayoutSize(12)
                : 0,
              height: PixelRatio.getPixelSizeForLayoutSize(12),
              resizeMode: 'contain',
              zIndex: 1000
            },
            {
              transform: [{ translateY: this.state.rainAnimationArray[index] }]
            }
          ]}
        />
      ));
    }
  };

  render() {
    return (
      <View style={{ flex: 1, position: 'absolute', left: 0, top: 0 }}>
        {this.renderRains()}
      </View>
    );
  }
}

export default MakeItRain;
