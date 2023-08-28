import React from "react"
import { View, Image } from "react-native"
import Animated, { interpolate, useAnimatedStyle, withTiming } from "react-native-reanimated";

import cardBack from "../../../assets/images/card-back.png"

import styles from "./Card.style"


const Card = React.memo(({ card, disabled, onCardPress }) => {

    // Calculate the animated style for the front side of the card
    const frontAnimatedStyle = useAnimatedStyle(() => {

        // Interpolate the animated value to create a card flip effect
        const spinVal = interpolate(card.animatedValue.value, [0, 1], [180, 0])
        return {
            transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
            ],
        };
    }, [card.animatedValue]);


    // Calculate the animated style for the back side of the card
    const backAnimatedStyle = useAnimatedStyle(() => {

        // Interpolate the animated value to create a card flip effect
        const spinVal = interpolate(card.animatedValue.value, [0, 1], [360, 180])
        return {
            transform: [
                {
                    rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
                },
            ],
        };
    }, [card.animatedValue]);


    // Handle touch event when the card is pressed
    const handleTouch = () => {

        // Check if the card is not disabled and not flipped
        if (!disabled && card.animatedValue.value === 0) {

        // Call the provided onCardPress function to handle card press
        onCardPress(card);
       }
    }


    return (
        <View style={styles.card} onTouchEnd={handleTouch}>
            <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
                <Image source={card.path} style={styles.cardImage} />
            </Animated.View>
            <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
                <Image source={cardBack} style={styles.cardImage} />
            </Animated.View>
        </View>
    )
})

export default Card