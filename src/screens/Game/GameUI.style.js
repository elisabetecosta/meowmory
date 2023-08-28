import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  gameInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },

  gameInfo: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: "#fff",
    marginRight: 20
  },

  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    // backgroundColor: "#fff",
    marginBottom: 20,
    marginHorizontal: 20,
  },
})

export default styles