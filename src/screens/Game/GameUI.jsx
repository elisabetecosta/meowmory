import React from "react"
import { View, Text } from "react-native"

import Card from "../../components/Card/Card"
import styles from "./GameUI.style"


const GameUI = ({ cards, timeRemaining, totalFlips, disabled, onCardPress }) => {

    return (
        <View style={styles.container}>

            {/* Render game info */}
            <View style={styles.gameInfoContainer}>
                <Text style={styles.gameInfo}>Time: {timeRemaining}</Text>
                <Text style={styles.gameInfo}>Flips: {totalFlips}</Text>
            </View>

            {/* Render game board with all the cards */}
            <View style={styles.cardContainer}>
                {cards.map(card => (

                    <Card
                        key={card.id}
                        card={card}
                        disabled={disabled}
                        onCardPress={() => onCardPress(card)}
                    />
                ))}
            </View>
        </View>
    )
}

export default GameUI