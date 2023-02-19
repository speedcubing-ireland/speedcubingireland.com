import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';
import { Product } from '@shopify/shopify-api/rest/admin/2023-01/product';
import { Variant } from '@shopify/shopify-api/rest/admin/2023-01/variant';

export type SimplifiedProduct = {
  id: number;
  title: string;
  image: string;
  price: string;
};

export function simplifyShopifyProduct(product: Product) {
  const varients = product.variants as Variant[] | undefined;
  return {
    id: product.id,
    title: product.title,
    image: product.image ? product.image.src : null,
    price: varients ? varients[0].price : null,
  } as SimplifiedProduct;
}

export const shopifyStoreURL = process.env.SHOPIFY_HOSTNAME!;

const invalidConfig = !process.env.SHOPIFY_API_KEY || !process.env.SHOPIFY_ADMIN_API_KEY;

export const shopify = invalidConfig ? null : shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_ADMIN_API_KEY!,
  apiVersion: ApiVersion.January23,
  isCustomStoreApp: true,
  scopes: ['read_products'],
  isEmbeddedApp: false,
  hostName: shopifyStoreURL,
  restResources,
});

export const session = shopify?.session.customAppSession(shopifyStoreURL);
