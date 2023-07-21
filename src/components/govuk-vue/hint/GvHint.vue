<script setup lang="ts">
defineProps({
  text: String,
  id: String
})
</script>

<template>
  <div :id="id" class="govuk-hint">
    <slot>
      {{ text }}
    </slot>
  </div>
</template>
