<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import hasSlot from '@/composables/useHasSlot'
import { computed, normalizeClass, toRef } from 'vue'
import GvFragment from '@/components/util/GvFragment.vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  /**
   * The value of the input. In most cases you should use `v-model` instead of setting this prop directly.
   */
  modelValue: String,
  /**
   * The ID of the input
   *
   * If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * The name of the input, which is submitted with the form data.
   */
  name: String,
  /**
   * Type of input control to render, for example, a password input control. Defaults to `text`.
   */
  type: {
    type: String,
    default: 'text'
  },
  /**
   * Optional value for [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).
   */
  inputmode: {
    type: String,
    validator(e: string) {
      return ['text', 'none', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'].includes(e)
    }
  },
  /**
   * One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
   */
  describedBy: String,
  autocomplete: String,
  pattern: String,
  spellcheck: {
    type: Boolean,
    default: null
  },
  disabled: Boolean,
  //Form group props
  formGroupClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Label props
  label: String,
  labelIsPageHeading: {
    type: Boolean,
    default: false
  },
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
  //prefix props
  prefix: String,
  prefixClass: {
    type: [String, Array, Object],
    default: ''
  },
  //suffix props
  suffix: String,
  suffixClass: {
    type: [String, Array, Object],
    default: ''
  },
  //error message props
  errorMessage: String,
  errorMessageClass: {
    type: [String, Array, Object],
    default: ''
  },
  errorMessageVisuallyHiddenText: String
})
defineEmits(['update:modelValue'])

const hasHint = computed(() => {
  console.log(`hint for ${props.label}: ${hasSlot('hint')}`)
  return props.hint || hasSlot('hint')
})

const hintId = computed(() => {
  return `${computedId.value}-hint`
})

const hasPrefix = computed(() => {
  return props.prefix || hasSlot('prefix')
})

const hasSuffix = computed(() => {
  return props.suffix || hasSlot('suffix')
})

const hasErrorMessage = computed(() => {
  return props.errorMessage || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedId.value}-error`
})

const computedId = useComputedId(toRef(props, 'id'), 'gv-input')

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
    <component
      :is="computedWrapperElement"
      :class="hasPrefix || hasSuffix ? 'govuk-input__wrapper' : ''"
    >
      <div v-if="hasPrefix" class="govuk-input__prefix" :class="prefixClass" aria-hidden="true">
        <slot name="prefix">
          {{ prefix }}
        </slot>
      </div>
      <input
        :id="computedId"
        :name="name"
        class="govuk-input"
        :class="{
          'govuk-input--error': hasErrorMessage
        }"
        :spellcheck="spellcheck"
        :value="modelValue"
        :disabled="disabled"
        :aria-describedby="computedDescribedBy"
        :autocomplete="autocomplete"
        :pattern="pattern"
        :inputmode="inputmode"
        :type="type"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="$attrs"
      />
      <div v-if="hasSuffix" class="govuk-input__suffix" :class="suffixClass" aria-hidden="true">
        <slot name="suffix">
          {{ suffix }}
        </slot>
      </div>
    </component>
  </div>
</template>
