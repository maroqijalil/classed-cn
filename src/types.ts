import type { ClassDictionary, ClassValue } from 'clsx';
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

export type SafeClassValue =
  | (SafeClassValue | ClassDictionary)[]
  | string
  | number
  | null
  | boolean
  | undefined;

export type StyledProps = { className?: string };

export type PropsWithStyled<Props> = Omit<Props, 'className'> & { className?: ClassValue };

export type StyledPropsParamFunction<Props> = (
  props: PropsWithStyled<Props>,
) => PropsWithStyled<Props> | SafeClassValue;

export type StyledPropsParamType<Props> = Props | SafeClassValue | StyledPropsParamFunction<Props>;

export type ComponentRefType<ComponentType extends keyof ReactHTML | BaseComponentType, Props> =
  ExtractHTMLElementByProps<Props> extends never
    ? ElementRef<ComponentType> extends never
      ? BaseComponentType<Props>
      : ElementRef<ComponentType>
    : ExtractHTMLElementByProps<Props>;

export type PropsWithoutRef<
  ComponentType extends keyof ReactHTML | BaseComponentType<any>,
  Props,
> = PropsWithStyled<BasePropsWithoutRef<BaseComponentProps<ComponentType> & Props>>;

export type Styled = {
  <
    Props1 extends object & StyledProps,
    ComponentType1 extends keyof ReactHTML | BaseComponentType =
      | keyof ReactHTML
      | BaseComponentType,
  >(
    component: ComponentType1,
    passedProps?:
      | StyledPropsParamFunction<BaseComponentProps<ComponentType1> & Props1>
      | (BaseComponentProps<ComponentType1> & Props1),
  ): ForwardRefExoticComponent<
    PropsWithoutRef<ComponentType1, Props1> &
      RefAttributes<ComponentRefType<ComponentType1, Props1>>
  >;

  <Props2 extends object & StyledProps>(
    component: BaseComponentType<Props2>,
    passedProps?:
      | StyledPropsParamFunction<BaseComponentProps<BaseComponentType<Props2>> & Props2>
      | (BaseComponentProps<BaseComponentType<Props2>> & Props2),
  ): ForwardRefExoticComponent<
    PropsWithoutRef<BaseComponentType<Props2>, Props2> &
      RefAttributes<ComponentRefType<BaseComponentType, Props2>>
  >;

  <
    Props3 extends object & StyledProps,
    ComponentType2 extends keyof ReactHTML | BaseComponentType =
      | keyof ReactHTML
      | BaseComponentType,
  >(
    component: ComponentType2,
    ...passedProps: SafeClassValue[]
  ): ForwardRefExoticComponent<
    PropsWithoutRef<ComponentType2, Props3> &
      RefAttributes<ComponentRefType<ComponentType2, Props3>>
  >;

  <Props4 extends object & StyledProps>(
    component: BaseComponentType<Props4>,
    ...passedProps: SafeClassValue[]
  ): ForwardRefExoticComponent<
    PropsWithoutRef<BaseComponentType<Props4>, Props4> &
      RefAttributes<ComponentRefType<BaseComponentType, Props4>>
  >;
};
