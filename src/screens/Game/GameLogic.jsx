//TODO
// figure out why cards with the same image have different names and paths
// can only flip a card when its on its back and should have a function to flip them back automatically if they are not a match
// make sure that the cards selected are sent to the selectedCards array and no more than 2
// make the match functionality work
// matched cards should be sent to the matchedCards array
// matched cards should remain visible



import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native"
import Card from '../../components/Card/Card';

import GameOverScreen from "../GameOver/GameOverScreen"
import VictoryScreen from "../Victory/VictoryScreen"

import styles from "./GameScreen.style"


// tentar 
//import images from "../../constants"
import card01 from "../../../assets/images/card-01.png"
import card02 from "../../../assets/images/card-02.png"
import card03 from "../../../assets/images/card-03.png"
import card04 from "../../../assets/images/card-04.png"
import card05 from "../../../assets/images/card-05.png"
import card06 from "../../../assets/images/card-06.png"



const GameLogic = ({ route }) => {

    const { level } = route.params

    // Function responsible for initializing the game, needs to stay here
    const initializeGameState = () => {

        return {
            cardsArray: [
                { name: 'card-01', path: card01 },
                { name: 'card-02', path: card02 },
                { name: 'card-03', path: card03 },
                { name: 'card-04', path: card04 },
                { name: 'card-05', path: card05 },
                { name: 'card-06', path: card06 },
                { name: 'card-01', path: card01 },
                { name: 'card-02', path: card02 },
                { name: 'card-03', path: card03 },
                { name: 'card-04', path: card04 },
                { name: 'card-05', path: card05 },
                { name: 'card-06', path: card06 },
            ],
            createdCards: [],
            selectedCards: [],
            selectedCardsIds: [],
            matchedCards: [],
            timeRemaining: 100,
            totalClicks: 0,
            busy: false,
            gameOverVisible: false,
            victoryVisible: false,
        };
    };


    const [gameState, setGameState] = useState(initializeGameState());
    const [countdown, setCountdown] = useState(gameState.timeRemaining);


    useEffect(() => {
        startGame(level);
    }, []);


    useEffect(() => {

        const countdownInterval = setInterval(() => {

            if (gameState.timeRemaining > 0) {
                setGameState(prevState => ({
                    ...prevState,
                    timeRemaining: prevState.timeRemaining - 1,
                }));
            } else {
                clearInterval(countdownInterval);
                gameOver()
                console.log('Countdown reached 0');
                // Handle countdown timeout, e.g., end the game or take some other action
            }
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
        };
    }, [gameState.timeRemaining]);



    // FUNCTIONS

    const startGame = (level) => {

        // Initialize the game state
        const newGameState = initializeGameState();

        // Update game state to start the game
        setGameState(newGameState);

        // Create shuffled cards
        createCards();

        // audioController.startMusic();

        // Sets the initial timer
        setTimer(level)
    }


    const setTimer = (level) => {
        let timeRemaining = 0;

        if (level === 'easy') timeRemaining = 100;
        if (level === 'medium') timeRemaining = 60;
        if (level === 'hard') timeRemaining = 30;

        setGameState(prevState => ({ ...prevState, timeRemaining }));
    };


    const shuffleCards = () => {

        const cardsArray = [...gameState.cardsArray]; // Copy the original cards array

        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }

        return cardsArray;
    };


    const createCards = () => {

        //
        const shuffledCardsArray = shuffleCards()

        // Create an array of Card components using the cardsArray
        const createdCards = shuffledCardsArray.map((cardInfo, index) => (
            <Card
                key={index} // Unique key for each card
                dataId={index} // Data ID for identifying the card
                imagePath={cardInfo.path} // Image path for the card
                // isFrontVisible={cardInfo.isFrontVisible}
                // isMatched={cardInfo.isMatched}
                onCardPress={() => {

                    //     console.log(cardInfo)
                    flipCard(index)

                }}
            />
        ));

        // Update the game state with the newly createdCards
        setGameState(prevState => ({ ...prevState, createdCards }));
    };


    const flipCard = (cardId) => {

        // Debugging
        console.log("Card ID:", cardId);
        // console.log("cardsArray:", gameState.cardsArray);
        console.log("cardsArray[cardId]:", gameState.cardsArray[cardId]);

        // Check if the card can be flipped based on game conditions
        if (canFlipCard(cardId)) {

            // Create copies of selectedCards and selectedCardsIds arrays
            const updatedSelectedCards = [...gameState.selectedCards];
            const updatedSelectedCardsIds = [...gameState.selectedCardsIds];

            // Check if a card can be added to the selected cards
            if (updatedSelectedCards.length < 2 && !updatedSelectedCardsIds.includes(cardId)) {

                // Add the selected card to the arrays
                updatedSelectedCards.push(gameState.cardsArray[cardId].name);
                updatedSelectedCardsIds.push(cardId);
            }

            // Play flip sound
            // audioController.flip();

            // Update state with updated selected cards and totalClicks
            setGameState(prevState => ({
                ...prevState,
                totalClicks: prevState.totalClicks + 1,
                selectedCards: [...prevState.selectedCards, ...updatedSelectedCards],
                selectedCardsIds: [...prevState.selectedCardsIds, ...updatedSelectedCardsIds],
            }));


            console.log(updatedSelectedCards)
            console.log(gameState.selectedCardsIds)
        }

        // Check if two cards are selected
        if (gameState.selectedCards.length === 2) {

            console.log("2 cards selected")

            // After a brief delay, check for a card match
            setTimeout(() => checkForCardMatch(), 500);
        }

        // Check for 'hard' level and total clicks exceeding 16
        // if (level === 'hard' && gameState.totalClicks > 16) {

        //     // End the game
        //     console.log('gameover')
        //     gameOver();
        // }
    };


    const canFlipCard = (cardId) => {

        // Check if the game is not busy, card is not matched, and fewer than 2 cards are selected
        return (
            !gameState.busy &&                   // Game should not be busy with animations
            !gameState.matchedCards.includes(cardId) && // Card should not be already matched
            !gameState.selectedCards.includes(cardId) && // Card should not be already selected
            gameState.selectedCards.length < 2   // No more than 2 cards can be selected
        );
    }

    const checkForCardMatch = () => {

        // Debugging
        console.log("firstCardId:", firstCardId);
        console.log("secondCardId:", secondCardId);
        console.log("cardsImagesArray:", gameState.cardsImagesArray);
        console.log("cardsImagesArray[firstCardId]:", gameState.cardsImagesArray[firstCardId]);
        console.log("cardsImagesArray[secondCardId]:", gameState.cardsImagesArray[secondCardId]);



        // Get the IDs and names of the selected cards
        const [firstCardId, secondCardId] = gameState.selectedCardsIds;
        const firstCardName = gameState.cardsImagesArray[firstCardId].name;
        const secondCardName = gameState.cardsImagesArray[secondCardId].name;

        if (firstCardName === secondCardName) {

            // Cards match, update matchedCards and play match sound
            setGameState(prevState => ({ ...prevState, matchedCards: [...prevState.matchedCards, firstCardId, secondCardId] }));

            // audioController.match();
        } else {

            // Cards don't match, flip them back after a delay
            setGameState(prevState => ({ ...prevState, busy: true }));

            setTimeout(() => {
                setGameState(prevState => ({ ...prevState, busy: false }));
                flipBackCards(firstCardId, secondCardId);
            }, 1000);
        }

        // Clear selected cards and IDs
        setGameState(prevState => ({ ...prevState, selectedCards: [], selectedCardsIds: [] }));

        // Check for victory condition
        if (gameState.matchedCards.length === gameState.cardsArray.length) {
            victory();
        }
    }


    const gameOver = () => {

        // Play game over sound
        // audioController.gameOver(); 

        // Update state to show game over screen
        setGameState(prevState => ({ ...prevState, gameOverVisible: true }));
    }


    const victory = () => {

        // Play victory sound
        // audioController.victory(); 

        // Update state to show victory screen
        setGameState(prevState => ({ ...prevState, victoryVisible: true }));
    }



    return (
        <View style={styles.container}>

            {/* Render game info */}
            <Text>{gameState.timeRemaining}</Text>
            <Text>{gameState.totalClicks}</Text>

            {/* Render game board with all the cards */}
            <View style={styles.cardContainer}>
                {gameState.createdCards.map(card => card)}
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
};

export default GameLogic