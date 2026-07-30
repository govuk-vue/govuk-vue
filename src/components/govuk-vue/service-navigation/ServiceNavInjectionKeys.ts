import type { InjectionKey } from 'vue'

export const ServiceNavRegisterItemFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'ServiceNavRegisterItemFunction'
)

export const ServiceNavUnregisterItemFunctionInjectionKey: InjectionKey<Function> = Symbol(
  'ServiceNavUnegisterItemFunction'
)
