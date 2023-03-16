<script setup lang="ts">
import GvHint from '@/components/govuk-vue/GvHint.vue'
import hasSlot from '@/composables/useHasSlot'
import { computed, ref, watch } from 'vue'
import GvErrorMessage from '@/components/govuk-vue/GvErrorMessage.vue'
import GvFieldset from '@/components/govuk-vue/GvFieldset.vue'
import GvInput from '@/components/govuk-vue/GvInput.vue'

const props = defineProps({
  day: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  namePrefix: String,
  classes: {
    type: String,
    default: ''
  },
  //Form group props
  formGroupClasses: {
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
  labelClasses: String,
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
  errorMessageVisuallyHiddenText: String
})
const emit = defineEmits(['update:day', 'update:month', 'update:year'])

let dayMutable = ref(props.day + '')
let monthMutable = ref(props.month + '')
let yearMutable = ref(props.day + '')

watch(dayMutable, (newDayMutable) => {
  emit('update:day', newDayMutable)
})

watch(monthMutable, (newMonthMutable) => {
  emit('update:month', newMonthMutable)
})

watch(yearMutable, (newYearMutable) => {
  emit('update:year', newYearMutable)
})

const hasHint = computed(() => {
  return props.hintText || hasSlot('hint')
})

const hintId = computed(() => {
  return `${props.id}-hint`
})

const hasErrorMessage = computed(() => {
  return props.errorMessageText || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${props.id}-error`
})

const computedDescribedBy = computed(() => {
  const value = `${props.fieldsetDescribedBy ? props.fieldsetDescribedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : null
})
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
      role="group"
      :legend-text="fieldsetLegendText"
      :legend-classes="fieldsetLegendClasses"
      :legend-is-page-heading="fieldsetLegendIsPageHeading"
    >
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

      <div :id="id" :class="`govuk-date-input ${classes}`">
        <div class="govuk-date-input__item">
          <gv-input
            label-text="Day"
            label-classes="govuk-date-input__label"
            :id="`${id}-day`"
            classes="govuk-date-input__input govuk-input--width-2"
            :name="`${namePrefix ? `${namePrefix}-day` : 'day'}`"
            inputmode="numeric"
            v-model="dayMutable"
          />
        </div>
        <div class="govuk-date-input__item">
          <gv-input
            label-text="Month"
            label-classes="govuk-date-input__label"
            :id="`${id}-month`"
            classes="govuk-date-input__input govuk-input--width-2"
            :name="`${namePrefix ? `${namePrefix}-month` : 'month'}`"
            inputmode="numeric"
            v-model="monthMutable"
          />
        </div>
        <div class="govuk-date-input__item">
          <gv-input
            label-text="Year"
            label-classes="govuk-date-input__label"
            :id="`${id}-year`"
            classes="govuk-date-input__input govuk-input--width-4"
            :name="`${namePrefix ? `${namePrefix}-year` : 'year'}`"
            inputmode="numeric"
            v-model="yearMutable"
          />
        </div>
      </div>
    </gv-fieldset>
  </div>
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/date-input/date-input';
</style>
