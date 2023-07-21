<script setup lang="ts">
import GvTag from '@/components/govuk-vue/tag/GvTag.vue'
import { computed } from 'vue'
import hasSlot from '@/composables/useHasSlot'

const props = defineProps({
  /**
   * Text to use within the phase banner. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * Classes to add to the phase banner content `<p>` tag.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  contentClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Tag props
  /**
   * Text to use within the tag component. If content is provided in the `tag` slot, this prop will be ignored.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  tag: String,
  /**
   * Classes to add to the tag.
   */
  tagClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * The colour of the tag.
   */
  tagColour: {
    type: String,
    validator(value: string) {
      return [
        'grey',
        'green',
        'turquoise',
        'blue',
        'purple',
        'pink',
        'red',
        'orange',
        'yellow'
      ].includes(value)
    }
  }
})

const hasTag = computed(() => {
  return props.tag || hasSlot('tag')
})
</script>

<template>
  <div class="govuk-phase-banner">
    <p class="govuk-phase-banner__content" :class="contentClass">
      <gv-tag v-if="hasTag" :text="tag" class="govuk-phase-banner__content__tag" :class="tagClass">
        <!-- @slot The content of the tag. If content is provided in this slot, the `tag` prop will be ignored. -->
        <slot name="tag" />
      </gv-tag>
      <span class="govuk-phase-banner__text">
        <!-- @slot The content of the phase banner. If content is provided in this slot, the `text` prop will be ignored. -->
        <slot>
          {{ text }}
        </slot>
      </span>
    </p>
  </div>
</template>
