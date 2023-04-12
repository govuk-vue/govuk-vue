<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue'

const props = defineProps({
  text: String,
  classes: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    validator(value: string) {
      return value === 'success'
    }
  },
  titleText: String,
  titleHeadingLevel: {
    type: Number,
    default: 1,
    validator(value: number) {
      return value >= 1 && value <= 6
    }
  },
  titleId: {
    type: String,
    default: 'govuk-notification-banner-title'
  },
  role: String,
  disableAutoFocus: {
    type: Boolean,
    default: false
  }
})

const blurred = ref(false)
const bannerElement: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
  if (computedRole.value === 'alert' && !props.disableAutoFocus && bannerElement.value) {
    bannerElement.value.focus()
  }
})

const isSuccessBanner = computed(() => {
  return props.type === 'success'
})

const computedRole = computed(() => {
  if (props.role) {
    return props.role
  } else {
    if (isSuccessBanner.value) {
      return 'alert'
    } else {
      return 'region'
    }
  }
})

const computedTitleText = computed(() => {
  if (props.titleText) {
    return props.titleText
  } else {
    if (isSuccessBanner.value) {
      return 'Success'
    } else {
      return 'Important'
    }
  }
})

const tabindex = computed(() => {
  if (computedRole.value === 'alert' && !blurred.value) {
    return '-1'
  } else {
    return null
  }
})

function handleBannerBlur() {
  blurred.value = true
}
</script>

<template>
  <div
    :class="`govuk-notification-banner ${classes} ${
      isSuccessBanner ? 'govuk-notification-banner--success' : ''
    }`"
    :role="computedRole"
    :aria-labelledby="titleId"
    ref="bannerElement"
    :tabindex="tabindex"
    @blur="handleBannerBlur"
  >
    <div class="govuk-notification-banner__header">
      <component
        :is="`h${titleHeadingLevel}`"
        class="govuk-notification-banner__title"
        :id="titleId"
      >
        <slot name="title">
          {{ computedTitleText }}
        </slot>
      </component>
    </div>
    <div class="govuk-notification-banner__content">
      <slot>
        <p class="govuk-notification-banner__heading">{{ text }}</p>
      </slot>
    </div>
  </div>
</template>
