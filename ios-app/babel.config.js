module.exports = (api) => {
  api.cache(true)

  return {
    "presets": ["module:metro-react-native-babel-preset"],
    "plugins": [
      ["flow-react-proptypes", { "ignoreNodeModules": true }],
      "styled-components",
      "add-react-displayname",
      require.resolve("@babel/plugin-proposal-class-properties"),
      require.resolve("@babel/plugin-transform-runtime"),
      require.resolve("@babel/plugin-proposal-export-default-from"),
      [
        "module-resolver",
        {
          "alias": {
            "react-dom/server": "../node_modules/react-apollo/react-apollo.browser.umd.js"
          }
        }
      ]
    ]
  }
}