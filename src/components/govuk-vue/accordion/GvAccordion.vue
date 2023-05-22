<script setup lang="ts">
import { ref, provide, computed, Ref, toRef } from 'vue'
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
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  id: String,
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
provide(AccordionShowSectionAriaLabelTextInjectionKey, toRef(props, 'showSectionAriaLabelText'))
provide(AccordionHideSectionTextInjectionKey, toRef(props, 'hideSectionText'))
provide(AccordionHideSectionAriaLabelTextInjectionKey, toRef(props, 'hideSectionAriaLabelText'))
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
  <div :id="computedId" :class="`govuk-accordion ${classes}`">
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
