<script setup lang="ts">
defineProps({
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <tr :class="`govuk-table__row ${classes}`">
    <slot />
  </tr>
</template>
