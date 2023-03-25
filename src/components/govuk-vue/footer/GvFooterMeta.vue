<script setup lang="ts">
import { computed } from 'vue'
import hasSlot from '@/composables/useHasSlot'

const props = defineProps({
  visuallyHiddenTitle: {
    type: String,
    default: 'Support links'
  },
  text: String
})

const hasText = computed(() => {
  return props.text || hasSlot('default')
})
</script>

<template>
  <h2 class="govuk-visually-hidden">{{ visuallyHiddenTitle }}</h2>

  <ul v-if="hasSlot('items')" class="govuk-footer__inline-list">
    <slot name="items" />
  </ul>
  <div class="govuk-footer__meta-custom" v-if="hasText">
    <template v-if="hasSlot('default')">
      <slot />
    </template>
    <template v-else>
      {{ text }}
    </template>
  </div>
</template>
