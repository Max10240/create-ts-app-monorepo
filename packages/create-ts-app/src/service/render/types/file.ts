import path from 'node:path';
import { DIR_TPL } from '@/constants/index.js';

export enum ETplName {
  fatherrcTs = 'fatherrcTs',
  packageJson = 'packageJson',
  tsconfigJson = 'tsconfigJson',
  vitestConfigMts = 'vitestConfigMts',
  src__indexTs = 'src__indexTs',
  test__indexTestTs = 'test__indexTestTs',
  test__tsconfigJson = 'test__tsconfigJson',
}

export const TplFilepathMap = {
  fatherrcTs: path.join(DIR_TPL, '.fatherrc.ts.njk'),
  packageJson: path.join(DIR_TPL, 'package.json.njk'),
  tsconfigJson: path.join(DIR_TPL, 'tsconfig.json.njk'),
  vitestConfigMts: path.join(DIR_TPL, 'vitest.config.mts.njk'),
  src__indexTs: path.join(DIR_TPL, 'src/index.ts.njk'),
  test__indexTestTs: path.join(DIR_TPL, 'test/index.test.ts.njk'),
  test__tsconfigJson: path.join(DIR_TPL, 'test/tsconfig.json.njk'),
};

export const TplRenderToFilepathMap: Record<ETplName, string> = {
  fatherrcTs: '.fatherrc.ts',
  packageJson: 'package.json',
  tsconfigJson: 'tsconfig.json',
  vitestConfigMts: 'vitest.config.mts',
  src__indexTs: 'src/index.ts',
  test__indexTestTs: 'test/index.test.ts',
  test__tsconfigJson: 'test/tsconfig.json',
};

