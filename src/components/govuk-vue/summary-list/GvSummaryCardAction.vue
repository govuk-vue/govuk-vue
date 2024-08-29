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
  /**
   * Text to use within the action item. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * The value of the link's `href` attribute.
   */
  href: String,
  /**
   * Actions rely on context from the surrounding content so may require additional accessible text.
   * Text supplied to this option is appended to the end. If you don't provide a value, the title of the card will
   * be used. Use the default slot for more complicated scenarios.
   */
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
  return `${props.visuallyHiddenText ?? ''} ${cardTitle.value ? `(${cardTitle.value})` : ''}`
})
</script>

<template>
  <component :is="computedWrapperElement" class="govuk-summary-card__action">
    <component :is="component" class="govuk-link" :href="computedHref" v-bind="$attrs">
      <!-- @slot The content of the action item. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>{{ text }}</slot>
      <span v-if="computedVisuallyHiddenText" class="govuk-visually-hidden"
        >&nbsp;{{ computedVisuallyHiddenText }}
      </span>
      <!-- The nbsp above is needed so that screen readers put a space between the visible text and
      the visually hidden text - Vue removes normal spaces -->
    </component>
  </component>
</template>
