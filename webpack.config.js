const {
  webpack, createConfig, customConfig, defineConstants, env, performance, addPlugins, entryPoint, setOutput, sourceMaps,
} = require('@webpack-blocks/webpack2');

const babel = require('@webpack-blocks/babel6');
const devServer = require('@webpack-blocks/dev-server2');
const path = require('path');

const plugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),  
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    },
    screwIe8: true,
    sourceMap: false
  }),
];

module.exports = createConfig([
  entryPoint(path.resolve(__dirname, 'src/index.js')),
  setOutput({
    path: path.resolve(__dirname, 'lib'),
    filename: 'ethical-jobs.js',
    library: 'EthicalJobs',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  }),
  babel(),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV
  }),
  customConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  }),
  env('development', [
    sourceMaps(),
    performance({
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000,
    }),
  ]),
  env('production', [  
    addPlugins(plugins),
  ]),
])