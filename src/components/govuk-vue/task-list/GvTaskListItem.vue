<script setup lang="ts">
import { computed, normalizeClass } from 'vue'
import hasSlot from '@/composables/useHasSlot'
import { createUid } from '@/util/createUid'

const props = defineProps({
  /**
   * The main title for the task within the task list component. If content is provided in the default slot, this prop will be ignored.
   */
  title: String,
  /**
   * Classes to add to the title wrapper.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  titleClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * The value of the link's `href` attribute for the task list item.
   */
  href: String,
  /**
   * The component used to render the link, for example `RouterLink`.
   */
  titleComponent: {
    type: [String, Object],
    default: 'a'
  },
  /**
   * Can be used to add a hint to each task within the task list component. If content is provided in the `hint` slot, this prop will be ignored.
   */
  hint: String,
  /**
   * Text to use for the status, as an alternative to using a tag. If content is provided in the `status` slot, this prop will be ignored.
   */
  status: String,
  /**
   * Classes to add to the status container.
   * You can bind a string, an array or an object, as with normal [Vue class bindings](https://vuejs.org/guide/essentials/class-and-style.html#binding-html-classes).
   */
  statusClass: {
    type: [String, Array, Object],
    default: ''
  },
  /**
   * Set to `true` if the task cannot be started yet. This will make the status text grey.
   */
  cannotStartYet: Boolean
})

const id = createUid('gv-task-list-item')

const computedTitleElement = computed(() => {
  if (props.titleComponent && props.href) {
    return props.titleComponent
  } else if (props.href) {
    return 'a'
  } else {
    return 'div'
  }
})

const normalizedTitleClass = computed(() => {
  return normalizeClass(props.titleClass)
})

const computedTitleClass = computed(() => {
  const classes =
    `${computedTitleElement.value === 'div' ? '' : 'govuk-link govuk-task-list__link'} ${normalizedTitleClass.value}`.trim()
  return classes.length ? classes : undefined
})

const hasHint = computed(() => {
  return props.hint || hasSlot('hint')
})

const hintId = computed(() => {
  return hasHint.value ? `${id}-hint` : undefined
})

const hasStatus = computed(() => {
  return props.status || hasSlot('status')
})

const statusId = computed(() => {
  return hasStatus.value ? `${id}-status` : undefined
})

const computedStatusClass = computed(() => {
  return `${props.cannotStartYet ? 'govuk-task-list__status--cannot-start-yet' : ''} ${normalizeClass(props.statusClass)}`
})

const computedDescribedBy = computed(() => {
  if (computedTitleElement.value === 'div') {
    return undefined
  }

  const value = `${hasHint.value ? hintId.value : ''} ${
    hasStatus.value ? statusId.value : ''
  }`.trim()
  return value.length > 0 ? value : undefined
})
</script>

<template>
  <li class="govuk-task-list__item" :class="{ 'govuk-task-list__item--with-link': href }">
    <div class="govuk-task-list__name-and-hint">
      <component
        :is="computedTitleElement"
        :class="computedTitleClass"
        :href="href"
        :aria-describedby="computedDescribedBy"
      >
        <!-- @slot The main title for the task within the task list component. If content is provided in this slot, the `title` prop will be ignored. -->
        <slot>
          {{ title }}
        </slot>
      </component>
      <div v-if="hasHint" :id="hintId" class="govuk-task-list__hint">
        <!-- @slot The content of the hint. If content is provided in this slot, the `hint` prop will be ignored. -->
        <slot name="hint">
          {{ hint }}
        </slot>
      </div>
    </div>
    <div :id="statusId" class="govuk-task-list__status" :class="computedStatusClass">
      <!-- @slot The content of the status, usually a `GvTag`. If content is provided in this slot, the `hint` prop will be ignored. -->
      <slot name="status">
        {{ status }}
      </slot>
    </div>
  </li>
</template>
