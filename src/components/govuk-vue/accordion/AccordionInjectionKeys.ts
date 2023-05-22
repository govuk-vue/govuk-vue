import type { InjectionKey, Ref } from 'vue'

export const AccordionHeadingLevelInjectionKey: InjectionKey<Ref<Number>> =
  Symbol('AccordionHeadingLevel')

export const AccordionHideSectionTextInjectionKey: InjectionKey<Ref<String>> = Symbol(
  'AccordionHideSectionText'
)
export const AccordionHideSectionAriaLabelTextInjectionKey: InjectionKey<Ref<String>> = Symbol(
  'AccordionHideSectionAriaLabelText'
)
export const AccordionShowSectionTextInjectionKey: InjectionKey<Ref<String>> = Symbol(
  'AccordionShowSectionText'
)
export const AccordionShowSectionAriaLabelTextInjectionKey: InjectionKey<Ref<String>> = Symbol(
  'AccordionShowSectionAriaLabelText'
)

export const AccordionRegisterSectionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'AccordionRegisterSectionFunction'
)

export const AccordionUnregisterSectionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'AccordionUnegisterSectionFunction'
)
