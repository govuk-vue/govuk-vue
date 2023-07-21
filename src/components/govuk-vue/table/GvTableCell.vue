<script setup lang="ts">
defineProps({
  /**
   * Text to show in the table cell. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * The format of the cell. Currently only accepts `numeric`, which makes the text right-aligned and uses [tabular numbers](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric#numeric-spacing-values) if your font supports them.
   */
  format: {
    type: String,
    validator(value: string) {
      return ['numeric'].includes(value)
    }
  }
})
</script>

<template>
  <td
    class="govuk-table__cell"
    :class="{
      'govuk-table__cell--numeric': format === 'numeric'
    }"
  >
    <!-- @slot The content of the table cell. If content is provided in this slot, the `text` prop will be ignored. -->
    <slot>
      {{ text }}
    </slot>
  </td>
</template>
