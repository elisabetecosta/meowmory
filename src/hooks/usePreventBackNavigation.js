import { useCallback } from "react"
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'


// Custom hook to prevent back navigation when the component is in focus
const usePreventBackNavigation = () => {
    
     // useFocusEffect hook triggers when the component gains focus
    useFocusEffect(

        useCallback(() => {

            // Add an event listener for the hardware back button press
            const subscription = BackHandler.addEventListener('hardwareBackPress', () => {

                //Prevent navigating back for the entire app
                return true;
            });

            // Clean up the event listener when the component loses focus
            return () => subscription.remove();
        }, [])
    )
};

export default usePreventBackNavigation