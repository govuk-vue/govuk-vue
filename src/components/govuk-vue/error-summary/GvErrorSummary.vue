<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import hasSlot from '@/composables/useHasSlot'

const props = defineProps({
  /**
   * Text to use for the heading of the error summary block. If content is provided in the `title` slot, this prop will be ignored.
   */
  title: {
    type: String,
    default: 'There is a problem'
  },
  /**
   * Text to use for the description of the errors. If content is provided in the `description` slot, this prop will be ignored.
   */
  description: String,
  /**
   * If `true`, keyboard focus will not be moved to the error summary when it's mounted.
   */
  disableAutoFocus: {
    type: Boolean,
    default: false
  }
})

const blurred = ref(false)
const summaryElement: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {
  if (!props.disableAutoFocus && summaryElement.value) {
    summaryElement.value.focus()
  }
})

const hasDescription = computed(() => {
  return props.description || hasSlot('description')
})

const tabindex = computed(() => {
  if (!props.disableAutoFocus && !blurred.value) {
    return -1
  } else {
    return undefined
  }
})

function handleSummaryBlur() {
  blurred.value = true
}
</script>

<template>
  <div
    class="govuk-error-summary"
    ref="summaryElement"
    :tabindex="tabindex"
    @blur="handleSummaryBlur"
  >
    <div role="alert">
      <h2 class="govuk-error-summary__title">
        <slot name="title">
          {{ title }}
        </slot>
      </h2>
      <div class="govuk-error-summary__body">
        <p v-if="hasDescription">
          <slot name="description">
            {{ description }}
          </slot>
        </p>
        <ul class="govuk-list govuk-error-summary__list">
          <slot />
        </ul>
      </div>
    </div>
  </div>
</template>
