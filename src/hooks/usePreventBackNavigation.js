import React from "react"
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

const usePreventBackNavigation = () => {
    
    useFocusEffect(
        React.useCallback(() => {

            const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
                //Prevent navigating back for the entire app
                return true;
            });

            return () => subscription.remove();
        }, [])
    )
};

export default usePreventBackNavigation