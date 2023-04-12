<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, inject, onBeforeMount, onBeforeUnmount, ref, useAttrs } from 'vue'
import {
  SummaryListRowActionsCountInjectionKey,
  SummaryListRegisterRowActionFunctionInjectionKey,
  SummaryListUnregisterRowActionFunctionInjectionKey
} from '@/components/govuk-vue/summary-list/SummaryListInjectionKeys'
import GvFragment from '@/components/util/GvFragment.vue'

const attrs = useAttrs()

const props = defineProps({
  classes: {
    type: String,
    default: ''
  },
  text: String,
  href: String,
  visuallyHiddenText: String
})

const key = Symbol()

onBeforeMount(() => {
  registerRowAction({ key: key })
})

onBeforeUnmount(() => {
  unregisterRowAction(key)
})

const registerRowAction = inject(SummaryListRegisterRowActionFunctionInjectionKey, () => {})
const unregisterRowAction = inject(SummaryListUnregisterRowActionFunctionInjectionKey, () => {})
const rowActionsCount = inject(SummaryListRowActionsCountInjectionKey, ref(0))

const computedWrapperElement = computed(() => {
  if (rowActionsCount.value > 1) {
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
</script>

<template>
  <component :is="computedWrapperElement" class="govuk-summary-list__actions-list-item">
    <a :class="`govuk-link ${classes}`" :href="computedHref" v-bind="$attrs">
      <slot>{{ text }}</slot>
      <span v-if="visuallyHiddenText" class="govuk-visually-hidden"
        >&nbsp;{{ visuallyHiddenText }}
      </span>
      <!-- The nbsp above is needed so that screen readers put a space between the visible text and
      the visually hidden text - Vue removes normal spaces -->
    </a>
  </component>
</template>
