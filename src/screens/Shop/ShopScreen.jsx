import { StyleSheet, View, ScrollView, Text } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const ShopScreen = () => {

    return (
        <View style={styles.container} >
            <Text style={styles.text}>working on it</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
    },

    text: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xxLarge,
        color: COLORS.light,
        textAlign: "left",
    },
})

export default ShopScreen