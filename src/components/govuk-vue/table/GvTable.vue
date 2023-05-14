<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import hasSlot from '@/composables/useHasSlot'

const props = defineProps({
  classes: {
    type: String,
    default: ''
  },
  caption: String,
  captionClasses: {
    type: String,
    default: ''
  }
})

const hasCaption = computed(() => {
  return props.caption || hasSlot('caption')
})
</script>

<template>
  <table :class="`govuk-table ${classes}`">
    <caption v-if="hasCaption" :class="`govuk-table__caption ${captionClasses}`">
      <slot name="caption">{{ caption }}</slot>
    </caption>
    <slot />
  </table>
</template>
