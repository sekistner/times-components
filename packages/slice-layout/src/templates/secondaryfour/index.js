import React from "react";
import { View, Text } from "react-native";
// import styles from "../styles";

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
        <View>
          {renderSecondaryRowOne.map(support => (
            <View key={support.props.id}>{support}</View>
          ))}
        </View>
        <View>
          {renderSecondaryRowTwo.map(support => (
            <View key={support.props.id}>{support}</View>
          ))}
        </View>
      </View>
      );
  };

export default SecondaryFourSlice;