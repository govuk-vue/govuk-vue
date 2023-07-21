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
  /**
   * Text to use within the breadcrumbs item. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * Link for the breadcrumbs item. If not specified, breadcrumbs item is a normal list item.
   */
  href: String,
  /**
   * The component used to render the link, for example `RouterLink`. Will default to `a` if an `href` is provided or no link otherwise.
   */
  component: [String, Object]
})

const computedElement = computed(() => {
  if (props.component) {
    return props.component
  } else if (computedHref.value) {
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
  return props.component || computedHref.value ? undefined : 'page'
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
      <!-- @slot The content of the breadcrumbs item. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>{{ text }}</slot>
    </component>
  </li>
</template>
