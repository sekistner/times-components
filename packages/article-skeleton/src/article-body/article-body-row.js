import React from "react";
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ArticleImage from "@times-components/article-image";
import ArticleParagraph from "@times-components/article-paragraph";
import Ad from "@times-components/ad";
import Context from "@times-components/context";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import { renderTree } from "@times-components/markup-forest";
import coreRenderers from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import { colours } from "@times-components/styleguide";
import Video from "@times-components/video";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";
import styleFactory from "../styles/article-body";
import Paragraph from "./text-layout/paragraph";
import InlineElement from "./text-layout/inlineElement";

const styles = styleFactory();

const ArticleRow = ({
  content: { data, index },
  interactiveConfig,
  next,
  onLinkPress,
  onTwitterLinkPress,
  onVideoPress
}) =>
  renderTree(data, {
    ...coreRenderers,
    ad(key, attributes) {
      return {
        element: (
          <Ad
            key={key}
            slotName="native-inline-ad"
            style={styles.ad}
            {...attributes}
          />
        )
      };
    },
    image(key, { display, ratio, url, caption, credits }, children, i, tree) {
const article = "Patients with injuries that are not life-threatening will have to wait longer in A&E, the head of the NHS indicated today. Simon Stevens, chief executive of NHS England, gave a strong hint that the main target will be relaxed after hospitals failed to hit it for two years. Theresa May refused yesterday to guarantee that a £20 billion NHS budget boost, part of a new ten-year plan for the future of the NHS, would bring down waiting times. Today Mr Stevens suggested that the proposals would effectively end the commitment that all A&E patients should be assessed and either treated or admitted to a bed within four hours. The Times revealed this morning the plans will not demand that hospitals start hitting A&E or routine…"

      return {
        shouldRenderChildren: false,
        element: (
          <View key={key}>
            <View style={{ flex: 1, height: 1000, margin: 30, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <Paragraph>
                <InlineElement start={0} align="left">
                  {style =>
                    <View key="test" style={style}>
                      <Image style={{width: 300, height: 600, marginRight: 10}} source={{uri:url}}/>
                    </View>
                  }
                </InlineElement>
                <Text style={{ fontSize: 18 }}>{article}</Text>
                <Text style={{ fontSize: 18 }}>{article.toUpperCase()}</Text>
              </Paragraph>
            </View>

            {/*
            <ArticleImage
              captionOptions={{
                caption,
                credits
              }}
              imageOptions={{
                display,
                ratio,
                uri: url
              }}
            />
            */}
          </View>
        )
      };
    },
    interactive(key, { id }) {
      return {
        element: (
          <View key={key} style={styles.interactiveContainer}>
            <InteractiveWrapper config={interactiveConfig} id={id} />
          </View>
        )
      };
    },
    keyFacts(key, attributes, renderedChildren, indx, node) {
      return {
        element: <KeyFacts ast={node} key={key} onLinkPress={onLinkPress} />,
        shouldRenderChildren: false
      };
    },
    link(key, attributes, children) {
      const { canonicalId, href: url, type } = attributes;

      return {
        element: (
          <ArticleLink
            key={key}
            linkType={attributes.type}
            onPress={e => onLinkPress(e, { canonicalId, type, url })}
            url={url}
            uuid={index}
          >
            {children}
          </ArticleLink>
        )
      };
    },
    paragraph(key, attributes, children, indx, node) {
      return {
        element: (
          <Context.Consumer key={key}>
            {({
              theme: { dropCapFont, sectionColour = colours.section.default }
            }) => (
                <ArticleParagraph
                  ast={node}
                  dropCapColour={sectionColour}
                  dropCapFont={dropCapFont}
                  uid={index}
                >
                  {children}
                </ArticleParagraph>
              )}
          </Context.Consumer>
        )
      };
    },
    pullQuote(
      key,
      {
        caption: { name, text, twitter }
      },
      children
    ) {
      return {
        element: (
          <Context.Consumer key={key}>
            {({
              theme: { pullQuoteFont, sectionColour = colours.section.default }
            }) => (
                <View>
                  <PullQuote
                    caption={name}
                    captionColour={sectionColour}
                    font={pullQuoteFont}
                    onTwitterLinkPress={onTwitterLinkPress}
                    quoteColour={sectionColour}
                    text={text}
                    twitter={twitter}
                  >
                    {children}
                  </PullQuote>
                </View>
              )}
          </Context.Consumer>
        )
      };
    },
    video(
      key,
      {
        brightcovePolicyKey,
        brightcoveVideoId,
        brightcoveAccountId,
        posterImageUrl,
        caption,
        skySports
      }
    ) {
      const aspectRatio = 16 / 9;

      const { width } = Dimensions.get("window");
      const height = width / aspectRatio;

      return {
        element: (
          <View key={key} style={styles.primaryContainer}>
            <Video
              accountId={brightcoveAccountId}
              height={height}
              onVideoPress={onVideoPress}
              policyKey={brightcovePolicyKey}
              poster={{ uri: posterImageUrl }}
              skySports={skySports}
              videoId={brightcoveVideoId}
              width={width}
            />
            <InsetCaption caption={caption} />
          </View>
        )
      };
    }
  });

ArticleRow.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.object,
      children: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string
    }),
    index: PropTypes.number
  }).isRequired,
  interactiveConfig: PropTypes.shape({}).isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired
};

export default ArticleRow;
