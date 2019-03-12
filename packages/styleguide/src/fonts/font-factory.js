import timesStyleguide from "../styleguide";

export default ( scale ) => ({ breakpoint, font, fontSize, tileName }) => {
  console.log('stylegide: breakpoint, font, fontSize, tileName', breakpoint, font, fontSize, tileName);
  const styleguide = timesStyleguide({ breakpoint, scale, tileName });
  return {
    fontFamily: styleguide.fonts[font],
    fontSize: styleguide.fontSizes[fontSize],
    lineHeight: styleguide.lineHeight({ font, fontSize })
  };
};
