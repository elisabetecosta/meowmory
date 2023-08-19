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

const Card = ({ dataId, imagePath, isFrontVisible, isMatched, onCardPress }) => {

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


    return (

        <View
            onTouchEnd={() => (spin.value = spin.value ? 0 : 1)}
        >
            <Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
                <Image source={imagePath} style={styles.cardImage} />
            </Animated.View>
            <Animated.View style={[styles.cardBack, backAnimatedStyle]}>
                <Image source={cardBack} style={styles.cardImage} />
            </Animated.View>
        </View>

        // <View
        //     style={[
        //         styles.card,
        //         isFrontVisible || isMatched ? styles.visible : null
        //     ]}
        //     onTouchEnd={() => onCardPress(dataId)}
        // >
        //     <View style={styles.cardFace}>
        //         {isFrontVisible || isMatched ? (
        //             <Image source={imagePath} style={styles.cardImage} />
        //         ) : (
        //             <Image source={cardBack} style={[styles.cardImage, styles.cardBack]} />
        //         )}
        //     </View>
        // </View>
    )
}

export default Card