<script setup lang="ts">
import { computed } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import GvFragment from '@/components/util/GvFragment.vue'

const props = defineProps({
  text: String,
  // Can't use 'for' because it's a reserved word in JS so doesn't work in dynamic props (ie we can't do :for="for")
  forId: {
    type: String,
    required: true
  },
  isPageHeading: {
    type: Boolean,
    default: false
  },
  classes: {
    type: String,
    default: ''
  }
})

const computedWrapperElement = computed(() => {
  if (props.isPageHeading) {
    return 'h1'
  } else {
    return GvFragment
  }
})
</script>

<template>
  <component :is="computedWrapperElement" :class="isPageHeading ? 'govuk-label-wrapper' : ''">
    <label :for="forId" :class="`govuk-label ${classes}`">
      <template v-if="hasSlot('default')">
        <slot />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </label>
  </component>
</template>
