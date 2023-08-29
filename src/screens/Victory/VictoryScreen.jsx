import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'

import usePreventBackNavigation from "../../hooks/usePreventBackNavigation"
import AudioController from '../../utils/AudioController'

import Title from "../../components/Title/Title"
import Button from "../../components/Button/Button"

import { COLORS } from "../../constants"

const VictoryScreen = () => {

    // Stop the user from going back to the game after it's over
    usePreventBackNavigation()

    const navigation = useNavigation()
    const audioController = new AudioController()

    useEffect(() => {

        // Play victory sound effect
        audioController.playVictorySound()
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <Title text="Victory" />
            <Button
                text="Play Again"
                theme="default"
                handlePress={() => navigation.navigate("Levels")}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: COLORS.primary,
    }
})

export default VictoryScreen