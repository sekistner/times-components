import timesStyleguide from "../styleguide";

export default (breakpoint, scale, tileName) => ({ font, fontSize }) => {
  const styleguide = timesStyleguide({ breakpoint, scale, tileName });
  return {
    fontFamily: styleguide.fonts[font],
    fontSize: styleguide.fontSizes[fontSize],
    lineHeight: styleguide.lineHeight({ font, fontSize })
  };
};
