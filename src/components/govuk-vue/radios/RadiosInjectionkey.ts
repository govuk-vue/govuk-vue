import type { InjectionKey } from 'vue'
import type { RadiosModelValue } from '@/components/govuk-vue/radios/RadiosModelValue'

export const RadiosInjectionKey: InjectionKey<RadiosModelValue> = Symbol('RadiosModelValue')
