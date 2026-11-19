const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point of the application
  entry: './src/index.js',

  // Output configuration
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },

  // Resolve file extensions for imports
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // Module rules: JSX via Babel and CSS handling
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Babel config can also be placed in a .babelrc file
            // (we provide a separate .babelrc for clarity)
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],

  // Development server configuration – hot & live reload disabled to avoid WebSocket errors
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    historyApiFallback: true,
    hot: false,
    liveReload: false,
    client: {
      // Disable overlay for errors (optional)
      overlay: false,
    },
  },

  mode: 'development',
};
