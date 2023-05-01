<script setup lang="ts">
import { computed, inject, ref } from 'vue'
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
  text: String,
  id: String,
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  divider: String,
  disabled: Boolean,
  //label props
  labelText: String,
  labelClasses: {
    type: String,
    default: ''
  },
  //hint props
  hintText: String,
  hintClasses: {
    type: String,
    default: ''
  }
})

const radiosModelValue = inject(RadiosModelValueInjectionKey)
const radiosUpdateModelValueFunction = inject(RadiosUpdateModelValueFunctionInjectionKey, () => {})
const name = inject(RadiosNameInjectionKey)

const hasHint = computed(() => {
  return props.hintText || hasSlot('hint')
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
  return props.id ? props.id : createUid('gv-radio-item')
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
    />
    <gv-label
      :text="labelText"
      :classes="`govuk-radios__label ${labelClasses}`"
      :forId="computedId"
    >
      <slot />
    </gv-label>
    <gv-hint
      v-if="hasHint"
      :id="hintId"
      :text="hintText"
      :classes="`govuk-radios__hint ${hintClasses}`"
    >
      <slot name="hint" />
    </gv-hint>
  </div>
  <div
    v-if="hasConditional"
    class="govuk-radios__conditional"
    :class="{ 'govuk-radios__conditional--hidden': value !== radiosModelValue }"
    :id="conditionalId"
  >
    <slot name="conditional" />
  </div>
</template>
