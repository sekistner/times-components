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

class TextFlow extends Component {
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
    const { scale, font, paragraphs } = this.props;
    const { scale: pScale, font: pFont, paragraphs: pParagraphs } = prev;
    if (
      scale !== pScale ||
      font !== pFont ||
      paragraphs !== pParagraphs
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
    const { font, scale, children } = this.props;
    const stylesThemedAndScaled = styleFactory(font, scale);
    const 

    /* return [
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
    */
  }

  render() {
    const { font, scale } = this.props;
    const { height, needsLayout, content } = this.state;
    const stylesThemedAndScaled = styleFactory(font, scale);

    return (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <View
            style={[
              stylesThemedAndScaled.articleMainContentRow,
              {
                height
              }
            ]}
          >
            {needsLayout === true && (
              <Text
                selectable
                style={[stylesThemedAndScaled.articleTextElement]}
              >
              </Text>
            )}
            {content.length !== 0 && measureContainer(content)}
          </View>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

TextFlow.propTypes = {

};

TextFlow.defaultProps = {

};

export default TextFlow;