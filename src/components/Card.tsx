import React, {Component} from 'react';
import {StyleSheet, Animated, Dimensions} from 'react-native';

interface PropsCard {
    color: string
    order: number,
    scale: number,
    opacity: number
}
export default class Card extends Component<PropsCard> {
    get topMargin() {
        return (this.props.order - 1) * 30;
    }

    render() {
        return (
            <Animated.View
                style={{
                    ...styles.container,
                    backgroundColor: this.props.color,
                    marginTop: this.topMargin,
                    opacity: this.props.opacity,
                    transform: [
                        // { translateX: this.translateX },
                        { scale: this.props.scale },
                    ],
                    // zIndex: this.props.order == 2 ? 2 : 1
                }} />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '50%',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    position: 'absolute',
    top: '25%',
    left: '5%'
  },
});
