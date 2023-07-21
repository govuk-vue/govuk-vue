<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, inject, ref, toRef, watch } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import {
  CheckboxesModelValueInjectionKey,
  CheckboxesUpdateModelValueFunctionInjectionKey,
  CheckboxesNameInjectionKey
} from '@/components/govuk-vue/checkboxes/CheckboxesInjectionKeys'
import { looseEqual } from '@/util/looseEqual'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  /**
   * True if the checkbox is checked, false otherwise (or the value of the `trueValue` or `falseValue` props if they have been set). In most cases you should use `v-model` instead of setting this prop directly.
   */
  modelValue: null,
  /**
   * The value to set the `v-model` to if the checkbox is checked.
   */
  trueValue: {
    default: true
  },
  /**
   * The value to set the `v-model` to if the checkbox is not checked.
   */
  falseValue: {
    default: false
  },
  /**
   * The ID for this checkbox.
   *
   * If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * The value of the `name` attribute for this checkbox.
   *
   * If you don't provide a name, one will be generated automatically.
   */
  name: String,
  /**
   * If the parent checkbox group has a `v-model` array, this value will be added to the array if the checkbox is checked.
   */
  value: null,
  /**
   * The divider text to show above the checkbox if this checkbox is exclusive. This should usually be 'or'.
   */
  divider: String,
  /**
   * Whether checking this checkbox should deselect all other checkboxes in this group.
   */
  exclusive: Boolean,
  /**
   * If `true`, checkbox will be disabled.
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
  return props.hint || hasSlot('hint')
})

const hintId = computed(() => {
  return hasHint.value ? `${computedId.value}-hint` : undefined
})

const hasConditional = computed(() => {
  return hasSlot('conditional')
})

const conditionalId = computed(() => {
  return hasConditional.value ? `conditional-${computedId.value}` : undefined
})

const computedId = useComputedId(toRef(props, 'id'), 'gv-checkbox')

const parentName = inject(CheckboxesNameInjectionKey)

const computedName = computed(() => {
  if (props.name) {
    return props.name
  } else if (parentName) {
    return parentName.value
  } else {
    return computedId.value
  }
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
      v-bind="$attrs"
    />
    <gv-label :text="label" class="govuk-checkboxes__label" :class="labelClass" :forId="computedId">
      <!-- @slot The content of the label. If content is provided in this slot, the `label` prop will be ignored. -->
      <slot />
    </gv-label>
    <gv-hint
      v-if="hasHint"
      :id="hintId"
      :text="hint"
      class="govuk-checkboxes__hint"
      :class="hintClass"
    >
      <!-- @slot The content of the hint. If content is provided in this slot, the `hint` prop will be ignored. -->
      <slot name="hint" />
    </gv-hint>
  </div>
  <div
    v-if="hasConditional"
    class="govuk-checkboxes__conditional"
    :class="{ 'govuk-checkboxes__conditional--hidden': !checked }"
    :id="conditionalId"
  >
    <!-- @slot Content to show if the checkbox is checked. -->
    <slot name="conditional" />
  </div>
</template>
