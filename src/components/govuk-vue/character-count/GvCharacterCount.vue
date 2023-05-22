<script setup lang="ts">
import GvTextarea from '@/components/govuk-vue/textarea/GvTextarea.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import { computed, toRef } from 'vue'
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
  classes: {
    type: String,
    default: ''
  },
  autocomplete: String,
  spellcheck: {
    type: Boolean,
    default: null
  },
  disabled: Boolean,
  //Form group props
  formGroupClasses: {
    type: String,
    default: ''
  },
  //Label props
  labelText: String,
  labelIsPageHeading: {
    type: Boolean,
    default: false
  },
  labelClasses: String,
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
  maxChars: Number,
  maxWords: Number,
  threshold: {
    type: Number,
    default: 0,
    validator(value: number) {
      return value >= 0 && value <= 100
    }
  },
  messageClasses: {
    type: String,
    default: ''
  },
  textareaDescriptionText: String,
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
defineEmits(['update:modelValue'])

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
    if (props.modelValue) {
      const tokens = props.modelValue.match(/\S+/g) || [] // Matches consecutive non-whitespace chars
      return tokens.length
    } else {
      return 0
    }
  } else if (props.maxChars) {
    return props.modelValue ? props.modelValue.length : 0
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

const computedTextareaDescriptionText = computed(() => {
  if (props.textareaDescriptionText) {
    return replaceCount(props.textareaDescriptionText, maxLength.value)
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
      :model-value="modelValue"
      :id="computedId"
      :name="name"
      :rows="rows"
      :described-by="textareaDescribedBy"
      :classes="`${classes} ${isOverMaxLength ? 'govuk-textarea--error' : ''}`"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      :disabled="disabled"
      :form-group-classes="formGroupClasses"
      :label-text="labelText"
      :label-is-page-heading="labelIsPageHeading"
      :label-classes="labelClasses"
      :hint-text="hintText"
      :hint-classes="hintClasses"
      :error-message-text="errorMessageText"
      :error-message-classes="errorMessageClasses"
      :error-message-visually-hidden-text="errorMessageVisuallyHiddenText"
      @update:modelValue="(newValue) => $emit('update:modelValue', newValue)"
    >
      <template v-slot:below-textarea>
        <gv-hint
          :id="accessibleHintId"
          classes="govuk-character-count__message govuk-visually-hidden"
          :text="computedTextareaDescriptionText"
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
  <!--todo slots-->
  <!--todo - hint should be static text, screen reader version should be a div below-->
</template>
