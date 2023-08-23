import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({

  card: {
    height: 117,
    width: 83,
    borderRadius: 10,
    margin: 5,
    elevation: 3,
  },

  // cardFront: {
  //   height: 117,
  //   width: 83,
  //   borderRadius: 10,
  //   margin: 5,
  //   elevation: 3,
  // },

  // cardBack: {
  //   height: 117,
  //   width: 83,
  //   borderRadius: 10,
  //   margin: 5,
  //   elevation: 3,
  // },

  cardImage: {
    height: 117,
    width: 83,
    borderRadius: 10,
  },

  flipped: {
    borderWidth: 2,
    borderColor: "#000",
  }
})

export default styles