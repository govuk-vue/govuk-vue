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
  type: {
    type: String,
    default: 'text'
  },
  inputmode: String,
  describedBy: String,
  classes: {
    type: String,
    default: ''
  },
  autocomplete: String,
  pattern: String,
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
  //prefix props
  prefixText: String,
  prefixClasses: {
    type: String,
    default: ''
  },
  //suffix props
  suffixText: String,
  suffixClasses: {
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
defineEmits(['update:modelValue'])

const hasHint = computed(() => {
  return props.hintText || hasSlot('hint')
})

const hintId = computed(() => {
  return `${props.id}-hint`
})

const hasPrefix = computed(() => {
  return props.prefixText || hasSlot('prefix')
})

const hasSuffix = computed(() => {
  return props.suffixText || hasSlot('suffix')
})

const hasErrorMessage = computed(() => {
  return props.errorMessageText || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${props.id}-error`
})

const computedWrapperElement = computed(() => {
  if (hasPrefix.value || hasSuffix.value) {
    return 'div'
  } else {
    return GvFragment
  }
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
    <component
      :is="computedWrapperElement"
      :class="hasPrefix || hasSuffix ? 'govuk-input__wrapper' : ''"
    >
      <div v-if="hasPrefix" :class="`govuk-input__prefix ${prefixClasses}`" aria-hidden="true">
        <template v-if="hasSlot('prefix')">
          <slot name="prefix" />
        </template>
        <template v-else>
          {{ prefixText }}
        </template>
      </div>
      <input
        :id="id"
        :name="name"
        :class="`govuk-input ${classes}`"
        :spellcheck="spellcheck"
        :value="modelValue"
        :disabled="disabled"
        :aria-describedby="computedDescribedBy"
        :autocomplete="autocomplete"
        :pattern="pattern"
        :inputmode="inputmode"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div v-if="hasSuffix" :class="`govuk-input__suffix ${suffixClasses}`" aria-hidden="true">
        <template v-if="hasSlot('suffix')">
          <slot name="suffix" />
        </template>
        <template v-else>
          {{ suffixText }}
        </template>
      </div>
    </component>
  </div>
</template>
