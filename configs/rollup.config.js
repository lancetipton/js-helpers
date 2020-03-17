import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps'
import buildHook from './buildHook'
import { terser } from 'rollup-plugin-terser'

const { DEV_MODE } = process.env
const babelConfig = require('./babel.config.js')
const buildPath = `./build`
const onwarn = wrn => wrn.code !== 'CIRCULAR_DEPENDENCY' &&
  console.error(`(!) ${wrn.message}`)

const inputs = {
  array: 'src/array.js',
  boolean: 'src/boolean.js',
  collection: 'src/collection.js',
  ext: 'src/ext.js',
  log: 'src/log.js',
  method: 'src/method.js',
  number: 'src/number.js',
  object: 'src/object.js',
  promise: 'src/promise.js',
  string: 'src/string.js',
  url: 'src/url.js',
}

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

const buildConfig = (type, extra={}) => {
  return {
    input: extra.input || {
      index: `./src/index.js`,
      ...inputs
    },
    output: extra.output || {
      dir: `${buildPath}/${type}`,
      format: type,
      sourcemaps: true,
      ...extra.output
    },
    plugins: [
      ...(extra.plugins || []),
      ...plugins,
    ],
    watch: { clearScreen: false },
    onwarn,
  }
}

export default Array.from([ 'umd', 'cjs', 'esm' ])
  .map(type => {
    return type !== 'umd'
      ? buildConfig(type)
      : buildConfig(type, {
          input: `./src/index.js`,
          output: {
            name: 'jsutils',
            file: `${buildPath}/${type}/index.js`,
            format: type,
            sourcemaps: true,
            esModule: false,
          },
          plugins: [ terser() ]
        })

  })

