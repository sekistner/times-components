import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import PropTypes from "prop-types";
import styleFactory from "./styles";
import { propTypes, defaultProps } from "./drop-cap-prop-types";
import { measureElements, measureContainer, layoutText, InlineElement } from "@times-components/utils";

class DropCapParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      needsLayout: true,
      height: null,
      screenWidth: Dimensions.get("window").width
    };
  }

  async componentDidMount() {
    const { elements, results } = measureElements(this.renderChildren())
    this.setState({
      content: elements
    });
    const sizes = await results
    const [laidOut, height] = layoutText(this.state.screenWidth, sizes)
    this.setState({
      content: laidOut,
      needsLayout: false,
      height
    })
  }

  renderChildren() {
    const { colour, dropCap, font, scale, text } = this.props;
    const stylesThemedAndScaled = styleFactory(font, scale);

    return [
      <InlineElement align="left" start={0}>
        {style =>
          <View style={[style]}>
            <Text
              selectable
              style={[
                stylesThemedAndScaled.dropCapTextElement,
                {
                  color: colour
                }
              ]}
            >
              {dropCap}
            </Text>
          </View>
        }
      </InlineElement>,
      <Text
        selectable
        style={stylesThemedAndScaled.articleTextElement}
      >
        {text}
      </Text>
    ]
  }

  render() {
    const { font, scale, text } = this.props;
    const stylesThemedAndScaled = styleFactory(font, scale);

    return (<View
      style={[
        stylesThemedAndScaled.articleMainContentRow,
        stylesThemedAndScaled.dropCapContainer,
        {
          height: this.state.height
        }
      ]}
    >
      {
        this.state.needsLayout === true && <Text
          selectable
          style={stylesThemedAndScaled.articleTextElement}
        >
          {text}
        </Text>
      }
      {
        this.state.content.length !== 0 && measureContainer(this.state.content)
      }
    </View>)
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
