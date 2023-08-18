import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
  }
})

export default styles