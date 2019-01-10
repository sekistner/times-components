import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  query EditionGraphiQLAndroidTest {
    editions {
      list(first: 1) {
        ...edition
      }
    }
  }

  fragment edition on Edition {
    id
    publishedTime
    sections {
      id
      title
      colour {
        rgba {
          red
          green
          blue
          alpha
        }
      }
      ... on StandardSection {
        ...standardSection
      }
    }
  }

  fragment standardSection on StandardSection {
    slices {
      ... on ArticleSlice {
        sliceName: __typename
        items {
          ...tile
        }
      }
      ... on LeadOneAndOneSlice {
        lead {
          ...tile
        }
        support {
          headline
          strapline
          teaser
        }
      }
    }
  }

  fragment tile on Tile {
    article {
      ...article
    }
  }

  fragment article on Article {
    id
    shortHeadline
    headline
    template
    publishedTime
    updatedTime
    byline
    label
    standfirst
    leadAsset {
      ... on Image {
        crop169: crop(ratio: "16:9") {
          url
        }
        crop32: crop(ratio: "3:2") {
          url
        }
        id
        title
      }
      ... on Video {
        posterImage {
          crop169: crop(ratio: "16:9") {
            url
          }
          crop32: crop(ratio: "3:2") {
            url
          }
          id
          title
        }
      }
    }
  }
`);
