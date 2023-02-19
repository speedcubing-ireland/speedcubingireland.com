/* eslint-disable @next/next/no-img-element */
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { SHOPIFY_STORE_URL } from '../../utils/constants';
import { SimplifiedProduct } from '../../utils/shopify';

function ProductCard({ product, link }: { product: SimplifiedProduct, link: string }) {
  return (
    <Link href={link} className="card w-full shadow-xl text-neutral-content glass">
      <figure>
        <img
          src={product.image}
          alt="Product"
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
  if (!products) return null;

  const link = SHOPIFY_STORE_URL;

  return (
    <div className="bg-neutral text-neutral-content">
      <div className="text-center sm:text-left lg:text-left pt-12 px-8 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-2">
          <h1 className="text-5xl font-bold col-span-3">
            Official Merch
          </h1>
          <div className="">
            <Link className="btn btn-accent gap-2 sm:float-right w-full sm:w-auto" href={link}>
              Shop Now!
              <FontAwesomeIcon icon={faCartArrowDown} />
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 px-8 py-2">
        {products.map((product) => <ProductCard key={product.id} product={product} link={link} />)}
      </div>
    </div>
  );
}

export default Products;
