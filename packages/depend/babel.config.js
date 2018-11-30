module.exports = api => {
  api.cache(true);
  return {
    plugins: [
      "@babel/plugin-transform-react-display-name",
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: 2
        }
      ]
    ],
    presets: ["module:metro-react-native-babel-preset"]
  };
};
