<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import GvFieldset from '@/components/govuk-vue/fieldset/GvFieldset.vue'
import hasSlot from '@/composables/useHasSlot'
import {
  CheckboxesModelValueInjectionKey,
  CheckboxesUpdateModelValueFunctionInjectionKey
} from '@/components/govuk-vue/checkboxes/CheckboxesInjectionKeys'
import { createUid } from '@/util/createUid'
import { looseEqual } from '@/util/looseEqual'

const props = defineProps({
  modelValue: Array,
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

function updateModelValue(
  newValue: any | undefined,
  oldValue: any | undefined,
  exclusive: boolean = false
) {
  if (modelValueMutable.value !== undefined) {
    if (newValue === undefined && oldValue !== undefined) {
      // If the new value is undefined and the old value is not, the checkbox has been unchecked. Remove its old value from the array
      modelValueMutable.value = modelValueMutable.value.filter((v) => {
        return !looseEqual(v, oldValue)
      })
    } else if (newValue !== undefined && oldValue === undefined) {
      if (exclusive) {
        // If this checkbox is exclusive, we want all other checkboxes to be clear so just create a fresh array with the new value
        modelValueMutable.value = [newValue]
      } else {
        // If the new value is defined and the old value is undefined, the checkbox has been checked. Add its new value to the array if it's not already there
        if (
          !modelValueMutable.value.some((v: any) => {
            return looseEqual(v, newValue)
          })
        ) {
          modelValueMutable.value.push(newValue)
        }
      }
    } else if (newValue !== undefined && oldValue !== undefined) {
      // If new and old value are both defined, the value has mutated without the checkbox being checked or unchecked (eg dynamic :value). Remove the old value and add the new one
      const newArray = modelValueMutable.value.filter((v) => {
        return !looseEqual(v, oldValue)
      })

      // Only push the new value if it's not already in the array (belt-and-braces, this shouldn't happen in practice unless two checkboxes have been given the same value prop)
      if (
        !newArray.some((v: any) => {
          return looseEqual(v, newValue)
        })
      ) {
        newArray.push(newValue)
      }

      modelValueMutable.value = newArray
    }

    // Emit back to the v-model
    emit('update:modelValue', modelValueMutable.value)
  }
}

const modelValueMutable = ref(props.modelValue)

provide(CheckboxesUpdateModelValueFunctionInjectionKey, updateModelValue)
provide(CheckboxesModelValueInjectionKey, modelValueMutable)

// Update our mutable version of modelValue if the v-model is changed
watch(
  () => props.modelValue,
  (newModelValue) => {
    modelValueMutable.value = newModelValue
  },
  { deep: true }
)

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
  return props.name ? props.name : createUid('gv-checkboxes')
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
      <div :class="`govuk-checkboxes ${classes}`">
        <slot />
      </div>
    </gv-fieldset>
  </div>
</template>
