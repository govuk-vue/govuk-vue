<script setup lang="ts">
import { computed } from 'vue'
import hasSlot from '@/composables/useHasSlot.js'
import GvFragment from '@/components/govuk-vue/util/GvFragment.vue'

const props = defineProps({
  describedBy: String,
  classes: {
    type: String,
    default: ''
  },
  role: String,
  //Legend props
  legendText: String,
  legendClasses: {
    type: String,
    default: ''
  },
  legendIsPageHeading: Boolean
})

const hasLegend = computed(() => {
  return props.legendText || hasSlot('legend')
})

const computedHeadingWrapperElement = computed(() => {
  if (props.legendIsPageHeading) {
    return 'h1'
  } else {
    return GvFragment
  }
})
</script>

<template>
  <fieldset :class="`govuk-fieldset ${classes}`" :role="role" :aria-describedby="describedBy">
    <legend v-if="hasLegend" :class="`govuk-fieldset--legend ${legendClasses}`">
      <component :is="computedHeadingWrapperElement" class="govuk-fieldset__heading">
        <template v-if="hasSlot('legend')">
          <slot name="legend" />
        </template>
        <template v-else>
          {{ legendText }}
        </template>
      </component>
    </legend>
    <slot />
  </fieldset>
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/fieldset/fieldset';
</style>
