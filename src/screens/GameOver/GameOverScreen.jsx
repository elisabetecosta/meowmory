import React, { useEffect } from 'react';
import { View, Text } from "react-native"
import usePreventBackNavigation from "../../hooks/usePreventBackNavigation"

import AudioController from '../../utils/AudioController'

const GameOverScreen = () => {

    usePreventBackNavigation()

    const audioController = new AudioController()

    useEffect(() => {

        audioController.playGameOverSound()
    }, []);

    return (
        <View>
            <Text>title</Text>
        </View>
    )
}

export default GameOverScreen