import { createWebpackConfig } from "haul";
import webpack from "webpack";

export default {
  webpack: env => {
    const config = createWebpackConfig(({ platform }) => ({
      entry: `./index.${platform}.js`
    }))({
      ...env,
      initializeCoreLocation:
        "../node_modules/react-native/Libraries/Core/InitializeCore.js"
    });
    
    config.plugins = [
      new webpack.IgnorePlugin(/^react-hot-loader$/),
      ...config.plugins
    ];
    config.module.rules[1].exclude = /\.\.\/node_modules(?!.*[\/\\](react|@expo|pretty-format|haul|metro))/;

    if (config.mode === "development") {
      config.resolve = {
        ...config.resolve,
        extensions: [`.android.js`, ".native.js", ".js"],
        mainFields: ["devModule", "dev", "react-native", "browser", "module", "main"],
      };
    }
    return config;
  }
};
