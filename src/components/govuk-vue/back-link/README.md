Using a `@click.prevent` event handler:

```vue
<script setup>
function handleClick() {
  alert('You clicked the back link')
}
</script>
<template>
  <gv-back-link @click.prevent="handleClick">Back</gv-back-link>
</template>
```

Using `href`:

```vue
<gv-back-link href="https://example.com">Back</gv-back-link>
```
