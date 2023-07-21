<script setup lang="ts">
import { ref, Ref } from 'vue'

defineProps({
  text: {
    type: String,
    default: 'Skip to main content'
  },
  href: {
    type: String,
    default: '#'
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
    <slot>
      {{ text }}
    </slot>
  </a>
</template>
