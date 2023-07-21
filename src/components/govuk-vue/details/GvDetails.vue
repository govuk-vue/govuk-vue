<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  /**
   * Text to use within the summary element (the visible part of the details element). If content is provided in the `summary` slot, this prop will be ignored.
   */
  summary: String,
  /**
   * Text to use within the disclosed part of the details element. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * ID to add to the details element.
   */
  id: String,
  /**
   * The open state of the details element. In most cases you should use `v-model` instead of setting this prop directly.
   */
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])

// We operate on a copy of the modelValue. If we used modelValue directly, opening the details
// wouldn't work if no v-model was provided because the .prevent on the click handler stops the
// details from opening natively and the modelValue prop doesn't update because there's no v-model
const modelValueMutable = ref(props.modelValue)

watch(modelValueMutable, (newModelValueMutable) => {
  emit('update:modelValue', newModelValueMutable)
})

// If the modelValue prop changes, copy that change to our mutable version of the modelValue
watch(
  () => props.modelValue,
  (newModelValue) => {
    modelValueMutable.value = newModelValue
  }
)

function handleSummaryClick() {
  modelValueMutable.value = !modelValueMutable.value
}
</script>

<template>
  <details :id="id" class="govuk-details" :open="modelValueMutable">
    <summary class="govuk-details__summary" @click.prevent="handleSummaryClick">
      <span class="govuk-details__summary-text">
        <!-- @slot The content of the summary element (the visible part of the details element). If content is provided in this slot, the `summary` prop will be ignored. -->
        <slot name="summary">
          {{ summary }}
        </slot>
      </span>
    </summary>
    <div class="govuk-details__text">
      <!-- @slot The content of the disclosed part of the details element. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>
        {{ text }}
      </slot>
    </div>
  </details>
</template>
