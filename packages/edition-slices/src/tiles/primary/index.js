import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline
} from "@times-components/article-summary";
import Image from "@times-components/image";
import { colours } from "@times-components/styleguide";
import styles from "./styles";

const renderImage = imageUri => (
  <View style={styles.imageContainer}>
    <Image aspectRatio={16 / 9} uri={imageUri} />
  </View>
);

const renderSummaryContent = summary => <ArticleSummaryContent ast={summary} />;

const PrimaryTile = ({
  tile: {
    article: {
      hasVideo,
      headline,
      label,
      leadAsset,
      section,
      shortHeadline,
      summary125
    }
  },
  withImagePosition
}) => (
  <View>
    {withImagePosition && withImagePosition === 'top' ? renderImage(leadAsset.crop169.url) : null}
    <ArticleSummary
      headline={() => (
        <ArticleSummaryHeadline headline={headline || shortHeadline} />
      )}
      label={label}
      labelProps={{
        color: colours.section[section] || colours.section.default,
        isVideo: hasVideo,
        title: label
      }}
    />
    {withImagePosition && withImagePosition === 'bottom'
      ? renderImage(leadAsset.crop169.url)
      : renderSummaryContent(summary125)}
  </View>
);

PrimaryTile.propTypes = {
  tile: PropTypes.shape({}).isRequired,
  wiwithImagePositionthImage: PropTypes.string
};

PrimaryTile.defaultProps = {
  withImagePosition: true
};

export default PrimaryTile;
