import type { SummaryListRowAction } from '@/components/govuk-vue/summary-list/SummaryListRowAction'

export interface SummaryListRow {
  key: Symbol
  actions: SummaryListRowAction[]
}
