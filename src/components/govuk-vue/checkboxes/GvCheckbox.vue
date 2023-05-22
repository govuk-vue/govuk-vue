<script setup lang="ts">
import { computed, inject, ref, toRef, watch } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import { createUid } from '@/util/createUid'
import {
  CheckboxesModelValueInjectionKey,
  CheckboxesUpdateModelValueFunctionInjectionKey
} from '@/components/govuk-vue/checkboxes/CheckboxesInjectionKeys'
import { looseEqual } from '@/util/looseEqual'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  modelValue: null,
  trueValue: {
    default: true
  },
  falseValue: {
    default: false
  },
  id: String,
  name: String,
  value: null,
  divider: String,
  exclusive: Boolean,
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
const emit = defineEmits(['update:modelValue'])

const modelValueMutable = ref(props.modelValue)

// The modelValue of the parent gv-checkboxes (if there is one)
const parentModelValue = inject(CheckboxesModelValueInjectionKey, ref([]))
const checkboxesUpdateModelValueFunction = inject(
  CheckboxesUpdateModelValueFunctionInjectionKey,
  () => {}
)

// On setup, set the checkbox to checked if the parent model value array contains this checkbox's value
handleParentModelValueChanged(parentModelValue.value)

// When the modelValue changes, emit it (in case v-model is being used directly on this component)
// and call the parent's modelValue update function (in case there's a parent gv-checkboxes with a modelValue)
watch(modelValueMutable, (newModelValueMutable) => {
  emit('update:modelValue', newModelValueMutable)
  //@ts-ignore
  if (newModelValueMutable !== false) {
    checkboxesUpdateModelValueFunction(props.value, undefined, props.exclusive)
  } else {
    checkboxesUpdateModelValueFunction(undefined, props.value)
  }
})

// If the value prop changes, pass that change back up to the parent
watch(
  () => props.value,
  (newValue, oldValue) => {
    checkboxesUpdateModelValueFunction(newValue, oldValue)
  }
)

// If the modelValue prop changes, copy that change to our mutable version of the modelValue
watch(
  () => props.modelValue,
  (newModelValue) => {
    modelValueMutable.value = newModelValue
  }
)

// Watch for changes to the parent gv-checkboxes model, if this checkbox is in a group.
// If the parent model contains this checkbox's value, tick it. If it doesn't, untick it.
watch(
  parentModelValue,
  (newParentModelValue) => {
    handleParentModelValueChanged(newParentModelValue)
  },
  { deep: true }
)

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

const computedId = useComputedId(toRef(props, 'id'), 'gv-checkbox')

const computedName = computed(() => {
  return props.name ? props.name : computedId.value
})

const checked = computed(() => {
  return looseEqual(modelValueMutable.value, props.trueValue)
})

function handleParentModelValueChanged(newParentModelValue: any) {
  // newParentModelValue will be undefined if this checkbox is in a checkbox group without a v-model
  if (newParentModelValue === undefined) {
    return
  }

  if (props.exclusive) {
    // If this checkbox is exclusive, we need to untick it if any other checkboxes are ticked
    const thisCheckboxIsChecked = newParentModelValue.some((v: any) => {
      return looseEqual(v, props.value)
    })

    const otherCheckboxesAreChecked = newParentModelValue.some((v: any) => {
      return !looseEqual(v, props.value)
    })

    if (thisCheckboxIsChecked && otherCheckboxesAreChecked) {
      modelValueMutable.value = false
    } else if (thisCheckboxIsChecked) {
      modelValueMutable.value = true
    }
  } else {
    // If the new parent modelValue array contains this checkbox's value, this box should be ticked.
    // If not, it should be unticked
    if (
      newParentModelValue.some((v: any) => {
        return looseEqual(v, props.value)
      })
    ) {
      modelValueMutable.value = true
    } else {
      modelValueMutable.value = false
    }
  }
}
</script>

<template>
  {{ computedId }}
  <div v-if="divider" class="govuk-checkboxes__divider">{{ divider }}</div>
  <div class="govuk-checkboxes__item">
    <input
      v-model="modelValueMutable"
      :true-value="trueValue"
      :false-value="falseValue"
      :value="value"
      class="govuk-checkboxes__input"
      :id="computedId"
      :name="computedName"
      type="checkbox"
      :disabled="disabled"
      :aria-controls="conditionalId"
      :aria-expanded="hasConditional && checked"
      :aria-describedby="hintId"
    />
    <gv-label
      :text="labelText"
      :classes="`govuk-checkboxes__label ${labelClasses}`"
      :forId="computedId"
    >
      <slot name="label" />
    </gv-label>
    <gv-hint
      v-if="hasHint"
      :id="hintId"
      :text="hintText"
      :classes="`govuk-checkboxes__hint ${hintClasses}`"
    >
      <slot name="hint" />
    </gv-hint>
  </div>
  <div
    v-if="hasConditional"
    class="govuk-checkboxes__conditional"
    :class="{ 'govuk-checkboxes__conditional--hidden': !checked }"
    :id="conditionalId"
  >
    <slot name="conditional" />
  </div>
</template>
