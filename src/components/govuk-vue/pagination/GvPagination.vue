<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: Number,
  /**
   * Whether to show the radios on top of each other (stacked) or side-by-side (inline)
   */
  direction: {
    type: String,
    default: 'stacked',
    validator(value: string) {
      return ['stacked', 'inline'].includes(value)
    }
  },
  totalPages: Number,
  landmarkLabel: {
    type: String,
    default: 'results'
  },
  previousText: {
    type: String,
    default: 'Previous'
  },
  previousLabel: {
    type: String
  },
  nextText: {
    type: String,
    default: 'Next'
  },
  nextLabel: {
    type: String
  },
  skipPagesThreshold: {
    type: Number
  },
  beforeAfterCount: {
    type: Number,
    default: 1,
    validator(value: Number) {
      return value > 0
    }
  }
})
const emit = defineEmits(['update:modelValue', 'previousClicked', 'nextClicked'])

const isBlockLevel = computed(() => {
  return !props.modelValue && (props.previousText || props.nextText)
})

const showPrevious = computed(() => {
  if (props.modelValue && props.totalPages) {
    return props.modelValue > 1
  } else {
    return props.previousText !== ''
  }
})

const showNext = computed(() => {
  if (props.modelValue && props.totalPages) {
    return props.modelValue < props.totalPages
  } else {
    return props.nextText !== ''
  }
})

const pageList = computed(() => {
  if (!props.modelValue || !props.totalPages) {
    return null
  }

  let pages: Array<Number>

  if (props.skipPagesThreshold !== undefined && props.totalPages > props.skipPagesThreshold) {
    //Always show page 1
    pages = [1]

    //Show numbers around the current page
    const from = Math.max(props.modelValue - props.beforeAfterCount, 2)
    const to = Math.min(props.modelValue + props.beforeAfterCount, props.totalPages - 1)

    for (let i = from; i <= to; i++) {
      pages.push(i)
    }

    //Always show last page
    pages.push(props.totalPages)
  } else {
    pages = Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }

  return pages
})

function handlePreviousClick() {
  if (props.modelValue) {
    emit('update:modelValue', props.modelValue - 1)
  } else {
    emit('previousClicked')
  }
}

function handleNextClick() {
  if (props.modelValue) {
    emit('update:modelValue', props.modelValue + 1)
  } else {
    emit('nextClicked')
  }
}
</script>

<template>
  <nav
    class="govuk-pagination"
    :class="{ 'govuk-pagination--block': isBlockLevel }"
    role="navigation"
    :aria-label="landmarkLabel"
  >
    <div v-if="showPrevious" class="govuk-pagination__prev">
      <a
        class="govuk-link govuk-pagination__link govuk-link--no-visited-state"
        href="#"
        rel="prev"
        @click.prevent="handlePreviousClick"
      >
        <svg
          class="govuk-pagination__icon govuk-pagination__icon--prev"
          xmlns="http://www.w3.org/2000/svg"
          height="13"
          width="15"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 15 13"
        >
          <path
            d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"
          ></path>
        </svg>
        <span
          class="govuk-pagination__link-title"
          :class="{ 'govuk-pagination__link-title--decorated': isBlockLevel && !previousLabel }"
        >
          {{ previousText }}
        </span>
        <template v-if="previousLabel && isBlockLevel">
          <span class="govuk-visually-hidden">:</span>
          <span class="govuk-pagination__link-label">{{ previousLabel }}</span>
        </template>
      </a>
    </div>

    <ul v-if="pageList" class="govuk-pagination__list">
      <template v-for="(pageNumber, i) in pageList" :key="pageNumber">
        <li
          v-if="i > 0 && pageNumber !== pageList[i - 1] + 1"
          class="govuk-pagination__item govuk-pagination__item--ellipses"
        >
          &ctdot;
        </li>
        <li
          class="govuk-pagination__item"
          :class="{ 'govuk-pagination__item--current': pageNumber === modelValue }"
        >
          <a
            class="govuk-link govuk-pagination__link govuk-link--no-visited-state"
            href="#"
            :aria-label="`Page ${pageNumber}`"
            :aria-current="pageNumber === modelValue ? 'page' : null"
            @click.prevent="emit('update:modelValue', pageNumber)"
          >
            {{ pageNumber }}
          </a>
        </li>
      </template>
    </ul>

    <div v-if="showNext" class="govuk-pagination__next">
      <a
        class="govuk-link govuk-pagination__link govuk-link--no-visited-state"
        href="#"
        rel="next"
        @click.prevent="handleNextClick"
      >
        <svg
          v-if="isBlockLevel"
          class="govuk-pagination__icon govuk-pagination__icon--next"
          xmlns="http://www.w3.org/2000/svg"
          height="13"
          width="15"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 15 13"
        >
          <path
            d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"
          ></path>
        </svg>
        <span
          class="govuk-pagination__link-title"
          :class="{ 'govuk-pagination__link-title--decorated': isBlockLevel && !previousLabel }"
        >
          {{ nextText }}
        </span>
        <template v-if="nextLabel && isBlockLevel">
          <span class="govuk-visually-hidden">:</span>
          <span class="govuk-pagination__link-label">{{ nextLabel }}</span>
        </template>
        <svg
          v-if="!isBlockLevel"
          class="govuk-pagination__icon govuk-pagination__icon--next"
          xmlns="http://www.w3.org/2000/svg"
          height="13"
          width="15"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 15 13"
        >
          <path
            d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"
          ></path>
        </svg>
      </a>
    </div>
  </nav>
</template>
