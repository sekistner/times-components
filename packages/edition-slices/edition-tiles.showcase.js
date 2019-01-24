import React from "react";
import { PrimaryTile } from "./src/tiles";
import leadOneAndOneDataGenerator from "./fixtures/leadoneandone";

const leadOneAndOneData = leadOneAndOneDataGenerator();

export default {
  children: [
    {
      component: () => <PrimaryTile tile={leadOneAndOneData.lead} withImagePosition='top' />,
      name: "Primary (with image) on top",
      type: "story"
    },
    {
      component: () => <PrimaryTile tile={leadOneAndOneData.lead} withImagePosition='bottom' />,
      name: "Primary (with image) on bottom",
      type: "story"
    },
    {
      component: () => (
        <PrimaryTile tile={leadOneAndOneData.lead} />
      ),
      name: "Primary (without image)",
      type: "story"
    }
  ],
  name: "Composed/Edition/Tiles"
};
