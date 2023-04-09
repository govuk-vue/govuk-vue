<script setup lang="ts">
import { ref, provide, computed, Ref } from 'vue'
import {
  AccordionIdInjectionKey,
  AccordionHeadingLevelInjectionKey,
  AccordionHideSectionTextInjectionKey,
  AccordionHideSectionAriaLabelTextInjectionKey,
  AccordionShowSectionTextInjectionKey,
  AccordionShowSectionAriaLabelTextInjectionKey,
  AccordionRegisterSectionFunctionInjectionKey,
  AccordionUnregisterSectionFunctionInjectionKey
} from '@/components/govuk-vue/accordion/AccordionInjectionKeys'
import type { AccordionSection } from '@/components/govuk-vue/accordion/AccordionSection'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  classes: {
    type: String,
    default: ''
  },
  headingLevel: {
    type: Number,
    default: 2,
    validator(value: number) {
      return value >= 1 && value <= 6
    }
  },
  hideAllSectionsText: {
    type: String,
    default: 'Hide all sections'
  },
  hideSectionText: {
    type: String,
    default: 'Hide'
  },
  hideSectionAriaLabelText: {
    type: String,
    default: 'Hide this section'
  },
  showAllSectionsText: {
    type: String,
    default: 'Show all sections'
  },
  showSectionText: {
    type: String,
    default: 'Show'
  },
  showSectionAriaLabelText: {
    type: String,
    default: 'Show this section'
  }
})

let sectionIndex = 0
let sections: Ref<AccordionSection[]> = ref([])

function registerSection(section: AccordionSection) {
  section.sectionIndex.value = sectionIndex++
  sections.value.push(section)
}

function unregisterSection(key: Symbol) {
  sections.value = sections.value.filter((s) => {
    return s.key != key
  })
}

provide(AccordionIdInjectionKey, props.id)
provide(AccordionHeadingLevelInjectionKey, props.headingLevel)
provide(AccordionShowSectionTextInjectionKey, props.showSectionText)
provide(AccordionShowSectionAriaLabelTextInjectionKey, props.showSectionAriaLabelText)
provide(AccordionHideSectionTextInjectionKey, props.hideSectionText)
provide(AccordionHideSectionAriaLabelTextInjectionKey, props.hideSectionAriaLabelText)
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
  <div :id="id" :class="`govuk-accordion ${classes}`">
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
    <slot />
  </div>
</template>
