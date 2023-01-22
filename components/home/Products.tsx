import Image from 'next/image';
import Link from 'next/link';

function ProductCard() {
  return (
    <div className="card w-full shadow-xl text-neutral-content glass">
      <figure className="px-10 pt-10">
        <Image
          alt="Product"
          src="https://cdn.shopify.com/s/files/1/0681/6645/1465/products/e370e59acfc21a22a36e17e6ff97a020.png?v=1674410237&width=360"
          width={360}
          height={360}
          className="shadow-xl rounded-lg bg-white px-4"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Epic T-Shirt</h2>
        <div className="gap-2">
          <div className="badge badge-secondary">€20</div>
          {' '}
          <div className="badge badge-accent">S-2XL</div>
        </div>
        <p>Gildan Heavy Cotton T-Shirt Very cool sand landscape</p>
        <div className="card-actions">
          <Link href="https://7de509.myshopify.com" className="btn btn-primary">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}

function Products() {
  return (
    <div className="bg-neutral text-neutral-content grid grid-cols-1 md:grid-cols-4 gap-4 p-10">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default Products;
