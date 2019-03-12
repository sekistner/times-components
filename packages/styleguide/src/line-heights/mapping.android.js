import scales from "../scales";
import mappingBase from "./mapping-base";

const mapping = ({ breakpoint, scale, tileName }) => {
  switch (scale) {
    case scales.large:
      return {
        ...mappingBase(breakpoint, tileName),
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
        ...mappingBase(breakpoint, tileName),
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
      return {
        ...mappingBase(breakpoint, tileName);
        switch (tileName) {
          case "TileP": {
            switch (breakpoint) {
              case scales.medium:
                return {
                  tileLeadHeadline: 25
                };
              default:
                return {
                  tileLeadHeadline: 35
                };
            }
          }
        }
      }
  }
};

export default mapping;
