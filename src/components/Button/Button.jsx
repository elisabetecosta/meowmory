import React from "react"
import { TouchableOpacity, Text } from 'react-native'
import styles from "./Button.style"

const Button = React.memo(({ text, theme, handlePress }) => {

    return <TouchableOpacity style={[styles.btnContainer, styles[theme]]} onPress={handlePress}><Text style={[styles.btnText, theme !== "default" && styles.btnTextCustom]}>{text}</Text></TouchableOpacity>
})

export default Button