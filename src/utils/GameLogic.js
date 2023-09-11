import { useState, useCallback, useRef, useEffect } from "react";

// Custom hook for managing countdown
const useCountdown = ({ level, callback }) => {

    const DEFAULT_TIME_IN_SECONDS = 60;

    // Function to get the initial counter value based on the selected level
    const getInitialCounter = (level) => {
        switch (level) {
            case 'easy':
                return 60;
            case 'medium':
                return 45;
            case 'hard':
                return 30;
            default:
                return DEFAULT_TIME_IN_SECONDS;
        }
    };


    // Variables and state initialization
    const _initialCounter = getInitialCounter(level)
    const [resume, setResume] = useState(0)
    const [counter, setCounter] = useState(_initialCounter)
    const initial = useRef(_initialCounter)
    const intervalRef = useRef(null)
    const [isPaused, setIsPaused] = useState(false)


    // Start countdown
    const startCounter = useCallback(

        // If 'seconds' is not provided when calling 'startCounter', use the initial countdown value minus 1 as the default value
        (seconds = initial.current - 1) => {

            // Set up an interval to update the countdown timer
            intervalRef.current = setInterval(() => {

                // Decrement the 'seconds' variable by 1 and assign its current value to 'newCounter'
                const newCounter = seconds--;

                // If paused, do nothing
                if (isPaused) return

                if (newCounter >= 0) {

                    // Update the counter
                    setCounter(newCounter);

                    // Call the callback function (if provided)
                    callback && callback(newCounter);
                } else {

                    // If countdown reached 0, stop the countdown
                    stopCounter();
                }
            }, 1000);
        },
        [stopCounter]
    );


    // Pause countdown
    const pauseCounter = () => {

        // Store the current countdown value before pausing
        setResume(counter);

        // Set the paused state to true
        setIsPaused(true);

        // Clear the interval
        clearInterval(intervalRef.current);
    };


    // Resume countdown
    const resumeCounter = () => {

        // Start the countdown with the stored resume value
        startCounter(resume - 1);

        // Reset the resume value
        setResume(0);

        // Reset the paused state
        setIsPaused(false);
    };


    // Stop countdown
    const stopCounter = useCallback(() => {

        // Clear the interval
        clearInterval(intervalRef.current);

        // Set the counter to 0
        setCounter(0);

        // Reset the paused state
        setIsPaused(false);
    }, []);


    // Cleanup effect to stop the countdown timer when the component unmounts
    useEffect(() => {
        return () => {
            stopCounter();
        };
    }, [stopCounter]);


    // Return an array of values and functions
    return [
        counter,
        startCounter,
        stopCounter,
        pauseCounter,
        resumeCounter,
    ];
};


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
const handleVictory = (matchedCards, totalCardCount, setGameEnd, stopCounter, navigation) => {

    // Check if all cards are matched
    if (matchedCards.length === totalCardCount) {

        // Stop game over from being triggered after a victory
        setGameEnd(true)

        // Stop countdown
        stopCounter()

        // Navigate to the victory screen
        navigation.navigate("Victory")
    }
};


// Handle game over
const handleGameOver = (counter, level, totalFlips, gameEnd, stopCounter, navigation) => {

    // If the game has not ended
    if (!gameEnd) {

        // Check for counter reaching 0 or hard level with flips exceeding 16 
        if (counter === 0 || level === 'hard' && totalFlips > 16) {

            // Stop countdown
            stopCounter()

            // Navigate to the gameover screen
            navigation.navigate("GameOver");
        }
    }
};


export { useCountdown, handleCardComparison, handleVictory, handleGameOver }