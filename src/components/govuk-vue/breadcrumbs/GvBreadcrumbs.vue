<script setup lang="ts">
defineProps({
  classes: {
    type: String,
    default: ''
  },
  collapseOnMobile: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    :class="`govuk-breadcrumbs ${classes} ${
      collapseOnMobile ? 'govuk-breadcrumbs--collapse-on-mobile' : ''
    }`"
  >
    <ol class="govuk-breadcrumbs__list">
      <slot />
    </ol>
  </div>
</template>
