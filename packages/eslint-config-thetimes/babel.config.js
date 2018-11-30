module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-react-display-name"
    ],
    presets: ["module:metro-react-native-babel-preset"]
  };
};
