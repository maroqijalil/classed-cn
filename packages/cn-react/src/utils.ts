import isPropValid from '@emotion/is-prop-valid';
import clsx, { type ClassValue } from 'clsx';
import type { ComponentType } from 'react';
import { twMerge } from 'tailwind-merge';

export const classedSign = { $$classed: true };

export function clsxm(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

export function isObject(object: any) {
  return object?.constructor === Object;
}

export function hasClassedSign(component: ComponentType | string) {
  return !!component?.hasOwnProperty('$$classed');
}

export function getClassedComponentDisplayName(component: string | ComponentType) {
  return typeof component === 'string'
    ? `classed.${component}`
    : `Classed${component?.displayName || 'Component'}`;
}

export function filterValidProp(props: object) {
  return Object.fromEntries(Object.entries(props).filter(([key]) => isPropValid(key)));
}
