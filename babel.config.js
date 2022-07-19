module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: ['@babel/plugin-transform-runtime'],
  sourceType: 'unambiguous',
  comments: false,
  env: {
    test: {
      presets: ['@babel/preset-env'],
      plugins: ['istanbul']
    }
  }
}
