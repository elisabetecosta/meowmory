import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.secondary,
  },

  cardsContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    padding: 5,
    backgroundColor: "#fff",
    margin: 20,
  }
})

export default styles