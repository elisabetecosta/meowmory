import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"

// Imports necessary to implement custom fonts
import { useCallback } from "react"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import StackComponent from "./src/routes/stack"

import { COLORS } from "./src/constants"


const App = () => {

    // Load custom fonts
    const [fontsLoaded, fontError] = useFonts({
        PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
        PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
        RubikIso: require('./assets/fonts/RubikIso-Regular.ttf'),
    })

    // Define a callback function for handling layout and hiding the splash screen
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) await SplashScreen.hideAsync()
    }, [fontsLoaded, fontError])

    // Return null if fonts are not loaded and no font error occurred
    if (!fontsLoaded && !fontError) return null

    return (

        <SafeAreaView style={styles.container}>
            <StackComponent onLayout={onLayoutRootView} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        width: "100%",
    },
})

export default App