<script setup lang="ts">
import { computed, inject, onBeforeMount, onUnmounted, provide, Ref, ref } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import {
  SummaryListRowActionsCountInjectionKey,
  SummaryListRegisterRowActionFunctionInjectionKey,
  SummaryListUnregisterRowActionFunctionInjectionKey,
  SummaryListAnyRowHasActionsInjectionKey,
  SummaryListUnregisterRowFunctionInjectionKey,
  SummaryListRegisterRowFunctionInjectionKey
} from '@/components/govuk-vue/summary-list/SummaryListInjectionKeys'
import GvFragment from '@/components/util/GvFragment.vue'
import type { SummaryListRowAction } from '@/components/govuk-vue/summary-list/SummaryListRowAction'
import type { SummaryListRow } from '@/components/govuk-vue/summary-list/SummaryListRow'

defineProps({
  classes: {
    type: String,
    default: ''
  },
  showBorder: {
    type: Boolean,
    default: true
  },
  //Key props
  keyText: String,
  keyClasses: {
    type: String,
    default: ''
  },
  //Value props
  valueText: String,
  valueClasses: {
    type: String,
    default: ''
  },
  //Actions props
  actionsClasses: {
    type: String,
    default: ''
  }
})

const key = Symbol()
const row: Ref<SummaryListRow> = ref({ key: key, actions: [] })

onBeforeMount(() => {
  registerRow(row)
})

onUnmounted(() => {
  unregisterRow(key)
})

const registerRow = inject(SummaryListRegisterRowFunctionInjectionKey, () => {})
const unregisterRow = inject(SummaryListUnregisterRowFunctionInjectionKey, () => {})
const anyRowHasActions = inject(SummaryListAnyRowHasActionsInjectionKey, ref(false))

function registerRowAction(rowAction: SummaryListRowAction) {
  row.value.actions.push(rowAction)
}

function unregisterRowAction(key: Symbol) {
  row.value.actions = row.value.actions.filter((a) => {
    return a.key != key
  })
}

const rowActionsCount = computed(() => {
  return row.value.actions.length
})

provide(SummaryListRegisterRowActionFunctionInjectionKey, registerRowAction)
provide(SummaryListUnregisterRowActionFunctionInjectionKey, unregisterRowAction)
provide(SummaryListRowActionsCountInjectionKey, rowActionsCount)

const computedActionsWrapperElement = computed(() => {
  if (rowActionsCount.value > 1) {
    return 'ul'
  } else {
    return GvFragment
  }
})
</script>

<template>
  <div
    :class="`govuk-summary-list__row ${classes}
    ${!showBorder ? 'govuk-summary-list__row--no-border' : ''}
    ${anyRowHasActions && rowActionsCount === 0 ? 'govuk-summary-list__row--no-actions' : ''}`"
  >
    <dt :class="`govuk-summary-list__key ${keyClasses}`">
      <slot name="key">
        {{ keyText }}
      </slot>
    </dt>
    <dd :class="`govuk-summary-list__value ${valueClasses}`">
      <slot name="value">
        {{ valueText }}
      </slot>
    </dd>
    <dd v-if="hasSlot('actions')" :class="`govuk-summary-list__actions ${actionsClasses}`">
      <component :is="computedActionsWrapperElement" :class="`govuk-summary-list__actions-list`">
        <slot name="actions" />
      </component>
    </dd>
  </div>
</template>
