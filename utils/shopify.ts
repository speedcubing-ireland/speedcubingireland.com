import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import { restResources } from "@shopify/shopify-api/rest/admin/2025-04";

export type SimplifiedProduct = {
  id: number;
  title: string;
  image: string;
  price: string;
  handle: string;
};

export function simplifyShopifyProduct(product: any) {
  return {
    id: product.id,
    title: product.title,
    image: product.featuredMedia.preview.image.url,
    price: product.priceRangeV2.minVariantPrice.amount,
    handle: product.handle,
  } as SimplifiedProduct;
}

export const shopifyStoreURL = `${process.env.SHOPIFY_STORE!}.myshopify.com`;

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY!,
  adminApiAccessToken: process.env.SHOPIFY_ADMIN_API_KEY!,
  apiVersion: ApiVersion.April25,
  isCustomStoreApp: true,
  scopes: ['read_products'],
  isEmbeddedApp: false,
  hostName: shopifyStoreURL,
  restResources
});

export const session = shopify?.session.customAppSession(shopifyStoreURL);

export const client = (shopify && session && new shopify.clients.Graphql({
  session,
  apiVersion: ApiVersion.April25,
})) ?? null;

export async function fetchProducts() {
  if (!client) {
    console.error('Shopify client is not configured');
    return null;
  }

  try {
    const response = await client.request(
      `query {
        products (first:50, query:"status:active AND tag:website") {
          edges {
            node {
              id
              title
              featuredMedia {
                preview {
                  image {
                    url
                  }
                }
              }
              priceRangeV2 {
                minVariantPrice {
                  amount
                }
              }
              handle
            }
          }
        }
      }`
    );

    if (response?.data) {
      const items = response.data.products.edges.map((edge: any) => edge.node);
      const simplifiedProducts = items.map(simplifyShopifyProduct);
      return simplifiedProducts;
    }
    
    console.error('No data received from Shopify');
    return null;
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    return null;
  }
}