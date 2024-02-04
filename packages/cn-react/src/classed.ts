import type { ClassValue } from 'clsx';
import {
  ComponentProps as BaseComponentProps,
  ComponentType as BaseComponentType,
  ReactHTML,
  createElement,
  forwardRef,
  useMemo,
} from 'react';
import type {
  Classed,
  ClassedProps,
  ClassedPropsParamType,
  ComponentRefType,
  PropsWithClassed,
} from './types';
import {
  classedSign,
  clsxm,
  filterValidProp,
  getClassedComponentDisplayName,
  hasClassedSign,
} from './utils';

export const classed: Classed = <
  Props extends object & ClassedProps,
  ComponentType extends keyof ReactHTML | BaseComponentType = keyof ReactHTML | BaseComponentType,
>(
  component: ComponentType,
  passedProps?: ClassedPropsParamType<BaseComponentProps<ComponentType> & Props>,
  ...classes: ClassValue[]
) => {
  type TargetProps = BaseComponentProps<ComponentType> & Props;

  const Component = forwardRef<
    ComponentRefType<ComponentType, Props>,
    PropsWithClassed<TargetProps>
  >((props, ref) => {
    const classNameParam = useMemo(
      () =>
        typeof passedProps === 'function'
          ? passedProps({ ...props, className: props?.className })
          : passedProps,
      [props, passedProps],
    );

    const componentProps = useMemo(() => {
      const className = [classNameParam, ...classes, props?.className];
      const isClassed = hasClassedSign(component);
      const targetProps = { ...props, className: isClassed ? className : clsxm(className), ref };

      return isClassed ? targetProps : filterValidProp(targetProps);
    }, []);

    return createElement(component, componentProps);
  });

  Object.assign(Component, {
    displayName: getClassedComponentDisplayName(component),
    ...classedSign,
  });

  return Component;
};
