import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Import the icon styles
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'

// Create Vuetify instance with icon configuration
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light', // Set default theme if needed
    themes: {
      light: {
        colors: {
          primary: '#400636'
        }
      }
    },
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi' // Use Material Design Icons
  },
  display: {
    mobileBreakpoint: 'sm',  // Define mobile breakpoint
    thresholds: {  // Custom breakpoints
      xs: 0,
      sm: 600,
      md: 980,
      lg: 1000,
      xl: 1280,
    },
  },
})
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(vuetify)
app.mount('#app')
