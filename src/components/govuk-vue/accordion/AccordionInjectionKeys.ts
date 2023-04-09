import type { InjectionKey } from 'vue'

export const AccordionIdInjectionKey: InjectionKey<String> = Symbol('AccordionId')

export const AccordionHeadingLevelInjectionKey: InjectionKey<Number> =
  Symbol('AccordionHeadingLevel')

export const AccordionHideSectionTextInjectionKey: InjectionKey<String> = Symbol(
  'AccordionHideSectionText'
)
export const AccordionHideSectionAriaLabelTextInjectionKey: InjectionKey<String> = Symbol(
  'AccordionHideSectionAriaLabelText'
)
export const AccordionShowSectionTextInjectionKey: InjectionKey<String> = Symbol(
  'AccordionShowSectionText'
)
export const AccordionShowSectionAriaLabelTextInjectionKey: InjectionKey<String> = Symbol(
  'AccordionShowSectionAriaLabelText'
)

export const AccordionRegisterSectionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'AccordionRegisterSectionFunction'
)

export const AccordionUnregisterSectionFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'AccordionUnegisterSectionFunction'
)
