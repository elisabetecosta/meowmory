import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native"

import AudioController from '../../utils/AudioController'

const GameOverScreen = () => {

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