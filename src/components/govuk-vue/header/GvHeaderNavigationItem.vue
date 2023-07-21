<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'
import { computed } from 'vue'
import GvFragment from '@/components/util/GvFragment.vue'

const props = defineProps({
  text: String,
  href: String,
  active: Boolean,
  /**
   * The component used to render the link, for example `RouterLink`. Will default to `a` if an `href` is provided or no link otherwise.
   */
  component: [String, Object]
})

const computedLinkElement = computed(() => {
  if (props.component) {
    return props.component
  } else if (props.href) {
    return 'a'
  } else {
    return GvFragment
  }
})
</script>

<template>
  <li
    class="govuk-header__navigation-item"
    :class="{ 'govuk-header__navigation-item--active': active }"
  >
    <component :is="computedLinkElement" class="govuk-header__link" :href="href">
      <template v-if="hasSlot('default')">
        <slot />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </component>
  </li>
</template>
