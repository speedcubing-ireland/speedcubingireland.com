import Link from 'next/link';
import Layout from '../components/layout/Layout';
import FaqAccordion from '../components/faq/FaqAccordion';

export default function Faq() {
  return (
    <Layout title="FAQ">
      <div className="bg-base-100">
        <div className="prose max-w-prose mx-auto p-8 pb-0">
          <h1>Frequently Asked Questions</h1>
          <p>
            Answers to the questions we get asked most often. Can&apos;t find
            what you&apos;re looking for? Get in touch on our
            {' '}
            <Link href="/contact">Contact</Link>
            {' '}
            page.
          </p>
        </div>

        <div className="max-w-prose mx-auto px-8 pb-8">
          <FaqAccordion />
        </div>
      </div>
    </Layout>
  );
}
