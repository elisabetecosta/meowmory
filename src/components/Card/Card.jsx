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

const Card = ({ card, frontAnimatedStyle, backAnimatedStyle, flipped, matched, onCardPress }) => {

    // const spin = useSharedValue(0);
//     const frontSpin = useSharedValue(1);
//     const backSpin = useSharedValue(0);


//     const frontAnimatedStyle = useAnimatedStyle(() => {
//         return {
//             transform: [{ rotateY: `${frontSpin.value}deg` }],
//         };
//     });

//     const backAnimatedStyle = useAnimatedStyle(() => {
//         return {
//             transform: [{ rotateY: `${backSpin.value}deg` }],
//         };
//     });


//     const handleCardPress = () => {
//       if (!card.matched && !flipped) {
//           if (frontSpin.value === 1) {
//               // Flip the card
//               frontSpin.value = withSpring(0, { damping: 8, stiffness: 10 });
//               backSpin.value = withSpring(180, { damping: 8, stiffness: 10 });
              
//               onCardPress(card.id);
//           } else {
//               // Unflip the card
//               frontSpin.value = withSpring(180, { damping: 8, stiffness: 10 });
//               backSpin.value = withSpring(360, { damping: 8, stiffness: 10 });
//           }
//       }
//   };
    

    // const frontAnimatedStyle = useAnimatedStyle(() => {
    //     const spinVal = interpolate(spin.value, [0, 1], [180, 0]);
    //     return {
    //       transform: [
    //         {
    //           rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
    //         },
    //       ],
    //     };
    //   }, []);


    //   const backAnimatedStyle = useAnimatedStyle(() => {
    //     const spinVal = interpolate(spin.value, [0, 1], [360, 180]);
    //     return {
    //       transform: [
    //         {
    //           rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
    //         },
    //       ],
    //     };
    //   }, []);


      const handleCardPress = () => {

      //   if (!card.matched && spin.value === 0) {
      //     spin.value = 1; // Flip the card
          onCardPress(card.id);
      //   }
      }


    return (
      // flipped || matched ? styles.flipped : null
        <View onTouchEnd={handleCardPress}>
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