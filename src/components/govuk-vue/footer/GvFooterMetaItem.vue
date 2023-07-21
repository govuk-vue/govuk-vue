<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
defineProps({
  text: String,
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
      <slot>
        {{ text }}
      </slot>
    </component>
  </li>
</template>
