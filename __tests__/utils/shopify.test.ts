import { describe, it, expect } from 'vitest';
import { simplifyShopifyProduct, SimplifiedProduct } from '../../utils/shopify';

describe('simplifyShopifyProduct', () => {
  it('extracts id, title, image, price, and handle correctly', () => {
    const product = {
      id: 12345,
      title: 'Speedcubing Ireland T-Shirt',
      featuredMedia: {
        preview: {
          image: {
            url: 'https://cdn.shopify.com/image.jpg',
          },
        },
      },
      priceRangeV2: {
        minVariantPrice: {
          amount: '25.00',
        },
      },
      handle: 'speedcubing-ireland-t-shirt',
    };

    const result = simplifyShopifyProduct(product);

    expect(result).toEqual<SimplifiedProduct>({
      id: 12345,
      title: 'Speedcubing Ireland T-Shirt',
      image: 'https://cdn.shopify.com/image.jpg',
      price: '25.00',
      handle: 'speedcubing-ireland-t-shirt',
    });
  });

  it('handles special characters in title', () => {
    const product = {
      id: 67890,
      title: "Rubik's Cube & Accessories - Special Edition!",
      featuredMedia: {
        preview: {
          image: {
            url: 'https://cdn.shopify.com/special.jpg',
          },
        },
      },
      priceRangeV2: {
        minVariantPrice: {
          amount: '15.99',
        },
      },
      handle: 'rubiks-cube-accessories',
    };

    const result = simplifyShopifyProduct(product);

    expect(result.title).toBe("Rubik's Cube & Accessories - Special Edition!");
    expect(result.id).toBe(67890);
    expect(result.price).toBe('15.99');
  });

  it('handles numeric price values', () => {
    const product = {
      id: 11111,
      title: 'Timer',
      featuredMedia: {
        preview: {
          image: {
            url: 'https://cdn.shopify.com/timer.jpg',
          },
        },
      },
      priceRangeV2: {
        minVariantPrice: {
          amount: 10.5,
        },
      },
      handle: 'timer',
    };

    const result = simplifyShopifyProduct(product);

    expect(result.price).toBe(10.5);
  });
});
