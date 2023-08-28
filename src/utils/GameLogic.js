// Handle card comparison logic
const handleCardComparison = (firstCard, secondCard, setDisabled, audioController, setMatchedCards, resetTurn) => {

    if (firstCard && secondCard) {

        // Disable further card interactions during comparison
        setDisabled(true);

        if (firstCard.name === secondCard.name) {

            // Play matching sound and update matched cards
            audioController.playMatchSound();
            setMatchedCards(prevMatchedCards => [...prevMatchedCards, firstCard.name]);
            resetTurn();
        } else {

            // After a delay, flip back unmatched cards and reset the turn
            setTimeout(() => {
                firstCard.animatedValue.value = 0;
                secondCard.animatedValue.value = 0;
                resetTurn();
            }, 500);
        }
    }
};


// Handle victory condition
const handleVictory = (matchedCards, totalCardCount, setGameEnd, navigation) => {

    // Check if all cards are matched
    if (matchedCards.length === totalCardCount) {

        // Set gameEnd state to true to stop the timer
        setGameEnd(true)

        console.log("Victory");

        // Navigate to the victory screen
        navigation.navigate("Victory")
    }
};


// Handle game over
const handleGameOver = (navigation) => {

    console.log("Game Over");

    // Navigate to the gameover screen
    navigation.navigate("GameOver");
};


export { handleCardComparison, handleVictory, handleGameOver }