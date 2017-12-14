import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from "rollup-plugin-node-resolve";
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/index.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel(babelrc()),
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'ethical-jobs-sdk',
      sourceMap: true,
    },
    // {
    //   dest: pkg.module,
    //   format: 'es',
    //   sourceMap: true
    // }
  ]
};