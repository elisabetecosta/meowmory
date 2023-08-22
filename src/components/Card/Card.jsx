import React from "react"
import { View, Image } from "react-native"
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";


import cardBack from "../../../assets/images/card-back.png"
import styles from "./Card.style"

const Card = ({ card, flipped, matched, onCardPress }) => {

    const spin = useSharedValue(0);
    

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [180, 0]);
        return {
          transform: [
            {
              rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
            },
          ],
        };
      }, []);


      const backAnimatedStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [360, 180]);
        return {
          transform: [
            {
              rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
            },
          ],
        };
      }, []);


      const handleCardPress = () => {

        if (!card.matched && spin.value === 0) {
          spin.value = 1; // Flip the card
          onCardPress(card.id);
        }
      }


    return (
      // flipped || matched ? styles.flipped : null
        <View>
            <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
                <Image source={card.path} style={styles.cardImage} />
            </Animated.View>
            <Animated.View onTouchEnd={handleCardPress} style={[styles.cardBack, backAnimatedStyle]}>
                <Image source={cardBack} style={styles.cardImage} />
            </Animated.View>
        </View>
    )
}

export default Card