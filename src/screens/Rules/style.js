import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },

  title: {
    fontFamily: FONT.special,
    fontSize: SIZES.xxxLarge,
    color: COLORS.light,
    marginTop: 50,
    marginBottom: 50,
  },

  text: {
    fontFamily: FONT.special,
    fontSize: SIZES.xxxLarge,
    color: COLORS.light,
    marginTop: 50,
    marginBottom: 50,
  },
})

export default styles