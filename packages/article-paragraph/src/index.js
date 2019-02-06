/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { renderTreeAsText } from "@times-components/markup-forest";
import ArticleParagraph from "./article-paragraph";
import DropCapWrapper from "./drop-cap-with-context";
import {
  propTypes as dropCapPropTypes,
  defaultProps as dropCapDefaultProps
} from "./drop-cap-prop-types";

const ArticleParagraphWrapper = ({
  ast,
  children,
  dropCapColour,
  dropCapFont,
  uid,
  dropcapsDisabled,
  first
}) => {
  const { children: astChildren } = ast;
  if (!astChildren || astChildren.length === 0) {
    return null;
  }

  const { attributes } = astChildren[0];
  if (!dropcapsDisabled && first) {
    const { value } = attributes;
    const text = renderTreeAsText(ast);
    return (
      <DropCapWrapper
        colour={dropCapColour}
        dropCap={value}
        font={dropCapFont}
        key={`paragraph-${uid}`}
        testID={`paragraph-${uid}`}
        text={text}
      />
    );
  }
  return (
    <ArticleParagraph key={`paragraph-${uid}`} testID={`paragraph-${uid}`}>
      {children}
    </ArticleParagraph>
  );
};

ArticleParagraphWrapper.propTypes = {
  ast: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  dropCapColour: dropCapPropTypes.colour,
  dropCapFont: dropCapPropTypes.font,
  uid: PropTypes.number.isRequired,
  dropcapsDisabled: PropTypes.bool.isRequired,
  first: PropTypes.bool
};

ArticleParagraphWrapper.defaultProps = {
  dropCapColour: dropCapDefaultProps.dropCapColour,
  dropCapFont: dropCapDefaultProps.font,
  first: false
};

export default ArticleParagraphWrapper;
