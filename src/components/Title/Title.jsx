import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from "../../constants"


const Title = ({ text }) => {

    return <Text style={styles.title}>{text}</Text>
}


const styles = StyleSheet.create({
    title: {
        fontFamily:FONT.special,
        fontSize: SIZES.xxxLarge,
        color: COLORS.light,
        textAlign: "center",
        marginBottom: 25,
    },
})

export default Title