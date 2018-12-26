import React, {Component} from 'react';
import {StyleSheet, View, PanResponder, Animated, Dimensions, Text} from 'react-native';
import Card from '../../src/components/Card';
const screenWidth = Dimensions.get("window").width;

interface ISwipeCard {
    color: string;
    order: number;
}
interface StateSwipeCard {
    cards: ISwipeCard[]
    opacity: number
}
export default class SwipeCard extends Component<{}, StateSwipeCard> {
    state = {
        opacity: 1,
        cards: [
            {
                id: 1,
                color: '#65c0d4',
                order: 1,
            },
            {
                id: 2,
                color: '#73a599',
                order: 2,
            },
            {
                id: 3,
                color: '#d48d65',
                order: 3,
            },
            {
                id: 4,
                color: '#7375a5',
                order: 4,
            },
        ]
    }
    translateX = new Animated.Value(0);

    _panResponder = PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderMove: Animated.event([null, {dx: this.translateX}]),

        onPanResponderRelease: (e, {vx, dx}) => {
            // if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
            //     console.log(vx);
            //     // Animated.timing(this.translateX, {
            //     //     toValue: dx > 0 ? screenWidth : -screenWidth,
            //     //     duration: 200,
            //     //     useNativeDriver: true
            //     //     }).start();
            // } else {
            //     console.log(vx);
            //     // Animated.spring(this.translateX, {
            //     //     toValue: 0,
            //     //     bounciness: 10,
            //     //     useNativeDriver: true
            //     // }).start();
            // }
        }
    });

    get cards() {
        const cards = [...this.state.cards];
        cards.sort((a, b) => {
            return a.order - b.order;
        });
        return cards;
    }

    get lengthIndex() {
        return this.cards.length - 1;
    }

    scale(index: number) {
        return 1 - (0.1 * (this.lengthIndex - index));
    }

    componentWillMount() {
        this.translateX.addListener(({ value }) => {
            const percentPan = Math.abs(value) / (screenWidth / 1.5) * 100;
            const opacity = 1 - percentPan / 100 * 1;
            this.setState({
                opacity,
            });
        });
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <View style={styles.container}>
                    <View style={{
                        flex: 1,
                        top: -50
                    }}>
                        {
                            this.cards.map(({id, color}, i) =>
                                <Card
                                    key={id}
                                    color={color}
                                    order={i}
                                    opacity={i === this.cards.length - 1 ? this.state.opacity : 1}
                                    scale={this.scale(i)} />
                            )
                        }
                    </View>
                </View>
                <View
                    style={styles.swipeView}
                    {...this._panResponder.panHandlers} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    swipeView: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
});
