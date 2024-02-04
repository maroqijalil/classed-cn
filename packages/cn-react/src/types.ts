import type { ClassValue } from 'clsx';
import type {
  ComponentProps as BaseComponentProps,
  ComponentType as BaseComponentType,
  PropsWithoutRef as BasePropsWithoutRef,
  ClassAttributes,
  ElementRef,
  ForwardRefExoticComponent,
  ReactHTML,
  RefAttributes,
} from 'react';

export type ExtractHTMLElementByProps<PropsType, FallbackType = never> =
  PropsType extends ClassAttributes<infer ElementType> ? ElementType : FallbackType;

export type ClassedProps = { className?: string };

export type PropsWithClassed<Props> = Omit<Props, 'className'> & { className?: ClassValue };

export type ClassedPropsParamFunction<Props> = (props: PropsWithClassed<Props>) => ClassValue;

export type ClassedPropsParamType<Props> = ClassValue | ClassedPropsParamFunction<Props>;

export type ComponentRefType<ComponentType extends keyof ReactHTML | BaseComponentType, Props> =
  ExtractHTMLElementByProps<Props> extends never
    ? ElementRef<ComponentType> extends never
      ? BaseComponentType<Props>
      : ElementRef<ComponentType>
    : ExtractHTMLElementByProps<Props>;

export type PropsWithoutRef<
  ComponentType extends keyof ReactHTML | BaseComponentType<any>,
  Props,
> = PropsWithClassed<BasePropsWithoutRef<BaseComponentProps<ComponentType> & Props>>;

export type Classed = {
  <
    Props extends object & ClassedProps,
    ComponentType extends keyof ReactHTML | BaseComponentType = keyof ReactHTML | BaseComponentType,
  >(
    component: ComponentType,
    passedProps?: ClassedPropsParamFunction<BaseComponentProps<ComponentType> & Props>,
  ): ForwardRefExoticComponent<
    PropsWithoutRef<ComponentType, Props> & RefAttributes<ComponentRefType<ComponentType, Props>>
  >;

  <Props extends object & ClassedProps>(
    component: BaseComponentType<Props>,
    passedProps?: ClassedPropsParamFunction<BaseComponentProps<BaseComponentType<Props>> & Props>,
  ): ForwardRefExoticComponent<
    PropsWithoutRef<BaseComponentType<Props>, Props> &
      RefAttributes<ComponentRefType<BaseComponentType, Props>>
  >;

  <
    Props extends object & ClassedProps,
    ComponentType extends keyof ReactHTML | BaseComponentType = keyof ReactHTML | BaseComponentType,
  >(
    component: ComponentType,
    ...passedProps: ClassValue[]
  ): ForwardRefExoticComponent<
    PropsWithoutRef<ComponentType, Props> & RefAttributes<ComponentRefType<ComponentType, Props>>
  >;

  <Props extends object & ClassedProps>(
    component: BaseComponentType<Props>,
    ...passedProps: ClassValue[]
  ): ForwardRefExoticComponent<
    PropsWithoutRef<BaseComponentType<Props>, Props> &
      RefAttributes<ComponentRefType<BaseComponentType, Props>>
  >;
};
