import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps'
import buildHook from './buildHook'

const { DEV_MODE } = process.env
const babelConfig = require('./babel.config.js')
const buildPath = `./build/`

const configs = [
  {
    input: `./src/index.js`,
    output: [
      {
        file: `${buildPath}/umd/index.js`,
        format: 'umd',
        sourcemaps: true,
        name: 'jsutils'
      },
      {
        file: `${buildPath}/esm/index.js`,
        format: 'esm',
        sourcemaps: true
      }
    ]
  },
  {
    input: `./src/node/index.js`,
    output: [
      {
        file: `${buildPath}/node/index.js`,
        format: 'cjs',
        sourcemaps: true
      },
    ]
  },
]

const plugins = [
  DEV_MODE && buildHook(DEV_MODE),
  replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  }),
  resolve(),
  commonjs({
    include: 'node_modules/**',
  }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    ...babelConfig
  }),
  sourcemaps(),
  cleanup(),
]

export default configs.map(config => ({
  ...config,
  watch: { clearScreen: false },
  plugins,
}))

