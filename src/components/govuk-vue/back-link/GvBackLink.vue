<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: 'Back'
  },
  href: {
    type: String,
    default: '#'
  },
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <a :href="href" :class="`govuk-back-link ${classes}`">
    <slot>
      {{ text }}
    </slot>
  </a>
</template>
