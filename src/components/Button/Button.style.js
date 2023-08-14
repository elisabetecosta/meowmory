import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({
    
  btnContainer: {
    backgroundColor: "#fff",
    color: COLORS.secondary,
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },

  btnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
})

export default styles