import type { InjectionKey, Ref } from 'vue'

export const AccordionHeadingLevelInjectionKey: InjectionKey<Ref<Number>> =
  Symbol('AccordionHeadingLevel')

export const AccordionHideSectionTextInjectionKey: InjectionKey<Ref<String>> = Symbol(
  'AccordionHideSectionText'
)
export const AccordionHideSectionAriaLabelInjectionKey: InjectionKey<Ref<String>> = Symbol(
  'AccordionHideSectionAriaLabel'
)
export const AccordionShowSectionTextInjectionKey: InjectionKey<Ref<String>> = Symbol(
  'AccordionShowSectionText'
)
export const AccordionShowSectionAriaLabelInjectionKey: InjectionKey<Ref<String>> = Symbol(
  'AccordionShowSectionAriaLabel'
)

export const AccordionRememberExpandedInjectionKey: InjectionKey<Ref<Boolean>> = Symbol(
  'AccordionRememberExpanded'
)

export const AccordionRegisterSectionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'AccordionRegisterSectionFunction'
)

export const AccordionUnregisterSectionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'AccordionUnegisterSectionFunction'
)
