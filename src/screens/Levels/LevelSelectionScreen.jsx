import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button/Button';

import styles from "./LevelSelectionScreen.style"

const LevelSelectionScreen = () => {

    const navigation = useNavigation();

    const handleLevelSelection = (level) => {

        navigation.navigate("Game", { level });
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