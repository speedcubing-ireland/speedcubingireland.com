import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion, Shopify } from '@shopify/shopify-api';
import { RestResources, restResources } from '@shopify/shopify-api/rest/admin/2023-01';
import { Product } from '@shopify/shopify-api/rest/admin/2023-01/product';
import { Variant } from '@shopify/shopify-api/rest/admin/2023-01/variant';

export type SimplifiedProduct = {
  id: number;
  title: string;
  image: string;
  price: string;
  handle: string;
};

export function simplifyShopifyProduct(product: Product) {
  const varients = product.variants as Variant[] | undefined;
  return {
    id: product.id,
    title: product.title,
    image: product.image ? product.image.src : null,
    price: varients ? varients[0].price : null,
    handle: product.handle,
  } as SimplifiedProduct;
}

export const shopifyStoreURL = process.env.SHOPIFY_HOSTNAME!;

const invalidConfig = !process.env.SHOPIFY_API_KEY || !process.env.SHOPIFY_ADMIN_API_KEY;

let shopifyTmp: null | Shopify<RestResources> = null;
if (process.env.NODE_ENV === 'development') {
  const gt = globalThis as unknown as {
    shopifyClient?: Shopify<RestResources>;
  };
  if (gt.shopifyClient) {
    shopifyTmp = gt.shopifyClient;
  }
}

export const shopify = invalidConfig ? null : shopifyTmp || shopifyApi({
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
