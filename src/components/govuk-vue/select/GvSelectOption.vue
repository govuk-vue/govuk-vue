<script setup lang="ts">
defineProps({
  text: String,
  value: {
    type: [String, Number, Boolean, Object],
    required: true
  }
})
</script>

<template>
  <option :value="value">
    <slot>
      {{ text }}
    </slot>
  </option>
</template>
