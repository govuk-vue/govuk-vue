<script setup lang="ts">
defineProps({
  /**
   * The URL of the homepage, linked to by the logo. Defaults to `/`
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
  }
})
</script>

<template>
  <header class="govuk-template__header">
    <!-- @slot Components to show before the header, inside the `<header>` element -->
    <slot name="before-header" />
    <div class="govuk-generic-header">
      <div class="govuk-generic-header__container govuk-width-container">
        <!-- @slot The container around the logo -->
        <slot name="logo-container">
          <div class="govuk-generic-header__logo">
            <component
              :is="homepageLinkComponent"
              :href="homepageUrl"
              class="govuk-generic-header__homepage-link"
            >
              <!-- @slot The logo inside the homepage link -->
              <slot name="logo">
                <svg
                  width="28"
                  height="30"
                  viewBox="0 0 28 30"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="13.5549" cy="4.21349" r="4.21349" />
                  <circle cx="13.5549" cy="25.7865" r="4.21349" />
                  <circle cx="22.8963" cy="9.6068" r="4.21349" />
                  <circle cx="4.2135" cy="20.3932" r="4.21349" />
                  <circle cx="22.8963" cy="20.3932" r="4.21349" />
                  <circle cx="4.21351" cy="9.60674" r="4.21349" />
                </svg>
                Service name
              </slot>
            </component>
          </div>
        </slot>
      </div>
    </div>
    <!-- @slot Components to show after the header, inside the `<header>` element - for example `GvServiceNavigation` or `GvPhaseBanner` -->
    <slot name="after-header" />
  </header>
</template>
