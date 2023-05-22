import type { App } from 'vue'
import components from './components'

const GovUkVue = {
  install(app: App) {
    for (const componentKey in components) {
      app.component(componentKey, (components as any)[componentKey])
    }
  }
}

export { GovUkVue }

export * from './components'
