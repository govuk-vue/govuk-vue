<script setup lang="ts">
import { computed, onMounted, ref, toRef } from 'vue'
import type { Ref } from 'vue'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  /**
   * The text that displays in the notification banner. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * The type of notification to render. You can only use `success` with this option. If you set `type` to `success`, the
   * notification banner sets `role` to `alert` and keyboard focus will move to the banner when it's mounted (unless you set `disableAutoFocus`).
   * If you do not set `type`, the notification banner sets `role` to `region`.
   */
  type: {
    type: String,
    validator(value: string) {
      return ['success'].includes(value)
    }
  },
  /**
   * The title text that displays in the notification banner. If you don't set a title, it will default to `Success` if `type` is `success` or `Important` if you don't set a `type`.
   */
  title: String,
  /**
   * Sets heading level for the title only, from `1` to `6`.
   */
  titleHeadingLevel: {
    type: Number,
    default: 2,
    validator(value: number) {
      return value >= 1 && value <= 6
    }
  },
  /**
   * The `id` for the banner title, and the `aria-labelledby` attribute in the banner. If you don't provide an ID, one will be generated automatically.
   */
  titleId: String,
  /**
   * Overrides the value of the `role` attribute for the notification banner. Defaults to `region`. If you set `type` to `success`, `role` defaults to `alert`.
   */
  role: String,
  /**
   * If `true`, keyboard focus will not be moved to the banner when it's mounted, even if you've set `type` to `success` or `role` to `alert`.
   */
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

const computedTitle = computed(() => {
  if (props.title) {
    return props.title
  } else {
    if (isSuccessBanner.value) {
      return 'Success'
    } else {
      return 'Important'
    }
  }
})

const computedTitleId = useComputedId(toRef(props, 'titleId'), 'govuk-notification-banner-title')

const tabindex = computed(() => {
  if (computedRole.value === 'alert' && !blurred.value) {
    return -1
  } else {
    return undefined
  }
})

function handleBannerBlur() {
  blurred.value = true
}
</script>

<template>
  <div
    class="govuk-notification-banner"
    :class="{
      'govuk-notification-banner--success': isSuccessBanner
    }"
    :role="computedRole"
    :aria-labelledby="computedTitleId"
    ref="bannerElement"
    :tabindex="tabindex"
    @blur="handleBannerBlur"
  >
    <div class="govuk-notification-banner__header">
      <component
        :is="`h${titleHeadingLevel}`"
        class="govuk-notification-banner__title"
        :id="computedTitleId"
      >
        <!-- @slot The title that displays in the notification banner. If content is provided in this slot, the `title` prop will be ignored. -->
        <slot name="title">
          {{ computedTitle }}
        </slot>
      </component>
    </div>
    <div class="govuk-notification-banner__content">
      <!-- @slot The content that displays in the notification banner. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>
        <p class="govuk-notification-banner__heading">{{ text }}</p>
      </slot>
    </div>
  </div>
</template>
