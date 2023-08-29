import { StyleSheet } from "react-native"

import { COLORS, FONT, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingTop: 25,
  },

  image: {
    height: "50%",
    width: "50%",
    resizeMode: "contain",
  },

  wrapper: {
    flex: 1,  
    alignItems: "center",
    marginTop: 25,
  },
})

export default styles