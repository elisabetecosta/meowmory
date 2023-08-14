import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'

import { COLORS, icons } from "../constants"

//import components that will show in the home page
import ScreenHeaderBtn from "../components/Header/ScreenHeaderBtn"
import WelcomeScreen from "../screens/Home/WelcomeScreen"
import RulesScreen from "../screens/Rules/RulesScreen"
import GameScreen from "../screens/Game/GameScreen"

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
                            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
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
                    name="Game"
                    component={GameScreen}
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

//https://www.youtube.com/playlist?list=PLdDT8if5attFMHps_Mn6DfXw-BsIyWb3u

//https://youtu.be/6vvaEjpu5VU?t=287
//https://reactnavigation.org/docs/hello-react-navigation
//https://stackoverflow.com/questions/52307978/how-to-disable-react-navigations-stack-navigator-transition