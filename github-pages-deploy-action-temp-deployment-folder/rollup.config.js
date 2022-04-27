import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import cleaner from 'rollup-plugin-cleaner';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

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
      peerDepsExternal(),
      typescript({
        tsconfig: './tsconfig.prod.json',
      }),
      isProd && terser(),
    ],
    external: [
      '@spinfi/number',
      '@spinfi/shared',
      '@spinfi/websocket',
      'nanoid',
      'near-api-js',
      'near-transaction-manager',
      'rxjs',
    ],
  },
];
