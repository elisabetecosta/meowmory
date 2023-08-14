import * as React from "react"
import { View, Text } from "react-native"

import styles from "./GameScreen.style"
import Card from "../../components/Card/Card"

import card01 from "../../../assets/images/card-01.png"

const GameScreen = () => {

    return (
        <View style={styles.container}>
            <Card 
                src={card01}
            />
        </View>
    )
}

export default GameScreen