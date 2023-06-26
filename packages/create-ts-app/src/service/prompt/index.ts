import inquirer, { type DistinctQuestion } from 'inquirer';

export const ModuleMap = {
  commonjs: 'commonjs',
  esm: 'esnext',
} as const;
export type TModuleMap = typeof ModuleMap;
export const TargetList = ['es5', 'es6', 'esnext'] as const;
export type TTargetList = typeof TargetList;

export interface Answer {
  name: string;
  module: TModuleMap[keyof TModuleMap];
  target: TTargetList[number];
}

const PATTERN_PROJECT_NAME = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export const QuestionList: ReadonlyArray<DistinctQuestion<Answer> & { name: keyof Answer }> = [
  {
    name: 'name',
    type: 'input',
    validate(input: string) {
      if (PATTERN_PROJECT_NAME.test(input)) return true;

      return `project name must match pattern: "${PATTERN_PROJECT_NAME}"`;
    },
  },
  {
    name: 'module',
    type: 'list',
    choices: Object.entries(ModuleMap)
      .map(([key, value]) => ({ key, value })),
  },
  {
    name: 'target',
    type: 'list',
    choices: TargetList,
  },
];

export class PromptService {
  constructor(readonly questionKeys: (keyof Answer)[]) {
  }

  async prompt() {
    return inquirer.prompt<Answer>(QuestionList.filter(question => this.questionKeys.includes(question.name)));
  }
}
