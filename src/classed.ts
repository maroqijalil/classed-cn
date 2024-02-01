import {
  Attributes,
  ComponentProps as BaseComponentProps,
  ComponentType as BaseComponentType,
  ReactHTML,
  createElement,
  forwardRef,
  useMemo,
} from 'react';
import type {
  ComponentRefType,
  PropsWithStyled,
  SafeClassValue,
  Styled,
  StyledProps,
  StyledPropsParamType,
} from './types';
import {
  classedSign,
  clsxm,
  filterValidProp,
  getClassedComponentDisplayName,
  hasClassedSign,
  isObject,
} from './utils';

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

      return filterValidProp({
        ...(isObject(propsParams) && (propsParams as TargetProps)),
        ...props,
        className: hasClassedSign(component) ? className : clsxm(className),
        ref,
      }) as Attributes;
    }, []);

    return createElement(component, componentProps);
  });

  Object.assign(Component, {
    displayName: getClassedComponentDisplayName(component),
    ...classedSign,
  });

  return Component;
};
