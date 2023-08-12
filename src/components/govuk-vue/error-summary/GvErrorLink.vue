<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import GvFragment from '@/components/util/GvFragment.vue'

const props = defineProps({
  /**
   * Text for the error link item. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * ID of the component on the page that the error link should jump to.
   */
  targetId: String,
  /**
   * Href attribute for the error link item. Only use this if you're linking to another page. If you're linking to an element on this page, use `targetId` instead.
   */
  href: String,
  /**
   * The component used to render the link, for example `RouterLink`. Will default to `a` if an `href` or `targetId` is provided or no link otherwise.
   */
  component: [String, Object]
})

const computedElement = computed(() => {
  if (props.component) {
    return props.component
  } else if (computedHref.value) {
    return 'a'
  } else {
    return GvFragment
  }
})

const computedHref = computed(() => {
  if (props.targetId) {
    return `#${props.targetId}`
  } else if (props.href) {
    return props.href
  } else {
    return undefined
  }
})

// Based on https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/src/govuk/components/error-summary/error-summary.mjs
function handleClick(e: Event) {
  if (!(computedHref.value && computedHref.value[0] === '#')) {
    return
  }

  if (!props.targetId) {
    return false
  }

  const input = document.getElementById(props.targetId)
  if (!input) {
    return false
  }

  const legendOrLabel = getAssociatedLegendOrLabel(input)
  if (!legendOrLabel) {
    return false
  }

  legendOrLabel.scrollIntoView()
  input.focus({ preventScroll: true })
  e.preventDefault()
}

function getAssociatedLegendOrLabel(input: HTMLElement) {
  const fieldset = input.closest('fieldset')

  if (fieldset) {
    const legends = fieldset.getElementsByTagName('legend')

    if (legends.length) {
      const candidateLegend = legends[0]

      // If the input type is radio or checkbox, always use the legend if there
      // is one.
      if (
        input instanceof HTMLInputElement &&
        (input.type === 'checkbox' || input.type === 'radio')
      ) {
        return candidateLegend
      }

      // For other input types, only scroll to the fieldset’s legend (instead of
      // the label associated with the input) if the input would end up in the
      // top half of the screen.
      //
      // This should avoid situations where the input either ends up off the
      // screen, or obscured by a software keyboard.
      const legendTop = candidateLegend.getBoundingClientRect().top
      const inputRect = input.getBoundingClientRect()

      // If the browser doesn't support Element.getBoundingClientRect().height
      // or window.innerHeight (like IE8), bail and just link to the label.
      if (inputRect.height && window.innerHeight) {
        const inputBottom = inputRect.top + inputRect.height

        if (inputBottom - legendTop < window.innerHeight / 2) {
          return candidateLegend
        }
      }
    }
  }

  return (
    document.querySelector(`label[for='${input.getAttribute('id')}']`) || input.closest('label')
  )
}
</script>

<template>
  <li>
    <component :is="computedElement" :href="computedHref" v-bind="$attrs" @click="handleClick">
      <!-- @slot The content of the error link. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>{{ text }}</slot>
    </component>
  </li>
</template>
