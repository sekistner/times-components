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
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import styleFactory from "./styles";
import Context from "@times-components/context";

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
    const children = this.renderChildren();
    if (children.length) {
      const { elements, results } = measureElements(this.renderChildren());
      const { screenWidth: width } = this.state;
      this.setState({
        content: elements,
        needsLayout: true
      });
      const sizes = await results;
      const [laidOut, height] = layoutText(width, sizes);
      this.setState({
        content: laidOut,
        height,
        needsLayout: false
      });
    }
  }

  renderChildren() {
    const { elements, theme } = this.props;
    const { dropCap, scale } = theme;
    const stylesThemedAndScaled = styleFactory(dropCap, scale);

    const renderers = {
      ...coreRenderers,
      paragraph(key, attrs, renderedChildren) {
        return {
          element: <Text style={stylesThemedAndScaled.articleTextElement}>{renderedChildren.join("")}</Text>
        }
      },
      text(key, attrs) {
        return {
          element: <Text style={stylesThemedAndScaled.articleTextElement}>{attrs.value}</Text>
        }
      },
      dropcap(key, attrs, renderChildren) {
        return {
          element: (<InlineElement align="left" start={0}>
            {style =>
              <View style={style}>
                <Text style={stylesThemedAndScaled.dropCapTextElement}>
                  {attrs.value}
                </Text>
              </View>
            }
          </InlineElement>)
        }
      }
    };

    return elements.map(element => renderTree(element, renderers));
  }

  render() {
    const { height, needsLayout, content } = this.state;
    const { elements, theme, isTablet } = this.props;
    const { dropCap, scale } = theme;
    const stylesThemedAndScaled = styleFactory(dropCap, scale);

    return (
      <View
        style={[
          stylesThemedAndScaled.articleMainContentRow,
          {
            height
          },
          isTablet && stylesThemedAndScaled.dropCapContainerTablet,
        ]}
      >
        {content.length !== 0 && measureContainer(content)}
      </View>
    );
  }
}

TextFlow.propTypes = {
  elements: PropTypes.array.isRequired
};

TextFlow.defaultProps = {};

export default props => (
  <Context.Consumer>
    {({ theme }) =>
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <TextFlow {...props} theme={theme} isTablet={isTablet}>
            {props.children}
          </TextFlow>
        )}
      </ResponsiveContext.Consumer>
    }
  </Context.Consumer>
);
