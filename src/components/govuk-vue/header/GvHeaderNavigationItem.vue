<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'
import { computed } from 'vue'
import GvFragment from '@/components/util/GvFragment.vue'

const props = defineProps({
  text: String,
  href: String,
  active: Boolean
})

const computedLinkElement = computed(() => {
  if (props.href) {
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
