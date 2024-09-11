// cypress.config.mjs
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
    baseUrl: 'http://localhost:5173', // or your app's URL
    supportFile: 'cypress/support/e2e.ts',
  },
});
