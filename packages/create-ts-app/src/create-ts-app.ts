#!/usr/bin/env node
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { join } from 'desm';

import { cac } from 'cac';
import { PromptService, RenderService, ETplName, type Answer, executeCmdWithResult } from './service/index.js';
import * as process from 'process';

interface ICliOption {
  module?: string;
  target?: string;
}

async function getGitUserInfo(): Promise<{ name: string; email: string } | null> {
  const [name, email] = [
    await executeCmdWithResult('git config user.name'),
    await executeCmdWithResult('git config user.email'),
  ];

  if (name && email) return { name, email };
  return null;
}

const version = JSON.parse(readFileSync(join(import.meta.url, '../../package.json'), 'utf8')).version;

const cli = cac('create-ts-app');

cli
  .option('-m, --module <module>', 'module type')
  .option('-t, --target <target>', 'target')
  .help()
  .usage('[OPTION]... [NAME]')
  .version(version);

const { args, options } = cli.parse() as { args: string[], options: ICliOption };

if (cli.options.help || cli.options.version) process.exit();

(async function () {
  const promptQuestionNames: (keyof Answer)[] = [
    ...(['module', 'target'] as const).filter(name => !options[name]),
    ...(args[0] ? [] : ['name'] as const),
  ];
  const promptResult = await new PromptService(promptQuestionNames).prompt();

  const finalOptions = { ...options, ...promptResult } as Answer;

  const gitUserInfo = await getGitUserInfo();

  const renderService = new RenderService(path.join(process.cwd(), finalOptions.name));
  await renderService.writeAll({
    [ETplName.fatherrcTs]: {},
    [ETplName.packageJson]: {
      name: finalOptions.name,
      isESM: finalOptions.module === 'esnext',
      author: gitUserInfo ? `${gitUserInfo.name} <${gitUserInfo.email}>` : void 0,
    },
    [ETplName.tsconfigJson]: {
      module: finalOptions.module,
      target: finalOptions.target,
    },
    [ETplName.vitestConfigMts]: {},
    [ETplName.src__indexTs]: {},
    [ETplName.test__tsconfigJson]: {},
    [ETplName.test__indexTestTs]: {},
  });

  console.log('done.');
})();
