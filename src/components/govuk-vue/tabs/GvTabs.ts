import { defineComponent, h, onBeforeMount, ref, provide, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { Tab } from '@/components/govuk-vue/tabs/Tab'
import {
  TabsRegisterTabFunctionInjectionKey,
  TabsSelectNextTabFunctionInjectionKey,
  TabsSelectPreviousTabFunctionInjectionKey,
  TabsSelectTabFunctionInjectionKey,
  TabsUnregisterTabFunctionInjectionKey
} from '@/components/govuk-vue/tabs/TabsInjectionKeys'
import { useIsDesktop } from '@/composables/useIsDesktop'

function findTabKeys(items: any[]) {
  const tabKeys: Array<string | number | symbol | null | undefined> = []
  items.forEach((item) => {
    // If the child item is a GvTab, add it to our list of tabs
    if (typeof item.type === 'object' && item.type.__name && item.type.__name === 'GvTab') {
      if (item.key) {
        tabKeys.push(item.key)
      }
    } else if (Array.isArray(item.children)) {
      // If the child has children, find any tabs inside them by calling this function recursively
      tabKeys.push(...findTabKeys(item.children))
    }
  })

  return tabKeys
}

export default defineComponent({
  props: {
    title: String
  },
  setup(props, { slots }) {
    const t: Tab[] = []
    const tabs = ref(t)
    let mounted = false
    const isDesktop = useIsDesktop()

    onMounted(() => {
      // We're only going to reindex tabs if the list of tabs is changed after the initial mount,
      // so we need to store whether we've already mounted
      mounted = true
    })

    function registerTab(tab: Ref<Tab>) {
      // If this tab is selected, unselect anything that's currently selected before adding this one
      if (tab.value.selected) {
        tabs.value.forEach((t) => {
          t.selected = false
        })
      }

      // Add the tab to our list of tabs
      tabs.value.push(tab.value)

      // Reorder tabs in DOM order (they might have been registered out of order)
      if (mounted && slots.default) {
        // Get the keys of each tab in the default slot
        const tabKeys = findTabKeys(slots.default())
        const orderedTabs: Tab[] = []

        // For each tab key in DOM order, push the tab object into our ordered list
        tabKeys.forEach((tk, i) => {
          if (tk) {
            const foundTab = tabs.value.find((t) => t.key === tk)
            if (foundTab) {
              orderedTabs.push(foundTab)
            }
          }
        })

        // Pick up any tabs without keys - the order will be unpredictable but at least they'll be there
        const unkeyedTabs = tabs.value.filter((t) => !t.key)
        orderedTabs.push(...unkeyedTabs)
        tabs.value = orderedTabs
      }

      // If this is the first tab being registered, default it to selected
      if (tabs.value.length === 1) {
        tabs.value[0].selected = true
      }
    }

    function unregisterTab(tab: Ref<Tab>) {
      const isSelected = tab.value.selected
      tabs.value = tabs.value.filter((t) => t.id !== tab.value.id)

      // If this tab was selected, select the first tab instead
      if (isSelected && tabs.value.length > 0) {
        tabs.value[0].selected = true
      }
    }

    function selectTab(tabId: string, focusTab: boolean = false) {
      tabs.value.forEach((t) => {
        if (t.id === tabId) {
          t.selected = true

          if (focusTab) {
            if (t.focusTrigger === 0) {
              t.focusTrigger = 1
            } else {
              t.focusTrigger = 0
            }
          }
        } else {
          t.selected = false
        }
      })
    }

    function selectNextTab() {
      // Loop through each tab. If it's currently selected, we flip previousTabWasSelected to true
      // and on the next iteration (next tab), select that tab
      let previousTabWasSelected = false
      for (let i = 0; i < tabs.value.length; i++) {
        if (previousTabWasSelected) {
          selectTab(tabs.value[i].id, true)
          break
        }

        if (tabs.value[i].selected) {
          previousTabWasSelected = true
        }
      }
    }

    function selectPreviousTab() {
      // Identical to selectNextTab except we loop backwards, so the previous tab is selected instead
      let previousTabWasSelected = false
      for (let i = tabs.value.length - 1; i >= 0; i--) {
        if (previousTabWasSelected) {
          selectTab(tabs.value[i].id, true)
          break
        }

        if (tabs.value[i].selected) {
          previousTabWasSelected = true
        }
      }
    }

    provide(TabsRegisterTabFunctionInjectionKey, registerTab)
    provide(TabsUnregisterTabFunctionInjectionKey, unregisterTab)
    provide(TabsSelectTabFunctionInjectionKey, selectTab)
    provide(TabsSelectPreviousTabFunctionInjectionKey, selectPreviousTab)
    provide(TabsSelectNextTabFunctionInjectionKey, selectNextTab)
    provide(TabsSelectNextTabFunctionInjectionKey, selectNextTab)

    return () => {
      return h('div', { class: 'govuk-tabs' }, [
        h('h2', { class: 'govuk-tabs__title' }, props.title),
        h(
          'ul',
          { class: 'govuk-tabs__list', role: isDesktop.value ? 'tablist' : null },
          slots.default ? slots.default() : ''
        ),
        tabs.value.map((t: Tab) => {
          return h(
            'div',
            {
              id: t.id,
              class: { 'govuk-tabs__panel': true, 'govuk-tabs__panel--hidden': !t.selected },
              role: isDesktop.value ? 'tabpanel' : null
            },
            //Call the render function for the default slot for this tab
            //@ts-ignore
            t.defaultSlot()
          )
        })
      ])
    }
  }
})
