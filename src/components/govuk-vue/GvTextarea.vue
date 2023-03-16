<script setup lang="ts">
import GvLabel from '@/components/govuk-vue/GvLabel.vue'
import GvHint from '@/components/govuk-vue/GvHint.vue'
import hasSlot from '@/composables/useHasSlot'
import { computed } from 'vue'
import GvFragment from '@/components/govuk-vue/util/GvFragment.vue'
import GvErrorMessage from '@/components/govuk-vue/GvErrorMessage.vue'

const props = defineProps({
  modelValue: String,
  id: {
    type: String,
    required: true
  },
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
    <textarea
      :id="id"
      :name="name"
      :class="`govuk-textarea ${classes}`"
      :rows="rows"
      :spellcheck="spellcheck === null ? null : spellcheck"
      :disabled="disabled"
      :aria-describedby="computedDescribedBy"
      :autocomplete="autocomplete"
      v-model="value"
    ></textarea>
  </div>
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/textarea/textarea';
</style>
