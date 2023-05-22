<script setup lang="ts">
defineProps({
  text: String,
  id: String,
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :id="id" :class="`govuk-hint ${classes}`">
    <slot>
      {{ text }}
    </slot>
  </div>
</template>
