function Newsletter() {
  return (
    <div className="bg-primary text-neutral-content">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" id="newsletter-headline">
            Sign up for our newsletter!
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6">
            Stay up-to-date on the latest Speedcubing Ireland competitions and news.
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <form className="sm:flex">
            <input
              id="email-address"
              name="email-address"
              type="email"
              autoComplete="email"
              required
              className="input input-secondary text-base-content w-full max-w-xs"
              placeholder="Enter your email"
            />
            <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="btn btn-secondary"
              >
                Notify me
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
