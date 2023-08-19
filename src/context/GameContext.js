import React, { createContext, useContext, useState } from 'react';
import { GameLogic } from '../screens/Game/GameLogic';

const GameContext = createContext();


// add comments
const GameProvider = ({ children }) => {

    const [gameState, setGameState] = useState();

    // Initialize your game logic
    const gameLogic = new GameLogic();

    // Initialize gameState using the initializeGameState function
    useState(() => {
        const initialState = gameLogic.initializeGameState();
        setGameState(initialState);
    }, []);

    const startGame = (level) => {
        gameLogic.setTimer(level); // Set the timer based on the level
        gameLogic.startGame(); // Start the game logic

        // Update gameState with the initial game state from gameLogic
        setGameState({
            ...gameState,
            timeRemaining: gameLogic.state.timeRemaining,
            totalClicks: gameLogic.state.totalClicks,
            // Update other properties as needed
        });
    };

    const flipCard = (cardId) => {
        gameLogic.flipCard(cardId); // Call the flipCard method from gameLogic

        // Update gameState with the updated game state from gameLogic
        setGameState({
            ...gameState,
            timeRemaining: gameLogic.state.timeRemaining,
            totalClicks: gameLogic.state.totalClicks,
            // Update other properties as needed
        });
    };

    const checkForCardMatch = () => {
        gameLogic.checkForCardMatch(); // Call the checkForCardMatch method from gameLogic

        // Update gameState with the updated game state from gameLogic
        setGameState({
            ...gameState,
            timeRemaining: gameLogic.state.timeRemaining,
            totalClicks: gameLogic.state.totalClicks,
            // Update other properties as needed
        });
    };

    // Other game methods

    return (
        <GameContext.Provider value={{ gameState, startGame, flipCard, checkForCardMatch }}>
            {children}
        </GameContext.Provider>
    );
};



const useGameContext = () => useContext(GameContext);


export { GameProvider, useGameContext }