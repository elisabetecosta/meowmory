import * as React from "react"
import { TouchableOpacity, Image } from "react-native"
import { useNavigation } from '@react-navigation/native'

import styles from "./ScreenHeaderBtn.style"

const ScreenHeaderBtn = React.memo(({ iconUrl, dimension, screen }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.btnContainer} onPress={() => screen ? navigation.navigate(screen) : navigation.goBack()}>
            <Image source={iconUrl} resizeMode="cover" style={styles.btnImg(dimension)}
            />
        </TouchableOpacity>
    )
})

export default ScreenHeaderBtn