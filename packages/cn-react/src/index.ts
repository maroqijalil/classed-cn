import { classed as baseClassed } from './classed';
import type { Classed, PropsWithClassed } from './types';
import { cn } from './utils';

const classed = baseClassed as Classed;

export { classed, cn };
export type { Classed, PropsWithClassed };
