<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'
import getSlotText from '@/composables/useGetSlotText'

import { computed, inject, onBeforeMount, onMounted, onUnmounted, ref, toRef, watch } from 'vue'
import type { Ref } from 'vue'
import {
  AccordionHeadingLevelInjectionKey,
  AccordionHideSectionTextInjectionKey,
  AccordionHideSectionAriaLabelInjectionKey,
  AccordionShowSectionTextInjectionKey,
  AccordionShowSectionAriaLabelInjectionKey,
  AccordionRememberExpandedInjectionKey,
  AccordionRegisterSectionFunctionInjectionKey,
  AccordionUnregisterSectionFunctionInjectionKey
} from '@/components/govuk-vue/accordion/AccordionInjectionKeys'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  /**
   * The ID for this section. If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * The title of the section.
   */
  heading: String,
  /**
   * Text content for the summary line. If content is provided in the `summary` slot, this prop will be ignored.
   */
  summary: String,
  /**
   * Text content of this section, which is hidden when the section is closed. If content is provided in the default
   * slot, this prop will be ignored.
   */
  content: String,
  /**
   * Sets whether the section is expanded. If set, the model value will override any stored expansion state if
   * `rememberExpanded` has been set on the parent `GvAccordion`. Use `v-model:expanded` to keep track of the expansion state.
   */
  expanded: {
    type: Boolean,
    default: null
  }
})
const emit = defineEmits(['update:expanded'])

const key = Symbol()
const expandedMutable = ref(props.expanded)

watch(expandedMutable, (newExpandedMutable) => {
  emit('update:expanded', newExpandedMutable)
})

// If the expanded prop changes, copy that change to our mutable version of the prop
watch(
  () => props.expanded,
  (newExpanded) => {
    expandedMutable.value = newExpanded
  }
)

const contentElement: Ref<HTMLDivElement | null> = ref(null)
const computedId = useComputedId(toRef(props, 'id'), 'gv-accordion-section')

const headingLevel = inject(AccordionHeadingLevelInjectionKey)
const hideSectionText = inject(AccordionHideSectionTextInjectionKey)
const hideSectionAriaLabel = inject(AccordionHideSectionAriaLabelInjectionKey)
const showSectionText = inject(AccordionShowSectionTextInjectionKey)
const showSectionAriaLabel = inject(AccordionShowSectionAriaLabelInjectionKey)
const rememberExpanded = inject(AccordionRememberExpandedInjectionKey, ref(true))
const registerSection = inject(AccordionRegisterSectionFunctionInjectionKey, () => {})
const unregisterSection = inject(AccordionUnregisterSectionFunctionInjectionKey, () => {})

onBeforeMount(() => {
  registerSection({ key: key, expanded: expandedMutable })

  // We only use the stored expansion state if an expansion state wasn't explicitly provided as a prop
  if (rememberExpanded.value && props.expanded === null) {
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

const hasSummary = computed(() => {
  return props.summary || hasSlot('summary')
})

const contentId = computed(() => {
  return `${computedId.value}-content`
})

const headingId = computed(() => {
  return `${computedId.value}-heading`
})

const buttonAriaLabel = computed(() => {
  const labelParts = []
  labelParts.push(props.heading)

  if (hasSummary.value) {
    if (hasSlot('summary')) {
      labelParts.push(getSlotText('summary'))
    } else {
      labelParts.push(props.summary)
    }
  }

  labelParts.push(expandedMutable.value ? hideSectionAriaLabel?.value : showSectionAriaLabel?.value)

  return labelParts.join(' , ')
})

const showHideText = computed(() => {
  return expandedMutable.value ? hideSectionText?.value : showSectionText?.value
})

const computedHeaderElement = computed(() => {
  return `h${headingLevel?.value}`
})

const contentHiddenAttribute = computed(() => {
  return expandedMutable.value ? undefined : 'until-found'
})

function toggleExpanded() {
  expandedMutable.value = !expandedMutable.value
}

function storeState() {
  if (rememberExpanded.value) {
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
          :aria-expanded="expandedMutable"
          :aria-label="buttonAriaLabel"
          @click="toggleExpanded"
        >
          <span class="govuk-accordion__section-heading-text" :id="headingId">
            <span class="govuk-accordion__section-heading-text-focus">
              {{ heading }}
            </span>
          </span>
          <template v-if="hasSummary">
            <span class="govuk-visually-hidden govuk-accordion__section-heading-divider">, </span>
            <span
              class="govuk-accordion__section-summary govuk-body"
              id="accordion-with-summary-sections-summary-1"
              ><span class="govuk-accordion__section-summary-focus">
                <!-- @slot The content of the summary. If content is provided in this slot, the `summary` prop will be ignored. -->
                <slot name="summary">
                  {{ summary }}
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
      :hidden.attr="contentHiddenAttribute"
      ref="contentElement"
    >
      <!-- @slot The content of the accordion section. If content is provided in this slot, the `content` prop will be ignored. -->
      <slot>
        <p class="govuk-body">{{ content }}</p>
      </slot>
    </div>
  </div>
</template>
