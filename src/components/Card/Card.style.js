import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({

  card: {
    height: 117,
    width: 83,
    borderRadius: 10,
    margin: 5
  },

  cardFace: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    transitionProperty: 'transform',
    transitionDuration: '500ms',
    transitionTimingFunction: 'ease-in-out',
  },

  cardImage: {
    height: 117,
    width: 83,
    borderRadius: 10,
  },

  cardBack: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  visible: {
    transform: [{ rotateY: '180deg' }],
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.35)',
  },
})

export default styles