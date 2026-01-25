import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next'],
    env: {
      SHOPIFY_API_KEY: 'getfromshopify',
      SHOPIFY_API_SECRET_KEY: 'getfromshopify',
      SHOPIFY_ADMIN_API_KEY: 'getfromshopify',
      SHOPIFY_HOSTNAME: 'yourstorename.myshopify.com',
      SHOPIFY_STORE: 'specialdefaultstorename',
      REVALIDATE_SECRET: 'thisisrandomstringthatyoumakeup',
      EUROS_CODE: 'codeforeurosorothermerch',
      KIDS_LINK: 'link',
      ADULTS_LINK: 'link',
    },
  },
});
