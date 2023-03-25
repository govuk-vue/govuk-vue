<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import hasSlot from '@/composables/useHasSlot'

const props = defineProps({
  modelValue: [String, Number, Boolean, Object],
  id: {
    type: String,
    required: true
  },
  name: String,
  classes: {
    type: String,
    default: ''
  },
  describedBy: String,
  disabled: Boolean,
  //Label props
  labelText: String,
  labelIsPageHeading: {
    type: Boolean,
    default: false
  },
  labelClasses: String,
  //hint props
  hintText: String,
  hintClasses: {
    type: String,
    default: ''
  },
  //error message props
  errorMessageText: String,
  errorMessageClasses: {
    type: String,
    default: ''
  },
  errorMessageVisuallyHiddenText: String,
  //Form group props
  formGroupClasses: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const modelValueMutable = ref(props.modelValue)

watch(modelValueMutable, (newModelValueMutable) => {
  emit('update:modelValue', newModelValueMutable)
})

const hasHint = computed(() => {
  return props.hintText || hasSlot('hint')
})

const hasErrorMessage = computed(() => {
  return props.errorMessageText || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${props.id}-error`
})

const hintId = computed(() => {
  return `${props.id}-hint`
})

const computedDescribedBy = computed(() => {
  const value = `${props.describedBy ? props.describedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : null
})
</script>

<template>
  <div
    :class="`govuk-form-group ${formGroupClasses} ${
      hasErrorMessage ? 'govuk-form-group--error' : ''
    }`"
  >
    <gv-label
      :for-id="id"
      :text="labelText"
      :classes="labelClasses"
      :is-page-heading="labelIsPageHeading"
    >
      <slot name="label" />
    </gv-label>
    <gv-hint v-if="hasHint" :text="hintText" :classes="hintClasses" :id="hintId">
      <slot name="hint" />
    </gv-hint>
    <gv-error-message
      v-if="hasErrorMessage"
      :text="errorMessageText"
      :classes="errorMessageClasses"
      :id="errorMessageId"
    >
      <slot name="error-message" />
    </gv-error-message>

    <select
      :id="id"
      :name="name"
      :class="`govuk-select ${hasErrorMessage ? 'govuk-select--error' : ''} ${classes}`"
      v-model="modelValueMutable"
      :disabled="disabled"
      :aria-describedby="computedDescribedBy"
    >
      <slot />
    </select>
  </div>
</template>
