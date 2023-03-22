<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'
import GvTag from '@/components/govuk-vue/GvTag.vue'
import { computed } from 'vue'

const props = defineProps({
  text: String,
  classes: {
    type: String,
    default: ''
  },
  //Tag props
  tagText: String,
  tagClasses: {
    type: String,
    default: ''
  }
})

const hasTag = computed(() => {
  return props.tagText || hasSlot('tag')
})
</script>

<template>
  <div :class="`govuk-phase-banner govuk-phase-banner__content__tag ${classes}`">
    <p class="govuk-phase-banner__content">
      <gv-tag :text="tagText" :classes="tagClasses">
        <slot name="tag" />
      </gv-tag>
      <span class="govuk-phase-banner__text">
        <template v-if="hasSlot('default')">
          <slot />
        </template>
        <template v-else>
          {{ text }}
        </template>
      </span>
    </p>
  </div>
</template>
