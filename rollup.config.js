import minify from 'rollup-plugin-minify-es'

const banner = '/**\n * Functions\n *\n * Copyright 2018 Dmitry Dudin <dima@nuware.ru>\n */'

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/functions.esm.js',
    format: 'esm',
    banner
  }
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/functions.umd.js',
    format: 'umd',
    name: 'nuware.F',
    banner
  }
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/functions.min.js',
    format: 'umd',
    name: 'nuware.F'
  },
  plugins: [
    minify()
  ]
}]
