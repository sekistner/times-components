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
import { colours } from "@times-components/styleguide";

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
    const { dropCapFont, scale } = theme;
    const stylesThemedAndScaled = styleFactory(dropCapFont, scale);

    const renderers = {
      ...coreRenderers,
      paragraph(key, attrs, renderedChildren) {
        return {
          shouldRenderChildren: true,
          element: renderedChildren
        }
      },
      bold(key, attrs, renderedChildren) {
        return {
          shouldRenderChildren: true,
          element: renderedChildren.map(child => {
            return React.cloneElement(child, {
              style: {
                ...child.props.style,
                fontWeight: "bold"
              }
            })
          })
        }
      },
      text(key, attrs) {
        return {
          element: <Text style={stylesThemedAndScaled.articleTextElement}>{attrs.value}</Text>
        }
      },
      dropcap(key, attrs, renderedChildren) {
        return {
          element: (<InlineElement align="left" start={0}>
            {style =>
              <View style={style}>
                <Text style={[stylesThemedAndScaled.dropCapTextElement, {
                  color: theme.sectionColour || colours.section.default
                }]}>
                  {attrs.value}
                </Text>
              </View>
            }
          </InlineElement>
          )
        }
      }
    };

    const children = elements.map(element => renderTree(element, renderers));

    return children;
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
