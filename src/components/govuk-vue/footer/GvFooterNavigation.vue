<script setup lang="ts">
defineProps({
  /**
   * Title for the navigation section
   */
  title: {
    type: String,
    required: true
  },
  /**
   * Amount of columns to display items in navigation section.
   */
  columns: {
    type: Number,
    default: 1,
    validator(value: number) {
      return [1, 2, 3].includes(value)
    }
  },
  /**
   * Width of each navigation section in the footer. You can pass any GOV.UK Design System grid width here.
   */
  width: {
    type: String,
    default: 'full',
    validator(value: string) {
      return [
        'full',
        'one-half',
        'one-third',
        'two-thirds',
        'one-quarter',
        'three-quarters'
      ].includes(value)
    }
  }
})
</script>

<template>
  <div :class="`govuk-footer__section govuk-grid-column-${width}`">
    <h2 class="govuk-footer__heading govuk-heading-m">{{ title }}</h2>
    <ul
      class="govuk-footer__list"
      :class="columns > 1 ? `govuk-footer__list--columns-${columns}` : ''"
    >
      <!-- @slot A list of `GvFooterNavigationItem`s -->
      <slot />
    </ul>
  </div>
</template>
