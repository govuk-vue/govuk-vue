import type { InjectionKey, Ref } from 'vue'

export const TabsRegisterTabFunctionInjectionKey: InjectionKey<Function> =
  Symbol('TabsRegisterTabFunction')

export const TabsUnregisterTabFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'TabsUnregisterTabFunction'
)

export const TabsSelectTabFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'TabsSelectTabFunctionInjectionKey'
)

export const TabsSelectPreviousTabFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'TabsSelectPreviousTabFunction'
)

export const TabsSelectNextTabFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'TabsSelectNextTabFunction'
)
