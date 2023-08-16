import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MixOrMatch from '../../MixOrMatch';
import Button from '../../components/Button/Button';

import styles from "./LevelSelectionScreen.style"

const LevelSelectionScreen = () => {

    const navigation = useNavigation();

    const handleLevelSelection = (level) => {

        // Pass the selected level to the MixOrMatch logic component
        const gameLogic = new MixOrMatch(level);

        navigation.navigate("Game", { logic: gameLogic });
    };

    return (
        <View style={styles.container}>
            <Button text="Easy" handlePress={() => handleLevelSelection('easy')} />
            <Button text="Medium" handlePress={() => handleLevelSelection('medium')} />
            <Button text="Hard" handlePress={() => handleLevelSelection('hard')} />
        </View>
    );
};

export default LevelSelectionScreen