import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  gameInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.primary,
    paddingBottom: 5,
    elevation: 3
  },

  gameInfoText: {
    fontFamily: FONT.special,
    fontSize: SIZES.xxLarge,
    color: COLORS.light,
    paddingHorizontal: 5
  },

  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',

    marginBottom: 20,
    marginHorizontal: 20,
  },
})

export default styles