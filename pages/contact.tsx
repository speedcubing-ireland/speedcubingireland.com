import Layout from '../components/layout/Layout';

export default function Contact() {
  return (
    <Layout>
      <div className="bg-base-100 prose max-w-prose mx-auto p-8">
        <h1>Contact</h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <p>
              Address
              <br />
              1234 Main St
              <br />
              Anytown, USA
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
