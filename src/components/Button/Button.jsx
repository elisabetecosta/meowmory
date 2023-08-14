import * as React from "react"
import { TouchableOpacity, Text } from 'react-native'
import styles from "./Button.style"

const Button = ({ text, handlePress }) => {

    return <TouchableOpacity style={styles.btnContainer} onPress={handlePress}><Text style={styles.btnText}>{text}</Text></TouchableOpacity>
}

export default Button