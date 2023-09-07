import { StyleSheet } from "react-native"
import { COLORS } from "../../constants"

const styles = StyleSheet.create({

  card: {
    margin: 10,
  },

  cardFront: {
    position: "absolute",
    height: 117,
    width: 83,
    borderRadius: 10,
    elevation: 3
  },

  cardBack: {
    backfaceVisibility: "hidden",
    height: 117,
    width: 83,
    borderRadius: 10,
    elevation: 3
  },

  cardImage: {
    height: 117,
    width: 83,
    borderRadius: 10,
  },
})

export default styles