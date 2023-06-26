import { ETplName, RenderService } from '@/service/render/index.js';
import { expect, test } from 'vitest';
import * as process from 'process';

const renderService = new RenderService(process.cwd());

test('render tsconfig', async () => {
  const contentCjsES2017 = await renderService.render(ETplName.tsconfigJson, {
    module: 'commonjs',
    target: 'es2017',
  });
  const contentEsm = await renderService.render(ETplName.tsconfigJson, {
    module: 'esnext',
  });

  expect(contentCjsES2017).toMatchSnapshot('commonjs-es2017');
  expect(contentEsm).toMatchSnapshot('esm');
});

test('render fatherrc', async () => {
  const content = await renderService.render(ETplName.fatherrcTs, {});

  expect(content).toMatchSnapshot('fatherrc');
});

test('render package.json', async () => {
  const contentESM = await renderService.render(ETplName.packageJson, {
    name: 'project-name-0',
    author: 'Max <max@gmail.com>',
    isESM: true,
  });
  const contentDefault = await renderService.render(ETplName.packageJson, {
    name: 'project-name-1',
  });

  expect(contentESM).toMatchSnapshot('project0-esm-max');
  expect(contentDefault).toMatchSnapshot('project1-esm-max');
});
