<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import GvFieldset from '@/components/govuk-vue/fieldset/GvFieldset.vue'
import hasSlot from '@/composables/useHasSlot'
import {
  RadiosModelValueInjectionKey,
  RadiosNameInjectionKey,
  RadiosUpdateModelValueFunctionInjectionKey
} from '@/components/govuk-vue/radios/RadiosInjectionKeys'
import { createUid } from '@/util/createUid'

const props = defineProps({
  modelValue: [String, Number, Boolean],
  name: String,
  classes: {
    type: String,
    default: ''
  },
  //fieldset props
  fieldsetDescribedBy: String,
  fieldsetClasses: {
    type: String,
    default: ''
  },
  fieldsetRole: String,
  //fieldset legend props
  fieldsetLegendText: String,
  fieldsetLegendClasses: {
    type: String,
    default: ''
  },
  fieldsetLegendIsPageHeading: Boolean,
  //hint props
  hintText: String,
  hintClasses: {
    type: String,
    default: ''
  },
  //error message props
  errorMessageText: String,
  errorMessageClasses: {
    type: String,
    default: ''
  },
  errorMessageVisuallyHiddenText: String,
  //Form group props
  formGroupClasses: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

function updateModelValue(newValue: string | number | boolean) {
  modelValueMutable.value = newValue
}

const modelValueMutable = ref(props.modelValue)

watch(modelValueMutable, (newModelValueMutable) => {
  emit('update:modelValue', newModelValueMutable)
})

const hasHint = computed(() => {
  return props.hintText || hasSlot('hint')
})

const hasErrorMessage = computed(() => {
  return props.errorMessageText || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedName.value}-error`
})

const hintId = computed(() => {
  return `${computedName.value}-hint`
})

const computedName = computed(() => {
  return props.name ? props.name : createUid('gv-radios')
})

const computedDescribedBy = computed(() => {
  const value = `${props.fieldsetDescribedBy ? props.fieldsetDescribedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : null
})

provide(RadiosModelValueInjectionKey, modelValueMutable)
provide(RadiosUpdateModelValueFunctionInjectionKey, updateModelValue)
provide(RadiosNameInjectionKey, computedName)
</script>

<template>
  <div
    :class="`govuk-form-group ${formGroupClasses} ${
      hasErrorMessage ? 'govuk-form-group--error' : ''
    }`"
  >
    <gv-fieldset
      :described-by="computedDescribedBy"
      :classes="fieldsetClasses"
      :role="fieldsetRole"
      :legend-text="fieldsetLegendText"
      :legend-classes="fieldsetLegendClasses"
      :legend-is-page-heading="fieldsetLegendIsPageHeading"
    >
      <template v-slot:legend>
        <slot name="fieldset-legend" />
      </template>
      <gv-hint v-if="hasHint" :text="hintText" :classes="hintClasses" :id="hintId">
        <slot name="hint" />
      </gv-hint>
      <gv-error-message
        v-if="hasErrorMessage"
        :text="errorMessageText"
        :classes="errorMessageClasses"
        :id="errorMessageId"
      >
        <slot name="error-message" />
      </gv-error-message>
      <div :class="`govuk-radios ${classes}`">
        <slot />
      </div>
    </gv-fieldset>
  </div>
</template>
