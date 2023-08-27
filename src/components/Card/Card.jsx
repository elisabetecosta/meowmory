import React from "react"
import { View, Image } from "react-native"
import Animated, { interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";

import cardBack from "../../../assets/images/card-back.png"

import styles from "./Card.style"

const Card = ({ card, disabled, onCardPress }) => {


    const frontAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(card.animatedValue.value, [0, 1], [180, 0])
        return {
            transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
            ],
        };
    }, [card.animatedValue]);


    const backAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(card.animatedValue.value, [0, 1], [360, 180])
        return {
            transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
            ],
        };
    }, [card.animatedValue]);


    const handleTouch = () => {

        if (!disabled && card.animatedValue.value === 0) {

        card.animatedValue.value = 1
        // Flip the card
        onCardPress(card);
       }
    }


    return (
        <View onTouchEnd={handleTouch}>
            <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
                <Image source={card.path} style={styles.cardImage} />
            </Animated.View>
            <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
                <Image source={cardBack} style={styles.cardImage} />
            </Animated.View>
        </View>
    )
}

export default Card