import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'

import { COLORS, icons } from "../constants"

//import components that will show in the home page
import ScreenHeaderBtn from "../components/Header/ScreenHeaderBtn"
import WelcomeScreen from "../screens/Home/WelcomeScreen"
import RulesScreen from "../screens/Rules/RulesScreen"
import LevelSelectionScreen from "../screens/Levels/LevelSelectionScreen"
import GameLogic from "../screens/Game/GameLogic"
import VictoryScreen from "../screens/Victory/VictoryScreen"
import GameOverScreen from "../screens/GameOver/GameOverScreen"

const Stack = createNativeStackNavigator()

const StackComponent = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={WelcomeScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.home} dimension="60%" />
                        ),
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
                        ),
                        headerTitle: ""
                    }}
                />

                <Stack.Screen
                    name="Rules"
                    component={RulesScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: ""
                    }}
                />

                <Stack.Screen
                    name="Levels"
                    component={LevelSelectionScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: ""
                    }}
                />

                <Stack.Screen
                    name="Game"
                    component={GameLogic}
                    options={({ route }) => ({
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: "",
                        params: { level: route.params?.level }
                    })}
                />

                <Stack.Screen
                    name="Victory"
                    component={VictoryScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: ""
                    }}
                />

                <Stack.Screen
                    name="GameOver"
                    component={GameOverScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: ""
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackComponent