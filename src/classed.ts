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
  SafeClassValue,
} from './types';
import {
  classedSign,
  clsxm,
  filterValidProp,
  getClassedComponentDisplayName,
  hasClassedSign,
  isObject,
} from './utils';

export const classed: Classed = <
  Props extends object & ClassedProps,
  ComponentType extends keyof ReactHTML | BaseComponentType = keyof ReactHTML | BaseComponentType,
>(
  component: ComponentType,
  passedProps?: ClassedPropsParamType<BaseComponentProps<ComponentType> & Props>,
  ...classes: SafeClassValue[]
) => {
  type TargetProps = BaseComponentProps<ComponentType> & Props;

  const Component = forwardRef<
    ComponentRefType<ComponentType, Props>,
    PropsWithClassed<TargetProps>
  >((props, ref) => {
    const propsParams = useMemo(
      () =>
        typeof passedProps === 'function'
          ? passedProps({ ...props, className: props?.className } as TargetProps)
          : passedProps,
      [props, passedProps],
    );

    const classNameParam = useMemo(() => {
      if (!isObject(propsParams)) return propsParams;

      if ((propsParams as Object)?.hasOwnProperty('className')) {
        return (propsParams as TargetProps)?.className;
      }

      return undefined;
    }, [propsParams]);

    const componentProps = useMemo(() => {
      const className = [classNameParam, ...classes, props?.className];
      const isClassed = hasClassedSign(component);

      const targetProps = {
        ...(isObject(propsParams) && (propsParams as TargetProps)),
        ...props,
        className: isClassed ? className : clsxm(className),
        ref,
      };

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
