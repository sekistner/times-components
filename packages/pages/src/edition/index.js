import * as React from "react";
import { ScrollView, Text } from "react-native";
import { EditionProvider } from "@times-components/provider";
import RelatedArticles from "@times-components/related-articles";
import withNativeProvider from "../with-native-provider";

const EditionPage = () => {
  const EditionView = withNativeProvider(
    <EditionProvider debounceTimeMs={0}>
      {({ editions, isLoading }) => isLoading ? (
        <Text>Loading Editions</Text>
      ) :
        <ScrollView>
          {editions.list[0].sections[0].slices.map(slice =>
            (<RelatedArticles analyticsStream={() => { }} isVisible slice={slice} />)
          )}
        </ScrollView>
      }
    </EditionProvider>
  );
  return <EditionView />;
};

export default EditionPage;
