<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'
import { computed, ref, toRef } from 'vue'
import { useIsDesktop } from '@/composables/useIsDesktop'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  /**
   * The URL of the homepage, linked to by the logo.
   */
  homepageUrl: {
    type: String,
    default: '/'
  },
  /**
   * The component used to render the homepage link, for example `RouterLink`.
   */
  homepageLinkComponent: {
    type: [String, Object],
    default: 'a'
  },
  /**
   * Product name, used when the product name follows on directly from ‘GOV.UK’. For example, GOV.UK Pay or
   * GOV.UK Design System. In most circumstances, you should use `serviceName`.
   */
  productName: String,
  /**
   * The name of your service, included in the header.
   */
  serviceName: String,
  /**
   * URL for the service name anchor.
   */
  serviceUrl: {
    type: String,
    default: '#'
  },
  /**
   * The component used to render the service name link, for example `RouterLink`. Will default to `a` if an `href` is provided or `button` otherwise.
   */
  serviceNameLinkComponent: {
    type: [String, Object],
    default: 'a'
  },
  /**
   * The ID for the list of navigation links.
   *
   * If you don't provide an ID, one will be generated automatically.
   */
  navigationId: String,
  /**
   * Text for the `aria-label` attribute of the navigation. Defaults to the same value as `menuButtonText`.
   */
  navigationLabel: String,
  /**
   * Classes for the navigation section of the header.
   * You can bind a string, an array or an object, as with normal
   * [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  navigationClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * Text for the `aria-label` attribute of the button that opens the mobile navigation, if there is a mobile navigation menu.
   */
  menuButtonLabel: {
    type: String,
    default: 'Show or hide menu'
  },
  /**
   * Text of the button that opens the mobile navigation menu, if there is a mobile navigation menu. There is no enforced character limit, but there is a limited display space so keep text as short as possible.
   */
  menuButtonText: {
    type: String,
    default: 'Menu'
  },
  /**
   * Whether to use the rebranded GOV.UK logo. You'll also need to add `govuk-template--rebranded` to your `<html>` to enable the blue background.
   */
  rebrand: {
    type: Boolean,
    default: null
  }
})

let isDesktop = useIsDesktop()
let menuIsOpen = ref(false)

function handleMenuButtonClick() {
  menuIsOpen.value = !menuIsOpen.value
}

const showMenu = computed(() => {
  return menuIsOpen.value || isDesktop.value
})

const computedNavigationId = useComputedId(toRef(props, 'navigationId'), 'gv-header-navigation')
const computedNavigationLabel = props.navigationLabel ? props.navigationLabel : props.menuButtonText
</script>

<template>
  <header class="govuk-header">
    <div class="govuk-header__container govuk-width-container">
      <!-- @slot The logo shown on the left of the header. Defaults to the GOV.UK crown and text -->
      <slot name="logo">
        <div class="govuk-header__logo">
          <component
            :is="homepageLinkComponent"
            :href="homepageUrl"
            class="govuk-header__link govuk-header__link--homepage"
          >
            <svg
              v-if="rebrand"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              role="img"
              viewBox="0 0 324 60"
              height="30"
              width="162"
              fill="currentcolor"
              class="govuk-header__logotype"
              aria-label="GOV.UK"
            >
              <title>GOV.UK</title>
              <g>
                <circle cx="20" cy="17.6" r="3.7"></circle>
                <circle cx="10.2" cy="23.5" r="3.7"></circle>
                <circle cx="3.7" cy="33.2" r="3.7"></circle>
                <circle cx="31.7" cy="30.6" r="3.7"></circle>
                <circle cx="43.3" cy="17.6" r="3.7"></circle>
                <circle cx="53.2" cy="23.5" r="3.7"></circle>
                <circle cx="59.7" cy="33.2" r="3.7"></circle>
                <circle cx="31.7" cy="30.6" r="3.7"></circle>
                <path
                  d="M33.1,9.8c.2-.1.3-.3.5-.5l4.6,2.4v-6.8l-4.6,1.5c-.1-.2-.3-.3-.5-.5l1.9-5.9h-6.7l1.9,5.9c-.2.1-.3.3-.5.5l-4.6-1.5v6.8l4.6-2.4c.1.2.3.3.5.5l-2.6,8c-.9,2.8,1.2,5.7,4.1,5.7h0c3,0,5.1-2.9,4.1-5.7l-2.6-8ZM37,37.9s-3.4,3.8-4.1,6.1c2.2,0,4.2-.5,6.4-2.8l-.7,8.5c-2-2.8-4.4-4.1-5.7-3.8.1,3.1.5,6.7,5.8,7.2,3.7.3,6.7-1.5,7-3.8.4-2.6-2-4.3-3.7-1.6-1.4-4.5,2.4-6.1,4.9-3.2-1.9-4.5-1.8-7.7,2.4-10.9,3,4,2.6,7.3-1.2,11.1,2.4-1.3,6.2,0,4,4.6-1.2-2.8-3.7-2.2-4.2.2-.3,1.7.7,3.7,3,4.2,1.9.3,4.7-.9,7-5.9-1.3,0-2.4.7-3.9,1.7l2.4-8c.6,2.3,1.4,3.7,2.2,4.5.6-1.6.5-2.8,0-5.3l5,1.8c-2.6,3.6-5.2,8.7-7.3,17.5-7.4-1.1-15.7-1.7-24.5-1.7h0c-8.8,0-17.1.6-24.5,1.7-2.1-8.9-4.7-13.9-7.3-17.5l5-1.8c-.5,2.5-.6,3.7,0,5.3.8-.8,1.6-2.3,2.2-4.5l2.4,8c-1.5-1-2.6-1.7-3.9-1.7,2.3,5,5.2,6.2,7,5.9,2.3-.4,3.3-2.4,3-4.2-.5-2.4-3-3.1-4.2-.2-2.2-4.6,1.6-6,4-4.6-3.7-3.7-4.2-7.1-1.2-11.1,4.2,3.2,4.3,6.4,2.4,10.9,2.5-2.8,6.3-1.3,4.9,3.2-1.8-2.7-4.1-1-3.7,1.6.3,2.3,3.3,4.1,7,3.8,5.4-.5,5.7-4.2,5.8-7.2-1.3-.2-3.7,1-5.7,3.8l-.7-8.5c2.2,2.3,4.2,2.7,6.4,2.8-.7-2.3-4.1-6.1-4.1-6.1h10.6,0Z"
                ></path>
              </g>
              <circle class="govuk-logo-dot" cx="227" cy="36" r="7.3"></circle>
              <path
                d="M94.7,36.1c0,1.9.2,3.6.7,5.4.5,1.7,1.2,3.2,2.1,4.5.9,1.3,2.2,2.4,3.6,3.2,1.5.8,3.2,1.2,5.3,1.2s3.6-.3,4.9-.9c1.3-.6,2.3-1.4,3.1-2.3.8-.9,1.3-2,1.6-3,.3-1.1.5-2.1.5-3v-.4h-11v-6.6h19.5v24h-7.7v-5.4c-.5.8-1.2,1.6-2,2.3-.8.7-1.7,1.3-2.7,1.8-1,.5-2.1.9-3.3,1.2-1.2.3-2.5.4-3.8.4-3.2,0-6-.6-8.4-1.7-2.5-1.1-4.5-2.7-6.2-4.7-1.7-2-3-4.4-3.8-7.1-.9-2.7-1.3-5.6-1.3-8.7s.5-6,1.5-8.7,2.4-5.1,4.2-7.1c1.8-2,4-3.6,6.5-4.7s5.4-1.7,8.6-1.7,4,.2,5.9.7c1.8.5,3.5,1.1,5.1,2,1.5.9,2.9,1.9,4,3.2,1.2,1.2,2.1,2.6,2.8,4.1l-7.7,4.3c-.5-.9-1-1.8-1.6-2.6-.6-.8-1.3-1.5-2.2-2.1-.8-.6-1.7-1-2.8-1.4-1-.3-2.2-.5-3.5-.5-2,0-3.8.4-5.3,1.2s-2.7,1.9-3.6,3.2c-.9,1.3-1.7,2.8-2.1,4.6s-.7,3.5-.7,5.3v.3h0ZM152.9,13.7c3.2,0,6.1.6,8.7,1.7,2.6,1.2,4.7,2.7,6.5,4.7,1.8,2,3.1,4.4,4.1,7.1s1.4,5.6,1.4,8.7-.5,6-1.4,8.7c-.9,2.7-2.3,5.1-4.1,7.1s-4,3.6-6.5,4.7c-2.6,1.1-5.5,1.7-8.7,1.7s-6.1-.6-8.7-1.7c-2.6-1.1-4.7-2.7-6.5-4.7-1.8-2-3.1-4.4-4.1-7.1-.9-2.7-1.4-5.6-1.4-8.7s.5-6,1.4-8.7,2.3-5.1,4.1-7.1c1.8-2,4-3.6,6.5-4.7s5.4-1.7,8.7-1.7h0ZM152.9,50.4c1.9,0,3.6-.4,5-1.1,1.4-.7,2.7-1.7,3.6-3,1-1.3,1.7-2.8,2.2-4.5.5-1.7.8-3.6.8-5.7v-.2c0-2-.3-3.9-.8-5.7-.5-1.7-1.3-3.3-2.2-4.5-1-1.3-2.2-2.3-3.6-3-1.4-.7-3.1-1.1-5-1.1s-3.6.4-5,1.1c-1.5.7-2.7,1.7-3.6,3s-1.7,2.8-2.2,4.5c-.5,1.7-.8,3.6-.8,5.7v.2c0,2.1.3,4,.8,5.7.5,1.7,1.2,3.2,2.2,4.5,1,1.3,2.2,2.3,3.6,3,1.5.7,3.1,1.1,5,1.1ZM189.1,58l-12.3-44h9.8l8.4,32.9h.3l8.2-32.9h9.7l-12.3,44M262.9,50.4c1.3,0,2.5-.2,3.6-.6,1.1-.4,2-.9,2.8-1.7.8-.8,1.4-1.7,1.9-2.9.5-1.2.7-2.5.7-4.1V14h8.6v28.5c0,2.4-.4,4.6-1.3,6.6-.9,2-2.1,3.6-3.7,5-1.6,1.4-3.4,2.4-5.6,3.2-2.2.7-4.5,1.1-7.1,1.1s-4.9-.4-7.1-1.1c-2.2-.7-4-1.8-5.6-3.2s-2.8-3-3.7-5c-.9-2-1.3-4.1-1.3-6.6V14h8.7v27.2c0,1.6.2,2.9.7,4.1.5,1.2,1.1,2.1,1.9,2.9.8.8,1.7,1.3,2.8,1.7s2.3.6,3.6.6h0ZM288.5,14h8.7v19.1l15.5-19.1h10.8l-15.1,17.6,16.1,26.4h-10.2l-11.5-19.7-5.6,6.3v13.5h-8.7"
              ></path>
            </svg>
            <svg
              v-else
              focusable="false"
              role="img"
              class="govuk-header__logotype"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 148 30"
              height="30"
              width="148"
              aria-label="GOV.UK"
            >
              <title>GOV.UK</title>
              <path
                d="M22.6 10.4c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m-5.9 6.7c-.9.4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4m10.8-3.7c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s0 2-1 2.4m3.3 4.8c-1 .4-2-.1-2.4-1-.4-.9.1-2 1-2.4.9-.4 2 .1 2.4 1s-.1 2-1 2.4M17 4.7l2.3 1.2V2.5l-2.3.7-.2-.2.9-3h-3.4l.9 3-.2.2c-.1.1-2.3-.7-2.3-.7v3.4L15 4.7c.1.1.1.2.2.2l-1.3 4c-.1.2-.1.4-.1.6 0 1.1.8 2 1.9 2.2h.7c1-.2 1.9-1.1 1.9-2.1 0-.2 0-.4-.1-.6l-1.3-4c-.1-.2 0-.2.1-.3m-7.6 5.7c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m-5 3c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s.1 2 1 2.4m-3.2 4.8c.9.4 2-.1 2.4-1 .4-.9-.1-2-1-2.4-.9-.4-2 .1-2.4 1s0 2 1 2.4m14.8 11c4.4 0 8.6.3 12.3.8 1.1-4.5 2.4-7 3.7-8.8l-2.5-.9c.2 1.3.3 1.9 0 2.7-.4-.4-.8-1.1-1.1-2.3l-1.2 4c.7-.5 1.3-.8 2-.9-1.1 2.5-2.6 3.1-3.5 3-1.1-.2-1.7-1.2-1.5-2.1.3-1.2 1.5-1.5 2.1-.1 1.1-2.3-.8-3-2-2.3 1.9-1.9 2.1-3.5.6-5.6-2.1 1.6-2.1 3.2-1.2 5.5-1.2-1.4-3.2-.6-2.5 1.6.9-1.4 2.1-.5 1.9.8-.2 1.1-1.7 2.1-3.5 1.9-2.7-.2-2.9-2.1-2.9-3.6.7-.1 1.9.5 2.9 1.9l.4-4.3c-1.1 1.1-2.1 1.4-3.2 1.4.4-1.2 2.1-3 2.1-3h-5.4s1.7 1.9 2.1 3c-1.1 0-2.1-.2-3.2-1.4l.4 4.3c1-1.4 2.2-2 2.9-1.9-.1 1.5-.2 3.4-2.9 3.6-1.9.2-3.4-.8-3.5-1.9-.2-1.3 1-2.2 1.9-.8.7-2.3-1.2-3-2.5-1.6.9-2.2.9-3.9-1.2-5.5-1.5 2-1.3 3.7.6 5.6-1.2-.7-3.1 0-2 2.3.6-1.4 1.8-1.1 2.1.1.2.9-.3 1.9-1.5 2.1-.9.2-2.4-.5-3.5-3 .6 0 1.2.3 2 .9l-1.2-4c-.3 1.1-.7 1.9-1.1 2.3-.3-.8-.2-1.4 0-2.7l-2.9.9C1.3 23 2.6 25.5 3.7 30c3.7-.5 7.9-.8 12.3-.8m28.3-11.6c0 .9.1 1.7.3 2.5.2.8.6 1.5 1 2.2.5.6 1 1.1 1.7 1.5.7.4 1.5.6 2.5.6.9 0 1.7-.1 2.3-.4s1.1-.7 1.5-1.1c.4-.4.6-.9.8-1.5.1-.5.2-1 .2-1.5v-.2h-5.3v-3.2h9.4V28H55v-2.5c-.3.4-.6.8-1 1.1-.4.3-.8.6-1.3.9-.5.2-1 .4-1.6.6s-1.2.2-1.8.2c-1.5 0-2.9-.3-4-.8-1.2-.6-2.2-1.3-3-2.3-.8-1-1.4-2.1-1.8-3.4-.3-1.4-.5-2.8-.5-4.3s.2-2.9.7-4.2c.5-1.3 1.1-2.4 2-3.4.9-1 1.9-1.7 3.1-2.3 1.2-.6 2.6-.8 4.1-.8 1 0 1.9.1 2.8.3.9.2 1.7.6 2.4 1s1.4.9 1.9 1.5c.6.6 1 1.3 1.4 2l-3.7 2.1c-.2-.4-.5-.9-.8-1.2-.3-.4-.6-.7-1-1-.4-.3-.8-.5-1.3-.7-.5-.2-1.1-.2-1.7-.2-1 0-1.8.2-2.5.6-.7.4-1.3.9-1.7 1.5-.5.6-.8 1.4-1 2.2-.3.8-.4 1.9-.4 2.7zM71.5 6.8c1.5 0 2.9.3 4.2.8 1.2.6 2.3 1.3 3.1 2.3.9 1 1.5 2.1 2 3.4s.7 2.7.7 4.2-.2 2.9-.7 4.2c-.4 1.3-1.1 2.4-2 3.4-.9 1-1.9 1.7-3.1 2.3-1.2.6-2.6.8-4.2.8s-2.9-.3-4.2-.8c-1.2-.6-2.3-1.3-3.1-2.3-.9-1-1.5-2.1-2-3.4-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2c.4-1.3 1.1-2.4 2-3.4.9-1 1.9-1.7 3.1-2.3 1.2-.5 2.6-.8 4.2-.8zm0 17.6c.9 0 1.7-.2 2.4-.5s1.3-.8 1.7-1.4c.5-.6.8-1.3 1.1-2.2.2-.8.4-1.7.4-2.7v-.1c0-1-.1-1.9-.4-2.7-.2-.8-.6-1.6-1.1-2.2-.5-.6-1.1-1.1-1.7-1.4-.7-.3-1.5-.5-2.4-.5s-1.7.2-2.4.5-1.3.8-1.7 1.4c-.5.6-.8 1.3-1.1 2.2-.2.8-.4 1.7-.4 2.7v.1c0 1 .1 1.9.4 2.7.2.8.6 1.6 1.1 2.2.5.6 1.1 1.1 1.7 1.4.6.3 1.4.5 2.4.5zM88.9 28 83 7h4.7l4 15.7h.1l4-15.7h4.7l-5.9 21h-5.7zm28.8-3.6c.6 0 1.2-.1 1.7-.3.5-.2 1-.4 1.4-.8.4-.4.7-.8.9-1.4.2-.6.3-1.2.3-2v-13h4.1v13.6c0 1.2-.2 2.2-.6 3.1s-1 1.7-1.8 2.4c-.7.7-1.6 1.2-2.7 1.5-1 .4-2.2.5-3.4.5-1.2 0-2.4-.2-3.4-.5-1-.4-1.9-.9-2.7-1.5-.8-.7-1.3-1.5-1.8-2.4-.4-.9-.6-2-.6-3.1V6.9h4.2v13c0 .8.1 1.4.3 2 .2.6.5 1 .9 1.4.4.4.8.6 1.4.8.6.2 1.1.3 1.8.3zm13-17.4h4.2v9.1l7.4-9.1h5.2l-7.2 8.4L148 28h-4.9l-5.5-9.4-2.7 3V28h-4.2V7zm-27.6 16.1c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7z"
              ></path>
            </svg>
            <span v-if="productName" class="govuk-header__product-name">
              {{ productName }}
            </span>
          </component>
        </div>
      </slot>
      <!-- @slot The content shown to the right of the logo. Defaults to the service name and navigation links -->
      <slot name="content">
        <div v-if="serviceName || hasSlot('default')" class="govuk-header__content">
          <a :href="serviceUrl" class="govuk-header__link govuk-header__service-name">
            {{ serviceName }}
          </a>
          <nav
            v-if="hasSlot('navigation')"
            :aria-label="computedNavigationLabel"
            class="govuk-header__navigation"
            :class="navigationClass"
          >
            <button
              type="button"
              class="govuk-header__menu-button govuk-js-header-toggle"
              :aria-controls="computedNavigationId"
              :aria-label="menuButtonLabel"
              :aria-expanded="showMenu"
              @click="handleMenuButtonClick"
              :hidden="isDesktop"
            >
              {{ menuButtonText }}
            </button>
            <ul
              :id="computedNavigationId"
              class="govuk-header__navigation-list"
              :hidden="!showMenu"
            >
              <!-- @slot A list of `GvHeaderNavigationItem`s -->
              <slot name="navigation" />
            </ul>
          </nav>
        </div>
      </slot>
    </div>
  </header>
</template>
