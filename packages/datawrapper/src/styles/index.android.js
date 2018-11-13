import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  DatawrapperBody: {
    ...sharedStyles.DatawrapperBody,
    color: "green"
  }
});

export default styles;
