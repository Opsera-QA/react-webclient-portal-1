const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "process/browser": require.resolve('process/browser'),
    "url": require.resolve("url"),
  };
  config.ignoreWarnings = [/Failed to parse source map/];
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      "process": "process/browser",
      "Buffer": ["buffer", "Buffer"],
    }),
  ]);
  return config;
};
