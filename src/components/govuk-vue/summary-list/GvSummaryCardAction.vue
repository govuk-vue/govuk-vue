<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, inject, onBeforeMount, onBeforeUnmount, ref, useAttrs } from 'vue'
import {
  SummaryListCardActionsCountInjectionKey,
  SummaryListCardTitleInjectionKey,
  SummaryListRegisterCardActionFunctionInjectionKey,
  SummaryListUnregisterCardActionFunctionInjectionKey
} from '@/components/govuk-vue/summary-list/SummaryListInjectionKeys'
import GvFragment from '@/components/util/GvFragment.vue'

const attrs = useAttrs()

const props = defineProps({
  text: String,
  href: String,
  visuallyHiddenText: String,
  /**
   * The component used to render the link, for example `RouterLink`.
   */
  component: {
    type: [String, Object],
    default: 'a'
  }
})

const key = Symbol()

onBeforeMount(() => {
  registerCardAction({ key: key })
})

onBeforeUnmount(() => {
  unregisterCardAction(key)
})

const registerCardAction = inject(SummaryListRegisterCardActionFunctionInjectionKey, () => {})
const unregisterCardAction = inject(SummaryListUnregisterCardActionFunctionInjectionKey, () => {})
const cardActionsCount = inject(SummaryListCardActionsCountInjectionKey, ref(0))
const cardTitle = inject(SummaryListCardTitleInjectionKey)

const computedWrapperElement = computed(() => {
  if (cardActionsCount.value > 1) {
    return 'li'
  } else {
    return GvFragment
  }
})

const computedHref = computed(() => {
  //If we have a click handler but no href prop, use # as the href otherwise the link won't be focusable
  if (attrs['onClick'] && !props.href) {
    return '#'
  } else {
    return props.href
  }
})

const computedVisuallyHiddenText = computed(() => {
  if (props.visuallyHiddenText) {
    return props.visuallyHiddenText
  } else {
    return cardTitle
  }
})
</script>

<template>
  <component :is="computedWrapperElement" class="govuk-summary-card__action">
    <component :is="component" class="govuk-link" :href="computedHref" v-bind="$attrs">
      <slot>{{ text }}</slot>
      <span v-if="computedVisuallyHiddenText" class="govuk-visually-hidden"
        >&nbsp;{{ computedVisuallyHiddenText }}
      </span>
      <!-- The nbsp above is needed so that screen readers put a space between the visible text and
      the visually hidden text - Vue removes normal spaces -->
    </component>
  </component>
</template>
