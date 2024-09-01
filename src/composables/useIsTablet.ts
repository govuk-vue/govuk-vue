import { ref, onMounted, onUnmounted } from 'vue'

export function useIsTablet() {
  let mediaQuery: MediaQueryList
  const isTablet = ref(false)

  function updateIsTablet() {
    isTablet.value = mediaQuery.matches
  }

  onMounted(() => {
    // Set up mediaQuery in onMounted so that we know we're running on the client, not SSR
    // min-width is the govuk-frontend desktop breakpoint
    mediaQuery = window.matchMedia(`(min-width: 40.0625rem`)
    updateIsTablet()
    mediaQuery.addEventListener('change', updateIsTablet)
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', updateIsTablet)
  })

  return isTablet
}
