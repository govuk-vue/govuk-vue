<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import hasSlot from '@/composables/useHasSlot'
import { computed, normalizeClass, ref, toRef, watch } from 'vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import GvFieldset from '@/components/govuk-vue/fieldset/GvFieldset.vue'
import GvInput from '@/components/govuk-vue/input/GvInput.vue'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  /**
   * The value of the day input. In most cases you should use `v-model:day` instead of setting this prop directly.
   */
  day: String,
  /**
   * The value of the month input. In most cases you should use `v-model:month` instead of setting this prop directly.
   */
  month: String,
  /**
   * The value of the year input. In most cases you should use `v-model:year` instead of setting this prop directly.
   */
  year: String,
  /**
   * If `true`, the day input will be outlined in red
   */
  dayHasError: Boolean,
  /**
   * If `true`, the month input will be outlined in red
   */
  monthHasError: Boolean,
  /**
   * If `true`, the year input will be outlined in red
   */
  yearHasError: Boolean,
  /**
   * The type of autocomplete to allow on the inputs. Currently only allows birthday.
   */
  autocomplete: {
    type: String,
    validator(value: string) {
      return ['bday'].includes(value)
    }
  },
  /**
   * An ID for the date component. This will be used as a prefix for the IDs of the individual inputs.
   *
   * If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * An optional prefix for the `name` attribute on the individual inputs. If provided, these
   * attributes will be set to `[prefix]-day`, `[prefix]-month` and `[prefix]-year`. If not provided,
   * the names will be `day`, `month`, and `year`.
   */
  namePrefix: String,
  /**
   * Classes to add to the form group. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  //Form group props
  formGroupClass: {
    type: [String, Array, Object],
    default: ''
  },
  //fieldset props
  /**
   * One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users.
   */
  fieldsetDescribedBy: String,
  /**
   * Classes to add to the fieldset container. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  fieldsetClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * Optional ARIA role attribute to add to the fieldset container.
   */
  fieldsetRole: String,
  //fieldset legend props
  /**
   * Text to use within the legend. If content is provided in the `legend` slot, this prop will be ignored.
   */
  legend: String,
  /**
   * Classes to add to the legend. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  legendClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * Whether the legend also acts as the heading for the page.
   */
  legendIsPageHeading: Boolean,
  //hint props
  /**
   * Text to use within the hint. If content is provided in the `hint` slot, this prop will be ignored.
   */
  hint: String,
  /**
   * Classes to add to the hint span tag. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  hintClass: {
    type: [String, Array, Object],
    default: ''
  },
  //error message props
  /**
   * Text to use within the error message. If content is provided in the `error-message` slot, this prop will be ignored.
   */
  errorMessage: String,
  /**
   * Classes to add to the error message `<p>` tag. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  errorMessageClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * A visually hidden prefix used before the error message.
   *
   * Defaults to `'Error'`.
   */
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
  return props.hint || hasSlot('hint')
})

const hintId = computed(() => {
  return `${computedId.value}-hint`
})

const hasErrorMessage = computed(() => {
  return props.errorMessage || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedId.value}-error`
})

const computedDescribedBy = computed(() => {
  const value = `${props.fieldsetDescribedBy ? props.fieldsetDescribedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : undefined
})

const computedId = useComputedId(toRef(props, 'id'), 'gv-date-input')

// These are computed because if the ternary statement is placed directly in the :autocomplete prop,
// Vue ends up adding autocomplete="null" to the element rather than omitting the attribute
const dayAutocomplete = computed(() => {
  return props.autocomplete === 'bday' ? 'bday-day' : undefined
})

const monthAutocomplete = computed(() => {
  return props.autocomplete === 'bday' ? 'bday-month' : undefined
})

const yearAutocomplete = computed(() => {
  return props.autocomplete === 'bday' ? 'bday-year' : undefined
})

const normalizedFormGroupClass = computed(() => {
  return normalizeClass(props.formGroupClass)
})
</script>

<template>
  <div
    :class="`govuk-form-group ${normalizedFormGroupClass} ${
      hasErrorMessage ? 'govuk-form-group--error' : ''
    }`"
  >
    <gv-fieldset
      :described-by="computedDescribedBy"
      :class="fieldsetClass"
      role="group"
      :legend="legend"
      :legend-class="legendClass"
      :legend-is-page-heading="legendIsPageHeading"
    >
      <template v-slot:legend>
        <!-- @slot The content of the legend. If content is provided in this slot, the `legend` prop will be ignored. -->
        <slot name="legend" />
      </template>
      <gv-hint v-if="hasHint" :text="hint" :class="hintClass" :id="hintId">
        <!-- @slot The content of the hint. If content is provided in this slot, the `hint` prop will be ignored. -->
        <slot name="hint" />
      </gv-hint>
      <gv-error-message
        v-if="hasErrorMessage"
        :text="errorMessage"
        :class="errorMessageClass"
        :id="errorMessageId"
      >
        <!-- @slot The content of the error message. If content is provided in this slot, the `errorMessage` prop will be ignored. -->
        <slot name="error-message" />
      </gv-error-message>

      <div :id="computedId" class="govuk-date-input" v-bind="$attrs">
        <div class="govuk-date-input__item">
          <gv-input
            label="Day"
            label-class="govuk-date-input__label"
            :id="`${computedId}-day`"
            class="govuk-date-input__input govuk-input--width-2"
            :class="{
              'govuk-input--error': dayHasError
            }"
            :name="`${namePrefix ? `${namePrefix}-day` : 'day'}`"
            inputmode="numeric"
            v-model="dayMutable"
            :autocomplete="dayAutocomplete"
          />
        </div>
        <div class="govuk-date-input__item">
          <gv-input
            label="Month"
            label-class="govuk-date-input__label"
            :id="`${computedId}-month`"
            class="govuk-date-input__input govuk-input--width-2"
            :class="{
              'govuk-input--error': monthHasError
            }"
            :name="`${namePrefix ? `${namePrefix}-month` : 'month'}`"
            inputmode="numeric"
            v-model="monthMutable"
            :autocomplete="monthAutocomplete"
          />
        </div>
        <div class="govuk-date-input__item">
          <gv-input
            label="Year"
            label-class="govuk-date-input__label"
            :id="`${computedId}-year`"
            class="govuk-date-input__input govuk-input--width-4"
            :class="{
              'govuk-input--error': yearHasError
            }"
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
