import React from "react";
import {
  LeadOneFullWidthSlice,
  LeadOneAndOneSlice,
  SecondaryFour
} from "./src/slices";
import leadOneAndOneDataGenerator from "./fixtures/leadoneandone";
import secondaryFourGenerator from "./fixtures/secondaryfour";

const leadOneAndOneData = leadOneAndOneDataGenerator();
const secondaryFourData = secondaryFourGenerator();

export default {
  children: [
    {
      component: () => <LeadOneFullWidthSlice lead={leadOneAndOneData.lead} />,
      name: "Lead One Full Width",
      type: "story"
    },
    {
      component: () => (
        <LeadOneAndOneSlice
          lead={leadOneAndOneData.lead}
          support={leadOneAndOneData.support}
        />
      ),
      name: "Lead One And One",
      type: "story"
    },
    {
      component: () => (
        <SecondaryFour
          secondary1={secondaryFourData.secondary1}
          secondary2={secondaryFourData.secondary2}
          secondary3={secondaryFourData.secondary3}
          secondary4={secondaryFourData.secondary4}
        />
      ),
      name: "Secondary Four",
      type: "story"
    }
  ],
  name: "Composed/Edition/Slices"
};
