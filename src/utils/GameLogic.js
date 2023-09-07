import { useState, useCallback, useRef, useEffect } from "react";

// Custom hook for Countdown
const useCountdown = ({ level, callback }) => {

    const DEFAULT_TIME_IN_SECONDS = 60;

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


    const _initialCounter = getInitialCounter(level),
        [resume, setResume] = useState(0),
        [counter, setCounter] = useState(_initialCounter),
        initial = useRef(_initialCounter),
        intervalRef = useRef(null),
        [isPause, setIsPause] = useState(false)


    const stopCounter = useCallback(() => {
        clearInterval(intervalRef.current);
        setCounter(0);
        setIsPause(false);
    }, []);


    const startCounter = useCallback(
        (seconds = initial.current - 1) => {
            intervalRef.current = setInterval(() => {
                const newCounter = seconds--;

                if (isPause) return

                if (newCounter >= 0) {
                    setCounter(newCounter);
                    callback && callback(newCounter);
                } else {
                    stopCounter();
                }
            }, 1000);
        },
        [stopCounter]
    );

    const pauseCounter = () => {
        setResume(counter);
        setIsPause(true);
        clearInterval(intervalRef.current);
    };

    const resumeCounter = () => {
        console.log('Resuming counter with:', resume)
        startCounter(resume - 1);
        setResume(0);
        setIsPause(false);
    };

    // const resetCounter = useCallback(() => {
    //     if (intervalRef.current) {
    //         stopCounter();
    //     }
    //     setCounter(initial.current);
    //     startCounter(initial.current - 1);
    // }, [startCounter, stopCounter]);

    // useEffect(() => {
    //     resetCounter();
    // }, []);

    useEffect(() => {
        return () => {
            stopCounter();
        };
    }, [stopCounter]);

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