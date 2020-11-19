// runs in browser only

import { createApp } from './app'

const { app, store } = createApp()

if (window.__INITIAL_STATE__) {
  // We initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app')