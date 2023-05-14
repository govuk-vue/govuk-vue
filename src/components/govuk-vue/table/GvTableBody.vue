<script setup lang="ts">
defineProps({
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <tbody :class="`govuk-table__body ${classes}`">
    <slot />
  </tbody>
</template>
