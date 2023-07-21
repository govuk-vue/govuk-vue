<script setup lang="ts">
import { computed } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import GvFragment from '@/components/util/GvFragment.vue'

const props = defineProps({
  /**
   * 	One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
   */
  describedBy: String,
  /**
   * Optional ARIA role attribute to add to the fieldset container.
   */
  role: String,
  //Legend props
  /**
   * Text to use within the legend. If content is provided in the `legend` slot, this prop will be ignored.
   */
  legend: String,
  /**
   * Classes to add to the legend.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  legendClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * Whether the legend also acts as the heading for the page.
   */
  legendIsPageHeading: Boolean
})

const hasLegend = computed(() => {
  return props.legend || hasSlot('legend')
})

const computedHeadingWrapperElement = computed(() => {
  if (props.legendIsPageHeading) {
    return 'h1'
  } else {
    return GvFragment
  }
})
</script>

<template>
  <fieldset class="govuk-fieldset" :role="role" :aria-describedby="describedBy">
    <legend v-if="hasLegend" class="govuk-fieldset__legend" :class="legendClass">
      <component :is="computedHeadingWrapperElement" class="govuk-fieldset__heading">
        <!-- @slot The content of the legend. If content is provided in this slot, the `legend` prop will be ignored. -->
        <slot name="legend">
          {{ legend }}
        </slot>
      </component>
    </legend>
    <!-- @slot The content of the fieldset. -->
    <slot />
  </fieldset>
</template>
