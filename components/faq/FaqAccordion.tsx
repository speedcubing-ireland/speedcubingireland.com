import { useCallback, useEffect, useState } from 'react';
import { FAQ_SECTIONS } from './faqContent';

function FaqAccordion() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  // Deep links like /faq#where-do-i-find-my-wca-id should land on an open item.
  // This runs after hydration, so the server still renders everything closed.
  useEffect(() => {
    const openFromHash = () => {
      // No decoding needed: every FAQ id is ASCII kebab-case, and decoding a
      // malformed fragment would throw before the listener below is attached.
      const id = window.location.hash.slice(1);
      if (!id) return;

      setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      document.getElementById(id)?.scrollIntoView();
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => (prev.includes(id)
      ? prev.filter((openId) => openId !== id)
      : [...prev, id]));
  }, []);

  return (
    <>
      {FAQ_SECTIONS.map((section) => (
        <div key={section.id} className="mb-8 last:mb-0">
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <div className="flex flex-col gap-2">
            {section.items.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className="collapse collapse-arrow bg-base-200"
              >
                <input
                  type="checkbox"
                  aria-label={item.question}
                  checked={openIds.includes(item.id)}
                  onChange={() => toggle(item.id)}
                />
                <div className="collapse-title font-semibold">
                  {item.question}
                </div>
                <div className="collapse-content prose prose-sm max-w-none">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default FaqAccordion;
