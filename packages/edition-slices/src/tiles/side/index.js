import React from "react";
import { View } from "react-native";
import { ArticleFlags } from "@times-components/article-flag";
import ArticleSummary, {
  ArticleSummaryContent,
  ArticleSummaryHeadline
} from "@times-components/article-summary";
import Image from "@times-components/image";
import { colours } from "@times-components/styleguide";
import styles from "./styles"

export default ({
  tile: {
    article: {
      flags,
      hasVideo,
      headline,
      label,
      leadAsset,
      section,
      shortHeadline,
      summary125
    }
  }
}) => (
  <View style={{flexDirection: "row", padding: 10}}>
    <View style={{backgroundColor: "red", width: "44%"}}></View>
    <View style={{backgroundColor: "blue"}}>
    <ArticleSummary
      flags={() => <ArticleFlags flags={flags} />}
      headline={() => (
        <ArticleSummaryHeadline
          headline={headline || shortHeadline}
          style={styles.headline}
        />
      )}
      label={label}
      labelProps={{
        color: colours.section[section] || colours.section.default,
        isVideo: hasVideo,
        title: label
      }}
      // style={withSummaryMargins && styles.summaryContainer}
    />
    </View>
  </View>
);
