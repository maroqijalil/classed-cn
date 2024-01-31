import type { ClassDictionary, ClassValue } from 'clsx';
import type {
  ComponentProps as BaseComponentProps,
  ComponentType as BaseComponentType,
  ClassAttributes,
  ElementRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
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

export type StyledPropsParamFunction<Props> = (props: Props) => Props | SafeClassValue;

export type StyledPropsParamType<Props> = Props | SafeClassValue | StyledPropsParamFunction<Props>;

export type ComponentRefType<ComponentType extends keyof ReactHTML | BaseComponentType, Props> =
  ExtractHTMLElementByProps<Props> extends never
    ? ElementRef<ComponentType> extends never
      ? BaseComponentType<Props>
      : ElementRef<ComponentType>
    : ExtractHTMLElementByProps<Props>;

export type PropsWithStyled<Props> = Omit<Props, 'className'> & { className?: ClassValue };

export type Styled = {
  <
    Props extends object & StyledProps,
    ComponentType extends keyof ReactHTML | BaseComponentType = keyof ReactHTML | BaseComponentType,
  >(
    component: ComponentType,
    passedProps?:
      | StyledPropsParamFunction<BaseComponentProps<ComponentType> & Props>
      | (BaseComponentProps<ComponentType> & Props),
  ): ForwardRefExoticComponent<
    PropsWithoutRef<BaseComponentProps<ComponentType> & Props> &
      RefAttributes<ComponentRefType<ComponentType, Props>>
  >;

  <Props2 extends object & StyledProps>(
    component: BaseComponentType<Props2>,
    passedProps?:
      | StyledPropsParamFunction<BaseComponentProps<BaseComponentType<Props2>> & Props2>
      | (BaseComponentProps<BaseComponentType<Props2>> & Props2),
  ): ForwardRefExoticComponent<
    PropsWithoutRef<BaseComponentProps<BaseComponentType<Props2>> & Props2> &
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
    PropsWithoutRef<BaseComponentProps<ComponentType2> & Props3> &
      RefAttributes<ComponentRefType<ComponentType2, Props3>>
  >;

  <Props4 extends object & StyledProps>(
    component: BaseComponentType<Props4>,
    ...passedProps: SafeClassValue[]
  ): ForwardRefExoticComponent<
    PropsWithoutRef<BaseComponentProps<BaseComponentType<Props4>> & Props4> &
      RefAttributes<ComponentRefType<BaseComponentType, Props4>>
  >;
};
