<script setup lang="ts">
import { computed } from 'vue'
import hasSlot from '@/composables/useHasSlot.js'
import GvLabel from '@/components/govuk-vue/GvLabel.vue'
import GvHint from '@/components/govuk-vue/GvHint.vue'

const props = defineProps({
  modelValue: String,
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
    type: String,
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
defineEmits(['update:modelValue'])

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
      :disabled="disabled ? 'disabled' : null"
      :aria-controls="conditionalId"
      :aria-expanded="hasConditional && modelValue === value"
      :aria-describedby="hintId"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', $event.target.value)"
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
    :class="{ 'govuk-radios__conditional--hidden': value !== modelValue }"
    :id="conditionalId"
  >
    <slot name="conditional" />
  </div>
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/radios/radios';
</style>
