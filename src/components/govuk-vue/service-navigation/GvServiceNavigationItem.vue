<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  /**
   * If `true`, indicates that the user is currently on this page. This takes precedence over `active`.
   */
  current: Boolean,
  /**
   * If `true`, indicates that the user is within this group of pages in the navigation hierarchy.
   */
  active: Boolean,
  /**
   * Text for the navigation item. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * URL of the navigation item anchor.
   */
  href: String,
  /**
   * The component used to render the link, for example `RouterLink`. Will default to `a` if an `href` is provided or no link otherwise.
   */
  component: [String, Object]
})

const computedLinkElement = computed(() => {
  if (props.component) {
    return props.component
  } else if (props.href) {
    return 'a'
  } else {
    return 'span'
  }
})

const computedLinkClass = computed(() => {
  return computedLinkElement.value === 'span'
    ? 'govuk-service-navigation__text'
    : 'govuk-service-navigation__link'
})

const computedAriaCurrent = computed(() => {
  if (props.current) {
    return 'page'
  } else if (props.active) {
    return 'true'
  } else {
    return undefined
  }
})
</script>

<template>
  <li
    class="govuk-service-navigation__item"
    :class="{ 'govuk-service-navigation__item--active': current || active }"
  >
    <component
      :is="computedLinkElement"
      :class="computedLinkClass"
      :aria-current="computedAriaCurrent"
      :href="href"
      v-bind="$attrs"
    >
      <!-- @slot The content of the navigation item. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>
        {{ text }}
      </slot>
    </component>
  </li>
</template>
