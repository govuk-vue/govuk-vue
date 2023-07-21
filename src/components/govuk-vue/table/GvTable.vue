<script setup lang="ts">
import { computed } from 'vue'
import hasSlot from '@/composables/useHasSlot'

const props = defineProps({
  /**
   * The caption text shown above the table. If content is provided in the `caption` slot, this prop will be ignored.
   */
  caption: String,
  /**
   * Class for caption text. You can use `govuk-table__caption--s`, `govuk-table__caption--m`, `govuk-table__caption--l` or `govuk-table__caption--xl` to change the caption size.
   *
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  captionClass: {
    type: [String, Array, Object],
    default: ''
  }
})

const hasCaption = computed(() => {
  return props.caption || hasSlot('caption')
})
</script>

<template>
  <table class="govuk-table">
    <caption v-if="hasCaption" class="govuk-table__caption" :class="captionClass">
      <!-- @slot The content of the caption. If content is provided in this slot, the `caption` prop will be ignored. -->
      <slot name="caption">{{ caption }}</slot>
    </caption>
    <!-- @slot The `GvTableHead` and `GvTableBody`. -->
    <slot />
  </table>
</template>
