<!--
In some situations, we may or may not want a wrapper element around a component - for example,
in GvLabel we want an h1 around the label if it's the page heading, but nothing wrapping it
otherwise. This component is used together with :is to simply render the wrapped content
without a wrapper if it doesn't need one.

See:
- https://github.com/vuejs/vue/issues/12033
- https://github.com/vuejs/rfcs/pull/449
-->
<script>
export default {
  // We don't want automatic inheritance of attributes (eg class) because we don't have a root
  // element for them to be applied to
  inheritAttrs: false
}
</script>

<template>
  <slot />
</template>
