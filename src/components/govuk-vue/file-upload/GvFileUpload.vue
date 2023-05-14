<script setup lang="ts">
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import hasSlot from '@/composables/useHasSlot'
import { computed } from 'vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import { createUid } from '@/util/createUid'

const props = defineProps({
  modelValue: FileList,
  id: String,
  name: String,
  describedBy: String,
  classes: {
    type: String,
    default: ''
  },
  accept: String,
  multiple: {
    type: Boolean,
    default: false
  },
  //Form group props
  formGroupClasses: {
    type: String,
    default: ''
  },
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
  errorMessageVisuallyHiddenText: String
})
const emit = defineEmits(['update:modelValue'])

const computedId = computed(() => {
  return props.id ? props.id : createUid('gv-file-upload')
})

const hasHint = computed(() => {
  return props.hintText || hasSlot('hint')
})

const hintId = computed(() => {
  return `${computedId.value}-hint`
})

const hasErrorMessage = computed(() => {
  return props.errorMessageText || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedId.value}-error`
})

const computedDescribedBy = computed(() => {
  const value = `${props.describedBy ? props.describedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : null
})

function handleChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).files)
}
</script>

<template>
  <div
    :class="`govuk-form-group ${formGroupClasses} ${
      hasErrorMessage ? 'govuk-form-group--error' : ''
    }`"
  >
    <gv-label
      :for-id="computedId"
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
    <input
      type="file"
      :id="computedId"
      :name="name"
      :class="`govuk-file-upload ${hasErrorMessage ? 'govuk-input--error' : ''} ${classes}`"
      :aria-describedby="computedDescribedBy"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange($event)"
    />
  </div>
</template>
