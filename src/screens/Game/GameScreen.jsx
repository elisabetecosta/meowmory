import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { initializeGameState } from "../../utils/InitialGameState"

import styles from "./GameScreen.style"
import Card from "../../components/Card/Card"

import card01 from "../../../assets/images/card-01.png"

const GameScreen = ({ state }) => {

    // Define the effect to be run when the component is mounted
    useEffect(() => {

        // Initialize state using the utility function
        setState(initializeGameState())
    }, [state])

    return (
        <View style={styles.container}>

            {/* Render game info */}
            <Text id="time-remaining">{state.timeRemaining}</Text>
            <Text id="flips">{state.totalClicks}</Text>

            {/* Render game board with all the cards */}
            <View style={styles.cardContainer}>
                {state.cardsArray.map(card => card)}
            </View>

            {/* Render game over screen */}
            {state.gameOverVisible && <GameOverScreen />}

            {/* Render victory screen */}
            {state.victoryVisible && <VictoryScreen />}


            {/* <Card 
                imagePath={card01}
                isFrontVisible={true}
                onCardPress={() => console.log("clicked")}
            /> */}
        </View>
    )
}

export default GameScreen