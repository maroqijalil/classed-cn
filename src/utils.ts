import clsx, { ClassValue } from 'clsx';
import type { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';

export function clsxm(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function getComponentDisplayName(component: ComponentType | string) {
  return typeof component === 'string'
    ? `styled.${component}`
    : `Styled${component?.displayName || 'Component'}`;
}
