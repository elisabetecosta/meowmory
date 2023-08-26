// TODO 
// - see if I can have the animation look better while keeping the logic working (https://geekyants.com/blog/how-to-build-simple-card-flip-animation-in-react-native-using-reanimated-v2/)
// - do as much refactoring as possible without making the code stop working
// - remove old and unnecessary code and dependencies and run npm install
// - add detailed comments
// - improve styling of the component
// - create a component that has a title, text and button and that can be reused for the rules, victory and gameover screens


import React, { useState, useEffect } from 'react';
import { View, Text, Image } from "react-native"
import { useNavigation } from '@react-navigation/native'
import Animated, { interpolate } from "react-native-reanimated";

import usePreventBackNavigation from "../../hooks/usePreventBackNavigation"
import AudioController from '../../utils/AudioController'
import cardImages from "../../constants/images"

import styles from "./GameScreen.style"



const GameLogic = ({ route }) => {

    const { level } = route.params

    const audioController = new AudioController()

    const navigation = useNavigation()

    usePreventBackNavigation()

    const cardImagesArray = [
        { name: 'card-01', path: cardImages.card01 },
        { name: 'card-02', path: cardImages.card02 },
        { name: 'card-03', path: cardImages.card03 },
        { name: 'card-04', path: cardImages.card04 },
        { name: 'card-05', path: cardImages.card05 },
        { name: 'card-06', path: cardImages.card06 },
    ]


    // Animation Logic
    const AnimatedStyle = (spin, side) => {

        const spinVal = interpolate(spin, [0, 1], side === 'front' ? [180, 0] : [360, 180]);

        return {
            transform: [{ rotateY: `${spinVal}deg` }],
        };
    }


    //
    const [timeRemaining, setTimeRemaining] = useState(100)
    const [countdown, setCountdown] = useState(timeRemaining);
    const [totalFlips, setTotalFlips] = useState(0)
    const [cards, setCards] = useState([])
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)
    const [matchedCards, setMatchedCards] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [gameOver, setGameOver] = useState(false)


    // START GAME
    useEffect(() => {

        const onFocus = navigation.addListener('focus', () => {
            audioController.playBgMusic()
            resetTurn()
            setTimer(level)
            shuffleCards()
        });

        const onBlur = navigation.addListener('blur', () => {
            audioController.stopBgMusic()
        });

        return () => {
            onFocus()
            onBlur()
        }

    }, []);


    // TIMER
    useEffect(() => {

        const countdownInterval = setInterval(() => {

            if (!gameOver) {

                if (timeRemaining > 0) {
                    setTimeRemaining(prevState => prevState - 1)
                } else {
                    clearInterval(countdownInterval);
                    console.log('Countdown reached 0');

                    handleGameOver()
                }
            }
        }, 1000)

        return () => {
            clearInterval(countdownInterval);
            console.log("Timer clean up")
        };
    }, [gameOver, timeRemaining]);


    //CARD COMPARISON
    useEffect(() => {

        if (firstCard && secondCard) {

            setDisabled(true)

            if (firstCard.name === secondCard.name) {

                audioController.playMatchSound()

                console.log("MATCH")

                setMatchedCards(prevMatchedCards => [...prevMatchedCards, firstCard.name])

                resetTurn()
            }

            else {

                console.log("DID NOT MATCH")

                setTimeout(() => {

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

        return () => {
            console.log("Card comparison cleanup executed")
        }
    }, [firstCard, secondCard])


    // HARD LEVEL GAME OVER
    useEffect(() => {

        // Check for 'hard' level and total clicks exceeding 16
        if (level === 'hard' && totalFlips > 16) {

            handleGameOver()
        }

        // Return the cleanup function
        return () => {
            console.log("Game Over cleanup executed");
        }
    }, [totalFlips]);


    // VICTORY
    useEffect(() => {

        // Check for victory condition
        if (matchedCards.length === cardImagesArray.length) {

            handleVictory()
        }
    }, [matchedCards]);



    // FUNCTIONS

    const resetTurn = () => {
        setFirstCard(null)
        setSecondCard(null)
        setDisabled(false)
    }


    const setTimer = (level) => {

        let timeRemaining = 0;

        if (level === 'easy') timeRemaining = 100;
        if (level === 'medium') timeRemaining = 60;
        if (level === 'hard') timeRemaining = 30;

        setTimeRemaining(timeRemaining)
    };


    const shuffleCards = () => {

        const shuffledCards = [...cardImagesArray, ...cardImagesArray]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random(), spin: 0 }))

        setCards(shuffledCards)
    };


    const flipCard = (card) => {

        if (!disabled && card.spin === 0) {

            // Play flip sound
            audioController.playFlipSound();

            // Flip card
            const updatedCards = cards.map((c) =>
                c.id === card.id ? { ...c, spin: 1 } : c
            );

            setCards(updatedCards);

            //
            firstCard ? setSecondCard(card) : setFirstCard(card)

            setTotalFlips(prevState => prevState + 1)
        }
    };


    const handleGameOver = () => {

        console.log("Game Over")

        setGameOver(true)

        // navigate to gameover screen
        navigation.navigate("GameOver")
    }


    const handleVictory = () => {

        console.log("Victory")

        setGameOver(true)

        // navigate to victory screen
        navigation.navigate("Victory")
    }



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
        </View>
    )
};

export default GameLogic