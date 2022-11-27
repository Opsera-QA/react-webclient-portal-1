const override = (config, env) => {
  config.resolve = {
    fallback: {
      "buffer": require.resolve('buffer'),
      "crypto": require.resolve('crypto-browserify'),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve('util'),
    },
    extensions: ['.js', '.jsx'],
  };

  console.log("config: " + JSON.stringify(config));
  return config;
};

module.exports = override;