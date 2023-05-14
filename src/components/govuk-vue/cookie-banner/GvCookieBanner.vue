<script setup lang="ts">
import { computed, nextTick, Ref, ref } from 'vue'
import GvButton from '@/components/govuk-vue/button/GvButton.vue'

const props = defineProps({
  classes: {
    type: String,
    default: ''
  },
  messageClasses: {
    type: String,
    default: ''
  },
  ariaLabel: String,
  headingText: {
    type: String,
    required: true
  },
  cookieInformationText: String,
  acceptButtonText: String,
  rejectButtonText: String,
  viewCookiesLinkText: String,
  viewCookiesLinkHref: {
    type: String,
    default: '#'
  },
  acceptedText: String,
  rejectedText: String,
  hideButtonText: {
    type: String,
    default: 'Hide cookie message'
  }
})
const emit = defineEmits(['acceptClicked', 'rejectClicked', 'viewCookiesClicked'])

enum CookieBannerState {
  Information,
  Accepted,
  Rejected,
  Hidden
}

let state = ref(CookieBannerState.Information)

const confirmationMessageElement: Ref<HTMLDivElement | null> = ref(null)

const computedAriaLabel = computed(() => {
  return props.ariaLabel ? props.ariaLabel : props.headingText
})

function handleAcceptClick() {
  emit('acceptClicked')
  state.value = CookieBannerState.Accepted
  focusConfirmation()
}

function handleRejectClick() {
  emit('rejectClicked')
  state.value = CookieBannerState.Rejected
  focusConfirmation()
}

function handleViewCookiesClick(e: MouseEvent) {
  emit('viewCookiesClicked', e)
}

function handleHideClick() {
  state.value = CookieBannerState.Hidden
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
    :class="`govuk-cookie-banner ${classes}`"
    data-nosnippet
    role="region"
    :aria-label="computedAriaLabel"
  >
    <div
      v-if="state === CookieBannerState.Information"
      :class="`govuk-cookie-banner__message govuk-width-container ${messageClasses}`"
    >
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h2 class="govuk-cookie-banner__heading govuk-heading-m">
            <slot name="heading">
              {{ headingText }}
            </slot>
          </h2>
          <div class="govuk-cookie-banner__content">
            <slot name="cookie-information">
              <p class="govuk-body">
                {{ cookieInformationText }}
              </p>
            </slot>
          </div>
        </div>
      </div>
      <div class="govuk-button-group">
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
      :class="`govuk-cookie-banner__message govuk-width-container ${messageClasses}`"
      role="alert"
      tabindex="-1"
      ref="confirmationMessageElement"
    >
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <div class="govuk-cookie-banner__content">
            <slot v-if="state === CookieBannerState.Accepted" name="accepted">
              <p class="govuk-body">
                {{ acceptedText }}
              </p>
            </slot>
            <slot v-if="state === CookieBannerState.Rejected" name="rejected">
              <p class="govuk-body">
                {{ rejectedText }}
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
