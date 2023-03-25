<script setup lang="ts">
import { computed, ref } from 'vue'

const buttonElement = ref(null)
const props = defineProps({
  element: String,
  text: String,
  name: String,
  type: {
    type: String,
    default: 'submit'
  },
  value: String,
  disabled: {
    type: Boolean,
    default: false
  },
  href: String,
  classes: {
    type: String,
    default: ''
  },
  attributes: Object,
  preventDoubleClick: {
    type: Boolean,
    default: false
  },
  isStartButton: {
    type: Boolean,
    default: false
  },
  id: String
})

const computedElement = computed(() => {
  if (props.element) {
    return props.element
  } else {
    if (props.href) {
      return 'a'
    } else {
      return 'button'
    }
  }
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
  <!-- TODO implement custom attributes -->
  <!-- TODO implement prevent double click (if necessary) -->
  <component
    ref="buttonElement"
    :is="computedElement"
    :id="id"
    :name="name"
    :class="`govuk-button ${classes} ${isStartButton ? 'govuk-button--start' : ''} ${
      disabled ? 'govuk-button--disabled' : ''
    }`"
    :disabled="disabled ? 'disabled' : null"
    :aria-disabled="disabled ? 'true' : null"
    :href="computedElement === 'a' ? (href ? href : '#') : null"
    :role="computedElement === 'a' ? 'button' : null"
    :draggable="computedElement === 'a' ? 'false' : null"
    :value="computedElement === 'input' ? text : null"
    :type="computedElement === 'input' ? type : null"
    v-on:keydown.space="handleKeyDownSpace"
  >
    <template v-if="['a', 'button'].includes(computedElement)">
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        {{ text }}
      </template>

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
