import lineHeightMapping from "./mapping";

export default (breakpoint, scale, tileName) => ({ font, fontSize }) => {
  const mapping = lineHeightMapping({ breakpoint, scale, tileName });
  return mapping[font][fontSize];
};
