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
   * The ID of the input.
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
  /**
   * Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html),
   * for example `postal-code` or `username`. See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
   * for full list of values that can be used.
   */
  autocomplete: String,
  /**
   * Attribute to [provide a regular expression pattern](https://html.spec.whatwg.org/multipage/input.html#the-pattern-attribute),
   * used to match allowed character combinations for the input value.
   */
  pattern: String,
  /**
   * Whether to enable or disable the `spellcheck` attribute on the input
   */
  spellcheck: {
    type: Boolean,
    default: null
  },
  /**
   * If `true`, input will be disabled.
   */
  disabled: Boolean,
  //Form group props
  /**
   * Classes to add to the form group. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  formGroupClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Label props
  /**
   * Text to use within the label. If content is provided in the default slot, this prop will be ignored.
   */
  label: String,
  /**
   * Whether the label also acts as the heading for the page.
   */
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
  /**
   * Text to use within the hint. If content is provided in the `hint` slot, this prop will be ignored.
   */
  hint: String,
  /**
   * Classes to add to the hint span tag. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  hintClass: {
    type: [String, Array, Object],
    default: ''
  },
  //prefix props
  /**
   * Text to use within the prefix. If content is provided in the `prefix` slot, this prop will be ignored.
   */
  prefix: String,
  /**
   * Classes to add to the prefix. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  prefixClass: {
    type: [String, Array, Object],
    default: ''
  },
  //suffix props
  /**
   * Text to use within the suffix. If content is provided in the `suffix` slot, this prop will be ignored.
   */
  suffix: String,
  /**
   * Classes to add to the suffix. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  suffixClass: {
    type: [String, Array, Object],
    default: ''
  },
  //error message props
  /**
   * Text to use within the error message. If content is provided in the `error-message` slot, this prop will be ignored.
   */
  errorMessage: String,
  /**
   * Classes to add to the error message `<p>` tag. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  errorMessageClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * A visually hidden prefix used before the error message.
   *
   * Defaults to `'Error'`.
   */
  errorMessageVisuallyHiddenText: String,
  /**
   * Text to add before the input. If content is provided in the `before-input` slot, this prop will be ignored.
   */
  beforeInput: {
    type: String
  },
  /**
   * Text to add after the input. If content is provided in the `after-input` slot, this prop will be ignored.
   */
  afterInput: {
    type: String
  }
})
defineEmits(['update:modelValue'])

const hasHint = computed(() => {
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

const hasBeforeInput = computed(() => {
  return props.beforeInput || hasSlot('before-input')
})

const hasAfterInput = computed(() => {
  return props.afterInput || hasSlot('after-input')
})

const hasErrorMessage = computed(() => {
  return props.errorMessage || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedId.value}-error`
})

const computedId = useComputedId(toRef(props, 'id'), 'gv-input')

const computedWrapperElement = computed(() => {
  if (hasPrefix.value || hasSuffix.value || hasBeforeInput.value || hasAfterInput.value) {
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
      <!-- @slot The content of the label. If content is provided in this slot, the `label` prop will be ignored. -->
      <slot name="label" />
    </gv-label>
    <gv-hint v-if="hasHint" :text="hint" :class="hintClass" :id="hintId">
      <!-- @slot The content of the hint. If content is provided in this slot, the `hint` prop will be ignored. -->
      <slot name="hint" />
    </gv-hint>
    <gv-error-message
      v-if="hasErrorMessage"
      :text="errorMessage"
      :class="errorMessageClass"
      :id="errorMessageId"
      :visually-hidden-text="errorMessageVisuallyHiddenText"
    >
      <!-- @slot The content of the error message. If content is provided in this slot, the `errorMessage` prop will be ignored. -->
      <slot name="error-message" />
    </gv-error-message>
    <component
      :is="computedWrapperElement"
      :class="
        hasPrefix || hasSuffix || hasBeforeInput || hasAfterInput ? 'govuk-input__wrapper' : ''
      "
    >
      <!-- @slot Content to add before the input. If content is provided in this slot, the `beforeInput` prop will be ignored. -->
      <slot name="before-input">
        {{ beforeInput }}
      </slot>
      <div v-if="hasPrefix" class="govuk-input__prefix" :class="prefixClass" aria-hidden="true">
        <!-- @slot The content of the prefix. If content is provided in this slot, the `prefix` prop will be ignored. -->
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
        <!-- @slot The content of the suffix. If content is provided in this slot, the `suffix` prop will be ignored. -->
        <slot name="suffix">
          {{ suffix }}
        </slot>
      </div>
      <!-- @slot Content to add after the input. If content is provided in this slot, the `afterInput` prop will be ignored. -->
      <slot name="after-input">
        {{ afterInput }}
      </slot>
    </component>
  </div>
</template>
