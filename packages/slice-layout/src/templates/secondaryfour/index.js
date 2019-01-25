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
            <View style={styles.item} key={renderSecondaryRowOne[0].props.id}>{renderSecondaryRowOne[0]}</View>
            <View style={styles.itemSeparator}/>
            <View style={styles.item} key={renderSecondaryRowOne[1].props.id}>{renderSecondaryRowOne[1]}</View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.item} key={renderSecondaryRowTwo[0].props.id}>{renderSecondaryRowTwo[0]}</View>
            <View style={styles.itemSeparator}/>
            <View style={styles.item} key={renderSecondaryRowTwo[1].props.id}>{renderSecondaryRowTwo[1]}</View>
          </View>
        </View>
      );
  };

export default SecondaryFourSlice;