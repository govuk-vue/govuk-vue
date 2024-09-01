<script setup lang="ts">
import GvInput from '@/components/govuk-vue/input/GvInput.vue'
import GvButton from '@/components/govuk-vue/button/GvButton.vue'
import { computed, normalizeClass, ref, watch } from 'vue'
import { createUid } from '@/util/createUid'
import GvTextarea from '@/components/govuk-vue/textarea/GvTextarea.vue'

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
   * One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
   */
  describedBy: String,
  /**
   * Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html),
   * for example `new-password`. See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
   * for full list of values that can be used.
   */
  autocomplete: {
    type: String,
    default: 'current-password'
  },
  /**
   * If `true`, input will be disabled.
   */
  disabled: Boolean,
  /**
   * Button text when the password is hidden.
   */
  showPasswordText: {
    type: String,
    default: 'Show'
  },
  /**
   * Button text when the password is visible.
   */
  hidePasswordText: {
    type: String,
    default: 'Hide'
  },
  /**
   * Button text exposed to assistive technologies, like screen readers, when the password is hidden.
   */
  showPasswordAriaLabel: {
    type: String,
    default: 'Show password'
  },
  /**
   * Button text exposed to assistive technologies, like screen readers, when the password is visible.
   */
  hidePasswordAriaLabel: {
    type: String,
    default: 'Hide password'
  },
  /**
   * Announcement made to screen reader users when their password has become visible in plain text.
   */
  passwordShownAnnouncementText: {
    type: String,
    default: 'Your password is visible'
  },
  /**
   * Announcement made to screen reader users when their password has been obscured and is not visible.
   */
  passwordHiddenAnnouncementText: {
    type: String,
    default: 'Your password is hidden'
  },
  /**
   * Sets whether the password is visible. Use `v-model:password-visible` to keep track of the visibility.
   */
  passwordVisible: {
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
  //button props
  /**
   * Classes to add to the button. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  buttonClass: {
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
const emit = defineEmits(['update:modelValue', 'update:password-visible'])

const modelValueMutable = ref(props.modelValue ? props.modelValue : null)

watch(modelValueMutable, (newModelValueMutable: string) => {
  emit('update:modelValue', newModelValueMutable)
})

// If the modelValue prop changes, copy that change to our mutable version of the modelValue
watch(
  () => props.modelValue,
  (newModelValue) => {
    modelValueMutable.value = newModelValue
  }
)

const passwordVisibleMutable = ref(props.passwordVisible)

watch(passwordVisibleMutable, (newPasswordVisibleMutable: boolean) => {
  emit('update:password-visible', newPasswordVisibleMutable)
})

// If the passwordVisible prop changes, copy that change to our mutable version of the passwordVisible
watch(
  () => props.passwordVisible,
  (newPasswordVisibleMutable: boolean) => {
    passwordVisibleMutable.value = newPasswordVisibleMutable
  }
)

const computedId = computed(() => {
  return props.id ? props.id : createUid('gv-password-input')
})

const normalizedFormGroupClass = computed(() => {
  return normalizeClass(props.formGroupClass)
})

const normalizedButtonClass = computed(() => {
  return normalizeClass(props.buttonClass)
})

const buttonText = computed(() => {
  return passwordVisibleMutable.value ? props.hidePasswordText : props.showPasswordText
})

const buttonAriaLabel = computed(() => {
  return passwordVisibleMutable.value ? props.hidePasswordAriaLabel : props.showPasswordAriaLabel
})

const announcementText = computed(() => {
  return passwordVisibleMutable.value
    ? props.passwordShownAnnouncementText
    : props.passwordHiddenAnnouncementText
})

const inputType = computed(() => {
  return passwordVisibleMutable.value ? 'text' : 'password'
})

function toggleVisibility() {
  passwordVisibleMutable.value = !passwordVisibleMutable.value
}

// If the page is restored from bfcache and the password is visible, hide it again
window.addEventListener('pageshow', (event) => {
  if (event.persisted && passwordVisibleMutable) {
    toggleVisibility()
  }
})
</script>
<template>
  <gv-input
    v-model="modelValueMutable"
    class="govuk-password-input__input govuk-js-password-input-input"
    :form-group-class="`govuk-password-input ${normalizedFormGroupClass}`"
    :label="label"
    :label-is-page-heading="labelIsPageHeading"
    :label-class="labelClass"
    :hint="hint"
    :hint-class="hintClass"
    :error-message="errorMessage"
    :error-message-class="errorMessageClass"
    :error-message-visually-hidden-text="errorMessageVisuallyHiddenText"
    :id="computedId"
    :name="name"
    :type="inputType"
    :spellcheck="false"
    autocapitalize="none"
    :autocomplete="autocomplete"
    :disabled="disabled"
    :described-by="describedBy"
  >
    <template #label>
      <!-- @slot The content of the label. If content is provided in this slot, the `label` prop will be ignored. -->
      <slot name="label" />
    </template>
    <template #hint>
      <!-- @slot The content of the hint. If content is provided in this slot, the `hint` prop will be ignored. -->
      <slot name="hint" />
    </template>
    <template #error-message>
      <!-- @slot The content of the error message. If content is provided in this slot, the `errorMessage` prop will be ignored. -->
      <slot name="error-message" />
    </template>
    <template #before-input>
      <!-- @slot Content to add before the input. If content is provided in this slot, the `beforeInput` prop will be ignored. -->
      <slot name="before-input">
        {{ beforeInput }}
      </slot>
    </template>

    <template #after-input>
      <div class="govuk-password-input__sr-status govuk-visually-hidden" aria-live="polite">
        {{ announcementText }}
      </div>
      <gv-button
        :class="`govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle ${normalizedButtonClass}`"
        :text="buttonText"
        :aria-label="buttonAriaLabel"
        :aria-controls="computedId"
        @click="toggleVisibility"
      />
      <!-- @slot Content to add after the input. If content is provided in this slot, the `aftereInput` prop will be ignored. -->
      <slot name="after-input">
        {{ afterInput }}
      </slot>
    </template>
  </gv-input>
</template>
