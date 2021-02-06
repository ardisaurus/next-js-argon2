# next-js-argon2

Argon 2 implementation in NextJS

## Dependencies

- [argon2-browser](https://www.npmjs.com/package/argon2-browser)
- [base64loader](https://www.npmjs.com/package/base64-loader)

## Webpack config override
This webpack config override supposed to fix `Failed to parse source map: TypeError: Cannot read property 'start' of undefined argon2-browser` error.
1. Create `next.config.js` file.
2. Insert this codes in `next.config.js`.

```js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.wasm$/,
      loaders: ["base64-loader"],
      type: "javascript/auto",
    });

    config.module.noParse = /\.wasm$/;

    config.module.rules.forEach((rule) => {
      (rule.oneOf || []).forEach((oneOf) => {
        if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
          oneOf.exclude.push(/\.wasm$/);
        }
      });
    });

    config.node = {
      fs: "empty",
    };

    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // Important: return the modified config
    return config;
  },
};
```

3. Run with `yarn dev`
