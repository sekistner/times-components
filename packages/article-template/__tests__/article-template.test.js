import React from "react";
import TestRenderer from "react-test-renderer";
import ArticleTemplate from "../src/article-template";
import ArticleMainStandard from "@times-components/article-main-standard";
import ArticleMainComment from "../../article-main-comment/dist/article-main-comment";

const requiredProps = {
  analyticsStream: ()=>{},
  isLoading: false,
  error: null,
  adConfig: {},
  onAuthorPress: () => {},
  onCommentGuidelinesPress: () => {},
  onCommentsPress: () => {},
  onLinkPress:() => {},
  onRelatedArticlePress: () => {},
  onTopicPress: () => {},
  onTwitterLinkPress: () => {},
  onVideoPress: () => {},
  onViewed: () => {},
  receiveChildList: () => {},
  refetch: () => {}
}

describe("ArticleTemplate", () => {
  it("renders with ArticleMainStandard as the default template if no template is provided", () => {
    const testRenderer = TestRenderer.create(<ArticleTemplate {...requiredProps} />);
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("renders with ArticleMainStandard if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(<ArticleTemplate template="mainstandard" {...requiredProps} />);
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainStandard)).toBeTruthy();
  });

  it("renders with ArticleComment if the correct template is chosen", () => {
    const testRenderer = TestRenderer.create(<ArticleTemplate template="maincomment" {...requiredProps} />);
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(ArticleMainComment)).toBeTruthy();
  })
});
