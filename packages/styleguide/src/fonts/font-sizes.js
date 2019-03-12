import { editionBreakpoints } from "@times-components/styleguide";
import scales from "../scales";
import sharedFontSizes from "./font-sizes-base";

const fontSizes = (breakpoint, scale, tileName) => {
  switch (scale) {
    case scales.large:
      return {
        ...sharedFontSizes,
        bodyMobile: 21,
        button: 17,
        cardMetaMobile: 17,
        keyFactsTitle: 17,
        link: 14,
        secondary: 21
      };
    case scales.xlarge:
      return {
        ...sharedFontSizes,
        bodyMobile: 23,
        button: 18,
        cardMetaMobile: 19,
        keyFactsTitle: 19,
        link: 15,
        secondary: 23
      };
    default:
    switch (tileName) {
      case "TileP": {
        switch (breakpoint) {
          case editionBreakpoints.medium:
            return {
                tileLeadHeadline: 25
            };
          default:
            return {
                tileLeadHeadline: 35
            };
        }
      }
    default:
     return {...sharedFontSizes}}
  }
};

export default fontSizes;
