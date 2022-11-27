const override = (config, env) => {
  console.log("in override");
  config.resolve = {
    fallback: {
      "buffer": require.resolve('buffer'),
      "crypto": require.resolve('crypto-browserify'),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve('util'),
    },
    extensions: ['.js', '.jsx'],
  };
  env.compilerOptions = {
    "baseUrl": "src",
    "paths": {
      "src/*": ["src/*"],
      "components/*": ["src/components/*"],
      "api/*": ["src/api/*"],
      "contexts/*": ["src/contexts/*"],
      "core/*": ["src/core/*"],
      "utils/*": ["src/utils/*"],
    },
  };

  return config;
};

module.exports = override;