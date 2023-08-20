<script setup lang="ts">
defineProps({
  /**
   * Text for the option item. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * The value of this option. The parent `GvSelect`'s `v-model` will be set to this value if the option is selected.
   */
  value: {
    type: [String, Number, Boolean, Object],
    required: true
  },
  /**
   * If `true`, option will be disabled.
   */
  disabled: Boolean
})
</script>

<template>
  <option :value="value" :disabled="disabled">
    <!-- @slot The content of the option. If content is provided in this slot, the `text` prop will be ignored. -->
    <slot>
      {{ text }}
    </slot>
  </option>
</template>
