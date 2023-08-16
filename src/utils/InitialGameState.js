export const initializeGameState = () => {

    return {
        timeRemaining: 0,
        totalClicks: 0,
        cardsImagesArray: [],
        cardsArray: [],
        selectedCards: [],
        selectedCardsIds: [],
        matchedCards: [],
        busy: false,
        gameOverVisible: false,
        victoryVisible: false
    }
}