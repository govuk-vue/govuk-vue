<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import type { Ref } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import getSlotText from '@/composables/useGetSlotText'
import type { SummaryListCardAction } from '@/components/govuk-vue/summary-list/SummaryListCardAction'
import type { SummaryListRow } from '@/components/govuk-vue/summary-list/SummaryListRow'
import {
  SummaryListAnyRowHasActionsInjectionKey,
  SummaryListCardActionsCountInjectionKey,
  SummaryListCardTitleInjectionKey,
  SummaryListRegisterCardActionFunctionInjectionKey,
  SummaryListRegisterRowFunctionInjectionKey,
  SummaryListUnregisterCardActionFunctionInjectionKey,
  SummaryListUnregisterRowFunctionInjectionKey
} from '@/components/govuk-vue/summary-list/SummaryListInjectionKeys'

const props = defineProps({
  showBorders: {
    type: Boolean,
    default: true
  },
  //Card props
  cardClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Card title props
  cardTitle: String,
  cardTitleHeadingLevel: {
    type: Number,
    default: 2,
    validator(value: number) {
      return value >= 1 && value <= 6
    }
  },
  cardTitleClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Card actions props
  cardActionsClass: {
    type: [String, Array, Object],
    default: ''
  }
})

let cardActions: Ref<SummaryListCardAction[]> = ref([])
let rows: Ref<SummaryListRow[]> = ref([])

function registerCardAction(cardAction: SummaryListCardAction) {
  cardActions.value.push(cardAction)
}

function unregisterCardAction(key: Symbol) {
  cardActions.value = cardActions.value.filter((a) => {
    return a.key != key
  })
}

const cardActionsCount = computed(() => {
  return cardActions.value.length
})

function registerRow(row: SummaryListRow) {
  rows.value.push(row)
}

function unregisterRow(key: Symbol) {
  rows.value = rows.value.filter((r) => {
    return r.key != key
  })
}

const anyRowHasActions = computed(() => {
  //@ts-ignore: Row gets passed to the callback as a Ref<SummaryListRow> but TS expects it to be a SummaryListRow so complains about the .value
  return rows.value.some((r) => r.value.actions.length > 0)
})

provide(SummaryListRegisterCardActionFunctionInjectionKey, registerCardAction)
provide(SummaryListUnregisterCardActionFunctionInjectionKey, unregisterCardAction)
provide(SummaryListCardActionsCountInjectionKey, cardActionsCount)
provide(SummaryListRegisterRowFunctionInjectionKey, registerRow)
provide(SummaryListUnregisterRowFunctionInjectionKey, unregisterRow)
provide(SummaryListAnyRowHasActionsInjectionKey, anyRowHasActions)

const isCard = computed(() => {
  return (
    props.cardTitle !== undefined ||
    hasSlot('card-title') ||
    hasSlot('card-actions') ||
    props.cardClass !== ''
  )
})

const hasCardTitle = computed(() => {
  return props.cardTitle || hasSlot('card-title')
})

// We provide the card title to child components so that actions can use it as visually hidden text at the end of link text
const cardTitleVisuallyHidden = computed(() => {
  if (hasSlot('card-title')) {
    return getSlotText('card-title')
  } else if (props.cardTitle) {
    return props.cardTitle
  } else {
    return undefined
  }
})

provide(SummaryListCardTitleInjectionKey, cardTitleVisuallyHidden)

const computedActionsWrapperElement = computed(() => {
  if (cardActionsCount.value > 1) {
    return 'ul'
  } else {
    return 'div'
  }
})
</script>

<template>
  <div v-if="isCard" class="govuk-summary-card" :class="cardClass">
    <div class="govuk-summary-card__title-wrapper">
      <component
        v-if="hasCardTitle"
        :is="`h${cardTitleHeadingLevel}`"
        class="govuk-summary-card__title"
        :class="cardTitleClass"
      >
        <slot name="card-title">
          {{ cardTitle }}
        </slot>
      </component>
      <component
        v-if="hasSlot('card-actions')"
        :is="computedActionsWrapperElement"
        class="govuk-summary-card__actions"
        :class="cardActionsClass"
      >
        <slot name="card-actions" />
      </component>
    </div>

    <div class="govuk-summary-card__content">
      <dl class="govuk-summary-list" v-bind="$attrs">
        <slot />
      </dl>
    </div>
  </div>
  <dl
    v-else
    class="govuk-summary-list"
    v-bind="$attrs"
    :class="{ 'govuk-summary-list--no-border': !showBorders }"
  >
    <slot />
  </dl>
</template>
