import { join } from 'path';
import { RollupOptions } from 'rollup';
import json from '@rollup/plugin-json';

const baseDir = process.cwd();

const config: RollupOptions = {
  input: {
    main: join(baseDir, 'node', 'index.ts'),
    preload: join(baseDir, 'node', 'preload.ts'),
  },
  output: {
    dir: 'dist/main',
    format: 'cjs',
  },
  plugins: [json()],
};

export default config;
