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
          link: 16
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
          link: 17
        }
      };
    default:
      return mappingBase(breakpoint, tileName);
  }
};

export default mapping;
