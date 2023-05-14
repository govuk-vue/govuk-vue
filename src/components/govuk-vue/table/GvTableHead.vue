<script setup lang="ts">
defineProps({
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <thead :class="`govuk-table__head ${classes}`">
    <slot />
  </thead>
</template>
