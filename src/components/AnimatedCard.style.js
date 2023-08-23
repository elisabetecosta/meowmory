import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    flipCard: {
        height: 117,
        width: 83,
        alignItems: "center",
        justifyContent: "center",
        backfaceVisibility: "hidden",
    },

    flipCardBack: {
        position: "absolute",
        top: 0,
    },

    cardImage: {
        height: 117,
        width: 83,
        borderRadius: 10,
      },
})

export default styles