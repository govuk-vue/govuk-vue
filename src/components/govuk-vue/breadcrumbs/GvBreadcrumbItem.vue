<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import GvFragment from '@/components/util/GvFragment.vue'

const attrs = useAttrs()

const props = defineProps({
  text: String,
  href: String
})

const computedElement = computed(() => {
  if (computedHref.value) {
    return 'a'
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

const ariaCurrent = computed(() => {
  return computedHref.value ? null : 'page'
})
</script>

<template>
  <li class="govuk-breadcrumbs__list-item" :aria-current="ariaCurrent">
    <component
      :is="computedElement"
      :href="computedHref"
      class="govuk-breadcrumbs__link"
      v-bind="$attrs"
    >
      <slot>{{ text }}</slot>
    </component>
  </li>
</template>
