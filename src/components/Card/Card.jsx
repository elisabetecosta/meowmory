import React from "react"
import { View, Image } from "react-native"

import cardBack from "../../../assets/images/card-back.png"
import styles from "./Card.style"

const Card = ({ imageSrc, isFrontVisible, isMatched, onCardPress }) => {

    return (

        <View
            style={[
                styles.card,
                isMatched,
                isFrontVisible && styles.visible,
            ]}
            onTouchEnd={onCardPress}
        >
            <View style={styles.cardFace}>
                {isFrontVisible ? (
                    <Image source={imageSrc} style={styles.cardImage} />
                ) : (
                    <Image source={cardBack} style={[styles.cardImage, styles.cardBack]} />
                )}
            </View>
        </View>
    )
}

export default Card