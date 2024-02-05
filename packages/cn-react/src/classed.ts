import {
  ComponentProps as BaseComponentProps,
  ComponentType as BaseComponentType,
  ForwardRefExoticComponent,
  ReactHTML,
  RefAttributes,
  createElement,
  forwardRef,
  useMemo,
} from 'react';
import type {
  ClassValue,
  ClassedProps,
  ClassedPropsParamFunction,
  ClassedPropsParamType,
  ClassedPropsRef,
  ComponentRefType,
  PropsWithClassed,
} from './types';
import {
  classedSign,
  cn,
  filterValidProp,
  getClassedComponentDisplayName,
  hasClassedSign,
} from './utils';

export function classed<
  Props extends object & ClassedProps,
  ComponentType extends keyof ReactHTML | BaseComponentType = keyof ReactHTML | BaseComponentType,
>(
  component: ComponentType,
  passedProps?: ClassedPropsParamFunction<BaseComponentProps<ComponentType> & Props>,
): ForwardRefExoticComponent<
  ClassedPropsRef<ComponentType, Props> & RefAttributes<ComponentRefType<ComponentType, Props>>
>;

export function classed<Props extends object & ClassedProps>(
  component: BaseComponentType<Props>,
  passedProps?: ClassedPropsParamFunction<BaseComponentProps<BaseComponentType<Props>> & Props>,
): ForwardRefExoticComponent<
  ClassedPropsRef<BaseComponentType<Props>, Props> &
    RefAttributes<ComponentRefType<BaseComponentType, Props>>
>;

export function classed<
  Props extends object & ClassedProps,
  ComponentType extends keyof ReactHTML | BaseComponentType = keyof ReactHTML | BaseComponentType,
>(
  component: ComponentType,
  ...passedProps: ClassValue[]
): ForwardRefExoticComponent<
  ClassedPropsRef<ComponentType, Props> & RefAttributes<ComponentRefType<ComponentType, Props>>
>;

export function classed<Props extends object & ClassedProps>(
  component: BaseComponentType<Props>,
  ...passedProps: ClassValue[]
): ForwardRefExoticComponent<
  ClassedPropsRef<BaseComponentType<Props>, Props> &
    RefAttributes<ComponentRefType<BaseComponentType, Props>>
>;

export function classed<
  Props extends object & ClassedProps,
  ComponentType extends keyof ReactHTML | BaseComponentType = keyof ReactHTML | BaseComponentType,
>(
  component: ComponentType,
  passedProps?: ClassedPropsParamType<BaseComponentProps<ComponentType> & Props>,
  ...classes: ClassValue[]
) {
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
      const targetProps = { ...props, className: isClassed ? className : cn(className), ref };

      return isClassed ? targetProps : filterValidProp(targetProps);
    }, []);

    return createElement(component, componentProps);
  });

  Object.assign(Component, {
    displayName: getClassedComponentDisplayName(component),
    ...classedSign,
  });

  return Component;
}
