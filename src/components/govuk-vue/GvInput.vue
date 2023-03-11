<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  id: {
    type: String,
    required: true
  },
  name: String,
  type: {
    type: String,
    default: 'text'
  },
  inputmode: String,
  describedBy: String,
  classes: {
    type: String,
    default: ''
  },
  autocomplete: String,
  pattern: String,
  spellcheck: {
    type: Boolean,
    default: null
  },
  attributes: Object,
  disabled: Boolean
})
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :class="`govuk-input ${classes}`"
    :spellcheck="spellcheck === null ? null : spellcheck"
    :value="modelValue"
    :disabled="disabled"
    :aria-describedby="describedBy ? describedBy : null"
    :autocomplete="autocomplete ? autocomplete : null"
    :pattern="pattern ? pattern : null"
    :inputmode="inputmode ? inputmode : null"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/input/input';
</style>
