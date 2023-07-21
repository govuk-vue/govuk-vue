<script setup lang="ts">
defineProps({
  /**
   * Text to show in the table header. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * The format of the table header. Currently only accepts `numeric`, which makes the text right-aligned and uses [tabular numbers](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric#numeric-spacing-values) if your font supports them.
   */
  format: {
    type: String,
    validator(value: string) {
      return value === 'numeric'
    }
  },
  /**
   * Whether the header is for the row or the column.
   */
  scope: {
    type: String,
    default: 'col',
    validator(value: string) {
      return ['row', 'col'].includes(value)
    }
  }
})
</script>

<template>
  <th
    class="govuk-table__header"
    :class="{
      'govuk-table__header--numeric': format === 'numeric'
    }"
    :scope="scope"
  >
    <!-- @slot The content of the table header. If content is provided in this slot, the `text` prop will be ignored. -->
    <slot>
      {{ text }}
    </slot>
  </th>
</template>
