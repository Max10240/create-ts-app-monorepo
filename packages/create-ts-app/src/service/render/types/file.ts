import path from 'node:path';
import { DIR_TPL } from '@/constants/index.js';

export enum ETplName {
  fatherrcTs = 'fatherrcTs',
  packageJson = 'packageJson',
  tsconfigJson = 'tsconfigJson',
  vitestConfigTs = 'vitestConfigTs',
  test__tsconfigJson = 'test__tsconfigJson',
}

export const TplFilepathMap = {
  fatherrcTs: path.join(DIR_TPL, '.fatherrc.ts.njk'),
  packageJson: path.join(DIR_TPL, 'package.json.njk'),
  tsconfigJson: path.join(DIR_TPL, 'tsconfig.json.njk'),
  vitestConfigTs: path.join(DIR_TPL, 'vitest.config.ts.njk'),
  test__tsconfigJson: path.join(DIR_TPL, 'test/tsconfig.json.njk'),
};

export const TplRenderToFilepathMap: Record<ETplName, string> = {
  fatherrcTs: '.fatherrc.ts',
  packageJson: 'package.json',
  tsconfigJson: 'tsconfig.json',
  vitestConfigTs: 'vitest.config.ts',
  test__tsconfigJson: 'test/tsconfig.json',
};

