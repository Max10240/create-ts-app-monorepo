import path from 'node:path';
import { writeFile } from '@/utils/file.js';
import { AsyncNunjucks } from 'async-nunjucks';
import { DIR_TPL } from '@/constants/index.js';
import { ETplName, TplFilepathMap, TplRenderToFilepathMap } from './types/file.js';
import type { ObjectEntries } from '@/types.js';


export interface RenderContext {
  [ETplName.tsconfigJson]: {
    module: string;
    target?: string;
  };
  [ETplName.fatherrcTs]: {
    isESM?: boolean;
  };
  [ETplName.packageJson]: {
    name: string;
    isESM?: boolean;
    author?: string;
  };
  [ETplName.test__vitestConfigMts]: {};
  [ETplName.src__indexTs]: {};
  [ETplName.test__tsconfigJson]: {};
  [ETplName.test__indexTestTs]: {};
}

export class RenderService {
  protected engine = new AsyncNunjucks({
    loader: [DIR_TPL],
    configure: {
      autoescape: false,
    },
  });

  constructor(readonly renderToRoot: string) {
  }

  async render<T extends keyof RenderContext>(name: T, ctx: RenderContext[T]) {
    const tplPath = TplFilepathMap[name];

    return await this.engine.renderPromise(tplPath, ctx);
  }

  async write<T extends keyof RenderContext>(name: T, ctx: RenderContext[T]) {
    const content = await this.render(name, ctx);

    await writeFile(path.join(this.renderToRoot, TplRenderToFilepathMap[name]), content);
  }

  async writeAll(options: RenderContext) {
    for (let [name, basePath] of Object.entries(TplRenderToFilepathMap) as ObjectEntries<typeof TplRenderToFilepathMap>) {
      await this.write(name, options[name]);
    }
  }
}

export { ETplName };
