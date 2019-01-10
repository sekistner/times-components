import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";

const arrayIterator = function* (array) {
  for (let child of array) {
    yield child
  }
}

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

const ArticleContent = ({
  data,
  Header,
  interactiveConfig,
  onAuthorPress,
  onCommentsPress,
  onCommentGuidelinesPress,
  onLinkPress,
  onRelatedArticlePress,
  onTopicPress,
  onTwitterLinkPress,
  onVideoPress,
  onViewableItemsChanged,
  renderRow,
  width
}) => {
  const children = arrayIterator(data)
  const rows = []
  for (let row of children) {
    const next = () => children.next()
    rows.push({
      data: row,
      rendered: renderRow(
        row,
        next,
        onAuthorPress,
        onCommentsPress,
        onCommentGuidelinesPress,
        onLinkPress,
        onRelatedArticlePress,
        onTopicPress,
        onTwitterLinkPress,
        onVideoPress,
        interactiveConfig
      )
    })
  }
  return <FlatList
    data={rows}
    keyExtractor={item =>
      item.index ? `${item.data.type}.${item.data.index}` : item.data.type
    }
    ListHeaderComponent={<Header width={width} />}
    onViewableItemsChanged={onViewableItemsChanged}
    renderItem={({ item }) => item.rendered}
    testID="flat-list-article"
    viewabilityConfig={viewabilityConfig}
  />
};

ArticleContent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object.isRequired,
      index: PropTypes.number,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  Header: PropTypes.func,
  interactiveConfig: PropTypes.shape({}),
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  onViewableItemsChanged: PropTypes.func,
  renderRow: PropTypes.func.isRequired,
  width: PropTypes.number
};

ArticleContent.defaultProps = {
  Header: () => null,
  interactiveConfig: {},
  onViewableItemsChanged: () => { },
  width: null
};

export default ArticleContent;
