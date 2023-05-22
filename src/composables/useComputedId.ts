import { computed } from 'vue'
import type { Ref } from 'vue'
import { createUid } from '@/util/createUid'

export function useComputedId(propId: Ref<string | undefined>, prefix: string) {
  return computed(() => {
    return propId.value ? propId.value : createUid(prefix)
  })
}
