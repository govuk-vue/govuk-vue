<script setup lang="ts">
defineProps({
  /**
   * Text to use within the back link component. If content is provided in the default slot, this prop will be ignored.
   */
  text: {
    type: String,
    default: 'Back'
  },
  /**
   *  The value of the link's `href` attribute.
   */
  href: {
    type: String,
    default: '#'
  },
  /**
   * The component used to render the link, for example `RouterLink`.
   */
  component: {
    type: [String, Object],
    default: 'a'
  }
})
</script>

<template>
  <component :is="component" :href="href" class="govuk-back-link">
    <!-- @slot The content of the back link. If content is provided in this slot, the `text` prop will be ignored. -->
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
