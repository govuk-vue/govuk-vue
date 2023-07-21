<script setup lang="ts">
defineProps({
  /**
   * Text to use within the inset text component. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * ID attribute to add to the inset text container.
   */
  id: String
})
</script>

<template>
  <div :id="id" class="govuk-inset-text">
    <!-- @slot The content of the inset text. If content is provided in this slot, the `text` prop will be ignored. -->
    <slot>
      {{ text }}
    </slot>
  </div>
</template>
