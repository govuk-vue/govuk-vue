const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

const config = {
  components: 'src/components/govuk-vue/**/[A-Z]*.vue',
  //components: 'src/components/govuk-vue/checkboxes/GvCheckbox.vue',
  require: [
    // Components style
    path.join(__dirname, 'node_modules/govuk-frontend/govuk/all.scss')
  ],
  webpackConfig: {
    resolve: {
      extensions: ['.ts', '.js'],
      alias: { '@': path.resolve(__dirname, 'src') }
    },
    module: {
      rules: [
        // Vue loader
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: ['vue-style-loader', 'css-loader', 'sass-loader']
              //ts: ['babel-loader', 'ts-loader']
            }
          }
        },
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      ]
    },
    plugins: [
      // add vue-loader plugin
      new VueLoaderPlugin()
    ]
  }
}

// Add additionnal scss loader for scss files
config.webpackConfig.module.rules.push({
  test: /\.scss$/,
  use: [
    {
      loader: 'style-loader' // creates style nodes from JS strings
    },
    {
      loader: 'css-loader' // translates CSS into CommonJS
    },
    {
      loader: 'sass-loader' // compiles Sass to CSS
    }
  ]
})

module.exports = config
