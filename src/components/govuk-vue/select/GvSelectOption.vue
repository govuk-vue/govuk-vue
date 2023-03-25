<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

const props = defineProps({
  text: String,
  value: {
    type: [String, Number, Boolean, Object],
    required: true
  }
})
</script>

<template>
  <option :value="value">
    <template v-if="hasSlot('default')">
      <slot />
    </template>
    <template v-else>
      {{ text }}
    </template>
  </option>
</template>
