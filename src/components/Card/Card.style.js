import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({

  cardFront: {
    height: 117,
    width: 83,
    borderRadius: 10,
    position: "absolute",
    margin: 5,
    elevation: 3,
  },

  cardBack: {
    height: 117,
    width: 83,
    borderRadius: 10,
    backfaceVisibility: "hidden",
    margin: 5,
    elevation: 3,
  },

  cardImage: {
    height: 117,
    width: 83,
    borderRadius: 10,
  },
})

export default styles