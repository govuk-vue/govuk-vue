import type { InjectionKey, Ref } from 'vue'

export const RadiosModelValueInjectionKey: InjectionKey<
  Ref<string | number | boolean | undefined>
> = Symbol('RadiosModelValue')

export const RadiosUpdateModelValueFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'RadiosUpdateModelValueFunction'
)

export const RadiosNameInjectionKey: InjectionKey<Ref<string>> = Symbol('RadiosNameInjectionKey')
