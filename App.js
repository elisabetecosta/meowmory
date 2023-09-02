import React, { useEffect, useCallback } from "react"
import { View, StyleSheet, AppState } from "react-native"
import { StatusBar } from "expo-status-bar"
import * as NavigationBar from "expo-navigation-bar"

// Imports to implement custom fonts
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import StackComponent from "./src/routes/stack"

import { COLORS } from "./src/constants"


const App = () => {

    // Hide bottom bar
    const hideNavBar = async () => {

        // Prevent content from moving up when bar is shown
        await NavigationBar.setPositionAsync("absolute") 

        // Hide bottom bar
        await NavigationBar.setVisibilityAsync("hidden") 

        // Show the bar when user swipes
        await NavigationBar.setBehaviorAsync("overlay-swipe")  
    }

    useEffect(() => {

        const handleAppStateChange = (nextAppState) => {

            // If app is being used, hide nav bar
            if (nextAppState === "active") {

                hideNavBar()
            }
        }

        // Subscribe to app state changes
        const appStateSubscription = AppState.addEventListener('change', handleAppStateChange)

        // Clean up the event listener when the component unmounts
        return () => {
            appStateSubscription.remove()
        }
    }, [])


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

        <View style={styles.container}>
            <StackComponent onLayout={onLayoutRootView} />

            {/* Hide top bar */}
            <StatusBar hidden />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
})

export default App