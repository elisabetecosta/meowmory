import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({

  cardFront: {
    position: "absolute",
    height: 117,
    width: 83,
    borderRadius: 10,
    margin: 5,
    // elevation: 3,
  },

  cardBack: {
    backfaceVisibility: "hidden",
    height: 117,
    width: 83,
    borderRadius: 10,
    margin: 5,
    // elevation: 3,
  },

  cardImage: {
    height: 117,
    width: 83,
    borderRadius: 10,
  },

  // flipped: {
  //   borderWidth: 2,
  //   borderColor: "#000",
  // }
})

export default styles