/* eslint-disable @next/next/no-img-element */
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { SHOPIFY_STORE_URL } from '../../utils/constants';
import { SimplifiedProduct } from '../../utils/shopify';

function ProductCard({ product }: { product: SimplifiedProduct }) {
  const productLink = `${SHOPIFY_STORE_URL}/products/${product.handle}`;
  return (
    <Link href={productLink} className="card w-full shadow-xl text-neutral-content glass">
      <figure>
        <Image
          src={product.image}
          alt="Product"
          width={350}
          height={350}
          className="w-full"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{product.title}</h2>
        <p>
          From €
          {product.price}
          {' '}
          EUR
        </p>
      </div>
    </Link>
  );
}

function Products({ products }: { products: SimplifiedProduct[] }) {
  const disabled = !products || products.length === 0;

  return (
    <div className="bg-neutral text-neutral-content">
      <div className={`text-center sm:text-left lg:text-left pt-12 px-8 pb-2 ${disabled && 'max-w-7xl mx-auto'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-2">
          <h1 className="text-5xl font-bold col-span-3">
            Marxandatge oficial
            {disabled && (
              <>
                <br />
                <span className="text-4xl text-accent">
                  Properament!
                </span>
              </>
            )}
          </h1>
          <div className="">
            {!disabled && (
              <Link
                className="btn btn-accent gap-2 sm:float-right w-full sm:w-auto"
                href={SHOPIFY_STORE_URL}
              >
                Comprar!
                <FontAwesomeIcon icon={faCartArrowDown} />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 px-8 py-2">
        {!disabled && products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}

export default Products;
