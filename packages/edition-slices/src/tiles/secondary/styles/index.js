import { StyleSheet } from "react-native";
import { fontFactory, spacing } from "@times-components/styleguide";

const styles = StyleSheet.create({
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "secondaryFourMobileSliceHeadline"
    }),
    lineHeight: 22,
    marginBottom: 11
  },
  imageContainer: {
    marginBottom: spacing(2),
    width: "100%"
  }
});

export default styles;
