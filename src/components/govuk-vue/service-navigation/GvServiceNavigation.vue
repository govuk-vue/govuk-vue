<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import { useIsTablet } from '@/composables/useIsTablet'

const props = defineProps({
  /**
   * The text for the `aria-label` which labels the service navigation container when a service name is included.
   */
  ariaLabel: {
    type: String,
    default: 'Service information'
  },
  /**
   * The text of the mobile navigation menu toggle.
   */
  menuButtonText: {
    type: String,
    default: 'Menu'
  },
  /**
   * The screen reader label for the mobile navigation menu toggle. Defaults to the same value as `menuButtonText` if not specified.
   */
  menuButtonLabel: String,
  /**
   * The screen reader label for the mobile navigation menu. Defaults to the same value as `menuButtonText` if not specified.
   */
  navigationLabel: String,
  /**
   * The ID used to associate the mobile navigation toggle with the navigation menu.
   */
  navigationId: {
    type: String,
    default: 'navigation'
  },
  /**
   * Classes to add to the navigation menu container.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  navigationClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * The name of your service.
   */
  serviceName: String,
  /**
   * The homepage of your service.
   */
  serviceUrl: String,
  /**
   * The component used to render the service name link, for example `RouterLink`. Will default to `a` if a `serviceUrl` is provided or no link otherwise.
   */
  serviceNameLinkComponent: [String, Object]
})

let isTablet = useIsTablet()
let menuIsOpen = ref(false)

function handleMenuButtonClick() {
  menuIsOpen.value = !menuIsOpen.value
}

const showMenu = computed(() => {
  return menuIsOpen.value || isTablet.value
})

const computedWrapperElement = computed(() => {
  if (props.serviceName || hasSlot('start') || hasSlot('end')) {
    return 'section'
  } else {
    return 'div'
  }
})

const computedAriaLabel = computed(() => {
  return computedWrapperElement.value === 'section' ? props.ariaLabel : undefined
})

const computedServiceNameElement = computed(() => {
  if (props.serviceNameLinkComponent) {
    return props.serviceNameLinkComponent
  } else if (props.serviceUrl) {
    return 'a'
  } else {
    return 'span'
  }
})

const computedServiceNameClass = computed(() => {
  return computedServiceNameElement.value === 'span'
    ? 'govuk-service-navigation__text'
    : 'govuk-service-navigation__link'
})

const computedMenuButtonLabel = computed(() => {
  const label = props.menuButtonLabel ? props.menuButtonLabel : props.menuButtonText

  // We don't want an aria-label if it's the same as the visible text
  if (label === props.menuButtonText) {
    return undefined
  } else {
    return label
  }
})

const computedNavigationLabel = computed(() => {
  return props.navigationLabel ? props.navigationLabel : props.menuButtonText
})

const hasNavigation = computed(() => {
  return hasSlot('default')
})
</script>
<template>
  <component
    :is="computedWrapperElement"
    class="govuk-service-navigation"
    :aria-label="computedAriaLabel"
  >
    <div class="govuk-width-container">
      <!-- @slot Content injected at the start of the service header container -->
      <slot name="start" />
      <div class="govuk-service-navigation__container">
        <span v-if="serviceName" class="govuk-service-navigation__service-name">
          <component
            :is="computedServiceNameElement"
            :class="computedServiceNameClass"
            :href="serviceUrl"
            >{{ serviceName }}</component
          >
        </span>
        <nav
          v-if="hasNavigation"
          :aria-label="computedNavigationLabel"
          class="govuk-service-navigation__wrapper"
          :class="navigationClass"
        >
          <button
            type="button"
            class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle"
            :aria-controls="navigationId"
            :aria-label="computedMenuButtonLabel"
            :aria-expanded="!isTablet && showMenu"
            :hidden="isTablet"
            @click="handleMenuButtonClick"
          >
            {{ menuButtonText }}
          </button>

          <ul class="govuk-service-navigation__list" :id="navigationId" :hidden="!showMenu">
            <!-- @slot A list of `gv-service-navigation-item`s -->
            <slot />
          </ul>
        </nav>
      </div>
      <!-- @slot Content injected at the end of the service header container -->
      <slot name="start" />
    </div>
  </component>
</template>
