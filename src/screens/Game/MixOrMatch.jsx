import React from 'react'
import { useRoute } from '@react-navigation/native'
import { GameProvider, useGameContext } from "../../context/GameContext"
import GameScreen from './GameScreen'

const MixOrMatch = () => {

    const route = useRoute();
    const level = route.params?.level;
    const { gameState } = useGameContext();


    return (
        <GameProvider>
            <GameScreen level={level} gameState={gameState} />
        </GameProvider>
    )

}

export default MixOrMatch