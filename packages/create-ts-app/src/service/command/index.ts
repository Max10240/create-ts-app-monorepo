import { exec, spawn, type ExecOptions, type SpawnOptions, type ChildProcess } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

export async function executeCmdWithResult(
  cmd: string,
  opts: {
    execOption?: ExecOptions;
    trim?: boolean;
  } = {},
) {
  const { trim = true, execOption } = opts;

  try {
    let output = (await execPromise(cmd, execOption)).stdout.toString('utf8');

    if (trim) output = output.trim();

    return output;
  } catch {
    return null;
  }
}

export async function executeCmd(
  cmd: string,
  args: readonly string[] = [],
  opts: SpawnOptions & {
    afterSpawn?(childProcess: ChildProcess): void;
    noThrowError?: boolean;
  } = {},
) {
  const { afterSpawn, noThrowError = true } = opts;

  const childProcess = spawn(cmd, args, { shell: true, ...opts });

  afterSpawn?.(childProcess);

  return new Promise<number | null>((resolve, reject) => {
    childProcess.on('exit', (code) => resolve(code));
    childProcess.on('error', (err) => {
      if (noThrowError) return resolve(-1);
      reject(err);
    });
  });
}
