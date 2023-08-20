<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

defineProps({
  /**
   * Text to use within the skip link component. If content is provided in the default slot, this prop will be ignored.
   */
  text: {
    type: String,
    default: 'Skip to main content'
  },
  /**
   * The value of the skip link’s `href` attribute.
   */
  href: {
    type: String,
    default: '#content'
  }
})

const anchorElement: Ref<HTMLAnchorElement | null> = ref(null)

function handleClick() {
  // Based on https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/src/govuk/components/skip-link/skip-link.mjs
  if (anchorElement.value && anchorElement.value.hash) {
    const linkedElementId = anchorElement.value.hash.split('#').pop()

    if (!linkedElementId) {
      return
    }

    const linkedElement = document.getElementById(linkedElementId)

    if (!linkedElement) {
      return
    }

    if (!linkedElement.getAttribute('tabindex')) {
      // Set the element tabindex to -1 so it can be focused with JavaScript.
      linkedElement.setAttribute('tabindex', '-1')
      linkedElement.classList.add('govuk-skip-link-focused-element')

      // Add listener for blur on the focused element
      linkedElement.addEventListener('blur', () => {
        linkedElement.removeAttribute('tabindex')
        linkedElement.classList.remove('govuk-skip-link-focused-element')
      })
    }

    linkedElement.focus()
  }
}
</script>

<template>
  <a :href="href" class="govuk-skip-link" @click="handleClick" ref="anchorElement">
    <!-- @slot The content of the skip link. If content is provided in this slot, the `text` prop will be ignored. -->
    <slot>
      {{ text }}
    </slot>
  </a>
</template>
