import type { ClassValue as BaseClassValue, ClassDictionary } from 'clsx';
import type {
  ComponentProps as BaseComponentProps,
  ComponentType as BaseComponentType,
  PropsWithoutRef as BasePropsWithoutRef,
  ClassAttributes,
  ElementRef,
  PropsWithChildren,
  ReactHTML,
} from 'react';

export type ExtractHTMLElementByProps<PropsType, FallbackType = never> =
  PropsType extends ClassAttributes<infer ElementType> ? ElementType : FallbackType;

export type ClassValue =
  | (ClassValue | ClassDictionary)[]
  | string
  | number
  | null
  | boolean
  | undefined;

export type ClassedProps = { className?: string | BaseClassValue };

export type PropsWithClassed<Props> = Omit<Props, 'className'> & { className?: BaseClassValue };

export type ClassedPropsParamFunction<Props> = (
  props: PropsWithClassed<Props>,
) => ClassValue | void;

export type ClassedPropsParamType<Props> = ClassValue | ClassedPropsParamFunction<Props>;

export type ComponentRefType<ComponentType extends keyof ReactHTML | BaseComponentType, Props> =
  ExtractHTMLElementByProps<Props> extends never
    ? ElementRef<ComponentType> extends never
      ? BaseComponentType<Props>
      : ElementRef<ComponentType>
    : ExtractHTMLElementByProps<Props>;

export type ClassedPropsRef<
  ComponentType extends keyof ReactHTML | BaseComponentType<any>,
  Props,
> = PropsWithChildren<
  PropsWithClassed<BasePropsWithoutRef<BaseComponentProps<ComponentType> & Props>>
>;
