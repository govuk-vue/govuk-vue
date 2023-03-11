<script setup lang="ts">
import GvButton from '@/components/govuk-vue/GvButton.vue'
import GvInput from '@/components/govuk-vue/GvInput.vue'
import { ref } from 'vue'

const inputData = ref('Hello world')

function handleStartClick() {
  alert('Start clicked!')
}
</script>

<template>
  <h1>Tests</h1>
  <h2>Buttons</h2>
  <div><gv-button id="myButton" text="Text content" /></div>
  <div><gv-button>Slot content</gv-button></div>
  <div><gv-button element="a">Link</gv-button></div>
  <div><gv-button class="govuk-button--warning">Warning</gv-button></div>
  <div><gv-button :disabled="true">Disabled</gv-button></div>
  <div><gv-button :is-start-button="true" @click="handleStartClick">Start now</gv-button></div>
  <div><gv-button element="input" text="Input element" /></div>

  <h2>Text input</h2>
  <div>
    <gv-input id="myInput" v-model="inputData" autocomplete="given-name" />
    {{ inputData }}
  </div>
</template>

<style scoped></style>
