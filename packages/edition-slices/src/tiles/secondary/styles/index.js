import { StyleSheet } from "react-native";
import { fontFactory, spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "secondaryFourMobileSliceHeadline"
    }),
    lineHeight: 22,
    marginBottom: 11
  }
});

export default styles;
