import React from "react"
import { View, Text } from "react-native"

import GameOverScreen from "../GameOver/GameOverScreen"
import VictoryScreen from "../Victory/VictoryScreen"

import styles from "./GameScreen.style"

const GameScreenUI = ({ logic }) => {

    return (
            <View style={styles.container}>

                {/* Render game info */}
                <Text>{logic.state.timeRemaining}</Text>
                <Text>{logic.state.totalClicks}</Text>

                {/* Render game board with all the cards */}
                <View style={styles.cardContainer}>
                    {logic.state.cardsArray.map(card => card)}
                </View>

                {/* Render game over screen */}
                {logic.state.gameOverVisible && <GameOverScreen />}

                {/* Render victory screen */}
                {logic.state.victoryVisible && <VictoryScreen />}


                {/* <Card 
                    imagePath={card01}
                    isFrontVisible={true}
                    onCardPress={() => console.log("clicked")}
                /> */}
            </View>
        )
};

export default GameScreenUI;