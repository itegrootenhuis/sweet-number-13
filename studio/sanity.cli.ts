import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'n2qqnp5j',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
