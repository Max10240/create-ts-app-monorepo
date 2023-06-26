import { Environment, type ConfigureOptions } from 'nunjucks';
import { FileSystemAsyncLoader } from 'nunjucks-async-loader';

interface TCtorOption {
  loader: ConstructorParameters<typeof FileSystemAsyncLoader>;
  configure?: ConfigureOptions;
}

class AsyncNunjucks extends Environment {
  constructor(opts: TCtorOption) {
    const loader = new FileSystemAsyncLoader(...opts.loader);

    super(loader as any, opts.configure);
  }

  async renderPromise(name: string, context?: object) {
    return new Promise<string>((resolve, reject) => {
      super.render(name, context, (err, res) => {
        if (err) return reject(err);

        resolve(res!);
      });
    });
  }

  async renderStringPromise(content: string, context?: object) {
    return new Promise<string>((resolve, reject) => {
      super.renderString(content, context ?? {}, (err, res) => {
        if (err) return reject(err);

        resolve(res!);
      });
    });
  }
}

export {
  AsyncNunjucks,
  type TCtorOption,
};
