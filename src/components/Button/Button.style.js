import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({
    
  btnContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },

  btnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
    textAlign: "center"
  },

  default: {
    backgroundColor: COLORS.light,
  },

  easy: {
    backgroundColor: COLORS.easy,
  },

  medium: {
    backgroundColor: COLORS.medium,
  },

  hard: {
    backgroundColor: COLORS.hard,
  },

  btnTextCustom: {
    color: COLORS.light
  },
})

export default styles