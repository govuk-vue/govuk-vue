<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import GvLabel from '@/components/govuk-vue/label/GvLabel.vue'
import GvHint from '@/components/govuk-vue/hint/GvHint.vue'
import hasSlot from '@/composables/useHasSlot'
import { computed, normalizeClass, onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import GvErrorMessage from '@/components/govuk-vue/error-message/GvErrorMessage.vue'
import { createUid } from '@/util/createUid'

const props = defineProps({
  /**
   * Will be set to a `FileList` containing the selected files when the user changes their selection.
   * In most cases you should use `v-model` instead of setting this prop directly.
   */
  modelValue: null,
  /**
   * The ID of the input. If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * The name of the input, which is submitted with the form data.
   */
  name: String,
  /**
   * One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive
   * information for screenreader users.
   */
  describedBy: String,
  /**
   * A comma-separated list of filetypes to accept. See [the accept attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept).
   */
  accept: String,
  /**
   * If `true`, file input will be disabled
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * If `true`, the user will be allowed to select multiple files. This won't stop users from dragging and dropping multiple files, so you should still validate the length of your `v-model` if you're only expecting one file.
   */
  multiple: {
    type: Boolean,
    default: false
  },
  //Form group props
  /**
   * Classes to add to the form group. You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  formGroupClass: {
    type: [String, Array, Object],
    default: ''
  },
  //Label props
  /**
   * Text to use within the label. If content is provided in the `label` slot, this prop will be ignored.
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
  /**
   * Text to add before the input. If content is provided in the `before-input` slot, this prop will be ignored.
   */
  beforeInput: {
    type: String
  },
  /**
   * Text to add after the input. If content is provided in the `after-input` slot, this prop will be ignored.
   */
  afterInput: {
    type: String
  },
  /**
   * The text of the button that opens the file picker. If content is provided in the `choose-files-button` slot, this prop will be ignored.
   */
  chooseFilesButtonText: {
    type: String,
    default: 'Choose file'
  },
  /**
   * The text informing users they can drop files. If content is provided in the `drop-instruction` slot, this prop will be ignored.
   */
  dropInstructionText: {
    type: String,
    default: 'or drop file'
  },
  /**
   * The text displayed when multiple files have been chosen by the user. The component will replace the ${count} placeholder with the number of files selected. If content is provided in the `multiple-files-chosen` slot, this prop will be ignored.
   */
  multipleFilesChosenText: {
    type: String,
    default: '${count} files chosen'
  },
  /**
   * The text displayed when no file has been chosen by the user. If content is provided in the `no-file-chosen` slot, this prop will be ignored.
   */
  noFileChosenText: {
    type: String,
    default: 'No file chosen'
  },
  /**
   * The text announced by assistive technology when user drags files and enters the drop zone.
   */
  enteredDropZoneText: {
    type: String,
    default: 'Entered drop zone'
  },
  /**
   * The text announced by assistive technology when user drags files and leaves the drop zone without dropping.
   */
  leftDropZoneText: {
    type: String,
    default: 'Left drop zone'
  }
})
const emit = defineEmits(['update:modelValue'])

const announcement = ref('')
const isDragging = ref(false)
let enteredAnotherElement = false

const dropzoneElement: Ref<HTMLDivElement | null> = ref(null)
const fileInputElement: Ref<HTMLInputElement | null> = ref(null)

const computedId = computed(() => {
  return props.id ? props.id : createUid('gv-file-upload')
})

const labelId = computed(() => {
  return `${computedId.value}-label`
})

const hasHint = computed(() => {
  return props.hint || hasSlot('hint')
})

const hintId = computed(() => {
  return `${computedId.value}-hint`
})

const hasErrorMessage = computed(() => {
  return props.errorMessage || hasSlot('error-message')
})

const errorMessageId = computed(() => {
  return `${computedId.value}-error`
})

const computedDescribedBy = computed(() => {
  const value = `${props.describedBy ? props.describedBy : ''} ${
    hasHint.value ? hintId.value : ''
  } ${hasErrorMessage.value ? errorMessageId.value : ''}`.trim()
  return value.length > 0 ? value : undefined
})

const inputId = computed(() => {
  return `${computedId.value}-input`
})

const commaId = computed(() => {
  return `${computedId.value}-comma`
})

const computedButtonClass = computed(() => {
  return {
    'govuk-file-upload-button--empty': !props.modelValue || props.modelValue.length === 0,
    'govuk-file-upload-button--dragging': isDragging.value
  }
})

const computedMultipleFilesChosenText = computed(() => {
  return props.multipleFilesChosenText.replace(/\$\{count}/g, props.modelValue.length)
})

const selectedFilename = computed(() => {
  if (props.modelValue && props.modelValue.length === 1) {
    return props.modelValue[0].name
  }
  return null
})

const hasOneFile = computed(() => {
  return props.modelValue.length === 1
})

function handleButtonClick() {
  if (fileInputElement.value) {
    fileInputElement.value.click()
  }
}

function handleDrop(event: DragEvent) {
  if (fileInputElement.value && event.dataTransfer && isContainingFiles(event.dataTransfer)) {
    fileInputElement.value.files = event.dataTransfer.files
    fileInputElement.value.dispatchEvent(new CustomEvent('change'))
    isDragging.value = false
  }
}

function handleChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).files)
}

// If the modelValue prop changes to null out the file list, update the value of the input
watch(
  () => props.modelValue,
  (newModelValue) => {
    if (fileInputElement.value && (newModelValue === null || newModelValue.length === 0)) {
      fileInputElement.value.value = ''
    }
  }
)

const normalizedFormGroupClass = computed(() => {
  return normalizeClass(props.formGroupClass)
})

// Bind drag and drop events when component is mounted
onMounted(() => {
  document.addEventListener('dragenter', updateDropzoneVisibility)
  document.addEventListener('dragenter', () => {
    enteredAnotherElement = true
  })
  document.addEventListener('dragleave', () => {
    if (!enteredAnotherElement && !props.disabled) {
      isDragging.value = false
      announcement.value = props.leftDropZoneText
    }

    enteredAnotherElement = false
  })
})

// Taken from https://github.com/alphagov/govuk-frontend/blob/1bc5abe1e78a48f3672e740b65579084d32431bd/packages/govuk-frontend/src/govuk/components/file-upload/file-upload.mjs#L424C1-L434C2
function isContainingFiles(dataTransfer: DataTransfer) {
  // Safari sometimes does not provide info about types :'(
  // In which case best not to assume anything and try to set the files
  const hasNoTypesInfo = dataTransfer.types.length === 0

  // When dragging images, there's a mix of mime types + Files
  // which we can't assign to the native input
  const isDraggingFiles = dataTransfer.types.some((type) => type === 'Files')

  return hasNoTypesInfo || isDraggingFiles
}

// Based on https://github.com/alphagov/govuk-frontend/blob/1bc5abe1e78a48f3672e740b65579084d32431bd/packages/govuk-frontend/src/govuk/components/file-upload/file-upload.mjs#L222
function updateDropzoneVisibility(event: DragEvent) {
  console.log('udz')
  if (props.disabled) return

  if (event.target instanceof Node) {
    console.log(1)
    if (dropzoneElement.value && dropzoneElement.value.contains(event.target)) {
      console.log(2)
      if (event.dataTransfer && isContainingFiles(event.dataTransfer)) {
        console.log(3)
        isDragging.value = true
        announcement.value = props.enteredDropZoneText
      }
    } else {
      console.log(4)
      isDragging.value = false
      announcement.value = props.leftDropZoneText
    }
  }
}
</script>

<template>
  <div
    :class="`govuk-form-group ${normalizedFormGroupClass} ${
      hasErrorMessage ? 'govuk-form-group--error' : ''
    }`"
  >
    <gv-label
      :id="labelId"
      :for-id="computedId"
      :text="label"
      :class="labelClass"
      :is-page-heading="labelIsPageHeading"
    >
      <!-- @slot The content of the label. If content is provided in this slot, the `label` prop will be ignored. -->
      <slot name="label" />
    </gv-label>
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
    <!-- @slot Content to add before the input. If content is provided in this slot, the `beforeInput` prop will be ignored. -->
    <slot name="before-input">
      {{ beforeInput }}
    </slot>
    <div
      ref="dropzoneElement"
      class="govuk-drop-zone"
      :class="{ 'govuk-drop-zone--disabled': disabled }"
    >
      <button
        :id="computedId"
        class="govuk-file-upload-button"
        :class="computedButtonClass"
        type="button"
        :aria-labelledby="`${labelId} ${commaId} ${computedId}`"
        :aria-describedby="computedDescribedBy"
        @click="handleButtonClick"
        @dragover.prevent=""
        @drop.prevent="handleDrop"
        :disabled="disabled"
      >
        <span class="govuk-body govuk-file-upload-button__status" aria-live="polite">
          <!-- @slot The text displayed when no file has been chosen by the user. If content is provided in this slot, the `noFileChosenText` prop will be ignored. -->
          <slot v-if="!modelValue || modelValue.length === 0" name="no-file-chosen">{{
            noFileChosenText
          }}</slot>
          <template v-else-if="hasOneFile">{{ selectedFilename }}</template>
          <template v-else>{{ computedMultipleFilesChosenText }}</template>
        </span>
        <span class="govuk-visually-hidden" :id="commaId">,</span>
        <span class="govuk-file-upload-button__pseudo-button-container">
          <span class="govuk-button govuk-button--secondary govuk-file-upload-button__pseudo-button"
            >Choose file</span
          >
          <span class="govuk-body govuk-file-upload-button__instruction">
            <!-- @slot The text informing users they can drop files. If content is provided in this slot, the `dropInstructionText` prop will be ignored. -->
            <slot name="drop-instruction">{{ dropInstructionText }}</slot>
          </span>
        </span>
      </button>
      <input
        type="file"
        :id="inputId"
        :name="name"
        class="govuk-file-upload"
        :accept="accept"
        :multiple="multiple"
        @change="handleChange($event)"
        ref="fileInputElement"
        v-bind="$attrs"
        hidden="true"
        tabindex="-1"
        aria-hidden="true"
        :disabled="disabled"
      />
    </div>
    <!-- @slot Content to add after the input. If content is provided in this slot, the `afterInput` prop will be ignored. -->
    <slot name="after-input">
      {{ afterInput }}
    </slot>
    <span class="govuk-file-upload-announcements govuk-visually-hidden" aria-live="assertive">
      {{ announcement }}
    </span>
  </div>
</template>
