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
  RadiosModelValueInjectionKey,
  RadiosNameInjectionKey,
  RadiosUpdateModelValueFunctionInjectionKey
} from '@/components/govuk-vue/radios/RadiosInjectionKeys'
import { createUid } from '@/util/createUid'

const props = defineProps({
  /**
   * The selected radio's value. In most cases you should use `v-model` instead of setting this prop directly.
   */
  modelValue: [String, Number, Boolean, Object],
  /**
   * The value of the `name` attribute for all radios in this group.
   *
   * If you don't provide a name, one will be generated automatically.
   */
  name: String,
  /**
   * Whether to show the radios on top of each other (stacked) or side-by-side (inline)
   */
  direction: {
    type: String,
    default: 'stacked',
    validator(value: string) {
      return ['stacked', 'inline'].includes(value)
    }
  },
  /**
   * The size of the radios in this group.
   */
  size: {
    type: String,
    default: 'normal',
    validator(value: string) {
      return ['normal', 'small'].includes(value)
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

function updateModelValue(newValue: string | number | boolean | object) {
  modelValueMutable.value = newValue
}

const modelValueMutable = ref(props.modelValue)

watch(modelValueMutable, (newModelValueMutable) => {
  emit('update:modelValue', newModelValueMutable)
})

// If the modelValue prop changes, copy that change to our mutable version of the modelValue
watch(
  () => props.modelValue,
  (newModelValue) => {
    modelValueMutable.value = newModelValue
  }
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
  return props.name ? props.name : createUid('gv-radios')
})

const computedDescribedBy = computed(() => {
  const value = `${props.fieldsetDescribedBy ? props.fieldsetDescribedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : undefined
})

const normalizedFormGroupClass = computed(() => {
  return normalizeClass(props.formGroupClass)
})

provide(RadiosModelValueInjectionKey, modelValueMutable)
provide(RadiosUpdateModelValueFunctionInjectionKey, updateModelValue)
provide(RadiosNameInjectionKey, computedName)
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
      <template #legend>
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
        :visually-hidden-text="errorMessageVisuallyHiddenText"
      >
        <!-- @slot The content of the error message. If content is provided in this slot, the `errorMessage` prop will be ignored. -->
        <slot name="error-message" />
      </gv-error-message>
      <div
        class="govuk-radios"
        :class="{
          'govuk-radios--small': size === 'small',
          'govuk-radios--inline': direction === 'inline'
        }"
        v-bind="$attrs"
      >
        <!-- @slot A list of `gv-radio`s -->
        <slot />
      </div>
    </gv-fieldset>
  </div>
</template>
