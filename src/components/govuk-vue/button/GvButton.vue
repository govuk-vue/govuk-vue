<script setup lang="ts">
import { computed, ref } from 'vue'

const buttonElement = ref(null)
const props = defineProps({
  /**
   * Text for the button or link. If content is provided in the default slot, or if `element` is set to `input`, this prop will be ignored.
   */
  text: String,
  /**
   * Name for the `input` or `button`. This has no effect if `element` is `a`.
   */
  name: String,
  /**
   * Type of `input` or `button` - `button`, `submit` or `reset`. This has no effect if `component` is not `input` or `button`.
   */
  type: {
    type: String,
    default: 'button'
  },
  /**
   * Value for the `button` tag. This has no effect if `element` is not `button`
   */
  value: String,
  /**
   * Whether the button should be disabled. If `element` is `input` or `button`, `disabled` and `aria-disabled`
   * attributes will be set automatically.
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * The URL that the button should link to. If this is set, `element` will be automatically set to `a` if it has not already been defined.
   */
  href: String,
  /**
   * Use for the main call to action on your service's start page.
   */
  isStartButton: {
    type: Boolean,
    default: false
  },
  /**
   * The prominence of the button.
   */
  variant: {
    type: String,
    default: 'primary',
    validator(e: string) {
      return ['primary', 'secondary', 'warning'].includes(e)
    }
  },
  /**
   * The ID of the button.
   */
  id: String,
  /**
   * The component used to render the button, for example `RouterLink`. Will default to `a` if an `href` is provided or `button` otherwise.
   */
  component: [String, Object]
})

const computedElement = computed(() => {
  if (props.component) {
    return props.component
  } else if (props.href) {
    return 'a'
  } else {
    return 'button'
  }
})

const isLink = computed(() => {
  if (
    typeof computedElement.value === 'string' &&
    ['input', 'button'].includes(computedElement.value)
  ) {
    return false
  }

  return true
})

const isInput = computed(() => {
  return computedElement.value === 'input'
})

const variantClass = computed(() => {
  if (['secondary', 'warning'].includes(props.variant)) {
    return `govuk-button--${props.variant}`
  }
  return ''
})

/**
 * Trigger a click event when the space key is pressed
 *
 * Some screen readers tell users they can activate things with the 'button'
 * role, so we need to match the functionality of native HTML buttons
 *
 * See https://github.com/alphagov/govuk_elements/pull/272#issuecomment-233028270
 */
function handleKeyDownSpace(): void {
  if (computedElement.value === 'a' && buttonElement.value) {
    const button: HTMLAnchorElement = buttonElement.value
    button.click()
  }
}
</script>

<template>
  <!-- TODO implement prevent double click (if necessary) -->
  <component
    ref="buttonElement"
    :is="computedElement"
    :id="id"
    :name="name"
    :class="`govuk-button ${variantClass} ${isStartButton ? 'govuk-button--start' : ''}`"
    :disabled="disabled ? 'disabled' : null"
    :aria-disabled="disabled ? 'true' : null"
    :href="isLink ? (href ? href : '#') : null"
    :role="isLink ? 'button' : null"
    :draggable="isLink ? 'false' : null"
    :value="computedElement === 'input' ? text : value"
    :type="isLink ? null : type"
    v-on:keydown.space="handleKeyDownSpace"
  >
    <template v-if="!isInput">
      <!-- @slot The content of the button. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>
        {{ text }}
      </slot>

      <svg
        v-if="isStartButton"
        class="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
      </svg>
    </template>
  </component>
</template>
