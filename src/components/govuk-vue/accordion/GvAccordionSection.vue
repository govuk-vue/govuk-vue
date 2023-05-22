<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'
import getSlotText from '@/composables/useGetSlotText'

import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  onUnmounted,
  Ref,
  ref,
  toRef,
  watch
} from 'vue'
import {
  AccordionHeadingLevelInjectionKey,
  AccordionHideSectionTextInjectionKey,
  AccordionHideSectionAriaLabelTextInjectionKey,
  AccordionShowSectionTextInjectionKey,
  AccordionShowSectionAriaLabelTextInjectionKey,
  AccordionRegisterSectionFunctionInjectionKey,
  AccordionUnregisterSectionFunctionInjectionKey
} from '@/components/govuk-vue/accordion/AccordionInjectionKeys'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  id: String,
  headingText: String,
  summaryText: String,
  contentText: String,
  expanded: {
    type: Boolean,
    default: false
  },
  rememberExpanded: {
    type: Boolean,
    default: true
  }
})

const key = Symbol()
const expandedMutable = ref(props.expanded)
const contentElement: Ref<HTMLDivElement | null> = ref(null)
const computedId = useComputedId(toRef(props, 'id'), 'gv-accordion-section')

onBeforeMount(() => {
  registerSection({ key: key, expanded: expandedMutable })

  if (props.rememberExpanded) {
    const contentState = window.sessionStorage.getItem(contentId.value)

    if (contentState !== null) {
      expandedMutable.value = contentState === 'true'
    }
  }
})

onMounted(() => {
  if (contentElement.value) {
    contentElement.value.addEventListener('beforematch', () => {
      toggleExpanded()
    })
  }
})

onUnmounted(() => {
  unregisterSection(key)
})

/*
 When the expanded state changes (via clicking the button, the prop changing or show/hide all sections being clicked)
 store the new state in session storage
 */
watch(expandedMutable, () => {
  storeState()
})

const headingLevel = inject(AccordionHeadingLevelInjectionKey)
const hideSectionText = inject(AccordionHideSectionTextInjectionKey)
const hideSectionAriaLabelText = inject(AccordionHideSectionAriaLabelTextInjectionKey)
const showSectionText = inject(AccordionShowSectionTextInjectionKey)
const showSectionAriaLabelText = inject(AccordionShowSectionAriaLabelTextInjectionKey)
const registerSection = inject(AccordionRegisterSectionFunctionInjectionKey, () => {})
const unregisterSection = inject(AccordionUnregisterSectionFunctionInjectionKey, () => {})

const hasSummary = computed(() => {
  return props.summaryText || hasSlot('summary')
})

const contentId = computed(() => {
  return `${computedId.value}-content`
})

const headingId = computed(() => {
  return `${computedId.value}-heading`
})

const buttonAriaLabel = computed(() => {
  const labelParts = []
  labelParts.push(props.headingText)

  if (hasSummary.value) {
    if (hasSlot('summary')) {
      labelParts.push(getSlotText('summary'))
    } else {
      labelParts.push(props.summaryText)
    }
  }

  labelParts.push(
    expandedMutable.value ? hideSectionAriaLabelText?.value : showSectionAriaLabelText?.value
  )

  return labelParts.join(' , ')
})

const showHideText = computed(() => {
  return expandedMutable.value ? hideSectionText?.value : showSectionText?.value
})

const computedHeaderElement = computed(() => {
  return `h${headingLevel?.value}`
})

const contentHiddenAttribute = computed(() => {
  return expandedMutable.value ? null : 'until-found'
})

function toggleExpanded() {
  expandedMutable.value = !expandedMutable.value
}

function storeState() {
  if (props.rememberExpanded) {
    window.sessionStorage.setItem(contentId.value, expandedMutable.value ? 'true' : 'false')
  }
}
</script>

<template>
  <div
    class="govuk-accordion__section"
    :class="{ 'govuk-accordion__section--expanded': expandedMutable }"
  >
    <div class="govuk-accordion__section-header">
      <component :is="computedHeaderElement" class="govuk-accordion__section-heading">
        <button
          type="button"
          :aria-controls="contentId"
          class="govuk-accordion__section-button"
          :aria-expanded="expanded"
          :aria-label="buttonAriaLabel"
          @click="toggleExpanded"
        >
          <span class="govuk-accordion__section-heading-text" :id="headingId">
            <span class="govuk-accordion__section-heading-text-focus">
              {{ headingText }}
            </span>
          </span>
          <template v-if="hasSummary">
            <span class="govuk-visually-hidden govuk-accordion__section-heading-divider">, </span>
            <span
              class="govuk-accordion__section-summary govuk-body"
              id="accordion-with-summary-sections-summary-1"
              ><span class="govuk-accordion__section-summary-focus">
                <slot name="summary">
                  {{ summaryText }}
                </slot>
              </span></span
            >
          </template>
          <span class="govuk-visually-hidden govuk-accordion__section-heading-divider">, </span>
          <span class="govuk-accordion__section-toggle" data-nosnippet="">
            <span class="govuk-accordion__section-toggle-focus">
              <span
                class="govuk-accordion-nav__chevron"
                :class="{ 'govuk-accordion-nav__chevron--down': !expandedMutable }"
              ></span>
              <span class="govuk-accordion__section-toggle-text">{{ showHideText }}</span>
            </span>
          </span>
        </button>
      </component>
    </div>
    <div
      :id="contentId"
      class="govuk-accordion__section-content"
      :aria-labelledby="headingId"
      :hidden.attr="contentHiddenAttribute"
      ref="contentElement"
    >
      <slot>
        <p class="govuk-body">{{ contentText }}</p>
      </slot>
    </div>
  </div>
</template>
