import clsx from 'clsx';
import {
  Attributes,
  ComponentProps as BaseComponentProps,
  ComponentType as BaseComponentType,
  ReactHTML,
  createElement,
  forwardRef,
  useMemo,
} from 'react';
import {
  ComponentRefType,
  PropsWithStyled,
  SafeClassValue,
  Styled,
  StyledProps,
  StyledPropsParamType,
} from './types';
import { clsxm, getComponentDisplayName } from './utils';

export const styled: Styled = <
  Props extends object & StyledProps,
  ComponentType extends keyof ReactHTML | BaseComponentType = keyof ReactHTML | BaseComponentType,
>(
  component: ComponentType,
  passedProps?: StyledPropsParamType<BaseComponentProps<ComponentType> & Props>,
  ...classes: SafeClassValue[]
) => {
  type TargetProps = BaseComponentProps<ComponentType> & Props;

  const Component = forwardRef<
    ComponentRefType<ComponentType, Props>,
    PropsWithStyled<TargetProps>
  >((props, ref) => {
    const propsParams = useMemo(
      () =>
        typeof passedProps === 'function'
          ? passedProps({ ...props, className: clsx(props?.className) } as TargetProps)
          : passedProps,
      [props, passedProps],
    );

    const classNameParam = useMemo(() => {
      if (propsParams?.constructor !== Object) return propsParams;

      if ((propsParams as Object)?.hasOwnProperty('className')) {
        return (propsParams as TargetProps)?.className;
      }

      return undefined;
    }, [propsParams]);

    const componentProps = useMemo(
      () =>
        ({
          ...(propsParams?.constructor !== Object && (propsParams as TargetProps)),
          ...props,
          className: clsxm(classNameParam, ...classes, props?.className),
          ref,
        }) as Attributes,
      [],
    );

    return createElement(component, componentProps);
  });

  Component.displayName = getComponentDisplayName(component);

  return Component;
};
