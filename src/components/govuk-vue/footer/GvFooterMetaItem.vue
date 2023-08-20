<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
defineProps({
  /**
   * Text for the meta link item. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * Href attribute for the meta link item.
   */
  href: {
    type: String,
    required: true
  },
  /**
   * The component used to render the link, for example `RouterLink`.
   */
  component: {
    type: [String, Object],
    default: 'a'
  }
})
</script>

<template>
  <li class="govuk-footer__inline-list-item">
    <component :is="component" class="govuk-footer__link" :href="href" v-bind="$attrs">
      <!-- @slot The content of the meta link. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>
        {{ text }}
      </slot>
    </component>
  </li>
</template>
