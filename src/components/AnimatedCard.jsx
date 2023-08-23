import React from "react"
import { View, Image, Animated } from "react-native"

import cardBack from "../../assets/images/card-back.png"
import card01 from "../../assets/images/card-01.png"

import styles from "./AnimatedCard.style"

class AnimatedCard extends React.Component {

    constructor(props) {

        super(props)


        this.animatedValue = new Animated.Value(0)

        this.animatedValue.addListener(({ value }) => {
            this.value = value
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"],
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ["180deg", "360deg"],
        })

        // Bind the flipCard method to the correct instance
        this.flipCard = this.flipCard.bind(this);

        
    }


    flipCard() {

        if (this.value > 90) {

            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 6,
                tension: 10
            }).start()

        } else {

            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 6,
                tension: 10
            }).start()
        }
    }

    render() {

        const frontAnimatedStyle = {
            transform: [{ rotateY: this.frontInterpolate }]
        }

        const backAnimatedStyle = {
            transform: [{ rotateY: this.backInterpolate }]
        }

        return (
            <View onTouchEnd={() => this.flipCard()}>
                <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                    <Image source={card01} style={styles.cardImage} />
                </Animated.View>

                <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                    <Image source={cardBack} style={styles.cardImage} />
                </Animated.View>
            </View>
        )
    }
}

export default AnimatedCard