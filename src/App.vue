<script setup lang="ts">
import { computed, ref } from 'vue'
import GvButton from '@/components/govuk-vue/GvButton.vue'
import GvInput from '@/components/govuk-vue/GvInput.vue'
import GvBackLink from '@/components/govuk-vue/GvBackLink.vue'
import GvTextarea from '@/components/govuk-vue/GvTextarea.vue'
import GvInsetText from '@/components/govuk-vue/GvInsetText.vue'
import GvWarningText from '@/components/govuk-vue/GvWarningText.vue'
import GvPanel from '@/components/govuk-vue/GvPanel.vue'
import GvFieldset from '@/components/govuk-vue/GvFieldset.vue'
import GvRadios from '@/components/govuk-vue/GvRadios.vue'
import GvRadioItem from '@/components/govuk-vue/GvRadioItem.vue'
import GvDetails from '@/components/govuk-vue/GvDetails.vue'
import GvHeader from '@/components/govuk-vue/GvHeader.vue'
import GvHeaderNavigationItem from '@/components/govuk-vue/GvHeaderNavigationItem.vue'
import GvFooter from '@/components/govuk-vue/GvFooter.vue'
import GvFooterNavigation from '@/components/govuk-vue/GvFooterNavigation.vue'
import GvFooterNavigationItem from '@/components/govuk-vue/GvFooterNavigationItem.vue'
import GvFooterMeta from '@/components/govuk-vue/GvFooterMeta.vue'
import GvFooterMetaItem from '@/components/govuk-vue/GvFooterMetaItem.vue'
import GvFragment from '@/components/govuk-vue/util/GvFragment.vue'
import GvTag from '@/components/govuk-vue/GvTag.vue'
import GvPhaseBanner from '@/components/govuk-vue/GvPhaseBanner.vue'
import GvDateInput from '@/components/govuk-vue/GvDateInput.vue'
import GvCharacterCount from '@/components/govuk-vue/GvCharacterCount.vue'
import GvSelect from '@/components/govuk-vue/GvSelect.vue'
import GvSelectOption from '@/components/govuk-vue/GvSelectOption.vue'

const textInputData = ref('Hello world')
const textareaData = ref('The quick brown fox jumps over the lazy dog')
const characterCountData = ref('Test character count data')
const radiosData = ref('wales')
const detailsOpenState = ref(false)
const day = ref('30')
const month = ref('10')
const year = ref('2023')
const selectData = ref('recently-updated')
const selectDataBoolean = ref(true)

const selectOptions = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charles' }]
const selectDataObject = ref(selectOptions[1])

function handleStartClick() {
  alert('Start clicked!')
}

function handleBackClick() {
  alert('Back clicked!')
}
</script>

<template>
  <gv-header
    product-name="Test"
    homepage-url="foo"
    service-name="Test service name"
    service-url="bar"
    menu-button-text="Menu button text"
    menu-button-label="Menu button label"
    navigation-label="Test navigation label"
    navigation-id="main-navigation"
  >
    <gv-header-navigation-item href="x">Test navigation item 1</gv-header-navigation-item>
    <gv-header-navigation-item href="y" text="This should never be shown" :active="true"
      >Test navigation item 2</gv-header-navigation-item
    >
    <gv-header-navigation-item text="Test navigation item 3 without href" />
  </gv-header>
  <gv-phase-banner tag-text="Pre-alpha" text="This should never be shown">
    This library is still in early development
  </gv-phase-banner>
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
  <h2 class="govuk-heading-l">Character count</h2>
  <gv-character-count
    v-model="characterCountData"
    id="test-character-count-1"
    label-text="Test character count"
    hint-text="It has a threshold of 25% and a max length of 100 characters"
    :rows="10"
    :maxlength="100"
    :threshold="25"
  />
  {{ characterCountData }}

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

  <h2 class="govuk-heading-l">Radios</h2>
  <gv-radios
    name="myradios"
    fieldset-legend-text="Where do you live?"
    fieldset-legend-classes="govuk-fieldset__legend--m"
    error-message-text="Select where you live"
  >
    <template v-slot:hint
      >If you live in multiple countries, select where you spend most of your time</template
    >
    <gv-radio-item
      id="myradios"
      value="england"
      name="myradios"
      label-text="England"
      v-model="radiosData"
    />
    <gv-radio-item
      id="myradios-1"
      value="scotland"
      name="myradios"
      label-text="Scotland"
      v-model="radiosData"
      hint-text=""
    />
    <gv-radio-item
      id="myradios-2"
      value="wales"
      name="myradios"
      label-text="This should never be shown"
      v-model="radiosData"
    >
      Wales
    </gv-radio-item>
    <gv-radio-item
      id="myradios-3"
      value="northernireland"
      name="myradios"
      label-text="Northern Ireland"
      v-model="radiosData"
    />
    <gv-radio-item
      id="myradios-4"
      value="other"
      name="myradios"
      label-text="I am a British citizen living abroad"
      v-model="radiosData"
      divider="or"
    >
      <template v-slot:conditional>
        <gv-input id="test-conditional-text-input" label-text="Which country do you live in?" />
      </template>
    </gv-radio-item>
  </gv-radios>

  <h2 class="govuk-heading-l">Details</h2>
  <gv-details summary-text="Help with nationality " text="This should never be shown">
    We need to know your nationality so we can work out which elections you’re entitled to vote in.
    If you cannot provide your nationality, you’ll have to send copies of identity documents through
    the post.
  </gv-details>

  <gv-radios
    name="details-state"
    classes="govuk-radios--inline govuk-radios--small"
    fieldset-legend-text="Details state"
    fieldset-legend-classes="govuk-fieldset__legend--s"
  >
    <gv-radio-item
      id="details-state"
      :value="true"
      name="details-state"
      label-text="Open"
      v-model="detailsOpenState"
    />
    <gv-radio-item
      id="details-state-1"
      :value="false"
      name="details-state"
      label-text="Closed"
      v-model="detailsOpenState"
    />
  </gv-radios>

  <gv-details summary-text="This should never be shown" text="Prop text" :open="detailsOpenState">
    <template v-slot:summary>Slot summary</template>
  </gv-details>

  <h2 class="govuk-heading-l">Tags</h2>
  <p><gv-tag text="This should never be shown">Normal tag</gv-tag></p>
  <p><gv-tag text="Text prop tag" /></p>
  <p><gv-tag colour="grey">Grey</gv-tag></p>
  <p><gv-tag colour="green">Green</gv-tag></p>
  <p><gv-tag colour="turquoise">Turquoise</gv-tag></p>
  <p><gv-tag colour="blue">Blue</gv-tag></p>
  <p><gv-tag colour="purple">Purple</gv-tag></p>
  <p><gv-tag colour="pink">Pink</gv-tag></p>
  <p><gv-tag colour="red">Red</gv-tag></p>
  <p><gv-tag colour="orange">Orange</gv-tag></p>
  <p><gv-tag colour="yellow">Yellow</gv-tag></p>

  <h2 class="govuk-heading-l">Date input</h2>
  <gv-date-input
    id="test-date-input"
    fieldset-legend-text="Label text prop"
    hint-text="This should never be shown"
    v-model:day="day"
    v-model:month="month"
    v-model:year="year"
    :year-has-error="true"
    error-message-text="Enter a date before 2023"
  >
    <template v-slot:hint>The value of these fields is {{ day }}-{{ month }}-{{ year }}</template>
  </gv-date-input>

  <h2 class="govuk-heading-l">Select</h2>
  <gv-select
    id="test-select-1"
    label-text="This should never be shown"
    v-model="selectData"
    error-message-text="This is an error"
  >
    <template v-slot:label>Sort by</template>
    <template v-slot:hint>Select an option</template>
    <gv-select-option value="recently-published">Recently published</gv-select-option>
    <gv-select-option value="recently-updated">Recently updated</gv-select-option>
  </gv-select>

  {{ selectData }}

  <gv-select id="test-select-2" label-text="Boolean options" v-model="selectDataBoolean">
    <gv-select-option :value="true">Yes</gv-select-option>
    <gv-select-option :value="false">No</gv-select-option>
  </gv-select>

  {{ typeof selectDataBoolean }} {{ selectDataBoolean }}

  <gv-select id="test-select-3" label-text="Object options" v-model="selectDataObject">
    <gv-select-option
      v-for="option in selectOptions"
      :key="option.name"
      :value="option"
      :text="option.name"
    />
  </gv-select>

  {{ typeof selectDataObject }} {{ selectDataObject.name }}

  <gv-footer
    copyright-href="xyz"
    copyright-text="Test copyright text"
    content-licence-text="test content licence text"
  >
    <template v-slot:navigation>
      <gv-footer-navigation title="Section 1" width="one-third">
        <gv-footer-navigation-item href="abc" text="This should never be shown"
          >Link 1</gv-footer-navigation-item
        >
        <gv-footer-navigation-item href="def">Link 2</gv-footer-navigation-item>
      </gv-footer-navigation>
      <gv-footer-navigation title="Section 2" width="two-thirds" :columns="2">
        <gv-footer-navigation-item href="abc" text="This should never be shown"
          >Link 1</gv-footer-navigation-item
        >
        <gv-footer-navigation-item href="def">Link 2</gv-footer-navigation-item>
      </gv-footer-navigation>
    </template>
    <template v-slot:meta>
      <gv-footer-meta text="This text should never be shown">
        <template v-slot:items>
          <gv-footer-meta-item href="abc" text="This should never be shown">
            Link 1
          </gv-footer-meta-item>
          <gv-footer-meta-item href="def" text="Link 2" />
        </template>
        Built by Matt Eason
      </gv-footer-meta>
    </template>
  </gv-footer>
</template>

<style scoped></style>
