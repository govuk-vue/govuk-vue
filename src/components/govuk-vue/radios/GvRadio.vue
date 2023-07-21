<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, inject } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import {
  RadiosModelValueInjectionKey,
  RadiosNameInjectionKey,
  RadiosUpdateModelValueFunctionInjectionKey
} from '@/components/govuk-vue/radios/RadiosInjectionKeys'
import { createUid } from '@/util/createUid'

const props = defineProps({
  /**
   * The ID for this radio.
   *
   * If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * The value of this radio. The parent `gv-radios`'  `v-model` will be set to this value if the radio is selected.
   */
  value: {
    type: [String, Number, Boolean, Object],
    required: true
  },
  /**
   * The divider text to show above the radio. This should usually be 'or'.
   */
  divider: String,
  /**
   * If `true`, radio will be disabled.
   */
  disabled: Boolean,
  //label props
  /**
   * Text to use within the label. If content is provided in the default slot, this prop will be ignored.
   */
  label: String,
  /**
   * Classes to add to the label tag. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  labelClass: {
    type: [String, Array, Object],
    default: ''
  },
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
  }
})

const radiosModelValue = inject(RadiosModelValueInjectionKey)
const radiosUpdateModelValueFunction = inject(RadiosUpdateModelValueFunctionInjectionKey, () => {})
const name = inject(RadiosNameInjectionKey)

const hasHint = computed(() => {
  return props.hint || hasSlot('hint')
})

const hintId = computed(() => {
  return hasHint.value ? `${computedId.value}-hint` : null
})

const hasConditional = computed(() => {
  return hasSlot('conditional')
})

const conditionalId = computed(() => {
  return hasConditional.value ? `conditional-${computedId.value}` : null
})

const computedId = computed(() => {
  return props.id ? props.id : createUid('gv-radio')
})
</script>

<template>
  <div v-if="divider" class="govuk-radios__divider">{{ divider }}</div>
  <div class="govuk-radios__item">
    <input
      class="govuk-radios__input"
      :id="computedId"
      :name="name"
      type="radio"
      :value="value"
      :disabled="disabled"
      :aria-controls="conditionalId"
      :aria-expanded="hasConditional && radiosModelValue === value"
      :aria-describedby="hintId"
      :checked="radiosModelValue === value"
      @change="radiosUpdateModelValueFunction(value)"
      v-bind="$attrs"
    />
    <gv-label :text="label" class="govuk-radios__label" :class="labelClass" :forId="computedId">
      <!-- @slot The content of the label. If content is provided in this slot, the `label` prop will be ignored. -->
      <slot />
    </gv-label>
    <gv-hint v-if="hasHint" :id="hintId" :text="hint" class="govuk-radios__hint" :class="hintClass">
      <!-- @slot The content of the hint. If content is provided in this slot, the `hint` prop will be ignored. -->
      <slot name="hint" />
    </gv-hint>
  </div>
  <div
    v-if="hasConditional"
    class="govuk-radios__conditional"
    :class="{ 'govuk-radios__conditional--hidden': value !== radiosModelValue }"
    :id="conditionalId"
  >
    <!-- @slot Content to show if the checkbox is checked. -->
    <slot name="conditional" />
  </div>
</template>
