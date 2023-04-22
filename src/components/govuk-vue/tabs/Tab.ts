import type { Slot } from 'vue'

export interface Tab {
  id: string
  selected: boolean
  defaultSlot: Slot | undefined
  key: string | number | symbol | null | undefined
  focusTrigger: number
}
