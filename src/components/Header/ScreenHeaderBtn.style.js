import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
    tintColor: COLORS.light,
  }),
});

export default styles