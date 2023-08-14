import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({

  card: {
    position: "relative",
    height: 165,
    width: 115,
    borderRadius: 10
  },

  image: {
    height: "inherit",
    width: "inherit"
  },

  cardBack: {
    border: 2,
    borderColor: COLORS.light,
  },

  cardBackImg: {
    height: 165,
    width: 115,
  },

  cardFrontImg: {
    height: 165,
    width: 115,
  },

})

export default styles