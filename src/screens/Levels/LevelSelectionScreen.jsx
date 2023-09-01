import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button/Button';

import { COLORS } from "../../constants"
import Title from '../../components/Title/Title';

const LevelSelectionScreen = () => {

    const navigation = useNavigation();

    const handleLevelSelection = (level) => {

        navigation.navigate("Game", { level });
    };

    return (
        <View style={styles.container}>
            <Title text="LEVEL SELECTION" />
            <View style={styles.wrapper} >
                <Button text="Easy" theme="easy" handlePress={() => handleLevelSelection('easy')} />
                <Button text="Medium" theme="medium" handlePress={() => handleLevelSelection('medium')} />
                <Button text="Hard" theme="hard" handlePress={() => handleLevelSelection('hard')} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: COLORS.primary,
    },

    wrapper: {
        marginVertical: 100
    },
})

export default LevelSelectionScreen