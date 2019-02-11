/* eslint-disable consistent-return */

import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleComments from "@times-components/article-comments";
import { AdComposer } from "@times-components/ad";
import RelatedArticles from "@times-components/related-articles";
import Responsive, { ResponsiveContext } from "@times-components/responsive";
import { withTrackScrollDepth } from "@times-components/tracking";
import { normaliseWidth, screenWidthInPixels } from "@times-components/utils";
import ArticleRow from "./article-body/article-body-row";
import ArticleTopics from "./article-topics";
import ArticleContent from "./article-content";
import {
  articleSkeletonPropTypes,
  articleSkeletonDefaultProps
} from "./article-skeleton-prop-types";
import listViewDataHelper from "./data-helper";
import articleTrackingContext from "./article-tracking-context";
import { templateWithDropCaps } from "./dropcap-util";
import styles from "./styles/shared";

const listViewPageSize = 1;
const listViewSize = 10;
const listViewScrollRenderAheadDistance = 10;

const renderRow = analyticsStream => (
  rowData,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onRelatedArticlePress,
  onTopicPress,
  onTwitterLinkPress,
  onVideoPress,
  interactiveConfig,
  dropcapsDisabled
) => {
  // eslint-disable-next-line default-case
  switch (rowData.type) {
    case "articleBodyRow": {
      return (
        <ArticleRow
          content={rowData}
          interactiveConfig={interactiveConfig}
          onLinkPress={onLinkPress}
          onTwitterLinkPress={onTwitterLinkPress}
          onVideoPress={onVideoPress}
          dropcapsDisabled={dropcapsDisabled}
        />
      );
    }

    case "relatedArticleSlice": {
      const { relatedArticleSlice } = rowData.data;
      return (
        <ResponsiveContext.Consumer>
          {({ isTablet }) => (
            <View style={isTablet && styles.relatedArticlesTablet}>
              <RelatedArticles
                analyticsStream={analyticsStream}
                onPress={onRelatedArticlePress}
                slice={relatedArticleSlice}
              />
            </View>
          )}
        </ResponsiveContext.Consumer>
      );
    }

    case "topics": {
      return (
        <ArticleTopics onPress={onTopicPress} topics={rowData.data.topics} />
      );
    }

    case "comments": {
      return (
        <ArticleComments
          articleId={rowData.data.articleId}
          onCommentGuidelinesPress={onCommentGuidelinesPress}
          onCommentsPress={onCommentsPress}
          url={rowData.data.url}
        />
      );
    }
  }
};

class ArticleSkeleton extends Component {
  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);

    if (props.data) {
      this.state = {
        dataSource: props.data,
        width: normaliseWidth(screenWidthInPixels())
      };
    } else {
      this.state = {
        dataSource: {}
      };
    }
  }

  onViewableItemsChanged(info) {
    if (!info.changed.length) return [];

    const { onViewed } = this.props;
    const { dataSource } = this.state;

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(viewableItem => onViewed(viewableItem.item, dataSource));
  }

  render() {
    const {
      adConfig,
      analyticsStream,
      Header,
      interactiveConfig,
      onAuthorPress,
      onCommentGuidelinesPress,
      onCommentsPress,
      onLinkPress,
      onRelatedArticlePress,
      onTopicPress,
      onTwitterLinkPress,
      onViewed,
      onVideoPress,
      receiveChildList
    } = this.props;
    const { dataSource, width } = this.state;
    const { dropcapsDisabled, template, content } = dataSource;
    if (!dataSource.content) {
      return null;
    }

    const articleOrganised = listViewDataHelper({
      ...dataSource,
      content
    });
    const articleData = articleOrganised.map((item, index) => ({
      ...item,
      elementId: `${item.type}.${index}`,
      name: item.type
    }));

    receiveChildList(articleData);

    const articleDropcapsDisabled = dropcapsDisabled || !templateWithDropCaps.includes(template) || false;

    const articleDataNew = [...articleData];
    for (let idx = 0; idx < articleData.length; idx += 1) {
      const row = articleData[idx];
      const { data } = row;
      if (idx === 0 && data.name === "paragraph" && !articleDropcapsDisabled) {
        const children = [
          {
            name: 'dropcap',
            attributes: { value: data.children[0].attributes.value[0] },
            children: []
          },
          {
            ...data.children[0],
            attributes: {
              value: data.children[0].attributes.value.slice(1)
            }
          }
        ];
        let next = articleData[idx + 1];
        while (next && next.data.name === "paragraph") {
          idx += 1;
          children.push(next.data);
          articleDataNew[idx + 1] = null;
          next = articleData[idx + 1];
        }
        articleDataNew[0] = {
          ...row,
          data: {
            name: 'textFlow',
            children
          }
        }
      }
    };

    return (
      <AdComposer adConfig={adConfig}>
        <Responsive>
          <ArticleContent
            data={articleDataNew.slice(0, 1)}
            Header={Header}
            initialListSize={listViewSize}
            interactiveConfig={interactiveConfig}
            onAuthorPress={onAuthorPress}
            onCommentGuidelinesPress={onCommentGuidelinesPress}
            onCommentsPress={onCommentsPress}
            onLinkPress={onLinkPress}
            onRelatedArticlePress={onRelatedArticlePress}
            onTopicPress={onTopicPress}
            onTwitterLinkPress={onTwitterLinkPress}
            onVideoPress={onVideoPress}
            onViewableItemsChanged={
              onViewed ? this.onViewableItemsChanged : null
            }
            pageSize={listViewPageSize}
            renderRow={renderRow(analyticsStream)}
            scrollRenderAheadDistance={listViewScrollRenderAheadDistance}
            width={width}
            dropcapsDisabled={articleDropcapsDisabled}
          />
        </Responsive>
      </AdComposer>
    );
  }
}

ArticleSkeleton.propTypes = {
  ...articleSkeletonPropTypes,
  interactiveConfig: PropTypes.shape({}),
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};
ArticleSkeleton.defaultProps = {
  ...articleSkeletonDefaultProps,
  interactiveConfig: {}
};

export default articleTrackingContext(withTrackScrollDepth(ArticleSkeleton));
