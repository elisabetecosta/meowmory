import { StyleSheet, View, ScrollView, Text } from "react-native"

import Title from "../../components/Title/Title"

import { COLORS, FONT, SIZES } from "../../constants"


const RulesScreen = () => {

    return (
        <View style={styles.container} >
            <Title text="How to play" />

            <ScrollView style={styles.textContainer}>

                <View style={styles.wrapper}>
                    <Text style={styles.subtitle}>Game Objective:</Text>
                    <Text style={styles.text}>Match all pairs of cards{'\n'}{'\n'}</Text>

                    <Text style={styles.subtitle}>How to play:</Text>
                </View>


                <Text style={styles.text}>1. Tap on a card to flip it over and reveal the image.</Text>
                <Text style={styles.text}>2. Try to remember the positions of the images.</Text>
                <Text style={styles.text}>3. Tap on another card to find its matching pair.</Text>
                <Text style={styles.text}>4. If the images match, the cards stay flipped. If not, they flip back.</Text>
                <Text style={styles.text}>5. Match all pairs before time runs out or flips exceed the limit.</Text>

                <Text style={styles.subtitle}>{'\n'} Easy Mode:</Text>
                <Text style={styles.text}>- 60 seconds</Text>
                <Text style={styles.text}>- unlimited flips</Text>

                <Text style={styles.subtitle}>{'\n'} Medium Mode:</Text>
                <Text style={styles.text}>- 45 seconds</Text>
                <Text style={styles.text}>- unlimited flips</Text>

                <Text style={styles.subtitle}>{'\n'} Hard Mode:</Text>
                <Text style={styles.text}>- 30 seconds</Text>
                <Text style={styles.text}>- 16 flips {'\n'}</Text>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },

    wrapper: {
        alignItems: "center"
    },

    textContainer: {
        marginHorizontal: 30,
        marginBottom: 50,
        padding: 20,
    },

    subtitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.light,
        textAlign: "left",
        marginBottom: 10,
    },

    text: {
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.light,
        textAlign: "left",
        marginBottom: 5,
    },
})

export default RulesScreen