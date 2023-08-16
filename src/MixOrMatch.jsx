import React, { Component } from 'react';
import { initializeGameState } from "./utils/InitialGameState"
import { AudioController } from './utils/AudioController'
import Card from './components/Card/Card';

class MixOrMatch extends Component {

    constructor(props) {

        super(props);

        const { level } = props;

        this.state = {

            ...initializeGameState(),

            cardsImagesArray: [
                { name: 'card-01', path: '../assets/images/card-01.png' },
                { name: 'card-02', path: '../assets/images/card-02.png' },
                { name: 'card-03', path: '../assets/images/card-03.png' },
                { name: 'card-04', path: '../assets/images/card-04.png' },
                { name: 'card-05', path: '../assets/images/card-05.png' },
                { name: 'card-06', path: '../assets/images/card-06.png' },
            ],

            level: level,
        };

        this.audioController = new AudioController();
    }



    setTimer = () => {
        if (level === 'easy') return 100;
        if (level === 'medium') return 60;
        if (level === 'hard') return 30;
    }



    startGame = () => {

        this.setState({
            ...initializeGameState(),
            totalTime: this.setTimer(),
            timeRemaining: this.setTimer(),
        })
        this.clearCards();
        this.createCards();
        this.shuffleCards();
        this.audioController.startMusic();

        setTimeout(() => {
            this.countdown = this.startCountdown();
            this.setState({ busy: false });
        }, 500);

        this.setState({
            timer: this.state.timeRemaining,
            flips: this.state.totalClicks,
        });
    }



    createCards = () => {
        // Create an array of Card components using the cardsImagesArray
        const cardsArray = this.state.cardsImagesArray.map((cardInfo, index) => (
            <Card
                key={index} // Unique key for each card
                dataId={index} // Data ID for identifying the card
                imagePath={cardInfo.path} // Image path for the card
                onPress={() => this.flipCard(index)} // Callback for when the card is pressed
            />
        ));

        // Update the state with the newly created cardsArray
        this.setState({ cardsArray });
    }



    clickCards = () => {

        // Map over the existing cardsArray in the state
        const updatedCardsArray = this.state.cardsArray.map((card, index) => (

            // Clone the Card component and update its onPress prop
            React.cloneElement(card, {

                // When the card is pressed, call the flipCard function with the card's index
                onCardPress: () => this.flipCard(index),

                // Assign a unique key to the cloned card
                key: index,
            })
        ));

        // Update the state with the updated cardsArray
        this.setState({ cardsArray: updatedCardsArray });
    }



    shuffleCards = () => {

        // Create a copy of the cardsImagesArray to shuffle
        const shuffledImagesArray = [...this.state.cardsImagesArray];

        // Use the sort function with a random sorting criterion
        shuffledImagesArray.sort(() => Math.random() - 0.5);

        // Update the state with the shuffled cardsImagesArray
        this.setState({ cardsImagesArray: shuffledImagesArray });
    }



    startCountdown = () => {
        // Start the countdown interval
        const countdown = setInterval(() => {
            this.setState(prevState => ({
                timeRemaining: prevState.timeRemaining - 1
            }));

            // Check if time has run out
            if (this.state.timeRemaining === 0) {
                clearInterval(countdown);
                this.gameOver();
            }
        }, 1000);

        return countdown;
    }



    flipCard = (cardId) => {

        // Check if the card can be flipped based on game conditions
        if (this.canFlipCard(cardId)) {

            // Create copies of selectedCards and selectedCardsIds arrays
            const updatedSelectedCards = [...this.state.selectedCards];
            const updatedSelectedCardsIds = [...this.state.selectedCardsIds];

            // Check if a card can be added to the selected cards
            if (updatedSelectedCards.length < 2 && !updatedSelectedCardsIds.includes(cardId)) {

                // Add the selected card to the arrays
                updatedSelectedCards.push(this.state.cardsImagesArray[cardId].name);
                updatedSelectedCardsIds.push(cardId);
            }

            // Play flip sound
            this.audioController.flip();

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
        if (this.state.level === 'hard' && this.state.totalClicks > 20) {

            // End the game
            this.gameOver();
        }
    }



    canFlipCard = (cardId) => {

        // Check if the game is not busy, card is not matched, and fewer than 2 cards are selected
        return (
            !this.state.busy &&                   // Game should not be busy with animations
            !this.state.matchedCards.includes(cardId) && // Card should not be already matched
            this.state.selectedCards.length < 2   // No more than 2 cards can be selected
        );
    }



    checkForCardMatch = () => {

        // Get the IDs and names of the selected cards
        const [firstCardId, secondCardId] = this.state.selectedCardsIds;
        const firstCardName = this.state.cardsImagesArray[firstCardId].name;
        const secondCardName = this.state.cardsImagesArray[secondCardId].name;

        if (firstCardName === secondCardName) {

            // Cards match, update matchedCards and play match sound
            this.setState(prevState => ({
                matchedCards: [...prevState.matchedCards, firstCardId, secondCardId],
            }));

            this.audioController.match();
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



    clearCards = () => {
        this.setState({ cardsArray: [] });
    }



    gameOver = () => {
        clearInterval(this.countdown); // Clear the countdown interval
        this.audioController.gameOver(); // Play game over sound
        this.setState({ gameOverVisible: true }); // Update state to show game over screen
    }



    victory = () => {
        clearInterval(this.countdown); // Clear the countdown interval
        this.audioController.victory(); // Play victory sound
        this.setState({ victoryVisible: true }); // Update state to show victory screen
    }



    render() {
        return <></>
    }
}

export default MixOrMatch;