<script setup lang="ts">
import { computed } from 'vue'
import hasSlot from '@/composables/useHasSlot'

const props = defineProps({
  /**
   * Title for a meta item section.
   */
  visuallyHiddenTitle: {
    type: String,
    default: 'Support links'
  },
  /**
   * Text to add to the meta section of the footer, which will appear below
   * any links in the default slot.	If content is provided in the `text` slot, this prop will be ignored.
   */
  text: String
})

const hasText = computed(() => {
  return props.text || hasSlot('text')
})
</script>

<template>
  <h2 class="govuk-visually-hidden">{{ visuallyHiddenTitle }}</h2>

  <ul v-if="hasSlot('default')" class="govuk-footer__inline-list">
    <!-- @slot A list of `GvFooterMetaItem`s -->
    <slot />
  </ul>
  <div class="govuk-footer__meta-custom" v-if="hasText">
    <!-- @slot Text to add to the meta section of the footer, which will appear below any links in the default slot. If content is provided in this slot, the `text` prop will be ignored. -->
    <slot name="text">
      {{ text }}
    </slot>
  </div>
</template>
