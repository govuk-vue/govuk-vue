<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  ref,
  Ref,
  useSlots,
  watch
} from 'vue'
import {
  TabsRegisterTabFunctionInjectionKey,
  TabsSelectNextTabFunctionInjectionKey,
  TabsSelectPreviousTabFunctionInjectionKey,
  TabsSelectTabFunctionInjectionKey,
  TabsUnregisterTabFunctionInjectionKey
} from '@/components/govuk-vue/tabs/TabsInjectionKeys'
import type { Tab } from '@/components/govuk-vue/tabs/Tab'
import { useIsDesktop } from '@/composables/useIsDesktop'
import { createUid } from '@/util/createUid'

const props = defineProps({
  /**
   * The text label of the tab. If content is provided in the `label` slot, this prop will be ignored.
   */
  label: String,
  /**
   * The ID for this tab.
   *
   * If you don't provide an ID, one will be generated automatically.
   */
  id: String,
  /**
   * Whether this tab should default to selected. If no tab in the tab group is set to `:selected="true"`,
   * the first tab in the group will be selected.
   */
  selected: {
    type: Boolean,
    default: false
  }
})

const anchorElement: Ref<HTMLAnchorElement | null> = ref(null)

const isDesktop = useIsDesktop()

const tab: Ref<Tab> = ref({
  id: generateId(),
  selected: props.selected,
  defaultSlot: useSlots()['default'],
  key: getCurrentInstance()?.vnode.key,
  focusTrigger: 0
})

const registerTab = inject(TabsRegisterTabFunctionInjectionKey, () => {})
const unregisterTab = inject(TabsUnregisterTabFunctionInjectionKey, () => {})
const selectTab = inject(TabsSelectTabFunctionInjectionKey, () => {})
const selectPreviousTab = inject(TabsSelectPreviousTabFunctionInjectionKey, () => {})
const selectNextTab = inject(TabsSelectNextTabFunctionInjectionKey, () => {})

registerTab(tab)

onBeforeUnmount(() => {
  unregisterTab(tab)
})

// Update the ID of the tab object if the prop is updated
watch(
  () => props.id,
  () => {
    tab.value.id = generateId()
  }
)

// GvTabs will change the value of focusTrigger to an arbitrary number if it wants this tab to be focussed,
// so we just watch for any change and focus when it happens. This will happen if the cursor keys are used to switch
// to this tab.
watch(
  () => tab.value.focusTrigger,
  () => {
    if (tab.value.selected && anchorElement.value) {
      anchorElement.value.focus()
    }
  }
)

// If the selected prop is changed to true, select this tab
watch(
  () => props.selected,
  () => {
    if (props.selected) {
      selectTab(tab.value.id)
    }
  }
)

function generateId() {
  return props.id ? props.id : createUid('gv-tab')
}

function handleTabClick(e: Event) {
  if (isDesktop.value) {
    selectTab(tab.value.id)
    e.preventDefault()
  }
}

function handleKeyDown(e: Event, key: String) {
  if (isDesktop.value) {
    if (key === 'LEFT') {
      selectPreviousTab()
      e.preventDefault()
    } else if (key === 'RIGHT') {
      selectNextTab()
      e.preventDefault()
    }
  }
}

const tabindex = computed(() => {
  if (isDesktop.value) {
    return tab.value.selected ? '0' : '-1'
  } else {
    return null
  }
})
</script>

<template>
  <li
    class="govuk-tabs__list-item"
    :class="{ 'govuk-tabs__list-item--selected': tab.selected }"
    :role="isDesktop ? 'presentation' : null"
  >
    <a
      ref="anchorElement"
      class="govuk-tabs__tab"
      :href="`#${tab.id}`"
      :role="isDesktop ? 'tab' : null"
      :aria-controls="isDesktop ? tab.id : null"
      :aria-selected="isDesktop ? tab.selected : null"
      :tabindex="tabindex"
      @click="handleTabClick"
      @keydown.left="(e) => handleKeyDown(e, 'LEFT')"
      @keydown.right="(e) => handleKeyDown(e, 'RIGHT')"
      @keydown.up="(e) => handleKeyDown(e, 'LEFT')"
      @keydown.down="(e) => handleKeyDown(e, 'RIGHT')"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </a>
  </li>
</template>
