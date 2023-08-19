<script setup lang="ts">
import { computed, inject, onBeforeMount, onUnmounted, provide, ref } from 'vue'
import type { Ref } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import getSlotText from '@/composables/useGetSlotText'
import {
  SummaryListRowActionsCountInjectionKey,
  SummaryListRegisterRowActionFunctionInjectionKey,
  SummaryListUnregisterRowActionFunctionInjectionKey,
  SummaryListAnyRowHasActionsInjectionKey,
  SummaryListUnregisterRowFunctionInjectionKey,
  SummaryListRegisterRowFunctionInjectionKey,
  SummaryListRowKeyTextInjectionKey
} from '@/components/govuk-vue/summary-list/SummaryListInjectionKeys'
import GvFragment from '@/components/util/GvFragment.vue'
import type { SummaryListRowAction } from '@/components/govuk-vue/summary-list/SummaryListRowAction'
import type { SummaryListRow } from '@/components/govuk-vue/summary-list/SummaryListRow'

const props = defineProps({
  /**
   * Whether to show a border under this row.
   */
  showBorder: {
    type: Boolean,
    default: true
  },
  //Key props
  /**
   * Text to use for the row key. If content is provided in the `key-text` slot, this prop will be ignored.
   */
  keyText: String,
  /**
   * Classes to add to the key wrapper.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  keyClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Value props
  /**
   * Text to use for the row value. If content is provided in the `value-text` slot, this prop will be ignored.
   */
  valueText: String,
  /**
   * Classes to add to the value wrapper.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  valueClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * Classes to add to the actions wrapper.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  //Actions props
  actionsClass: {
    type: [String, Array, Object],
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

// We provide the key text to child components so that actions can use it as visually hidden text at the end of Change links
const keyTextVisuallyHidden = computed(() => {
  if (hasSlot('key-text')) {
    return getSlotText('key-text')
  } else if (props.keyText) {
    return props.keyText
  } else {
    return undefined
  }
})

provide(SummaryListRowKeyTextInjectionKey, keyTextVisuallyHidden)
</script>

<template>
  <div
    class="govuk-summary-list__row"
    :class="{
      'govuk-summary-list__row--no-border': !showBorder,
      'govuk-summary-list__row--no-actions': anyRowHasActions && rowActionsCount === 0
    }"
    :data-key-text="keyTextVisuallyHidden"
  >
    <!-- keyTextVisuallyHidden is included above because if it's not implicated in the template, hasSlot and getSlotText return undefined -->
    <!-- The data attribute is only used so we have somewhere innocuous to use that value -->
    <!-- Not sure if this is a Vue bug - test the visually hidden text in child actions still works before removing the data attribute -->
    <dt class="govuk-summary-list__key" :class="keyClass">
      <!-- @slot The content of the row key. If content is provided in this slot, the `key-text` prop will be ignored. -->
      <slot name="key-text">
        {{ keyText }}
      </slot>
    </dt>
    <dd class="govuk-summary-list__value" :class="valueClass">
      <!-- @slot The content of the row value. If content is provided in this slot, the `value-text` prop will be ignored. -->
      <slot name="value">
        {{ valueText }}
      </slot>
    </dd>
    <dd v-if="hasSlot('actions')" class="govuk-summary-list__actions" :class="actionsClass">
      <component :is="computedActionsWrapperElement" :class="`govuk-summary-list__actions-list`">
        <!-- @slot A list of `GvSummaryListRowAction`s. -->
        <slot name="actions" />
      </component>
    </dd>
  </div>
</template>
