<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps({
  /**
   * The number of the currently selected page. Use `v-model:currentPage` to keep track of the current page.
   */
  currentPage: {
    type: Number,
    default: 1
  },
  /**
   * Whether to show the pagination controls on top of each other as 'Previous' and 'Next' links (`block`) or as a list of numbers (`list`).
   */
  variant: {
    type: String,
    validator(value: string) {
      return ['block', 'list'].includes(value)
    }
  },
  /**
   * The total number of pages in the pagination. Required if `variant` is `list`.
   */
  totalPages: Number,
  /**
   * The URL the user should be taken to when they click a page number.
   * The `${pageNumber}` placeholder will be replaced with the number of the selected page.
   */
  pageHref: {
    type: String,
    default: '#'
  },
  /**
   * The `aria-label` for the navigation landmark that wraps the pagination.
   */
  ariaLabel: {
    type: String,
    default: 'Pagination'
  },
  /**
   * The link text to the previous page.
   */
  previousText: {
    type: String,
    default: 'Previous'
  },
  /**
   * The optional label that goes underneath the link to the previous page, providing further context for the user about where the link goes.
   */
  previousLabel: {
    type: String
  },
  /**
   * The URL the user should be taken to when they click the 'Previous' link.
   * The `${pageNumber}` placeholder will be replaced with the number of the previous page.
   * If you've provided `totalPages` and `pageHref`, this will default to `pageHref` with the number of the previous page replacing the `${pageNumber}` placeholder.
   */
  previousHref: String,
  /**
   * The link text to the previous page.
   */
  nextText: {
    type: String,
    default: 'Next'
  },
  /**
   * The optional label that goes underneath the link to the next page, providing further context for the user about where the link goes.
   */
  nextLabel: {
    type: String
  },
  /**
   * The URL the user should be taken to when they click the 'Next' link.
   * The `${pageNumber}` placeholder will be replaced with the number of the next page.
   * If you've provided `totalPages` and `pageHref`, this will default to `pageHref` with the number of the next page replacing the `${pageNumber}` placeholder.
   */
  nextHref: String,
  /**
   * If `totalPages` is above this threshold, the pagination control will show an ellipsis (...) to skip all
   * pages except the first and last and a certain number of pages around the current page (see `beforeAfterCount`).
   */
  skipPagesThreshold: {
    type: Number
  },
  /**
   * If the pagination control is skipping pages, this is the number of pages around the current page which will be shown.
   * For example, if this is set to 2 and the current page is 15 out of 100, the pagination will show '1 ... 13 14 [15] 16 17 ... 100'
   */
  beforeAfterCount: {
    type: Number,
    default: 1,
    validator(value: Number) {
      return value > 0
    }
  },
  /**
   * The component used to render previous, next and page links, for example `RouterLink`.
   */
  linkComponent: {
    type: [String, Object],
    default: 'a'
  }
})
const emit = defineEmits(['update:current-page', 'previousClicked', 'nextClicked'])

const currentPageMutable = ref(props.currentPage)

watch(currentPageMutable, (newCurrentPageMutable) => {
  emit('update:current-page', newCurrentPageMutable)
})

// If the modelValue prop changes, copy that change to our mutable version of the modelValue
watch(
  () => props.currentPage,
  (newCurrentPageMutable) => {
    currentPageMutable.value = newCurrentPageMutable
  }
)

const isBlockLevel = computed(() => {
  return props.variant === 'block' || !props.totalPages
})

const showPrevious = computed(() => {
  if (props.totalPages) {
    return currentPageMutable.value > 1
  } else {
    return props.previousText !== ''
  }
})

const showNext = computed(() => {
  if (props.totalPages) {
    return currentPageMutable.value < props.totalPages
  } else {
    return props.nextText !== ''
  }
})

const pageList = computed(() => {
  if (isBlockLevel.value || !props.totalPages) {
    return null
  }

  let pages: Array<number>

  if (props.skipPagesThreshold !== undefined && props.totalPages > props.skipPagesThreshold) {
    //Always show page 1
    pages = [1]

    //Show numbers around the current page
    const from = Math.max(currentPageMutable.value - props.beforeAfterCount, 2)
    const to = Math.min(currentPageMutable.value + props.beforeAfterCount, props.totalPages - 1)

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

function handlePreviousClick(e: MouseEvent) {
  currentPageMutable.value -= 1
  emit('previousClicked')
  if (computedPreviousHref.value === '#') {
    e.preventDefault()
  }
  // If the computedPreviousHref isn't # they've provided a custom URL, so clicking the link will take them there
}

function handleNextClick(e: MouseEvent) {
  currentPageMutable.value += 1
  emit('nextClicked')
  if (computedNextHref.value === '#') {
    e.preventDefault()
  }
  // If the computedPreviousHref isn't # they've provided a custom URL, so clicking the link will take them there
}

function handlePageClick(e: MouseEvent, pageNumber: number) {
  currentPageMutable.value = pageNumber
  if (props.pageHref === '#') {
    e.preventDefault()
  }
  // If the pageHref isn't # they've provided a custom URL, so clicking the link will take them there
}

function hrefForPageNumber(pageNumber: number) {
  return replacePageNumber(props.pageHref, pageNumber)
}

const computedPreviousHref = computed(() => {
  if (props.previousHref) {
    return replacePageNumber(props.previousHref, currentPageMutable.value - 1)
  } else if (props.totalPages) {
    return hrefForPageNumber(currentPageMutable.value - 1)
  } else {
    return '#'
  }
})

const computedNextHref = computed(() => {
  if (props.nextHref) {
    return replacePageNumber(props.nextHref, currentPageMutable.value + 1)
  } else if (props.totalPages) {
    return hrefForPageNumber(currentPageMutable.value + 1)
  } else {
    return '#'
  }
})

function replacePageNumber(str: string, pageNumber: number) {
  return str.replace(/\$\{pageNumber}/g, pageNumber.toString())
}
</script>

<template>
  <nav
    class="govuk-pagination"
    :class="{ 'govuk-pagination--block': isBlockLevel }"
    :aria-label="ariaLabel"
  >
    <div v-if="showPrevious" class="govuk-pagination__prev">
      <component
        :is="linkComponent"
        class="govuk-link govuk-pagination__link govuk-link--no-visited-state"
        :href="computedPreviousHref"
        rel="prev"
        @click="
          (e: MouseEvent) => {
            handlePreviousClick(e)
          }
        "
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
      </component>
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
          :class="{ 'govuk-pagination__item--current': pageNumber === currentPageMutable }"
        >
          <component
            :is="linkComponent"
            class="govuk-link govuk-pagination__link govuk-link--no-visited-state"
            :href="hrefForPageNumber(pageNumber)"
            :aria-label="`Page ${pageNumber}`"
            :aria-current="pageNumber === currentPageMutable ? 'page' : undefined"
            @click="
              (e: MouseEvent) => {
                handlePageClick(e, pageNumber)
              }
            "
          >
            {{ pageNumber }}
          </component>
        </li>
      </template>
    </ul>

    <div v-if="showNext" class="govuk-pagination__next">
      <component
        :is="linkComponent"
        class="govuk-link govuk-pagination__link govuk-link--no-visited-state"
        :href="computedNextHref"
        rel="next"
        @click="
          (e) => {
            handleNextClick(e)
          }
        "
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
      </component>
    </div>
  </nav>
</template>
