// TODO 
// - music is only stopping if the game ends, not when I navigate to a different screen, same thing with timer
// - phone wallpaper dimensions: 1080 width/1920 height 


import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native'
import { useSharedValue } from "react-native-reanimated";

import usePreventBackNavigation from "../../hooks/usePreventBackNavigation"
import { handleCardComparison, handleVictory, handleGameOver } from "../../utils/GameLogic"
import AudioController from '../../utils/AudioController'
import cardImages from "../../constants/images"

import { SafeAreaView, View, Text } from "react-native"

import Card from "../../components/Card/Card"
import styles from "./GameScreen.style"


// Array containing the images for the front of the cards
const cardImagesArray = [
    { name: 'card-01', path: cardImages.card01 },
    { name: 'card-02', path: cardImages.card02 },
    { name: 'card-03', path: cardImages.card03 },
    { name: 'card-04', path: cardImages.card04 },
    { name: 'card-05', path: cardImages.card05 },
    { name: 'card-06', path: cardImages.card06 },
]

// Duplicate the cardImagesArray to create a deck of cards with pairs for matching
const duplicatedcardImagesArray = [...cardImagesArray, ...cardImagesArray]


const GameScreen = ({ route }) => {

    // Extract the selected game level from navigation route
    const { level } = route.params

    // Initialize the audio controller class
    const audioController = new AudioController()

    // Initialize the navigation hook
    const navigation = useNavigation()

    // Prevent back navigation while in the game
    usePreventBackNavigation()


    // Use game logic to control the animation of individual cards

    // Create an array of animated values, one for each card image
    const animatedValues = duplicatedcardImagesArray.map(() => useSharedValue(0))

    // Create an array of objects, each representing a card with its corresponding animated value
    const animatedCards = duplicatedcardImagesArray.map((card, index) => ({
        ...card,
        animatedValue: animatedValues[index],
    }))


    // State variables to track game progress and state
    const [timeRemaining, setTimeRemaining] = useState(60)
    const [totalFlips, setTotalFlips] = useState(0)
    const [cards, setCards] = useState([])
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)
    const [matchedCards, setMatchedCards] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [gameEnd, setGameEnd] = useState(false)


    // START GAME
    useEffect(() => {

        // Add an event listener to start the game when the screen gets focused
        const onFocus = navigation.addListener('focus', () => {

            // Start playing background music
            audioController.playBgMusic();

            // Set timer based on the selected level, shuffle cards and reset turn
            setTimer(level);
            shuffleCards();
            resetTurn();
        })

        // Add an event listener to stop background music when the screen loses focus
        const onBlur = navigation.addListener('blur', () => audioController.stopBgMusic())

        return () => {

            // Clean up the event listeners
            onFocus()
            onBlur()
        }
    }, []);


    // TIMER
    useEffect(() => {

        const countdownInterval = setInterval(() => {

            // Check if the game is not ended
            if (!gameEnd) {

                if (timeRemaining > 0) {

                    // Decrease timeRemaining
                    setTimeRemaining(prevState => prevState - 1)
                } else {

                    // Clear the countdown interval and trigger the handleGameOver function
                    console.log('Countdown reached 0');
                    clearInterval(countdownInterval);

                    handleGameOver(navigation)
                }
            }
        }, 500)

        // Clean up
        return () => clearInterval(countdownInterval)

    }, [gameEnd, timeRemaining]);


    // CARD COMPARISON
    useEffect(() => {

        // Compare cards and handle game logic using the handleCardComparison function
        handleCardComparison(firstCard, secondCard, setDisabled, audioController, setMatchedCards, resetTurn);

    }, [firstCard, secondCard]);


    // GAME OVER
    useEffect(() => {

        // Check for hard level and flips exceeding 16 using the handleGameOver function
        if (level === 'hard' && totalFlips > 16) {

            handleGameOver(navigation);
        }

    }, [totalFlips]);


    // VICTORY
    useEffect(() => {

        // Check for victory condition and navigate to victory screen
        handleVictory(matchedCards, cardImagesArray.length, setGameEnd, navigation);

    }, [matchedCards]);


    // Reset the turn after a pair of cards is compared
    const resetTurn = () => {
        setFirstCard(null)
        setSecondCard(null)
        setDisabled(false)
    }


    // Update the timeRemaining state based on the selected level
    const setTimer = (level) => {

        let timeRemaining = 0;

        if (level === 'easy') timeRemaining = 60;
        if (level === 'medium') timeRemaining = 45;
        if (level === 'hard') timeRemaining = 30;

        setTimeRemaining(timeRemaining)
    };


    // Shuffle the cards for a new game
    const shuffleCards = () => {

        const shuffledCards = animatedCards

            // Sort the animated cards array randomly using a comparison function
            .sort(() => Math.random() - 0.5)

            // Assign a new random 'id' to each card for React's efficient reconciliation
            .map((card) => ({ ...card, id: Math.random() }))

        // Update the 'cards' state with the shuffled cards array
        setCards(shuffledCards)
    };


    // Handle card press (flip)
    const handleCardPress = (card) => {

        // Play flip sound effect
        audioController.playFlipSound();

        // Set the animatedValue of the pressed card to trigger its flipping animation
        card.animatedValue.value = 1

        // If the first card is already flipped, set the secondCard state, else set the firstCard state
        firstCard ? setSecondCard(card) : setFirstCard(card)

        // Update the total flips count by incrementing the previous state value
        setTotalFlips(prevState => prevState + 1)
    };


    return (
        // <GameUI
        //     cards={cards}
        //     timeRemaining={timeRemaining}
        //     totalFlips={totalFlips}
        //     disabled={disabled}
        //     onCardPress={handleCardPress}
        // />
        <SafeAreaView style={styles.container}>

            {/* Render game info */}
            <View style={styles.gameInfoContainer}>
                <Text style={styles.gameInfoText}>Time: {timeRemaining}</Text>
                <Text style={styles.gameInfoText}>Flips: {totalFlips}</Text>
            </View>

            {/* Render game board with all the cards */}
            <View style={styles.cardsContainer}>
                {cards.map(card => (

                    <Card
                        key={card.id}
                        card={card}
                        disabled={disabled}
                        onCardPress={() => handleCardPress(card)}
                    />
                ))}
            </View>
        </SafeAreaView>
    )
};

export default GameScreen