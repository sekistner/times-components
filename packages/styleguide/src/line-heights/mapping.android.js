import { editionBreakpoints } from "@times-components/styleguide";
import scales from "../scales";
import mappingBase from "./mapping-base";

const mapping = ({ breakpoint, scale, tileName }) => {
  switch (scale) {
    case scales.large:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: 31,
          secondary: 31
        },
        supporting: {
          button: 17,
          keyFactsTitle: 20,
          link: 14
        }
      };
    case scales.xlarge:
      return {
        ...mappingBase,
        body: {
          ...mappingBase.body,
          bodyMobile: 33,
          secondary: 33
        },
        supporting: {
          button: 18,
          keyFactsTitle: 22,
          link: 15
        }
      };
    default:
        switch (tileName) {
          case "TileP": {
            switch (breakpoint) {
              case editionBreakpoints.medium:
                return {
                  headline: {
                    tileLeadHeadline: 25
                  }
                };
              default:
                return {
                  headline: {
                    tileLeadHeadline: 35
                  }
                };
            }
          }
        default:
         return {...mappingBase}
    }
  }
};

export default mapping;
