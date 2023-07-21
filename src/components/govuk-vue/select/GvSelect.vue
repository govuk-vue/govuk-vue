<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, normalizeClass, ref, toRef, watch } from 'vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import hasSlot from '@/composables/useHasSlot'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  modelValue: [String, Number, Boolean, Object],
  id: String,
  name: String,
  describedBy: String,
  disabled: Boolean,
  //Label props
  label: String,
  labelIsPageHeading: {
    type: Boolean,
    default: false
  },
  /**
   * Classes to add to the label tag. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  labelClass: {
    type: [String, Array, Object],
    default: ''
  },
  //hint props
  hint: String,
  hintClass: {
    type: [String, Array, Object],
    default: ''
  },
  //error message props
  errorMessage: String,
  errorMessageClass: {
    type: [String, Array, Object],
    default: ''
  },
  errorMessageVisuallyHiddenText: String,
  //Form group props
  formGroupClass: {
    type: [String, Array, Object],
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const modelValueMutable = ref(props.modelValue)

watch(modelValueMutable, (newModelValueMutable) => {
  emit('update:modelValue', newModelValueMutable)
})

const hasHint = computed(() => {
  return props.hint || hasSlot('hint')
})

const hasErrorMessage = computed(() => {
  return props.errorMessage || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedId.value}-error`
})

const hintId = computed(() => {
  return `${computedId.value}-hint`
})

const computedId = useComputedId(toRef(props, 'id'), 'gv-select')

const computedDescribedBy = computed(() => {
  const value = `${props.describedBy ? props.describedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : undefined
})

const normalizedFormGroupClass = computed(() => {
  return normalizeClass(props.formGroupClass)
})
</script>

<template>
  <div
    :class="`govuk-form-group ${normalizedFormGroupClass} ${
      hasErrorMessage ? 'govuk-form-group--error' : ''
    }`"
  >
    <gv-label
      :for-id="computedId"
      :text="label"
      :class="labelClass"
      :is-page-heading="labelIsPageHeading"
    >
      <slot name="label" />
    </gv-label>
    <gv-hint v-if="hasHint" :text="hint" :class="hintClass" :id="hintId">
      <slot name="hint" />
    </gv-hint>
    <gv-error-message
      v-if="hasErrorMessage"
      :text="errorMessage"
      :class="errorMessageClass"
      :id="errorMessageId"
    >
      <slot name="error-message" />
    </gv-error-message>

    <select
      :id="computedId"
      :name="name"
      class="govuk-select"
      :class="{
        'govuk-select--error': hasErrorMessage
      }"
      v-model="modelValueMutable"
      :disabled="disabled"
      :aria-describedby="computedDescribedBy"
      v-bind="$attrs"
    >
      <slot />
    </select>
  </div>
</template>
