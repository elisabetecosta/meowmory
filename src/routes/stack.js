import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS, icons } from "../constants"

//import components that will show in the home page
import ScreenHeaderBtn from "../components/Header/ScreenHeaderBtn"
import HomeScreen from "../screens/Home/HomeScreen"
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
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.home} dimension="60%" screen="Rules" />
                        ),
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" screen="Levels" />
                        ),
                        headerTitle: ""
                    }}
                />

                {/* Rules screen */}
                <Stack.Screen
                    name="Rules"
                    component={RulesScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: ""
                    }}
                />

                {/* Level selection screen */}
                <Stack.Screen
                    name="Levels"
                    component={LevelSelectionScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: ""
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
                        params: { level: route.params?.level }
                    })}
                />

                {/* Victory screen */}
                <Stack.Screen
                    name="Victory"
                    component={VictoryScreen}
                    options={{
                        headerStyle: { backgroundColor: COLORS.primary },
                        headerShadowVisible: false,
                        headerTitle: ""
                    }}
                />

                {/* Game over screen */}
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