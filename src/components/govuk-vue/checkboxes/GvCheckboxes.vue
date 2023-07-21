<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, normalizeClass, provide, ref, watch } from 'vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import GvFieldset from '@/components/govuk-vue/fieldset/GvFieldset.vue'
import hasSlot from '@/composables/useHasSlot'
import {
  CheckboxesModelValueInjectionKey,
  CheckboxesNameInjectionKey,
  CheckboxesUpdateModelValueFunctionInjectionKey
} from '@/components/govuk-vue/checkboxes/CheckboxesInjectionKeys'
import { createUid } from '@/util/createUid'
import { looseEqual } from '@/util/looseEqual'

const props = defineProps({
  /**
   * The array of selected checkbox values. In most cases you should use `v-model` instead of setting this prop directly.
   */
  modelValue: Array,
  /**
   * The value of the `name` attribute to apply to all checkboxes in this group.
   *
   * If you don't provide a name, one will be generated automatically.
   */
  name: String,
  /**
   * The size of the checkboxes in this group.
   */
  size: {
    type: String,
    default: 'normal',
    validator(e: string) {
      return ['normal', 'small'].includes(e)
    }
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
  errorMessageVisuallyHiddenText: String,
  //Form group props
  /**
   * Classes to add to the form group. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  formGroupClass: {
    type: [String, Array, Object],
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
  return props.hint || hasSlot('hint')
})

const hasErrorMessage = computed(() => {
  return props.errorMessage || hasSlot('error-message')
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

provide(CheckboxesNameInjectionKey, computedName)

const computedDescribedBy = computed(() => {
  const value = `${props.fieldsetDescribedBy ? props.fieldsetDescribedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : undefined
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
      :role="fieldsetRole"
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
      <div
        class="govuk-checkboxes"
        :class="{
          'govuk-checkboxes--small': size === 'small'
        }"
        v-bind="$attrs"
      >
        <!-- @slot A list of `gv-checkbox`es -->
        <slot />
      </div>
    </gv-fieldset>
  </div>
</template>
