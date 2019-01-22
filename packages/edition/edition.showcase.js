import React from "react";
import { ScrollView } from "react-native";
import Responsive from "@times-components/responsive";
import { PrimaryTile } from "./src/tiles";
import { LeadOneFullWidthSlice, LeadOneAndOneSlice } from "./src/slices";
import leadOneAndOneData from "./fixtures/leadoneandone";

const renderChildren = tile => <ScrollView><Responsive>{tile}</Responsive></ScrollView>;

export default {
  children: [
    // Tiles
    {
      component: () =>
        renderChildren(
          <PrimaryTile tile={leadOneAndOneData.lead} withImage />
        ),
      name: "Tile - Primary (with image)",
      type: "story"
    },
    {
      component: () =>
        renderChildren(
          <PrimaryTile tile={leadOneAndOneData.lead} withImage={false} />
        ),
      name: "Tile - Primary (without image)",
      type: "story"
    },
    // Slices
    {
      component: () =>
        renderChildren(
          <LeadOneFullWidthSlice lead={leadOneAndOneData.lead} />
        ),
      name: "Slice - Lead One Full Width",
      type: "story"
    },
    {
      component: () =>
        renderChildren(
          <LeadOneAndOneSlice
            lead={leadOneAndOneData.lead}
            support={leadOneAndOneData.support}
          />
        ),
      name: "Slice - Lead One And One",
      type: "story"
    }
  ],
  name: "Edition"
};
