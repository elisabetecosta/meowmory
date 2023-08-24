// TODO 
// - disable cards if they are matched, already flipped or 2 are already flipped, use the canFlipCard function for that
// - add audio effects 
// - trigger the gameover and victory functions, using the navigation to move to the victory/gameover screen
// - do as much refactoring as possible without making the code stop working
// - add detailed comments
// - improve styling of the component
// - remove old and unnecessary code
// - create a component that has a title, text and button and that can be reused for the rules, victory and gameover screens


import React, { useState, useEffect } from 'react';
import { View, Text, Image } from "react-native"
import Animated, { interpolate } from "react-native-reanimated";

import cardImages from "../../constants/images"

import GameOverScreen from "../GameOver/GameOverScreen"
import VictoryScreen from "../Victory/VictoryScreen"

import styles from "./GameScreen.style"



const GameLogic = ({ route }) => {

    const { level } = route.params

    const cardsArray = [
        { name: 'card-01', path: cardImages.card01, matched: false },
        { name: 'card-02', path: cardImages.card02, matched: false },
        { name: 'card-03', path: cardImages.card03, matched: false },
        { name: 'card-04', path: cardImages.card04, matched: false },
        { name: 'card-05', path: cardImages.card05, matched: false },
        { name: 'card-06', path: cardImages.card06, matched: false },
    ]


    //         
    //         busy: false,
    //         gameOverVisible: false,
    //         victoryVisible: false,



    // Animation Logic
    const AnimatedStyle = (spin, side) => {
        
        const spinVal = interpolate(spin, [0, 1], side === 'front' ? [180, 0] : [360, 180]);
        
        return {
            transform: [{ rotateY: `${spinVal}deg` }],
        };
    }


    // const [gameState, setGameState] = useState(initializeGameState());
    const [timeRemaining, setTimeRemaining] = useState(100)
    const [totalFlips, setTotalFlips] = useState(0)
    const [cards, setCards] = useState([])
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)
    const [countdown, setCountdown] = useState(timeRemaining);


    // START GAME
    useEffect(() => {

        // audioController.startMusic();
        resetTurn()
        setTimer(level)
        shuffleCards()
    }, []);


    // TIMER
    useEffect(() => {

        const countdownInterval = setInterval(() => {

            if (timeRemaining > 0) {
                setTimeRemaining(prevState => prevState - 1)
            } else {
                clearInterval(countdownInterval);
                console.log('Countdown reached 0');
                // gameOver()
            }
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
        };
    }, [timeRemaining]);


    //CARD COMPARISON
    useEffect(() => {

        if (firstCard && secondCard) {

            if (firstCard.name === secondCard.name) {

                // audioController.match();

                console.log("MATCH")

                setCards(prevCards => {

                    return prevCards.map(card => {

                        if (card.name === firstCard.name) {
                            return { ...card, matched: true }
                        } else {
                            return card
                        }
                    })
                })

                resetTurn()

                // Check for victory condition
                //     if (gameState.matchedCards.length === cardsArray.length / 2) {
                //         victory();
                //     }
            }

            else {

                console.log("DID NOT MATCH")

                setTimeout(() => {

                    //flip back cards
                    // flipBackCards()


                    // Reset the spin value of the non-matching cards
                    setCards(prevCards => {

                        return prevCards.map(card => {

                            if (card.name === firstCard.name) {
                                return { ...card, spin: 0 }
                            } else {
                                return card
                            }
                        })
                    })

                    setCards(prevCards => {

                        return prevCards.map(card => {

                            if (card.name === secondCard.name) {
                                return { ...card, spin: 0 }
                            } else {
                                return card
                            }
                        })
                    })




                    resetTurn()
                }, 500)
            }
        }
    }, [firstCard, secondCard])



    // FUNCTIONS

    const resetTurn = () => {
        setFirstCard(null)
        setSecondCard(null)
    }


    const setTimer = (level) => {
        let timeRemaining = 0;

        if (level === 'easy') timeRemaining = 100;
        if (level === 'medium') timeRemaining = 60;
        if (level === 'hard') timeRemaining = 30;

        setTimeRemaining(timeRemaining)
    };


    const shuffleCards = () => {

        const shuffledCards = [...cardsArray, ...cardsArray]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random(), spin: 0 }))

        setCards(shuffledCards)
    };


    const flipCard = (card) => {

        // Check if the card can be flipped based on game conditions
        // if (canFlipCard(cardId)) {
        // }    

        //     // Play flip sound
        //     // audioController.flip();


        if (!card.matched && card.spin === 0) {
            const updatedCards = cards.map((c) =>
              c.id === card.id ? { ...c, spin: 1 } : c
            );
            setCards(updatedCards);
        }
        
        firstCard ? setSecondCard(card) : setFirstCard(card)

        setTotalFlips(prevState => prevState + 1)

        // Check for 'hard' level and total clicks exceeding 16
        // if (level === 'hard' && totalFlips > 16) {

        //     // End the game
        //     console.log('gameover')
        //     gameOver();
        // }
    };


    // const canFlipCard = (card) => {

    //     // Check if the game is not busy, card is not matched, and fewer than 2 cards are selected
    //     return (
    //         !busy &&                   // Game should not be busy with animations
    //         !matchedCards.includes(cardId) && // Card should not be already matched
    //         !selectedCards.includes(cardId) && // Card should not be already selected
    //         selectedCards.length < 2   // No more than 2 cards can be selected
    //     );
    // }


    // const gameOver = () => {

    //     // Play game over sound
    //     // audioController.gameOver(); 

    //     // Update state to show game over screen
    //     setGameState(prevState => ({ ...prevState, gameOverVisible: true }));
    // }


    // const victory = () => {

    //     // Play victory sound
    //     // audioController.victory(); 

    //     // Update state to show victory screen
    //     setGameState(prevState => ({ ...prevState, victoryVisible: true }));
    // }

    



    return (
        <View style={styles.container}>

            {/* Render game info */}
            <Text>{timeRemaining}</Text>
            <Text>{totalFlips}</Text>

            {/* Render game board with all the cards */}
            <View style={styles.cardContainer}>
                {cards.map(card => (

                    <View key={card.id} onTouchEnd={() => flipCard(card)}>
                        <Animated.View style={[styles.cardFront, AnimatedStyle(card.spin, 'front')]}>
                            <Image source={card.path} style={styles.cardImage} />
                        </Animated.View>
                        <Animated.View style={[styles.cardBack, AnimatedStyle(card.spin, 'back')]}>
                            <Image source={cardImages.cardBack} style={styles.cardImage} />
                        </Animated.View>
                    </View>
                ))}
            </View>

            {/* Render game over screen */}
            {/* {gameOverVisible && <GameOverScreen />} */}

            {/* Render victory screen */}
            {/* {victoryVisible && <VictoryScreen />} */}
        </View>
    )
};

export default GameLogic