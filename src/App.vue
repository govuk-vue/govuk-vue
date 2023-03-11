<script setup lang="ts">
import { ref } from 'vue'
import GvButton from '@/components/govuk-vue/GvButton.vue'
import GvInput from '@/components/govuk-vue/GvInput.vue'
import GvBackLink from '@/components/govuk-vue/GvBackLink.vue'
import GvTextarea from '@/components/govuk-vue/GvTextarea.vue'

const textInputData = ref('Hello world')
const textareaData = ref('The quick brown fox jumps over the lazy dog')

function handleStartClick() {
  alert('Start clicked!')
}

function handleBackClick() {
  alert('Back clicked!')
}
</script>

<template>
  <h1 class="govuk-heading-xl">Tests</h1>
  <h2 class="govuk-heading-l">Back link</h2>
  <div><gv-back-link /></div>
  <div>
    <gv-back-link @click.prevent="handleBackClick" text="This should never be shown">
      Back with click handler
    </gv-back-link>
  </div>
  <h2 class="govuk-heading-l">Buttons</h2>
  <div><gv-button id="myButton" text="Text content" /></div>
  <div><gv-button>Slot content</gv-button></div>
  <div><gv-button element="a">Link</gv-button></div>
  <div><gv-button class="govuk-button--warning">Warning</gv-button></div>
  <div><gv-button :disabled="true">Disabled</gv-button></div>
  <div><gv-button :is-start-button="true" @click="handleStartClick">Start now</gv-button></div>
  <div><gv-button element="input" text="Input element" /></div>

  <h2 class="govuk-heading-l">Text input</h2>
  <div>
    <gv-input id="test-text-input-1" v-model="textInputData" label-text="Test input"></gv-input>
    <gv-input
      id="test-text-input-2"
      labelText="Price, in pounds"
      prefix-text="£"
      classes="govuk-input--width-4"
    ></gv-input>
    <gv-input
      id="test-text-input-3"
      labelText="Distance, in kilometres"
      suffix-text="km"
      hint-text="Rounded to the nearest kilometre"
      classes="govuk-input--width-2"
      error-message-text="Enter the distance in kilometres"
    ></gv-input>
    <gv-input
      id="test-text-input-4"
      v-model="textInputData"
      autocomplete="given-name"
      label-text="This should never be shown"
      hint-text="This should never be shown"
      error-message-text="This should never be shown"
    >
      <template v-slot:label>Slot label</template>
      <template v-slot:hint>Slot hint</template>
      <template v-slot:suffix>Slot suffix</template>
      <template v-slot:error-message>Slot error message</template>
    </gv-input>
    {{ textInputData }}
    <gv-input
      id="test-text-input-5"
      label-text="Test input with page heading"
      label-classes="govuk-label--l"
      :label-is-page-heading="true"
    ></gv-input>
  </div>

  <h2 class="govuk-heading-l">Textarea</h2>
  <gv-textarea v-model="textareaData" id="test-textarea-1" label-text="Test textarea" :rows="3" />
  {{ textareaData }}
  <gv-textarea
    id="test-textarea-2"
    :rows="3"
    label-text="This should never be shown"
    hint-text="This should never be shown"
    error-message-text="This should never be shown"
  >
    <template v-slot:label>Slot label</template>
    <template v-slot:hint>Slot hint</template>
    <template v-slot:suffix>Slot suffix</template>
    <template v-slot:error-message>Slot error message</template>
  </gv-textarea>
</template>

<style scoped></style>
