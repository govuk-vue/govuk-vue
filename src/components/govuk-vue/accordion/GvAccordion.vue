<script setup lang="ts">
import { ref, provide, computed, Ref, toRef } from 'vue'
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
import type { AccordionSection } from '@/components/govuk-vue/accordion/AccordionSection'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  /**
   * Must be unique across the domain of your service if `rememberExpanded` is `true`
   * (as the expanded state of individual instances of the component persists across page loads using `sessionStorage`).
   * Used as an id in the HTML for the accordion as a whole, and also as a prefix for the ids of the section contents
   * and the buttons that open them, so that those ids can be the target of aria-labelledby and aria-control attributes.
   *
   * If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * Heading level of the section headings, from `1` to `6`.
   */
  headingLevel: {
    type: Number,
    default: 2,
    validator(value: number) {
      return value >= 1 && value <= 6
    }
  },
  /**
   * 	Whether the expanded/collapsed state of the accordion sections should be saved and
   * 	restored each time the user sees the accordion. If this is enabled you must set static `id`s on
   * 	each `GvAccordionSection` to ensure the correct sections are restored.
   */
  rememberExpanded: {
    type: Boolean,
    default: false
  },
  /**
   * 	The text content of the 'Hide all sections' button at the top of the accordion when all
   * 	sections are expanded.
   */
  hideAllSectionsText: {
    type: String,
    default: 'Hide all sections'
  },
  /**
   * 	The text content of the 'Hide' button within each section of the accordion, which is visible
   * 	when the section is expanded.
   */
  hideSectionText: {
    type: String,
    default: 'Hide'
  },
  /**
   * 	Text made available to assistive technologies, like screen readers, as the final part of the
   * 	toggle's accessible name when the section is expanded.
   */
  hideSectionAriaLabel: {
    type: String,
    default: 'Hide this section'
  },
  /**
   * 	The text content of the 'Show all sections' button at the top of the accordion when at least
   * 	one section is collapsed.
   */
  showAllSectionsText: {
    type: String,
    default: 'Show all sections'
  },
  /**
   * 	The text content of the 'Show' button within each section of the accordion, which is visible
   * 	when the section is collapsed.
   */
  showSectionText: {
    type: String,
    default: 'Show'
  },
  /**
   * 	Text made available to assistive technologies, like screen readers, as the final part of the
   * 	toggle's accessible name when the section is collapsed.
   */
  showSectionAriaLabel: {
    type: String,
    default: 'Show this section'
  }
})

let sections: Ref<AccordionSection[]> = ref([])

function registerSection(section: AccordionSection) {
  sections.value.push(section)
}

function unregisterSection(key: Symbol) {
  sections.value = sections.value.filter((s) => {
    return s.key != key
  })
}

const computedId = useComputedId(toRef(props, 'id'), 'gv-accordion')

provide(AccordionHeadingLevelInjectionKey, toRef(props, 'headingLevel'))
provide(AccordionShowSectionTextInjectionKey, toRef(props, 'showSectionText'))
provide(AccordionShowSectionAriaLabelInjectionKey, toRef(props, 'showSectionAriaLabel'))
provide(AccordionHideSectionTextInjectionKey, toRef(props, 'hideSectionText'))
provide(AccordionHideSectionAriaLabelInjectionKey, toRef(props, 'hideSectionAriaLabel'))
provide(AccordionRememberExpandedInjectionKey, toRef(props, 'rememberExpanded'))
provide(AccordionRegisterSectionFunctionInjectionKey, registerSection)
provide(AccordionUnregisterSectionFunctionInjectionKey, unregisterSection)

const allSectionsExpanded = computed(() => {
  return !sections.value.some((s) => !s.expanded)
})

function toggleAllSectionsVisible() {
  if (allSectionsExpanded.value) {
    sections.value.forEach((s) => {
      s.expanded = false
    })
  } else {
    sections.value.forEach((s) => {
      s.expanded = true
    })
  }
}

const showHideText = computed(() => {
  return allSectionsExpanded.value ? props.hideAllSectionsText : props.showAllSectionsText
})
</script>

<template>
  <div :id="computedId" class="govuk-accordion">
    <div class="govuk-accordion__controls">
      <button
        type="button"
        class="govuk-accordion__show-all"
        :aria-expanded="allSectionsExpanded"
        @click="toggleAllSectionsVisible"
      >
        <span
          class="govuk-accordion-nav__chevron"
          :class="{ 'govuk-accordion-nav__chevron--down': !allSectionsExpanded }"
        ></span>
        <span class="govuk-accordion__show-all-text">{{ showHideText }}</span>
      </button>
    </div>
    <!-- @slot A list of `gv-accordion-section`s -->
    <slot />
  </div>
</template>
