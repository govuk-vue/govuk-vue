<script setup lang="ts">
import { computed, provide, ref, Ref } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import type { SummaryListCardAction } from '@/components/govuk-vue/summary-list/SummaryListCardAction'
import type { SummaryListRow } from '@/components/govuk-vue/summary-list/SummaryListRow'
import {
  SummaryListAnyRowHasActionsInjectionKey,
  SummaryListCardActionsCountInjectionKey,
  SummaryListRegisterCardActionFunctionInjectionKey,
  SummaryListRegisterRowFunctionInjectionKey,
  SummaryListUnregisterCardActionFunctionInjectionKey,
  SummaryListUnregisterRowFunctionInjectionKey
} from '@/components/govuk-vue/summary-list/SummaryListInjectionKeys'

const props = defineProps({
  classes: {
    type: String,
    default: ''
  },
  showBorders: {
    type: Boolean,
    default: true
  },
  //Card props
  cardClasses: {
    type: String,
    default: ''
  },
  //Card title props
  cardTitleText: String,
  cardTitleHeadingLevel: {
    type: Number,
    default: 2,
    validator(value: number) {
      return value >= 1 && value <= 6
    }
  },
  cardTitleClasses: {
    type: String,
    default: ''
  },
  //Card actions props
  cardActionsClasses: {
    type: String,
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
    props.cardTitleText !== undefined ||
    hasSlot('card-title') ||
    hasSlot('card-actions') ||
    props.cardClasses !== ''
  )
})

const hasCardTitle = computed(() => {
  return props.cardTitleText || hasSlot('card-title')
})

const computedActionsWrapperElement = computed(() => {
  if (cardActionsCount.value > 1) {
    return 'ul'
  } else {
    return 'div'
  }
})
</script>

<template>
  <div
    v-if="isCard"
    :class="`govuk-summary-card ${cardClasses} ${
      !showBorders ? 'govuk-summary-list--no-border' : ''
    }`"
  >
    <div class="govuk-summary-card__title-wrapper">
      <component
        v-if="hasCardTitle"
        :is="`h${cardTitleHeadingLevel}`"
        :class="`govuk-summary-card__title ${cardTitleClasses}`"
      >
        <slot name="card-title">
          {{ cardTitleText }}
        </slot>
      </component>
      <component
        v-if="hasSlot('card-actions')"
        :is="computedActionsWrapperElement"
        :class="`govuk-summary-card__actions ${cardActionsClasses}`"
      >
        <slot name="card-actions" />
      </component>
    </div>

    <div class="govuk-summary-card__content">
      <dl
        :class="`govuk-summary-list ${classes} ${
          !showBorders ? 'govuk-summary-list--no-border' : ''
        }`"
      >
        <slot />
      </dl>
    </div>
  </div>
  <dl
    v-else
    :class="`govuk-summary-list ${classes} ${!showBorders ? 'govuk-summary-list--no-border' : ''}`"
  >
    <slot />
    <slot name="card-actions" />
  </dl>
</template>
