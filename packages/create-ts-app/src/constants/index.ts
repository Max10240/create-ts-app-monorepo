import path from 'path';
import { dirname } from 'desm';

export type TTplName = 'tsconfig';
export const DIR_TPL = path.join(dirname(import.meta.url), '..', '..', 'templates');
