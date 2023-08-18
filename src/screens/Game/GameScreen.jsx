import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { useGameContext } from '../../context/GameContext'

import GameOverScreen from "../GameOver/GameOverScreen"
import VictoryScreen from "../Victory/VictoryScreen"

import styles from "./GameScreen.style"
import Card from "../../components/Card/Card"

import card01 from "../../../assets/images/card-01.png"

const GameScreen = () => {

    const { gameState, startGame } = useGameContext();

    // useEffect(() => {
    //     startGame();
    // }, []);

    return (
        <View style={styles.container}>

            {/* Render game info */}
            <Text>{gameState.timeRemaining}</Text>
            <Text>{gameState.totalClicks}</Text>

            {/* Render game board with all the cards */}
            <View style={styles.cardContainer}>
                {gameState.cardsArray.map(card => card)}
            </View>

            {/* Render game over screen */}
            {gameState.gameOverVisible && <GameOverScreen />}

            {/* Render victory screen */}
            {gameState.victoryVisible && <VictoryScreen />}


            {/* <Card 
                imagePath={card01}
                isFrontVisible={true}
                onCardPress={() => console.log("clicked")}
            /> */}
        </View>
    )
}

export default GameScreen