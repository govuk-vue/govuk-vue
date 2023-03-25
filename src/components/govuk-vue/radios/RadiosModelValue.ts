import type { Ref } from 'vue'

export interface RadiosModelValue {
  modelValue: Ref<string | number | boolean | undefined>
  mutationFunction: (newModelValue: string | number | boolean | undefined) => void
}
