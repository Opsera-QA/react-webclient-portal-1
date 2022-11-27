const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);

const override = (config, env) => {
  config.resolve = {
    fallback: {
      "buffer": require.resolve('buffer'),
      "crypto": require.resolve('crypto-browserify'),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve('util'),
    },
    alias: Object.assign(config.resolve.alias, {
      "components": resolve("src/components"),
      "api": resolve("src/api"),
      "core": resolve("src/core"),
      "contexts": resolve("src/contexts"),
      "hooks": resolve("src/hooks"),
      "markdown": resolve("src/markdown"),
      "temp-library-components": resolve("src/temp-library-components"),
      "routes": resolve("src/routes"),
      "utils": resolve("src/utils"),
    }),
    extensions: ['.js', '.jsx'],
  };

  console.log("config: " + JSON.stringify(config));
  return config;
};

module.exports = override;