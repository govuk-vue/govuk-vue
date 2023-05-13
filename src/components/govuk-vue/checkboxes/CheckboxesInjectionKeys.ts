import type { InjectionKey, Ref } from 'vue'

export const CheckboxesModelValueInjectionKey: InjectionKey<Ref<Array<any>>> =
  Symbol('CheckboxesModelValue')

export const CheckboxesUpdateModelValueFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'CheckboxesUpdateModelValueFunction'
)
