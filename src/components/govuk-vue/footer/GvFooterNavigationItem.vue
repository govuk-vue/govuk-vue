<script setup lang="ts">
defineProps({
  /**
   * Text for the navigation link item. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * Href attribute for the navigation link item.
   */
  href: String,
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
  <li class="govuk-footer__list-item">
    <component :is="component" class="govuk-footer__link" :href="href">
      <!-- @slot The content of the navigation link. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>
        {{ text }}
      </slot>
    </component>
  </li>
</template>
