import path from 'node:path';
import { DIR_TPL } from '@/constants/index.js';

export enum ETplName {
  fatherrcTs = 'fatherrcTs',
  packageJson = 'packageJson',
  tsconfigJson = 'tsconfigJson',
  src__indexTs = 'src__indexTs',
  test__indexTestTs = 'test__indexTestTs',
  test__tsconfigJson = 'test__tsconfigJson',
  test__vitestConfigMts = 'test__vitestConfigMts',
}

export const TplFilepathMap = {
  fatherrcTs: path.join(DIR_TPL, '.fatherrc.ts.njk'),
  packageJson: path.join(DIR_TPL, 'package.json.njk'),
  tsconfigJson: path.join(DIR_TPL, 'tsconfig.json.njk'),
  src__indexTs: path.join(DIR_TPL, 'src/index.ts.njk'),
  test__indexTestTs: path.join(DIR_TPL, 'test/index.test.ts.njk'),
  test__tsconfigJson: path.join(DIR_TPL, 'test/tsconfig.json.njk'),
  test__vitestConfigMts: path.join(DIR_TPL, 'test/vitest.config.mts.njk'),
};

export const TplRenderToFilepathMap: Record<ETplName, string> = {
  fatherrcTs: '.fatherrc.ts',
  packageJson: 'package.json',
  tsconfigJson: 'tsconfig.json',
  src__indexTs: 'src/index.ts',
  test__indexTestTs: 'test/index.test.ts',
  test__tsconfigJson: 'test/tsconfig.json',
  test__vitestConfigMts: 'test/vitest.config.mts',
};

