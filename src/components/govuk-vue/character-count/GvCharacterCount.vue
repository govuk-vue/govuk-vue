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
  /**
   * The value of the textarea. In most cases you should use `v-model` instead of setting this prop directly.
   */
  modelValue: String,
  /**
   * The ID for this textarea.
   *
   * If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * The name of the textarea, which is submitted with the form data.
   */
  name: String,
  /**
   * Number of textarea rows
   */
  rows: {
    type: Number,
    default: 5
  },
  /**
   * 	One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive
   * 	information for screenreader users.
   */
  describedBy: String,
  /**
   * Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html),
   * for example `street-address`. See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
   * for full list of values that can be used.
   */
  autocomplete: String,
  /**
   * Sets the `spellcheck` attribute on the textarea
   */
  spellcheck: {
    type: Boolean,
    default: null
  },
  /**
   * If `true`, textarea will be disabled.
   */
  disabled: Boolean,
  //Form group props
  /**
   * Classes to add to the form group. You can bind a string, an array or an object, as with normal
   * [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  formGroupClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Label props
  /**
   * Text to use within the label. If content is provided in the default slot, this prop will be ignored.
   */
  label: String,
  /**
   * Whether the label also acts as the heading for the page.
   */
  labelIsPageHeading: {
    type: Boolean,
    default: false
  },
  /**
   * Classes to add to the label tag. You can bind a string, an array or an object, as with normal
   * [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
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
   * Classes to add to the hint span tag. You can bind a string, an array or an object, as with normal
   * [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
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
   * Classes to add to the error message `<p>` tag. You can bind a string, an array or an object, as with normal
   * [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
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
  /**
   * The maximum number of characters. If `maxWords` is provided, the `maxChars` option will be ignored.
   */
  maxChars: Number,
  /**
   * The maximum number of words. If `maxWords` is provided, the `maxChars` option will be ignored.
   */
  maxWords: Number,
  /**
   * The percentage value of the limit at which point the count message is displayed. If this prop is set, the count
   * message will be hidden by default.
   */
  threshold: {
    type: Number,
    default: 0,
    validator(value: number) {
      return value >= 0 && value <= 100
    }
  },
  /**
   * Classes to add to the count message. You can bind a string, an array or an object, as with normal
   * [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  messageClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * Message made available to assistive technologies to describe that the component accepts only a limited amount of
   * content. The component will replace the `%{count}` placeholder with the value of the maxChars or maxWords param.
   */
  textareaDescription: String,
  /**
   * Message displayed when the number of characters is under the configured maximum, `maxChars`. This message is
   * displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder
   * with the number of remaining characters.
   */
  charactersUnderLimitText: {
    type: String,
    default: 'You have ${count} characters remaining'
  },
  /**
   * Message used instead of `charactersUnderLimitText` when there is only one character remaining.
   */
  charactersUnderLimitTextOne: {
    type: String,
    default: 'You have 1 character remaining'
  },
  /**
   * Message displayed when the number of characters reaches the configured maximum, `maxChars`. This message is
   * displayed visually and through assistive technologies.
   */
  charactersAtLimitText: {
    type: String,
    default: 'You have 0 characters remaining'
  },
  /**
   * Message displayed when the number of characters is over the configured maximum, `maxChars`. This message is
   * displayed visually and through assistive technologies. The component will replace the `${count}` placeholder
   * with the number of remaining characters.
   */
  charactersOverLimitText: {
    type: String,
    default: 'You have ${count} characters too many'
  },
  /**
   * Message used instead of `charactersOverLimitText` when the text is one character over.
   */
  charactersOverLimitTextOne: {
    type: String,
    default: 'You have 1 character too many'
  },
  /**
   * Message displayed when the number of words is under the configured maximum, `maxWords`. This message is
   * displayed visually and through assistive technologies. The component will replace the `${count}` placeholder
   * with the number of remaining characters.
   */
  wordsUnderLimitText: {
    type: String,
    default: 'You have ${count} words remaining'
  },
  /**
   * Message used instead of `wordsUnderLimitText` when there is only one word remaining.
   */
  wordsUnderLimitTextOne: {
    type: String,
    default: 'You have 1 word remaining'
  },
  /**
   * Message displayed when the number of words reaches the configured maximum, `maxWords`. This message is
   * displayed visually and through assistive technologies.
   */
  wordsAtLimitText: {
    type: String,
    default: 'You have 0 words remaining'
  },
  /**
   * Message displayed when the number of words is over the configured maximum, `maxWords`. This message is
   * displayed visually and through assistive technologies. The component will replace the `${count}` placeholder
   * with the number of remaining characters.
   */
  wordsOverLimitText: {
    type: String,
    default: 'You have ${count} words too many'
  },
  /**
   * Message used instead of `wordsOverLimitText` when the text is one word over.
   */
  wordsOverLimitTextOne: {
    type: String,
    default: 'You have 1 word too many'
  },
  /**
   * Text to add before the textarea. If content is provided in the `before-input` slot, this prop will be ignored.
   */
  beforeInput: {
    type: String
  },
  /**
   * Text to add after the textarea. If content is provided in the `after-input` slot, this prop will be ignored.
   */
  afterInput: {
    type: String
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
        <!-- @slot The content of the label. If content is provided in this slot, the `label` prop will be ignored. -->
        <slot name="label" />
      </template>
      <template #hint>
        <!-- @slot The content of the hint. If content is provided in this slot, the `hint` prop will be ignored. -->
        <slot name="hint" />
      </template>
      <template #error-message>
        <!-- @slot The content of the error message. If content is provided in this slot, the `errorMessage` prop will be ignored. -->
        <slot name="error-message" />
      </template>
      <template #before-input>
        <!-- @slot Content to add before the textarea. If content is provided in this slot, the `beforeInput` prop will be ignored. -->
        <slot name="before-input">
          {{ beforeInput }}
        </slot>
      </template>
      <template #after-input>
        <!-- @slot Content to add after the textarea. If content is provided in this slot, the `afterInput` prop will be ignored. -->
        <slot name="after-input">
          {{ afterInput }}
        </slot>
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
