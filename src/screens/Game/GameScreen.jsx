import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, Switch, BackHandler } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { useSharedValue } from "react-native-reanimated";

import usePreventBackNavigation from "../../hooks/usePreventBackNavigation"
import { useCountdown, handleCardComparison, handleVictory, handleGameOver } from "../../utils/GameLogic"
import AudioController from '../../utils/AudioController'

import cardImages from "../../constants/images"
import icons from "../../constants/icons"

import Card from "../../components/Card/Card"
import Button from "../../components/Button/Button"

import { COLORS } from "../../constants"

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

    // Destructuring assignment to capture values returned by the useCountdown hook
    const [
        counter,
        startCounter,
        stopCounter,
        pauseCounter,
        resumeCounter
    ] = useCountdown({ level: level, callback: (currentCounter) => console.log('current counter:', currentCounter) })


    // Use game logic to control the animation of individual cards

    // Create an array of animated values, one for each card image
    const animatedValues = duplicatedcardImagesArray.map(() => useSharedValue(0))

    // Create an array of objects, each representing a card with its corresponding animated value
    const animatedCards = duplicatedcardImagesArray.map((card, index) => ({
        ...card,
        animatedValue: animatedValues[index],
    }))


    // State variables to track game progress and state
    const [cards, setCards] = useState([])
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)
    const [matchedCards, setMatchedCards] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [totalFlips, setTotalFlips] = useState(0)
    const [gameEnd, setGameEnd] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [muted, setMuted] = useState(false)



    // START GAME
    useEffect(() => {

        // Add an event listener to start the game when the screen gets focused
        const onFocus = navigation.addListener('focus', () => {

            // Start playing background music
            audioController.playBgMusic();

            // Set gameEnd to false, shuffle cards, reset turn and start countdown
            setGameEnd(false)
            shuffleCards();
            resetTurn();
            startCounter();

            // Add an event listener to stop background music when the screen loses focus
            const onBlur = navigation.addListener('blur', () => audioController.stopBgMusic())

            return () => {

                // Clean up the event listeners
                onFocus()
                onBlur()

                // Stop the countdown
                stopCounter();
            }
        })
    }, []);


    // CARD COMPARISON
    useEffect(() => {

        // Compare cards and handle game logic using the handleCardComparison function
        handleCardComparison(firstCard, secondCard, setDisabled, audioController, setMatchedCards, resetTurn);

    }, [firstCard, secondCard]);


    // GAME OVER
    useEffect(() => {

        // Check for game over condition and navigate to game over screen
        handleGameOver(counter, level, totalFlips, gameEnd, stopCounter, navigation);

    }, [counter, totalFlips, gameEnd]);


    // VICTORY
    useEffect(() => {

        // Check for victory condition and navigate to victory screen
        handleVictory(matchedCards, cardImagesArray.length, setGameEnd, stopCounter, navigation);

    }, [matchedCards]);



    // Reset the turn after a pair of cards is compared
    const resetTurn = () => {
        setFirstCard(null)
        setSecondCard(null)
        setDisabled(false)
    }


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


    // Toggle modal visibility
    const toggleModal = () => {

        // Toggle the modal visibility
        setModalVisible(!modalVisible);

        // Pause or resume countdown based on modal visibility
        if (!modalVisible) pauseCounter()
        else resumeCounter()
    };


    // Toggle the mute state
    const toggleMute = () => setMuted(!muted)

    // Control audio playback based on the 'muted' state
    useEffect(() => {

        // If not muted, play background music
        if (!muted) {
            audioController.playBgMusic()
        }

        // Clean up function to stop background music when component unmounts or 'muted' changes
        return () => audioController.stopBgMusic()
        
    }, [muted])


    // Allow for the start of a new game by navigating to the "Levels" screen
    const startNewGame = () => navigation.navigate("Levels");


    // Navigate back to the "Home" screen
    const navigateHome = () => navigation.navigate("Home");


    // Exit the game and close the app (only works on Android)
    const exitGame = () => BackHandler.exitApp()



    return (
        <View style={styles.container}>

            {/* OPEN MODAL */}
            <View style={styles.gearIconWrapper}>
                <TouchableOpacity onPress={toggleModal} style={styles.iconContainer}>
                    <Image source={icons.gearIcon} resizeMode="cover" style={styles.icon("80%")} />
                </TouchableOpacity>
            </View>


            {/* MODAL */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modal}>

                    <View style={styles.modalWrapper}>

                        <View style={styles.closeButtonWrapper}>
                            <TouchableOpacity onPress={toggleModal} style={styles.iconContainer}>
                                <Image source={icons.close} resizeMode="cover" style={styles.icon("60%")} />
                            </TouchableOpacity>
                        </View>

                        {/* Modal content */}
                        <View style={styles.modalContent}>

                            <View style={styles.switchContainer}>
                                <Text style={styles.switchText}>Music: {!muted ? 'ON' : 'OFF'}</Text>
                                <Switch
                                    value={!muted}
                                    onValueChange={toggleMute}
                                    trackColor={{ true: COLORS.light, false: 'gray' }}
                                    thumbColor={!muted ? COLORS.primary : 'gray'}
                                    style={styles.switch}
                                />
                            </View>

                            <Button theme="default" text="New Game" handlePress={startNewGame} />
                            <Button theme="default" text="Home" handlePress={navigateHome} />
                            <Button theme="default" text="Exit" handlePress={exitGame} />
                        </View>
                    </View>
                </View>
            </Modal>


            {/* GAME INFO */}
            <View style={styles.gameInfoContainer}>
                <Text style={styles.gameInfoText}>Time: {counter}</Text>
                <Text style={styles.gameInfoText}>Flips: {totalFlips}</Text>
            </View>


            {/* CARDS */}
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
        </View>
    )
}


export default GameScreen