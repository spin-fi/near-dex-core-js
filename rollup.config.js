import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import cleaner from 'rollup-plugin-cleaner';

const isProd = process.env.NODE_ENV === 'production';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'build/index.js',
        format: 'cjs',
      },
      {
        file: 'build/index.esm.js',
        format: 'esm',
      },
    ],
    plugins: [
      cleaner({
        targets: ['./build/'],
      }),
      typescript({
        tsconfig: './tsconfig.prod.json',
      }),
      isProd && terser(),
    ],
    external: [
      '@near-wallet-selector/core',
      '@spinfi/number',
      '@spinfi/shared',
      '@spinfi/websocket',
      'nanoid',
      'near-api-js',
      'rxjs',
    ],
  },
];
