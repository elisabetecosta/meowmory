import React from 'react';
import { View, Text } from "react-native"

import usePreventBackNavigation from "../../hooks/usePreventBackNavigation"

const VictoryScreen = () => {

    usePreventBackNavigation()

    return (
        <View>
            <Text>title</Text>
        </View>
    )
}

export default VictoryScreen