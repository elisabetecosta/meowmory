import React from "react"
import { View, Image } from "react-native"

import cardBack from "../../../assets/images/card-back.png"
import styles from "./Card.style"

const Card = ({ dataId, imagePath, isFrontVisible, isMatched }) => {

    return (

        <View
            style={[
                styles.card,
                isMatched,
                isFrontVisible && styles.visible,
            ]}
            // onTouchEnd={onCardPress}
        >
            <View style={styles.cardFace}>
                {isFrontVisible ? (
                    <Image source={imagePath} style={styles.cardImage} />
                ) : (
                    <Image source={cardBack} style={[styles.cardImage, styles.cardBack]} />
                )}
            </View>
        </View>
    )
}

export default Card