<script setup lang="ts">
import { computed, nextTick, Ref, ref } from 'vue'
import GvButton from '@/components/govuk-vue/button/GvButton.vue'

const props = defineProps({
  /**
   * The additional classes that you want to add to the message.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  messageClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * 	The text for the `aria-label` which labels the cookie banner region. This region applies to
   * 	all messages that the cookie banner includes. For example, the cookie message and the
   * 	confirmation message. Defaults to the `heading`.
   */
  ariaLabel: String,
  /**
   * The heading text displayed at the top of the banner before cookies are accepted or rejected.
   * If content is provided in the `heading` slot, this prop will be ignored.
   */
  heading: String,
  /**
   * The text first shown in the banner to tell the user what types of cookies you're asking to use.
   * If content is provided in the `cookie-information` slot, this prop will be ignored.
   */
  cookieInformation: String,
  /**
   * The text on the button to accept cookies
   */
  acceptButtonText: String,
  /**
   * The text on the button to reject cookies
   */
  rejectButtonText: String,
  /**
   * The text on the link to view more information about your cookies
   */
  viewCookiesLinkText: String,
  /**
   * The URL that the view cookies link should link to.
   */
  viewCookiesLinkHref: {
    type: String,
    default: '#'
  },
  /**
   * The text shown in the banner when the user accepts cookies.
   * If content is provided in the `accepted` slot, this prop will be ignored.
   */
  accepted: String,
  /**
   * The text shown in the banner when the user rejects cookies.
   * If content is provided in the `rejected` slot, this prop will be ignored.
   */
  rejected: String,
  /**
   * The text for the button to hide the banner after the user has accepted or rejected cookies.
   */
  hideButtonText: {
    type: String,
    default: 'Hide cookie message'
  }
})
const emit = defineEmits(['acceptClicked', 'rejectClicked', 'viewCookiesClicked', 'hideClicked'])

enum CookieBannerState {
  Information,
  Accepted,
  Rejected,
  Hidden
}

let state = ref(CookieBannerState.Information)

const confirmationMessageElement: Ref<HTMLDivElement | null> = ref(null)

const computedAriaLabel = computed(() => {
  return props.ariaLabel ? props.ariaLabel : props.heading
})

function handleAcceptClick() {
  state.value = CookieBannerState.Accepted
  focusConfirmation()
  emit('acceptClicked')
}

function handleRejectClick() {
  state.value = CookieBannerState.Rejected
  focusConfirmation()
  emit('rejectClicked')
}

function handleViewCookiesClick(e: MouseEvent) {
  emit('viewCookiesClicked', e)
}

function handleHideClick() {
  state.value = CookieBannerState.Hidden
  emit('hideClicked')
}

function focusConfirmation() {
  nextTick(() => {
    if (confirmationMessageElement.value) {
      confirmationMessageElement.value.focus()
    }
  })
}
</script>

<template>
  <div
    v-if="state !== CookieBannerState.Hidden"
    class="govuk-cookie-banner"
    data-nosnippet
    role="region"
    :aria-label="computedAriaLabel"
  >
    <div
      v-if="state === CookieBannerState.Information"
      class="govuk-cookie-banner__message govuk-width-container"
      :class="messageClass"
    >
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h2 class="govuk-cookie-banner__heading govuk-heading-m">
            <!-- @slot The heading text displayed at the top of the banner before cookies are accepted or rejected. If content is provided in this slot, the `heading` prop will be ignored. -->
            <slot name="heading">
              {{ heading }}
            </slot>
          </h2>
          <div class="govuk-cookie-banner__content">
            <!-- @slot The text first shown in the banner to tell the user what types of cookies you're asking to use. If content is provided in this slot, the `cookie-information` prop will be ignored. -->
            <slot name="cookie-information">
              <p class="govuk-body">
                {{ cookieInformation }}
              </p>
            </slot>
          </div>
        </div>
      </div>
      <div class="govuk-button-group">
        <!-- @slot The actions to show at the bottom of the cookie banner before the user has made a choice. If content is provided in this slot, the default buttons won't be shown. -->
        <slot name="actions">
          <gv-button
            v-if="acceptButtonText"
            :text="acceptButtonText"
            type="button"
            @click="handleAcceptClick"
          />
          <gv-button
            v-if="rejectButtonText"
            :text="rejectButtonText"
            type="button"
            @click="handleRejectClick"
          />
          <a
            v-if="viewCookiesLinkText"
            class="govuk-link"
            :href="viewCookiesLinkHref"
            @click="handleViewCookiesClick"
            >{{ viewCookiesLinkText }}</a
          >
        </slot>
      </div>
    </div>

    <div
      v-else-if="state === CookieBannerState.Accepted || state === CookieBannerState.Rejected"
      class="govuk-cookie-banner__message govuk-width-container"
      :class="messageClass"
      role="alert"
      tabindex="-1"
      ref="confirmationMessageElement"
    >
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <div class="govuk-cookie-banner__content">
            <!-- @slot 	The content shown in the banner when the user accepts cookies. If content is provided in this slot, the `accepted` prop will be ignored. -->
            <slot v-if="state === CookieBannerState.Accepted" name="accepted">
              <p class="govuk-body">
                {{ accepted }}
              </p>
            </slot>
            <!-- @slot 	The content shown in the banner when the user rejects cookies. If content is provided in this slot, the `rejected` prop will be ignored. -->
            <slot v-if="state === CookieBannerState.Rejected" name="rejected">
              <p class="govuk-body">
                {{ rejected }}
              </p>
            </slot>
          </div>
        </div>
      </div>
      <div class="govuk-button-group">
        <gv-button :text="hideButtonText" type="button" @click="handleHideClick" />
      </div>
    </div>
  </div>
</template>
