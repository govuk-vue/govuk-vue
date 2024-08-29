<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'
import { computed, useSlots } from 'vue'

defineProps({
  /**
   * Classes that can be added to the inner container, useful if you want to make the footer full width.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  containerClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Content licence props
  /**
   * The content licence information. Defaults to Open Government Licence (OGL) v3 licence.
   * If content is provided in the `content-licence` slot, this prop will be ignored.
   */
  contentLicence: String,
  //Copyright props
  /**
   * The copyright information. Defaults to Crown Copyright.
   */
  copyright: String
})

//We don't use the usual hasSlot() function here because in this case we don't care if the slot has content or not.
//If they pass an empty slot, we still want to hide the content licence or copyright
const hasContentLicenceSlot = computed(() => {
  const slots = useSlots()
  return slots['content-licence'] != undefined
})

const hasCopyrightSlot = computed(() => {
  const slots = useSlots()
  return slots['copyright'] != undefined
})
</script>

<template>
  <footer class="govuk-footer">
    <div class="govuk-width-container" :class="containerClass">
      <template v-if="hasSlot('navigation')">
        <div class="govuk-footer__navigation">
          <!-- @slot A list of `GvFooterNavigation` columns, each containing a list of `GvFooterNavigationItem`s -->
          <slot name="navigation" />
        </div>
        <hr class="govuk-footer__section-break" />
      </template>
      <div class="govuk-footer__meta">
        <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
          <!-- @slot One or more `GvFooterMeta` components containing meta items, such as links to your accessibility statement and cookie policy -->
          <slot name="meta" />

          <span class="govuk-footer__licence-description">
            <template v-if="hasContentLicenceSlot">
              <!-- @slot The content licence information. If content is provided in this slot, the `content-licence` prop will be ignored. -->
              <slot name="content-licence" />
            </template>
            <template v-else-if="contentLicence">
              {{ contentLicence }}
            </template>
            <template v-else>
              <svg
                aria-hidden="true"
                focusable="false"
                class="govuk-footer__licence-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 483.2 195.7"
                height="17"
                width="41"
              >
                <path
                  fill="currentColor"
                  d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
                />
              </svg>

              All content is available under the
              <a
                class="govuk-footer__link"
                href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                rel="license"
                >Open Government Licence v3.0</a
              >, except where otherwise stated
            </template>
          </span>
        </div>
        <div class="govuk-footer__meta-item">
          <template v-if="hasCopyrightSlot">
            <!-- @slot The copyright licence information. If content is provided in this slot, the `copyright` prop will be ignored. -->
            <slot name="copyright" />
          </template>
          <template v-else-if="copyright">
            {{ copyright }}
          </template>
          <template v-else>
            <a
              class="govuk-footer__link govuk-footer__copyright-logo"
              href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
            >
              © Crown copyright
            </a>
          </template>
        </div>
      </div>
    </div>
  </footer>
</template>
