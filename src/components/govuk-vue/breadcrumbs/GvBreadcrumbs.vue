<script setup lang="ts">
defineProps({
  /**
   * When true, the breadcrumbs will collapse to the first and last item only on tablet breakpoint and below.
   */
  collapseOnMobile: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    :class="`govuk-breadcrumbs ${collapseOnMobile ? 'govuk-breadcrumbs--collapse-on-mobile' : ''}`"
  >
    <ol class="govuk-breadcrumbs__list">
      <!-- @slot A list of `gv-breadcrumb-item`s -->
      <slot />
    </ol>
  </div>
</template>
