import { ref, onMounted, onUnmounted } from 'vue'

export function useIsDesktop() {
  let mediaQuery: MediaQueryList
  const isDesktop = ref(false)

  function updateIsDesktop() {
    isDesktop.value = mediaQuery.matches
  }

  onMounted(() => {
    // Set up mediaQuery in onMounted so that we know we're running on the client, not SSR
    // min-width is the govuk-frontend desktop breakpoint
    mediaQuery = window.matchMedia('(min-width: 48.0625em)')
    updateIsDesktop()
    mediaQuery.addEventListener('change', updateIsDesktop)
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', updateIsDesktop)
  })

  return isDesktop
}
