<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import hasSlot from '@/composables/useHasSlot'
import { computed, normalizeClass, ref, watch } from 'vue'
import type { Ref } from 'vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import { createUid } from '@/util/createUid'

const props = defineProps({
  /**
   * Will be set to a `FileList` containing the selected files when the user changes their selection.
   * In most cases you should use `v-model` instead of setting this prop directly.
   */
  modelValue: null,
  /**
   * The ID of the input. If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * The name of the input, which is submitted with the form data.
   */
  name: String,
  /**
   * One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive
   * information for screenreader users.
   */
  describedBy: String,
  /**
   * A comma-separated list of filetypes to accept. See [the accept attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept).
   */
  accept: String,
  /**
   * If `true`, the user will be allowed to select multiple files
   */
  multiple: {
    type: Boolean,
    default: false
  },
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
   * Text to use within the label. If content is provided in the `label` slot, this prop will be ignored.
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
const emit = defineEmits(['update:modelValue'])

const fileInputElement: Ref<HTMLInputElement | null> = ref(null)

const computedId = computed(() => {
  return props.id ? props.id : createUid('gv-file-upload')
})

const hasHint = computed(() => {
  return props.hint || hasSlot('hint')
})

const hintId = computed(() => {
  return `${computedId.value}-hint`
})

const hasErrorMessage = computed(() => {
  return props.errorMessage || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedId.value}-error`
})

const computedDescribedBy = computed(() => {
  const value = `${props.describedBy ? props.describedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : undefined
})

function handleChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).files)
}

// If the modelValue prop changes to null out the file list, update the value of the input
watch(
  () => props.modelValue,
  (newModelValue) => {
    if (fileInputElement.value && (newModelValue === null || newModelValue.length === 0)) {
      fileInputElement.value.value = ''
    }
  }
)

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
    <!-- @slot Content to add before the input. If content is provided in this slot, the `beforeInput` prop will be ignored. -->
    <slot name="before-input">
      {{ beforeInput }}
    </slot>
    <input
      type="file"
      :id="computedId"
      :name="name"
      class="govuk-file-upload"
      :class="{
        'govuk-input--error': hasErrorMessage
      }"
      :aria-describedby="computedDescribedBy"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange($event)"
      ref="fileInputElement"
      v-bind="$attrs"
    />
    <!-- @slot Content to add after the input. If content is provided in this slot, the `afterInput` prop will be ignored. -->
    <slot name="after-input">
      {{ afterInput }}
    </slot>
  </div>
</template>
