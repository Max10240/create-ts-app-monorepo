import path from 'node:path';
import { mkdir, access, writeFile as writeFile_ } from 'node:fs/promises';
import fg, { type Pattern, type Options } from 'fast-glob';

export async function glob(source: Pattern | Pattern[], opts?: Options) {
  return await fg(source, { dot: true, ...opts });
}

export async function isPathExist(path: string) {
  try {
    await access(path);

    return true;
  } catch {
    return false;
  }
}

export async function ensureDir(dir: string) {
  if (await isPathExist(dir)) return;

  await mkdir(dir, { recursive: true });
}

export async function writeFile(...args: Parameters<typeof writeFile_>) {
  const [filepath] = args;

  await ensureDir(path.dirname(filepath.toString()));

  await writeFile_(...args);
}
