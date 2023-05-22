<script setup lang="ts">
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import hasSlot from '@/composables/useHasSlot'
import { computed, toRef } from 'vue'
import GvFragment from '@/components/util/GvFragment.vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  modelValue: String,
  id: String,
  name: String,
  rows: {
    type: Number,
    default: 5
  },
  describedBy: String,
  classes: {
    type: String,
    default: ''
  },
  autocomplete: String,
  spellcheck: {
    type: Boolean,
    default: null
  },
  disabled: Boolean,
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

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const hasHint = computed(() => {
  return props.hintText || hasSlot('hint')
})

const hasErrorMessage = computed(() => {
  return props.errorMessageText || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedId.value}-error`
})

const hintId = computed(() => {
  return `${computedId.value}-hint`
})

const computedId = useComputedId(toRef(props, 'id'), 'gv-textarea')

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
    <textarea
      :id="computedId"
      :name="name"
      :class="`govuk-textarea ${hasErrorMessage ? 'govuk-textarea--error' : ''} ${classes}`"
      :rows="rows"
      :spellcheck="spellcheck === null ? null : spellcheck"
      :disabled="disabled"
      :aria-describedby="computedDescribedBy"
      :autocomplete="autocomplete"
      v-model="value"
    ></textarea>
    <slot name="below-textarea" />
  </div>
</template>
