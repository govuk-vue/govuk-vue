<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  text: String,
  classes: {
    type: String,
    default: ''
  },
  colour: {
    type: String,
    validator(value: string) {
      return [
        'grey',
        'green',
        'turquoise',
        'blue',
        'purple',
        'pink',
        'red',
        'orange',
        'yellow'
      ].includes(value)
    }
  }
})
</script>

<template>
  <strong :class="`govuk-tag ${classes} ${colour ? `govuk-tag--${colour}` : ''}`">
    <template v-if="hasSlot('default')">
      <slot />
    </template>
    <template v-else>
      {{ text }}
    </template>
  </strong>
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/tag/tag';
</style>
