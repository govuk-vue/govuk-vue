<script setup lang="ts">
import { computed, ref } from 'vue'
import GvButton from '@/components/govuk-vue/button/GvButton.vue'
import GvInput from '@/components/govuk-vue/input/GvInput.vue'
import GvBackLink from '@/components/govuk-vue/back-link/GvBackLink.vue'
import GvTextarea from '@/components/govuk-vue/textarea/GvTextarea.vue'
import GvInsetText from '@/components/govuk-vue/inset-text/GvInsetText.vue'
import GvWarningText from '@/components/govuk-vue/warning-text/GvWarningText.vue'
import GvPanel from '@/components/govuk-vue/panel/GvPanel.vue'
import GvFieldset from '@/components/govuk-vue/fieldset/GvFieldset.vue'
import GvRadios from '@/components/govuk-vue/radios/GvRadios.vue'
import GvRadioItem from '@/components/govuk-vue/radios/GvRadioItem.vue'
import GvDetails from '@/components/govuk-vue/details/GvDetails.vue'
import GvHeader from '@/components/govuk-vue/header/GvHeader.vue'
import GvHeaderNavigationItem from '@/components/govuk-vue/header/GvHeaderNavigationItem.vue'
import GvFooter from '@/components/govuk-vue/footer/GvFooter.vue'
import GvFooterNavigation from '@/components/govuk-vue/footer/GvFooterNavigation.vue'
import GvFooterNavigationItem from '@/components/govuk-vue/footer/GvFooterNavigationItem.vue'
import GvFooterMeta from '@/components/govuk-vue/footer/GvFooterMeta.vue'
import GvFooterMetaItem from '@/components/govuk-vue/footer/GvFooterMetaItem.vue'
import GvFragment from '@/components/util/GvFragment.vue'
import GvTag from '@/components/govuk-vue/tag/GvTag.vue'
import GvPhaseBanner from '@/components/govuk-vue/phase-banner/GvPhaseBanner.vue'
import GvDateInput from '@/components/govuk-vue/date-input/GvDateInput.vue'
import GvCharacterCount from '@/components/govuk-vue/character-count/GvCharacterCount.vue'
import GvSelect from '@/components/govuk-vue/select/GvSelect.vue'
import GvSelectOption from '@/components/govuk-vue/select/GvSelectOption.vue'
import GvAccordion from '@/components/govuk-vue/accordion/GvAccordion.vue'
import GvAccordionSection from '@/components/govuk-vue/accordion/GvAccordionSection.vue'
import GvBreadcrumbs from '@/components/govuk-vue/breadcrumbs/GvBreadcrumbs.vue'
import GvBreadcrumbItem from '@/components/govuk-vue/breadcrumbs/GvBreadcrumbItem.vue'
import GvSummaryList from '@/components/govuk-vue/summary-list/GvSummaryList.vue'
import GvSummaryCardAction from '@/components/govuk-vue/summary-list/GvSummaryCardAction.vue'
import GvSummaryListRow from '@/components/govuk-vue/summary-list/GvSummaryListRow.vue'
import GvSummaryListRowAction from '@/components/govuk-vue/summary-list/GvSummaryListRowAction.vue'
import GvNotificationBanner from '@/components/govuk-vue/notification-banner/GvNotificationBanner.vue'
import GvTabs from '@/components/govuk-vue/tabs/GvTabs'
import GvTab from '@/components/govuk-vue/tabs/GvTab.vue'
import GvPagination from '@/components/govuk-vue/pagination/GvPagination.vue'
import GvCheckbox from '@/components/govuk-vue/checkboxes/GvCheckbox.vue'
import GvCheckboxes from '@/components/govuk-vue/checkboxes/GvCheckboxes.vue'
import GvCookieBanner from '@/components/govuk-vue/cookie-banner/GvCookieBanner.vue'
import GvSkipLink from '@/components/govuk-vue/skip-link/GvSkipLink.vue'
import GvTable from '@/components/govuk-vue/table/GvTable.vue'
import GvTableHead from '@/components/govuk-vue/table/GvTableHead.vue'
import GvTableHeader from '@/components/govuk-vue/table/GvTableHeader.vue'
import GvTableRow from '@/components/govuk-vue/table/GvTableRow.vue'
import GvTableCell from '@/components/govuk-vue/table/GvTableCell.vue'
import GvTableBody from '@/components/govuk-vue/table/GvTableBody.vue'

const showOptionalAccordionSection = ref(true)
const textInputData = ref('Hello world')
const textareaData = ref('The quick brown fox jumps over the lazy dog')
const characterCountData = ref('Test character count data')
const showEngland = ref(false)
const radiosData = ref('wales')
const nestedRadiosData = ref(undefined)
const detailsOpenState = ref(false)
const day = ref('30')
const month = ref('10')
const year = ref('2023')
const selectData = ref('recently-updated')
const selectDataBoolean = ref(true)

const selectOptions = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charles' }]
const selectDataObject = ref(selectOptions[1])

const showCardActions = ref(false)
const showChangeLink = ref(false)

const numberOfTabs = ref(4)
const maxPeriod = 'week'

const lastTabSelected = ref(false)
const currentPage = ref(1)

function handleStartClick() {
  alert('Start clicked!')
}

function handleBackClick() {
  alert('Back clicked!')
}

function handleBreadcrumbClick() {
  alert('Breadcrumb clicked!')
}

function handleCardDeleteClick() {
  alert('Delete clicked!')
}

function handlePreviousClicked() {
  alert('Previous clicked!')
}

function handleNextClicked() {
  alert('Next clicked!')
}

function acceptCookies() {
  alert('Cookies accepted')
}

function rejectCookies() {
  alert('Cookies rejected')
}

function viewCookies(e: MouseEvent) {
  alert('View cookies clicked')
  e.preventDefault()
}

const wasteTypes = ref([])
const contactMethods = ref([])
const email = ref({ type: 'email', address: '' })
const phone = ref({ type: 'phone', number: '' })
const text = ref({ type: 'text', number: '' })
const nationality = ref([])
const termsAccepted = ref(false)
</script>

<template>
  <gv-cookie-banner
    heading-text="Cookies?"
    cookie-information-text="GOV.UK Vue doesn't use cookies, but here's a cookie banner anyway."
    accept-button-text="Accept some cookies"
    reject-button-text="Reject some cookies"
    view-cookies-link-text="View cookies"
    view-cookies-link-href="/cookies"
    @acceptClicked="acceptCookies"
    @rejectClicked="rejectCookies"
    @viewCookiesClicked="viewCookies"
  >
    <template #accepted><p class="govuk-body">You've accepted cookies</p></template>
    <template #rejected><p class="govuk-body">You've rejected cookies</p></template>
  </gv-cookie-banner>
  <gv-skip-link href="#skiplinktarget">Skip to the skip link target</gv-skip-link>
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

  <gv-breadcrumbs>
    <gv-breadcrumb-item href="some-page" text="This should never be shown">Home</gv-breadcrumb-item>
    <gv-breadcrumb-item text="Click handler" @click="handleBreadcrumbClick" some-attr="foo" />
    <gv-breadcrumb-item>This page</gv-breadcrumb-item>
  </gv-breadcrumbs>

  <gv-breadcrumbs :collapse-on-mobile="true">
    <gv-breadcrumb-item href="#">One</gv-breadcrumb-item>
    <gv-breadcrumb-item href="#">Two</gv-breadcrumb-item>
    <gv-breadcrumb-item href="#">Three</gv-breadcrumb-item>
    <gv-breadcrumb-item href="#">Four</gv-breadcrumb-item>
  </gv-breadcrumbs>

  <gv-notification-banner text="This is a normal banner"></gv-notification-banner>
  <gv-notification-banner type="success" title-id="success-banner" :disable-auto-focus="true">
    <p class="govuk-notification-banner__heading">This is the h3</p>
    <p class="govuk-body">This is the paragraph</p>
  </gv-notification-banner>
  <gv-notification-banner
    title-text="Some information"
    title-id="banner-3"
    :title-heading-level="5"
    text="This is a normal banner"
  ></gv-notification-banner>

  <h1 class="govuk-heading-xl">Tests</h1>

  <h2 class="govuk-heading-l">Back link</h2>
  <div><gv-back-link /></div>
  <div>
    <gv-back-link @click.prevent="handleBackClick" text="This should never be shown">
      Back with click handler
    </gv-back-link>
  </div>

  <h2 class="govuk-heading-l">Tabs</h2>
  <gv-button @click="lastTabSelected = !lastTabSelected">Toggle last tab auto-selected</gv-button
  ><br />
  {{ lastTabSelected }}
  <input type="range" v-model.number="numberOfTabs" min="0" max="10" />
  {{ numberOfTabs }}
  <gv-tabs title="hello tabs!">
    <gv-tab v-for="i in numberOfTabs" :label="`Tab ${i}`" :key="i">
      Content of tab {{ i }} {{ textInputData }}
    </gv-tab>
    <gv-tab :label="textInputData" key="end-tab" :selected="lastTabSelected" :id="textInputData">
      End tab
    </gv-tab>
  </gv-tabs>

  <gv-tabs title="Cases opened">
    <gv-tab label="Past day">
      <gv-inset-text>No cases opened in the past day</gv-inset-text>
    </gv-tab>
    <gv-tab label="Past day">
      <template #label> Past {{ maxPeriod }}</template>
      <gv-inset-text>No cases opened in the past {{ maxPeriod }}</gv-inset-text>
    </gv-tab>
  </gv-tabs>

  <h2 class="govuk-heading-l">Accordion</h2>
  <gv-radios
    name="show-optional-accordion-section"
    classes="govuk-radios--inline govuk-radios--small"
    fieldset-legend-text="Show optional acccordion section?"
    fieldset-legend-classes="govuk-fieldset__legend--s"
    v-model="showOptionalAccordionSection"
  >
    <gv-radio-item id="show-optional-accordion-section" :value="true" label-text="Yes" />
    <gv-radio-item id="show-optional-accordion-section-1" :value="false" label-text="No" />
  </gv-radios>
  <gv-accordion id="test-accordion">
    <gv-accordion-section
      v-if="showOptionalAccordionSection"
      heading-text="My accordion section 0 (optional)"
    >
      <template v-slot:summary>
        above inset texts {{ textInputData }}
        <div><span>Some div</span></div>
        <gv-inset-text>Inset text</gv-inset-text>
      </template>
      Some text content for the accordion
    </gv-accordion-section>
    <gv-accordion-section
      heading-text="My accordion section 1"
      content-text="My content 1"
      id="manual-section-id"
      >foo</gv-accordion-section
    >
    <gv-accordion-section heading-text="My accordion section 2">
      <gv-warning-text>My content 2</gv-warning-text>
    </gv-accordion-section>
  </gv-accordion>

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

  <h2 class="govuk-heading-l" id="skiplinktarget">Skip link target</h2>
  <p class="govuk-body">Skip link should take you here</p>
  <h2 class="govuk-heading-l">Checkboxes</h2>
  <gv-checkboxes
    v-model="wasteTypes"
    fieldset-legend-text="Which types of waste do you transport?"
    :fieldset-legend-is-page-heading="true"
    fieldset-legend-classes="govuk-fieldset__legend--l"
  >
    <template #hint>Select all that apply.</template>
    <gv-checkbox label-text="Waste from animal carcasses" value="animal" />
    <gv-checkbox label-text="Waste from mines or quarries" value="mines" />
    <gv-checkbox label-text="Farm or agricultural waste" value="farm" />
  </gv-checkboxes>
  {{ wasteTypes }}

  <gv-checkboxes
    v-model="contactMethods"
    fieldset-legend-text="
How would you like to be contacted?
"
  >
    <template #hint>Select all the options that are relevant to you.</template>
    <gv-checkbox label-text="Email" :value="email">
      <template #conditional>
        <gv-input label-text="Email address" v-model="email.address" id="email" />
      </template>
    </gv-checkbox>
    <gv-checkbox :value="phone">
      <template #label>Phone</template>
      <template #hint>UK or international</template>
      <template #conditional>
        <gv-input label-text="Phone number" v-model="phone.number" id="phone" />
      </template>
    </gv-checkbox>
    <gv-checkbox label-text="Text message" :value="text">
      <template #conditional>
        <gv-input label-text="Mobile number" v-model="text.number" id="text" /> </template
    ></gv-checkbox>
  </gv-checkboxes>
  {{ contactMethods }}

  <gv-checkboxes
    v-model="nationality"
    fieldset-legend-text="What is your nationality?"
    class="govuk-checkboxes--small"
    error-message-text="Select your nationality"
  >
    <template #hint>
      If you have dual nationality, select all options that are relevant to you.
    </template>
    <gv-checkbox
      label-text="British"
      value="british"
      hint-text="including English, Scottish, Welsh and Northern Irish"
    />
    <gv-checkbox label-text="Irish" value="irish" />
    <gv-checkbox label-text="Neither" value="none" divider="or" :exclusive="true" />
  </gv-checkboxes>
  {{ nationality }}

  <gv-checkboxes>
    <gv-checkbox label-text="I accept the terms and conditions" v-model="termsAccepted" />
  </gv-checkboxes>
  {{ termsAccepted }}

  <h2 class="govuk-heading-l">Radios</h2>
  <gv-radios
    name="show-england"
    classes="govuk-radios--inline govuk-radios--small"
    fieldset-legend-text="Show England?"
    fieldset-legend-classes="govuk-fieldset__legend--s"
    v-model="showEngland"
  >
    <gv-radio-item :value="true" label-text="Yes" />
    <gv-radio-item :value="false" label-text="No" />
  </gv-radios>

  <gv-radios
    fieldset-legend-text="Where do you live?"
    fieldset-legend-classes="govuk-fieldset__legend--m"
    error-message-text="Select where you live"
    v-model="radiosData"
  >
    <template v-slot:hint
      >If you live in multiple countries, select where you spend most of your time</template
    >
    <gv-radio-item v-if="showEngland" value="england" label-text="England">
      <template v-slot:conditional>
        <gv-radios
          name="conditionalradios"
          fieldset-legend-text="Are you sure?"
          v-model="nestedRadiosData"
        >
          <gv-radio-item :value="true">Yes</gv-radio-item>
          <gv-radio-item :value="false">No</gv-radio-item>
        </gv-radios>
      </template>
    </gv-radio-item>
    <gv-radio-item value="scotland" label-text="Scotland" />
    <gv-radio-item value="wales" label-text="This should never be shown"> Wales </gv-radio-item>
    <gv-radio-item value="northernireland" label-text="Northern Ireland" />
    <gv-radio-item value="other" label-text="I am a British citizen living abroad" divider="or">
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

  /

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

  <h2 class="govuk-heading-l">Summary</h2>
  <gv-radios
    classes="govuk-radios--inline govuk-radios--small"
    fieldset-legend-text="Show card actions?"
    fieldset-legend-classes="govuk-fieldset__legend--s"
    v-model="showCardActions"
  >
    <gv-radio-item :value="true" label-text="Yes" />
    <gv-radio-item :value="false" label-text="No" />
  </gv-radios>
  <gv-radios
    classes="govuk-radios--inline govuk-radios--small"
    fieldset-legend-text="Show change link?"
    fieldset-legend-classes="govuk-fieldset__legend--s"
    v-model="showChangeLink"
  >
    <gv-radio-item :value="true" label-text="Yes" />
    <gv-radio-item :value="false" label-text="No" />
  </gv-radios>

  <h3 class="govuk-heading-m">Card</h3>
  <gv-summary-list card-title-text="My summary list">
    <template v-slot:card-actions v-if="showCardActions">
      <gv-summary-card-action href="abc">Edit</gv-summary-card-action>
      <gv-summary-card-action
        visually-hidden-text=" this item"
        @click.prevent="handleCardDeleteClick"
        >Delete</gv-summary-card-action
      >
    </template>
    <gv-summary-list-row key-text="Name" value-text="Matt Eason">
      <template v-slot:actions>
        <gv-summary-list-row-action
          v-if="showChangeLink"
          text="A"
          visually-hidden-text="developer name"
          href="/change"
        />
      </template>
    </gv-summary-list-row>
    <gv-summary-list-row key-text="Project" value-text="GOV.UK Vue" />
    <gv-summary-list-row key-text="Description" W>
      <template v-slot:value>
        <p class="govuk-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut tellus at nibh fringilla
          faucibus. Cras quis diam tincidunt, sodales felis ac, auctor massa. Aliquam lacinia
          eleifend felis at pulvinar. Sed gravida tincidunt eleifend. Suspendisse feugiat, orci ac
          rhoncus ultricies, felis nulla congue mi, quis congue ex ligula at quam. Integer ultrices
          turpis est, vitae interdum tellus consectetur non. Vestibulum a sem fermentum, varius
          felis ac, tincidunt nunc. Morbi vestibulum ligula quam, sit amet mattis lacus sagittis
          facilisis. Curabitur pharetra vehicula mollis. Mauris commodo dignissim augue ac
          consequat. Proin ut lacus pulvinar, porttitor risus consectetur, mollis purus. Cras vitae
          lorem semper, viverra est a, iaculis libero.
        </p>

        <p class="govuk-body">
          Ut gravida facilisis vestibulum. Maecenas ac velit ipsum. Vivamus tempor leo magna, quis
          molestie tellus vehicula ut. Aenean non arcu nec libero fermentum gravida et vel arcu.
          Aenean a nisi eu nisi ornare vehicula. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Pellentesque enim est, gravida ullamcorper ex
          vitae, dapibus condimentum justo. In id mollis tortor. Cras congue commodo sodales.
        </p>
      </template>
      <template v-slot:actions>
        <gv-summary-list-row-action
          v-if="showChangeLink"
          text="B"
          visually-hidden-text="description"
          href="/change"
        />
        <gv-summary-list-row-action text="C" visually-hidden-text="description" href="/remove" />
      </template>
    </gv-summary-list-row>
  </gv-summary-list>

  <h3 class="govuk-heading-m">Normal</h3>
  <gv-summary-list>
    <template v-slot:card-actions>
      <template v-if="showCardActions">
        <gv-summary-card-action href="abc">Edit</gv-summary-card-action>
        <gv-summary-card-action
          visually-hidden-text=" this item"
          @click.prevent="handleCardDeleteClick"
          >Delete</gv-summary-card-action
        >
      </template>
    </template>
    <gv-summary-list-row key-text="Name" value-text="Matt Eason">
      <template v-slot:actions v-if="showChangeLink">
        <gv-summary-list-row-action
          text="This should never be shown"
          visually-hidden-text="developer name"
          href="/change"
          >Change</gv-summary-list-row-action
        >
      </template>
    </gv-summary-list-row>
    <gv-summary-list-row key-text="Project" value-text="GOV.UK Vue" />
    <gv-summary-list-row key-text="Description">
      <template v-slot:value>
        <p class="govuk-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut tellus at nibh fringilla
          faucibus. Cras quis diam tincidunt, sodales felis ac, auctor massa. Aliquam lacinia
          eleifend felis at pulvinar. Sed gravida tincidunt eleifend. Suspendisse feugiat, orci ac
          rhoncus ultricies, felis nulla congue mi, quis congue ex ligula at quam. Integer ultrices
          turpis est, vitae interdum tellus consectetur non. Vestibulum a sem fermentum, varius
          felis ac, tincidunt nunc. Morbi vestibulum ligula quam, sit amet mattis lacus sagittis
          facilisis. Curabitur pharetra vehicula mollis. Mauris commodo dignissim augue ac
          consequat. Proin ut lacus pulvinar, porttitor risus consectetur, mollis purus. Cras vitae
          lorem semper, viverra est a, iaculis libero.
        </p>

        <p class="govuk-body">
          Ut gravida facilisis vestibulum. Maecenas ac velit ipsum. Vivamus tempor leo magna, quis
          molestie tellus vehicula ut. Aenean non arcu nec libero fermentum gravida et vel arcu.
          Aenean a nisi eu nisi ornare vehicula. Class aptent taciti sociosqu ad litora torquent per
          conubia nostra, per inceptos himenaeos. Pellentesque enim est, gravida ullamcorper ex
          vitae, dapibus condimentum justo. In id mollis tortor. Cras congue commodo sodales.
        </p>
      </template>
      <template v-slot:actions>
        <gv-summary-list-row-action
          v-if="showChangeLink"
          text="This should never be shown"
          visually-hidden-text="description"
          href="/change"
          >Change</gv-summary-list-row-action
        >
        <gv-summary-list-row-action
          text="Remove"
          visually-hidden-text="description"
          href="/remove"
        />
      </template>
    </gv-summary-list-row>
  </gv-summary-list>

  <h3 class="govuk-heading-m">Pagination</h3>
  Current page: {{ currentPage }}
  <gv-pagination
    v-model="currentPage"
    :total-pages="20"
    :skip-pages-threshold="5"
    :before-after-count="2"
  />
  <gv-pagination
    previous-label-text="Applying for a provisional lorry or bus licence"
    next-label-text="Driver CPC part 1 test: theory"
    @previousClicked="handlePreviousClicked"
    @nextClicked="handleNextClicked"
  />

  <h3 class="govuk-heading-m">Table</h3>
  <gv-table caption="Dates and amounts">
    <gv-table-head>
      <gv-table-row>
        <gv-table-header>Date</gv-table-header>
        <gv-table-header>Amount</gv-table-header>
      </gv-table-row>
    </gv-table-head>
    <gv-table-body>
      <gv-table-row>
        <gv-table-header scope="row">First 6 weeks</gv-table-header>
        <gv-table-cell>£109.80 per week</gv-table-cell>
      </gv-table-row>
      <gv-table-row>
        <gv-table-header scope="row">Next 33 weeks</gv-table-header>
        <gv-table-cell>£109.80 per week</gv-table-cell>
      </gv-table-row>
      <gv-table-row>
        <gv-table-header scope="row">Total estimated pay</gv-table-header>
        <gv-table-cell>£4,282.20</gv-table-cell>
      </gv-table-row>
    </gv-table-body>
  </gv-table>

  <gv-table caption="Months and rates">
    <gv-table-head>
      <gv-table-row>
        <gv-table-header>Month you apply</gv-table-header>
        <gv-table-header format="numeric">Rate for bicycles</gv-table-header>
        <gv-table-header format="numeric">Rate for vehicles</gv-table-header>
      </gv-table-row>
    </gv-table-head>
    <gv-table-body>
      <gv-table-row>
        <gv-table-header scope="row">January</gv-table-header>
        <gv-table-cell format="numeric">£85</gv-table-cell>
        <gv-table-cell format="numeric">£95</gv-table-cell>
      </gv-table-row>
      <gv-table-row>
        <gv-table-header scope="row">February</gv-table-header>
        <gv-table-cell format="numeric">£75</gv-table-cell>
        <gv-table-cell format="numeric">£55</gv-table-cell>
      </gv-table-row>
      <gv-table-row>
        <gv-table-header scope="row">March</gv-table-header>
        <gv-table-cell format="numeric">£165</gv-table-cell>
        <gv-table-cell format="numeric">£125</gv-table-cell>
      </gv-table-row>
    </gv-table-body>
  </gv-table>

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
