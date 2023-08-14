import React from "react"
import { View, Image } from "react-native"

import cardBack from "../../../assets/images/card-back.png"
import styles from "./Card.style"

const Card = ({ id, src }) => {

    return (
        <View id={id} style={styles.card}>

            <View style={styles.cardBack}>
                <Image style={styles.cardBackImg} source={cardBack}></Image>
            </View>

            <View style={styles.cardFront}>
                <Image style={styles.cardFrontImg} source={src}></Image>
            </View>
        </View>
    )
}

export default Card