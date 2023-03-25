<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import { RadiosInjectionKey } from '@/components/govuk-vue/radios/RadiosInjectionkey'

const props = defineProps({
  text: String,
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
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

const radiosModelValue = inject(RadiosInjectionKey, {
  modelValue: ref(undefined),
  mutationFunction: () => {}
})

const hasHint = computed(() => {
  return props.hintText || hasSlot('hint')
})

const hintId = computed(() => {
  return hasHint.value ? `${props.id}-hint` : null
})

const hasConditional = computed(() => {
  return hasSlot('conditional')
})

const conditionalId = computed(() => {
  return hasConditional.value ? `conditional-${props.id}` : null
})
</script>

<template>
  <div v-if="divider" class="govuk-radios__divider">{{ divider }}</div>
  <div class="govuk-radios__item">
    <input
      class="govuk-radios__input"
      :id="id"
      :name="name"
      type="radio"
      :value="value"
      :disabled="disabled"
      :aria-controls="conditionalId"
      :aria-expanded="hasConditional && radiosModelValue.modelValue.value === value"
      :aria-describedby="hintId"
      :checked="radiosModelValue.modelValue.value === value"
      @change="radiosModelValue.mutationFunction(value)"
    />
    <gv-label :text="labelText" :classes="`govuk-radios__label ${labelClasses}`" :forId="id">
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
    :class="{ 'govuk-radios__conditional--hidden': value !== radiosModelValue.modelValue.value }"
    :id="conditionalId"
  >
    <slot name="conditional" />
  </div>
</template>
