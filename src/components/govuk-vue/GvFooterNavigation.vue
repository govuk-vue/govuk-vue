<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  columns: {
    type: Number,
    validator(value: number) {
      return [1, 2, 3].includes(value)
    }
  },
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
      <slot />
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/footer/footer';
</style>
