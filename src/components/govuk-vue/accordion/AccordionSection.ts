import type { Ref } from 'vue'

export interface AccordionSection {
  key: Symbol
  sectionIndex: Ref<number>
  expanded: boolean
}
