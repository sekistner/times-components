import React from "react";
import { View, Text } from "react-native";
// import styles from "../styles";

const styles = {
  container: {
    flex:1,
    flexDirection:'row',
    borderBottomWidth: 1,
    borderStyle: "solid",
    width:"100%"
  },
  itemContainer: {
    flex:1,
    borderBottomWidth: 1,
    borderStyle: "solid",
    width:"50%"
  }
};

const SecondaryFourSlice = ({
  renderSecondary1,
  renderSecondary2,
  renderSecondary3,
  renderSecondary4
}) => {

    const renderSecondaryRowOne = [renderSecondary1(), renderSecondary2()];
    const renderSecondaryRowTwo = [renderSecondary3(), renderSecondary4()];
    return (
      <View >
        <View style={styles.container}>
          {renderSecondaryRowOne.map(support => (
            <View style={styles.itemContainer} key={support.props.id}>{support}</View>
          ))}
        </View>
        <View style={styles.container}>
          {renderSecondaryRowTwo.map(support => (
            <View style={styles.itemContainer} key={support.props.id}>{support}</View>
          ))}
        </View>
      </View>
      );
  };

export default SecondaryFourSlice;