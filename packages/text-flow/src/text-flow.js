import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import {
  measureElements,
  measureContainer,
  layoutText,
  InlineElement,
} from "./layout";
import { screenWidth } from "@times-components/utils";

class TextFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      height: null,
      needsLayout: true,
      screenWidth: screenWidth(props.isTablet)
    };
  }

  componentDidMount() {
    this.calculateLayout();
  }

  componentDidUpdate(prev) {
    const { elements, isTablet } = this.props;
    const {
      elements: pElements
    } = prev;
    if (
      elements !== pElements
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          content: [],
          height: null,
          needsLayout: true,
          screenWidth: screenWidth(isTablet)
        },
        () => {
          this.calculateLayout();
        }
      );
    }
  }

  async calculateLayout() {
    const { elements, results } = measureElements(this.renderChildren());
    const { screenWidth: width } = this.state;
    this.setState({
      content: elements
    });
    const sizes = await results;
    const [laidOut, height] = layoutText(width, sizes);
    this.setState({
      content: laidOut,
      height,
      needsLayout: false
    });
  }

  renderChildren() {
    const { elements } = this.props;

    return [
      <InlineElement align="left" start={0}>
        {style => (
          <View key="dropcap" style={[style]}>
            <Text
              selectable
            >
            </Text>
          </View>
        )}
      </InlineElement>,
      <Text selectable>
      </Text>
    ];
  }

  render() {
    const { elements } = this.props;
    const { height, needsLayout, content } = this.state;

    return (
      <View
        style={[
          {
            height
          },
        ]}
      >
        {content.length !== 0 && measureContainer(content)}
      </View>
    );
  }
}

TextFlow.propTypes = {
  dropCap: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

TextFlow.defaultProps = {};

export default props => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <TextFlow {...props} isTablet={isTablet}>
        {props.children}
      </TextFlow>
    )}
  </ResponsiveContext.Consumer>
);
