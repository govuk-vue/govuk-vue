<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  titleText: String,
  headingLevel: {
    type: Number,
    default: 1
  },
  text: String,
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="`govuk-panel govuk-panel--confirmation ${classes}`">
    <component :is="`h${headingLevel}`" class="govuk-panel__title">
      <template v-if="hasSlot('title')">
        <slot name="title" />
      </template>
      <template v-else>
        {{ titleText }}
      </template>
    </component>
    <div class="govuk-panel__body">
      <template v-if="hasSlot('default')">
        <slot />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </div>
  </div>
</template>
