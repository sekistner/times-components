import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import {
  measureElements,
  measureContainer,
  layoutText,
  InlineElement
} from "@times-components/utils";
import { tabletWidth } from "@times-components/styleguide";
import styleFactory from "./styles";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

class DropCapParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      height: null,
      needsLayout: true,
      screenWidth: Dimensions.get("window").width
    };
  }

  componentDidMount() {
    this.calculateLayout();
  }

  componentDidUpdate(prev) {
    const { scale, font, text, dropCap } = this.props;
    const { scale: pScale, font: pFont, text: pText, dropCap: pDropCap } = prev;
    if (
      scale !== pScale ||
      font !== pFont ||
      text !== pText ||
      dropCap !== pDropCap
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          content: [],
          height: null,
          needsLayout: true,
          screenWidth: Dimensions.get("window").width
        },
        () => {
          this.calculateLayout();
        }
      );
    }
  }

  async calculateLayout() {
    const { elements, results } = measureElements(this.renderChildren());
    const { font, scale } = this.props;
    const { screenWidth } = this.state;
    const stylesThemedAndScaled = styleFactory(font, scale);
    const {
      articleMainContentRow: { paddingLeft, paddingRight }
    } = stylesThemedAndScaled;
    this.setState({
      content: elements
    });
    const sizes = await results;
    const width = screenWidth > tabletWidth ? tabletWidth : screenWidth;
    const [laidOut, height] = layoutText(
      width - paddingLeft - paddingRight,
      sizes
    );
    this.setState({
      content: laidOut,
      height,
      needsLayout: false
    });
  }

  renderChildren() {
    const { colour, font, scale, text } = this.props;
    const stylesThemedAndScaled = styleFactory(font, scale);

    return [
      <InlineElement align="left" start={0}>
        {style => (
          <View key="dropcap" style={[style]}>
            <Text
              selectable
              style={[
                stylesThemedAndScaled.dropCapTextElement,
                {
                  color: colour
                }
              ]}
            >
              {text[0]}
            </Text>
          </View>
        )}
      </InlineElement>,
      <Text selectable style={stylesThemedAndScaled.articleTextElement}>
        {text.slice(1)}
      </Text>
    ];
  }

  render() {
    const { font, scale, text, dropCap } = this.props;
    const { height, needsLayout, content } = this.state;
    const stylesThemedAndScaled = styleFactory(font, scale);

    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <View
            style={[
              stylesThemedAndScaled.articleMainContentRow,
              stylesThemedAndScaled.dropCapContainer,
              {
                height
              },
              isTablet && stylesThemedAndScaled.dropCapContainerTablet
            ]}
          >
            {needsLayout === true && (
              <Text
                selectable
                style={[stylesThemedAndScaled.articleTextElement]}
              >
                {dropCap + text}
              </Text>
            )}
            {content.length !== 0 && measureContainer(content)}
          </View>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

DropCapParagraph.propTypes = {
  ...propTypes,
  dropCap: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

DropCapParagraph.defaultProps = defaultProps;

export default DropCapParagraph;