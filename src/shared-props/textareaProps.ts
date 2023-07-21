export const textareaProps = {
  modelValue: String,
  id: {
    type: String,
    required: true
  },
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
  label: String,
  labelIsPageHeading: {
    type: Boolean,
    default: false
  },
  labelClasses: String,
  //hint props
  hint: String,
  hintClasses: {
    type: String,
    default: ''
  },
  //error message props
  errorMessage: String,
  errorMessageClasses: {
    type: String,
    default: ''
  },
  errorMessageVisuallyHiddenText: String
}
