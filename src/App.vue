<script setup lang="ts">
import { ref } from 'vue'
import GvButton from '@/components/govuk-vue/GvButton.vue'
import GvInput from '@/components/govuk-vue/GvInput.vue'
import GvBackLink from '@/components/govuk-vue/GvBackLink.vue'
import GvTextarea from '@/components/govuk-vue/GvTextarea.vue'
import GvInsetText from '@/components/govuk-vue/GvInsetText.vue'
import GvWarningText from '@/components/govuk-vue/GvWarningText.vue'
import GvPanel from '@/components/govuk-vue/GvPanel.vue'
import GvFieldset from '@/components/govuk-vue/GvFieldset.vue'

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

  <h2 class="govuk-heading-l">Inset text</h2>
  <gv-inset-text
    text="It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application."
  />
  <gv-inset-text text="This should never be shown"> Slot inset text </gv-inset-text>

  <h2 class="govuk-heading-l">Warning text</h2>
  <gv-warning-text text="You can be fined up to £5,000 if you do not register. " />
  <gv-warning-text text="This should never be shown" icon-fallback-text="Attention!">
    Slot warning text
  </gv-warning-text>

  <h2 class="govuk-heading-l">Panel</h2>
  <gv-panel title-text="Application complete" text="This should never be shown">
    Your reference number<br /><strong>HDJ2123F</strong>
  </gv-panel>
  <gv-panel title-text="This should never be shown" text="Prop text">
    <template v-slot:title>Slot titl<sup>e</sup></template>
  </gv-panel>

  <h2 class="govuk-heading-l">Fieldset</h2>
  <gv-fieldset legend-text="Your name" legend-classes="govuk-fieldset__legend--m">
    <gv-input id="test-fieldset-text-input-1" label-text="First name" />
    <gv-input id="test-fieldset-text-input-2" label-text="Last name" />
  </gv-fieldset>

  <gv-fieldset
    legend-text="This should never be shown"
    legend-classes="govuk-fieldset__legend--xl"
    :legend-is-page-heading="true"
  >
    <template v-slot:legend>Slot legend</template>
    <gv-input id="test-fieldset-text-input-3" label-text="First name" />
    <gv-input id="test-fieldset-text-input-4" label-text="Last name" />
  </gv-fieldset>
</template>

<style scoped></style>
