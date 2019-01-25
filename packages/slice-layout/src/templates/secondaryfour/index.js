import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const SecondaryFourSlice = ({
  renderSecondary1,
  renderSecondary2,
  renderSecondary3,
  renderSecondary4
}) => {

    const renderSecondaryRowOne = [renderSecondary1(), renderSecondary2()];
    const renderSecondaryRowTwo = [renderSecondary3(), renderSecondary4()];
    return (
        <View style={styles.container}>
          <View style={styles.itemContainer}>
            {renderSecondaryRowOne.map(support => (
              <View style={styles.item} key={support.props.id}>{support}</View>
            ))}
          </View>
          <View style={styles.itemContainer}>
            {renderSecondaryRowTwo.map(support => (
              <View style={styles.item} key={support.props.id}>{support}</View>
            ))}
          </View>
        </View>
      );
  };

export default SecondaryFourSlice;