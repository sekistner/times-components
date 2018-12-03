/* eslint-disable react/prop-types */

import React from "react";
import { View } from "react-native";
import { colours } from "@times-components/styleguide";

const authorsAST = require("./fixtures/authors.json");

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const styles = {
  link: {
    color: colours.functional.action,
    textDecorationLine: "none"
  }
};

const ComponentWrapper = ({ children }) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>{children}</View>
);

const getProps = (select, decorateAction) => ({
  color: select("Section colours: ", colours.section),
  onAuthorPress: preventDefaultedAction(decorateAction)("onAuthorPress")
});

export default (Component, name) => ({
  children: [
    {
      component: ({ select }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.singleAuthor}
            {...getProps(select, decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Article Byline with a single author",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.singleInlineElement}
            {...getProps(select, decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Article Byline with a text only element",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.multipleAuthorsPipeSeparated}
            {...getProps(select, decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Article Byline with multiple authors",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.authorInTheBeginning}
            {...getProps(select, decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Article Byline with author in the beginning",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.authorAtTheEnd}
            {...getProps(select, decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Article Byline with author at the end",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.multipleAuthorsPipeSeparated}
            style={styles}
            {...getProps(select, decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Article Byline with styles",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.veryLongByline}
            {...getProps(select, decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Article Byline that is impossibly long",
      type: "story"
    }
  ],
  name
});
