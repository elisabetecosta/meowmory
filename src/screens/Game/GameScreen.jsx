import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { initializeGameState } from "../../utils/InitialGameState"

import GameOverScreen from "../GameOver/GameOverScreen"
import VictoryScreen from "../Victory/VictoryScreen"

import styles from "./GameScreen.style"
import Card from "../../components/Card/Card"

import card01 from "../../../assets/images/card-01.png"

const GameScreen = ({ route }) => {

    // Extract the logic component from the route
    const { logic } = route.params

    // Initialize state using the logic component
    useEffect(() => {
        logic.setState(initializeGameState());
    }, [logic])

    return (
        <View style={styles.container}>

            {/* Render game info */}
            <Text id="time-remaining">{logic.state.timeRemaining}</Text>
            <Text id="flips">{logic.state.totalClicks}</Text>

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
}

export default GameScreen