//TODO
// inspect the useAnimatedStyle so I can find how to improve the animation of the cards



import React, { useState, useEffect } from 'react';
import { View, Text, Image } from "react-native"
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import Card from '../../components/Card/Card';

import GameOverScreen from "../GameOver/GameOverScreen"
import VictoryScreen from "../Victory/VictoryScreen"

import styles from "./GameScreen.style"


// tentar 
//import images from "../../constants"
import cardBack from "../../../assets/images/card-back.png"
import card01 from "../../../assets/images/card-01.png"
import card02 from "../../../assets/images/card-02.png"
import card03 from "../../../assets/images/card-03.png"
import card04 from "../../../assets/images/card-04.png"
import card05 from "../../../assets/images/card-05.png"
import card06 from "../../../assets/images/card-06.png"





const GameLogic = ({ route }) => {

    const { level } = route.params

    const cardsArray = [
        { name: 'card-01', path: card01, matched: false },
        { name: 'card-02', path: card02, matched: false },
        { name: 'card-03', path: card03, matched: false },
        { name: 'card-04', path: card04, matched: false },
        { name: 'card-05', path: card05, matched: false },
        { name: 'card-06', path: card06, matched: false },
    ]


    //         
    //         busy: false,
    //         gameOverVisible: false,
    //         victoryVisible: false,



    // Animation Logic
    // const spin = useSharedValue(0);

    const frontAnimatedStyle = (spin) => {
        const spinVal = interpolate(spin, [0, 1], [180, 0]);
        return {
            transform: [{ rotateY: `${spinVal}deg` }],
        };
    }


    const backAnimatedStyle = (spin) => {
        const spinVal = interpolate(spin, [0, 1], [360, 180]);
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

    const resetTurn = () => {
        setFirstCard(null)
        setSecondCard(null)
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
                        <Animated.View style={[styles.cardFront, frontAnimatedStyle(card.spin)]}>
                            <Image source={card.path} style={styles.cardImage} />
                        </Animated.View>
                        <Animated.View style={[styles.cardBack, backAnimatedStyle(card.spin)]}>
                            <Image source={cardBack} style={styles.cardImage} />
                        </Animated.View>
                    </View>
                    // <Card
                    //     key={card.id}
                    //     card={card}
                    //     frontAnimatedStyle={frontAnimatedStyle}
                    //     backAnimatedStyle={backAnimatedStyle}
                    //     // flipped={card === firstCard || card === secondCard || card.matched}
                    //     // matched={card.matched}
                    //     // spin={card.spin}
                    //     onCardPress={() => flipCard(card)}
                    // />
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