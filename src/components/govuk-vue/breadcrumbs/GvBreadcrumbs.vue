<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  /**
   * When true, the breadcrumbs will collapse to the first and last item only on tablet breakpoint and below.
   */
  collapseOnMobile: {
    type: Boolean,
    default: false
  },
  /**
   * 	The text for the `aria-label` on the `<nav>` element around the breadcrumbs.
   */
  ariaLabel: {
    type: String,
    default: 'Breadcrumb'
  }
})
</script>

<template>
  <nav
    :class="`govuk-breadcrumbs ${collapseOnMobile ? 'govuk-breadcrumbs--collapse-on-mobile' : ''}`"
    :aria-label="ariaLabel"
  >
    <ol class="govuk-breadcrumbs__list">
      <!-- @slot A list of `gv-breadcrumb-item`s -->
      <slot />
    </ol>
  </nav>
</template>
