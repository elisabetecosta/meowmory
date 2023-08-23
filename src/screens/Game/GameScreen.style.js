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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: "#fff",
    margin: 20,
  },

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
})

export default styles