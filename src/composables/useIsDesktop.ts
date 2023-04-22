import { ref, onMounted, onUnmounted } from 'vue'

export function useIsDesktop() {
  // Set the matchMedia to the govuk-frontend desktop breakpoint
  const mediaQuery = window.matchMedia('(min-width: 48.0625em)')
  const isDesktop = ref(mediaQuery.matches)

  function updateIsDesktop() {
    isDesktop.value = mediaQuery.matches
  }

  onMounted(() => {
    mediaQuery.addEventListener('change', updateIsDesktop)
  })

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', updateIsDesktop)
  })

  return isDesktop
}
