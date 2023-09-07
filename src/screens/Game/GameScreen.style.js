import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },

  gearIconWrapper: {
    backgroundColor: COLORS.primary,
    alignItems: "flex-end",
    padding: 15
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  
  icon: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
    tintColor: COLORS.light,
  }),

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalWrapper: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: "80%",
  },

  closeButtonWrapper: {
    alignItems: "flex-end",
    margin: 10,
  },

  modalContent: {
    padding: 20,
    alignItems: "center",
  },

  gameInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.primary,
    paddingBottom: 5,
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

    marginBottom: 30,
    marginHorizontal: 20,
  },
})

export default styles