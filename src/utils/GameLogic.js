import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';

const initializeGameState = () => {

    return {
        timeRemaining: 0,
        totalClicks: 0,
        cardsImagesArray: [
            { name: 'card-01', path: '../../assets/images/card-01.png' },
            { name: 'card-02', path: '../../assets/images/card-02.png' },
            { name: 'card-03', path: '../../assets/images/card-03.png' },
            { name: 'card-04', path: '../../assets/images/card-04.png' },
            { name: 'card-05', path: '../../assets/images/card-05.png' },
            { name: 'card-06', path: '../../assets/images/card-06.png' },
        ],
        cardsArray: [],
        selectedCards: [],
        selectedCardsIds: [],
        matchedCards: [],
        busy: false,
        gameOverVisible: false,
        victoryVisible: false,
    };
};

const GameLogic = () => {
    const [gameState, setGameState] = useState(initializeGameState());
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        // startGame();
    }, []);


    // FUNCTIONS

    const setTimer = (level) => {
        if (level === 'easy') setGameState(prevState => ({ ...prevState, timeRemaining: 100 }));
        if (level === 'medium') setGameState(prevState => ({ ...prevState, timeRemaining: 60 }));
        if (level === 'hard') setGameState(prevState => ({ ...prevState, timeRemaining: 30 }));
    }



    const startGame = () => {

        // Initialize the game state
        const newGameState = initializeGameState();

        // Update game state to start the game
        setGameState(newGameState);

        // Create and shuffle cards
        createCards();
        shuffleCards();
        // audioController.startMusic();

        // After a brief delay, start the countdown and set busy to false
        setTimeout(() => {
            const countdownInterval = startCountdown();
            setGameState(prevState => ({ ...prevState, busy: false }));
            setCountdown(countdownInterval);
        }, 500);

        // Set the initial timer and flips in the state
        setGameState(prevState => ({
            ...prevState,
            timer: prevState.timeRemaining,
            flips: prevState.totalClicks,
        }));
    }

    const createCards = () => {

        // Create an array of Card components using the cardsImagesArray
        const cardsArray = gameState.cardsImagesArray.map((cardInfo, index) => (
            <Card
                key={index} // Unique key for each card
                dataId={index} // Data ID for identifying the card
                imagePath={cardInfo.path} // Image path for the card
                isFrontVisible={false}
                isMatched={false}
                onCardPress={() => this.flipCard(index)} // Callback for when the card is pressed
            />
        ));

        // Update the game state with the newly created cardsArray
        setGameState(prevState => ({ ...prevState, cardsArray }));
    };

    const clickCards = () => {

        // Map over the existing cardsArray in the state
        const updatedCardsArray = gameState.cardsArray.map((card, index) => (

            // Clone the Card component and update its onPress prop
            React.cloneElement(card, {

                // When the card is pressed, call the flipCard function with the card's index
                onCardPress: () => flipCard(index),

                // Assign a unique key to the cloned card
                key: index,
            })
        ));

        // Update the state with the updated cardsArray
        setGameState(prevState => ({ ...prevState, cardsArray: updatedCardsArray }));
    }

    const shuffleCards = (cardsArray) => {
        // Create a copy of the cardsImagesArray to shuffle
        const shuffledImagesArray = [...gameState.cardsImagesArray];

        // Use the sort function with a random sorting criterion
        shuffledImagesArray.sort(() => Math.random() - 0.5);

        // Update the state with the shuffled cardsImagesArray
        setGameState(prevState => ({ ...prevState, cardsImagesArray: shuffledImagesArray }));
    };

    const startCountdown = () => {
        // Start the countdown interval
        const countdown = setInterval(() => {
            setGameState(prevState => ({ ...prevState,
                timeRemaining: timeRemaining - 1
            }));

            // Check if time has run out
            if (gameState.timeRemaining === 0) {
                clearInterval(countdown);
                gameOver();
            }
        }, 1000);

        return countdown;
    };



    //continuar aqui

    const flipCard = (cardId) => {
        // Check if the card can be flipped based on game conditions
        if (canFlipCard(cardId)) {

            // Create copies of selectedCards and selectedCardsIds arrays
            const updatedSelectedCards = [...gameState.selectedCards];
            const updatedSelectedCardsIds = [...gameState.selectedCardsIds];

            // Check if a card can be added to the selected cards
            if (updatedSelectedCards.length < 2 && !updatedSelectedCardsIds.includes(cardId)) {

                // Add the selected card to the arrays
                updatedSelectedCards.push(gameState.cardsImagesArray[cardId].name);
                updatedSelectedCardsIds.push(cardId);
            }

            // Play flip sound
            // this.audioController.flip();

            // Update state with updated selected cards and totalClicks
            this.setState(prevState => ({
                totalClicks: prevState.totalClicks + 1,
                selectedCards: updatedSelectedCards,
                selectedCardsIds: updatedSelectedCardsIds,
            }));

            // Update the cardsArray with the flipped card
            const updatedCardsArray = this.state.cardsArray.map((card, index) => (
                index === cardId
                    ? React.cloneElement(card, { isFlipped: true })
                    : card
            ));

            // Update state with the updated cardsArray
            this.setState({ cardsArray: updatedCardsArray });
        }

        // Check if two cards are selected
        if (this.state.selectedCards.length === 2) {

            // After a brief delay, check for a card match
            setTimeout(() => this.checkForCardMatch(), 500);
        }

        // Check for 'hard' level and total clicks exceeding 20
        // if (this.state.level === 'hard' && this.state.totalClicks > 20) {

        //     // End the game
        //     this.gameOver();
        // }
    };

    const canFlipCard = (cardId) => {

        // Check if the game is not busy, card is not matched, and fewer than 2 cards are selected
        return (
            !this.state.busy &&                   // Game should not be busy with animations
            !this.state.matchedCards.includes(cardId) && // Card should not be already matched
            this.state.selectedCards.length < 2   // No more than 2 cards can be selected
        );
    }

    const checkForCardMatch = () => {
        // Get the IDs and names of the selected cards
        const [firstCardId, secondCardId] = this.state.selectedCardsIds;
        const firstCardName = this.state.cardsImagesArray[firstCardId].name;
        const secondCardName = this.state.cardsImagesArray[secondCardId].name;

        if (firstCardName === secondCardName) {

            // Cards match, update matchedCards and play match sound
            this.setState(prevState => ({
                matchedCards: [...prevState.matchedCards, firstCardId, secondCardId],
            }));

            // this.audioController.match();
        } else {

            // Cards don't match, flip them back after a delay
            this.setState({ busy: true });

            setTimeout(() => {
                this.setState({ busy: false });
                this.flipBackCards(firstCardId, secondCardId); // Function to flip cards back
            }, 1000);
        }

        // Clear selected cards and IDs
        this.setState({
            selectedCards: [],
            selectedCardsIds: [],
        });

        // Check for victory condition
        if (this.state.matchedCards.length === this.state.cardsArray.length) {
            this.victory();
        }
    }

    const gameOver = () => {
        clearInterval(this.countdown); // Clear the countdown interval
        // this.audioController.gameOver(); // Play game over sound
        this.setState({ gameOverVisible: true }); // Update state to show game over screen
    }

    const victory = () => {
        clearInterval(this.countdown); // Clear the countdown interval
        // this.audioController.victory(); // Play victory sound
        this.setState({ victoryVisible: true }); // Update state to show victory screen
    }



    return null
};

export { GameLogic };