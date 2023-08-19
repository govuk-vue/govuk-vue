<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import GvTextarea from '@/components/govuk-vue/textarea/GvTextarea.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import { computed, ref, toRef, watch } from 'vue'
import { useComputedId } from '@/composables/useComputedId'

const props = defineProps({
  modelValue: String,
  id: String,
  name: String,
  rows: {
    type: Number,
    default: 5
  },
  describedBy: String,
  autocomplete: String,
  spellcheck: {
    type: Boolean,
    default: null
  },
  disabled: Boolean,
  //Form group props
  formGroupClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Label props
  label: String,
  labelIsPageHeading: {
    type: Boolean,
    default: false
  },
  labelClass: {
    type: [String, Array, Object],
    default: ''
  },
  //hint props
  hint: String,
  hintClass: {
    type: [String, Array, Object],
    default: ''
  },
  //error message props
  errorMessage: String,
  errorMessageClass: {
    type: [String, Array, Object],
    default: ''
  },
  errorMessageVisuallyHiddenText: String,
  maxChars: Number,
  maxWords: Number,
  threshold: {
    type: Number,
    default: 0,
    validator(value: number) {
      return value >= 0 && value <= 100
    }
  },
  messageClass: {
    type: [String, Array, Object],
    default: ''
  },
  textareaDescription: String,
  charactersUnderLimitText: {
    type: String,
    default: 'You have ${count} characters remaining'
  },
  charactersUnderLimitTextOne: {
    type: String,
    default: 'You have ${count} character remaining'
  },
  charactersAtLimitText: {
    type: String,
    default: 'You have ${count} characters remaining'
  },
  charactersOverLimitText: {
    type: String,
    default: 'You have ${count} characters too many'
  },
  charactersOverLimitTextOne: {
    type: String,
    default: 'You have ${count} character too many'
  },
  wordsUnderLimitText: {
    type: String,
    default: 'You have ${count} words remaining'
  },
  wordsUnderLimitTextOne: {
    type: String,
    default: 'You have ${count} word remaining'
  },
  wordsAtLimitText: {
    type: String,
    default: 'You have ${count} words remaining'
  },
  wordsOverLimitText: {
    type: String,
    default: 'You have ${count} words too many'
  },
  wordsOverLimitTextOne: {
    type: String,
    default: 'You have ${count} word too many'
  }
})
const emit = defineEmits(['update:modelValue'])

const modelValueMutable = ref(props.modelValue ? props.modelValue : null)

watch(modelValueMutable, (newModelValueMutable) => {
  emit('update:modelValue', newModelValueMutable)
})

const accessibleHintId = computed(() => {
  return `${computedId.value}-info`
})

const textareaDescribedBy = computed(() => {
  return `${props.describedBy ? props.describedBy : ''} ${accessibleHintId.value}`
})

const computedId = useComputedId(toRef(props, 'id'), 'gv-character-count')

const message = computed(() => {
  if (props.maxWords) {
    return maxWordsMessage()
  } else if (props.maxChars) {
    return maxCharsMessage()
  }

  return ''
})

const currentLength = computed(() => {
  if (props.maxWords) {
    if (modelValueMutable.value) {
      const tokens = modelValueMutable.value.match(/\S+/g) || [] // Matches consecutive non-whitespace chars
      return tokens.length
    } else {
      return 0
    }
  } else if (props.maxChars) {
    return modelValueMutable.value ? modelValueMutable.value.length : 0
  } else {
    return 0
  }
})

const maxLength = computed(() => {
  if (props.maxWords) {
    return props.maxWords
  } else if (props.maxChars) {
    return props.maxChars
  } else {
    return 0
  }
})

const isOverThreshold = computed(() => {
  if (props.threshold === 0) {
    return true
  }

  return (maxLength.value * props.threshold) / 100 <= currentLength.value
})

const isOverMaxLength = computed(() => {
  return currentLength.value > maxLength.value
})

const computedTextareaDescription = computed(() => {
  if (props.textareaDescription) {
    return replaceCount(props.textareaDescription, maxLength.value)
  } else {
    if (props.maxWords) {
      return replaceCount('You can enter up to ${count} words', maxLength.value)
    } else if (props.maxChars) {
      return replaceCount('You can enter up to ${count} characters', maxLength.value)
    }
  }

  return ''
})

function maxWordsMessage() {
  if (!props.maxWords) {
    return
  }

  return generateMessage(
    props.maxWords,
    currentLength.value,
    props.wordsUnderLimitText,
    props.wordsUnderLimitTextOne,
    props.wordsAtLimitText,
    props.wordsOverLimitText,
    props.wordsOverLimitTextOne
  )
}

function maxCharsMessage() {
  if (!props.maxChars) {
    return
  }

  return generateMessage(
    props.maxChars,
    currentLength.value,
    props.charactersUnderLimitText,
    props.charactersUnderLimitTextOne,
    props.charactersAtLimitText,
    props.charactersOverLimitText,
    props.charactersOverLimitTextOne
  )
}
function generateMessage(
  limit: number,
  length: number,
  underLimitText: string,
  underLimitTextOne: string,
  atLimitText: string,
  overLimitText: string,
  overLimitTextOne: string
) {
  let message

  if (length < limit) {
    const countUnder = limit - length
    if (countUnder === 1) {
      message = underLimitTextOne
    } else {
      message = underLimitText
    }
    message = replaceCount(message, countUnder)
  } else if (length > limit) {
    const countOver = length - limit
    if (countOver === 1) {
      message = overLimitTextOne
    } else {
      message = overLimitText
    }
    message = replaceCount(message, countOver)
  } else {
    message = replaceCount(atLimitText, 0)
  }
  return message
}

function replaceCount(str: string, count: Number) {
  return str.replace(/\$\{count}/g, count.toString())
}
</script>

<template>
  <div class="govuk-character-count">
    <gv-textarea
      v-model="modelValueMutable"
      :id="computedId"
      :name="name"
      :rows="rows"
      :described-by="textareaDescribedBy"
      :class="{
        'govuk-textarea--error': isOverMaxLength
      }"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      :disabled="disabled"
      :form-group-class="formGroupClass"
      :label="label"
      :label-is-page-heading="labelIsPageHeading"
      :label-class="labelClass"
      :hint="hint"
      :hint-class="hintClass"
      :error-message="errorMessage"
      :error-message-class="errorMessageClass"
      :error-message-visually-hidden-text="errorMessageVisuallyHiddenText"
      v-bind="$attrs"
    >
      <template #label>
        <slot name="label" />
      </template>
      <template #hint>
        <slot name="hint" />
      </template>
      <template #error-message>
        <slot name="error-message" />
      </template>
      <slot />
      <template #below-textarea>
        <gv-hint
          :id="accessibleHintId"
          class="govuk-character-count__message govuk-visually-hidden"
          :text="computedTextareaDescription"
        />
        <div
          class="govuk-character-count__message govuk-character-count__status"
          :class="{
            'govuk-character-count__message--disabled': !isOverThreshold,
            'govuk-hint': !isOverMaxLength,
            'govuk-error-message': isOverMaxLength
          }"
          aria-hidden="true"
        >
          {{ message }}
        </div>
        <div
          class="govuk-character-count__sr-status govuk-visually-hidden"
          aria-live="polite"
          :aria-hidden="!isOverThreshold"
        >
          {{ message }}
        </div>
      </template>
    </gv-textarea>
  </div>
</template>
