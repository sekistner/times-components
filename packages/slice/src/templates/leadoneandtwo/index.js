import React from "react";
import { View } from "react-native";
import Responsive, { ResponsiveContext } from "@times-components/responsive";
import { colours } from "@times-components/styleguide";
import { leadConfig, supportConfig } from "./config";
import propTypes from "./proptypes";
import styles from "../styles";

const tabletStyles = {
  container: {
    flexDirection: "row"
  },
  itemContainer: {
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  leadContainer: {
    borderBottomColor: colours.functional.keyline,
    borderBottomWidth: 1,
    borderStyle: "solid",
    margin: 5,
    width: "70%"
  },
  supportContainer: {
    flexDirection: "column",
    margin: 5,
    width: "30%"
  }
};

const LeadOneAndTwoSlice = ({ renderLead, renderSupport1, renderSupport2 }) => {
  const support1 = renderSupport1(supportConfig);
  const support2 = renderSupport2(supportConfig);
  const supports = [support1, support2];
  return (
    <ResponsiveContext.Consumer>
      {({ isTablet }) => (
        <View style={isTablet ? tabletStyles.container : styles.container}>
          <View
            style={isTablet ? tabletStyles.leadContainer : styles.itemContainer}
          >
            <View style={isTablet ? tabletStyles.item : styles.item}>
              {renderLead(leadConfig)}
            </View>
          </View>
          <View style={isTablet ? tabletStyles.supportContainer : null}>
            {supports.filter(support => support).map(support => (
              <View
                key={support.props.id}
                style={
                  isTablet ? tabletStyles.itemContainer : styles.itemContainer
                }
              >
                <View style={isTablet ? tabletStyles.item : styles.item}>
                  {support}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </ResponsiveContext.Consumer>
  );
};

LeadOneAndTwoSlice.propTypes = propTypes;

export default LeadOneAndTwoSlice;
