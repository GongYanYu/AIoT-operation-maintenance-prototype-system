module.exports = {
  // npm install webpack style-loader css-loader postcss-loader autoprefixer --save -dev
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    'postcss-px2rem-exclude': {
      remUnit: 14,
      exclude: '/node_modules/i',
    }
  }
}
