import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS, icons } from "../constants"

import ScreenHeaderBtn from "../components/Header/ScreenHeaderBtn"
import HomeScreen from "../screens/Home/HomeScreen"
import ShopScreen from "../screens/Shop/ShopScreen"
import RulesScreen from "../screens/Rules/RulesScreen"
import LevelSelectionScreen from "../screens/Levels/LevelSelectionScreen"
import GameScreen from "../screens/Game/GameScreen"
import VictoryScreen from "../screens/Victory/VictoryScreen"
import GameOverScreen from "../screens/GameOver/GameOverScreen"

const Stack = createNativeStackNavigator()

const StackComponent = () => {

    return (
        <NavigationContainer>

            {/* Navigator for creating a stack of screens */}
            <Stack.Navigator initialRouteName="Home">

                {/* Home screen */}
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: "",
                        headerLeft: () => <></>,
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.shop} dimension="100%" screen="Shop" />
                        ),
                    }}
                />

                {/* Shop screen */}
                <Stack.Screen
                    name="Shop"
                    component={ShopScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: "",
                        headerLeft: () => <></>,
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.close} dimension="60%" screen="Home" />
                        ),
                    }}
                />

                {/* Rules screen */}
                <Stack.Screen
                    name="Rules"
                    component={RulesScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: "",
                        headerLeft: () => <></>,
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.close} dimension="60%" screen="Home" />
                        ),
                    }}
                />

                {/* Level selection screen */}
                <Stack.Screen
                    name="Levels"
                    component={LevelSelectionScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: "",
                        headerLeft: () => <></>,
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.close} dimension="60%" screen="Home" />
                        ),
                    }}
                />

                {/* Game screen */}
                <Stack.Screen
                    name="Game"
                    component={GameScreen}
                    options={({ route }) => ({
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: "",
                        params: { level: route.params?.level },
                        headerLeft: () => <></>,
                        // headerRight: () => (
                        //     <ScreenHeaderBtn iconUrl={icons.settings} dimension="60%" screen="Home" />
                        // ),
                    })}
                />

                {/* Victory screen */}
                <Stack.Screen
                    name="Victory"
                    component={VictoryScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: "",
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.home} dimension="90%" screen="Home" />
                        ),
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.shop} dimension="100%" screen="Shop" />
                        ),
                    }}
                />

                {/* Game over screen */}
                <Stack.Screen
                    name="GameOver"
                    component={GameOverScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: "",
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.home} dimension="90%" screen="Home" />
                        ),
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.shop} dimension="100%" screen="Shop" />
                        ),
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackComponent