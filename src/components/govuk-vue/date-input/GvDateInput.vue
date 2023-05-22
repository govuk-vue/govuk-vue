<script setup lang="ts">
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import hasSlot from '@/composables/useHasSlot'
import { computed, ref, toRef, watch } from 'vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import GvFieldset from '@/components/govuk-vue/fieldset/GvFieldset.vue'
import GvInput from '@/components/govuk-vue/input/GvInput.vue'
import { useComputedId } from '@/composables/useComputedId'

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
  dayHasError: Boolean,
  monthHasError: Boolean,
  yearHasError: Boolean,
  autocompleteBirthday: Boolean,
  id: String,
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

let dayMutable = ref(props.day)
let monthMutable = ref(props.month)
let yearMutable = ref(props.year)

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
  return `${computedId.value}-hint`
})

const hasErrorMessage = computed(() => {
  return props.errorMessageText || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedId.value}-error`
})

const computedDescribedBy = computed(() => {
  const value = `${props.fieldsetDescribedBy ? props.fieldsetDescribedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : null
})

const computedId = useComputedId(toRef(props, 'id'), 'gv-date-input')

// These are computed because if the ternary statement is placed directly in the :autocomplete prop,
// Vue ends up adding autocomplete="null" to the element rather than omitting the attribute
const dayAutocomplete = computed(() => {
  return props.autocompleteBirthday ? 'bday-day' : null
})

const monthAutocomplete = computed(() => {
  return props.autocompleteBirthday ? 'bday-month' : null
})

const yearAutocomplete = computed(() => {
  return props.autocompleteBirthday ? 'bday-year' : null
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

      <div :id="computedId" :class="`govuk-date-input ${classes}`">
        <div class="govuk-date-input__item">
          <gv-input
            label-text="Day"
            label-classes="govuk-date-input__label"
            :id="`${computedId}-day`"
            :classes="`govuk-date-input__input govuk-input--width-2 ${
              dayHasError ? 'govuk-input--error' : ''
            }`"
            :name="`${namePrefix ? `${namePrefix}-day` : 'day'}`"
            inputmode="numeric"
            v-model="dayMutable"
            :autocomplete="dayAutocomplete"
          />
        </div>
        <div class="govuk-date-input__item">
          <gv-input
            label-text="Month"
            label-classes="govuk-date-input__label"
            :id="`${computedId}-month`"
            :classes="`govuk-date-input__input govuk-input--width-2  ${
              monthHasError ? 'govuk-input--error' : ''
            }`"
            :name="`${namePrefix ? `${namePrefix}-month` : 'month'}`"
            inputmode="numeric"
            v-model="monthMutable"
            :autocomplete="monthAutocomplete"
          />
        </div>
        <div class="govuk-date-input__item">
          <gv-input
            label-text="Year"
            label-classes="govuk-date-input__label"
            :id="`${computedId}-year`"
            :classes="`govuk-date-input__input govuk-input--width-4  ${
              yearHasError ? 'govuk-input--error' : ''
            }`"
            :name="`${namePrefix ? `${namePrefix}-year` : 'year'}`"
            inputmode="numeric"
            v-model="yearMutable"
            :autocomplete="yearAutocomplete"
          />
        </div>
      </div>
    </gv-fieldset>
  </div>
</template>
