import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { dirname } from 'desm';
import { Capitalize } from '../src/utils/str.js';
import { glob } from '../src/utils/file.js';

const __dirname = dirname(import.meta.url);

const DIR_TPL = path.join(__dirname, '..', 'templates');
const TPL_SUFFIX = '.njk';
const TPL_PATTERN = `**/*${TPL_SUFFIX}`;

const SPACE = ' ';
const NUM_INDENT = 2;

const PATH_OUTPUT = path.join(__dirname, '..', 'src', 'service', 'render', 'types', 'file.ts');

function normalizeIndent(str: string) {
  const lines = str.split('\n');
  const indent = lines[0].match(/\s+/)?.[0].length;

  return lines.map(l => l.slice(indent)).join('\n');
}

function getTplName(file: string) {
  return file
    .slice(0, -TPL_SUFFIX.length)
    .replace(/\//g, '__')
    .split('.')
    .filter(Boolean)
    .map((f, i) => i ? Capitalize(f) : f)
    .join('');
}

function getTplRenderToPath(tpl: string) {
  return tpl.slice(0, -TPL_SUFFIX.length);
}

function getTrimStartIndent(indentLevel: number, index: number) {
  return SPACE.repeat(NUM_INDENT * indentLevel * (+!!index));
}

(async function () {
  const files = await glob(TPL_PATTERN, { cwd: DIR_TPL });

  const TplNameList = files.map(getTplName);
  const TplNameEnumItemContent = TplNameList
    .map((name, index) => `${getTrimStartIndent(2, index)}${name} = '${name}',`)
    .join('\n');
  const pathMapContent = files
    .map((file, index) => `${getTrimStartIndent(2, index)}${TplNameList[index]}: path.join(DIR_TPL, '${file}'),`)
    .join('\n');
  const renderToPathMapContent = files
    .map((file, index) => `${getTrimStartIndent(2, index)}${TplNameList[index]}: '${getTplRenderToPath(file)}',`)
    .join('\n');

  const content = `
  import path from 'node:path';
  import { DIR_TPL } from '@/constants/index.js';
  
  export enum ETplName {
    ${TplNameEnumItemContent}
  }
  
  export const TplFilepathMap = {
    ${pathMapContent}
  };
  
  export const TplRenderToFilepathMap: Record<ETplName, string> = {
    ${renderToPathMapContent}
  };
  
  `.slice(1);

  await writeFile(PATH_OUTPUT, normalizeIndent(content));
})();
