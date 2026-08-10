import { describe, it, expect } from 'vitest';
import { validateContact, hasContactErrors, CONTACT_REASONS } from '../../utils/contact';

const validBase = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'I have a question about an upcoming competition, please get back to me.',
};

describe('validateContact', () => {
  it('accepts a valid submission for a reason without a competition', () => {
    const result = validateContact({ ...validBase, reason: 'organise' });
    expect(hasContactErrors(result)).toBe(false);
  });

  it.each(['competition-enquiry', 'delete-registration', 'missed-registration'])(
    'requires a competition for reason "%s"',
    (reason) => {
      const result = validateContact({ ...validBase, reason });
      expect(result.errors.competition).toBeDefined();
    },
  );

  it.each(['competition-enquiry', 'delete-registration', 'missed-registration'])(
    'accepts reason "%s" when a competition is provided',
    (reason) => {
      const result = validateContact({
        ...validBase, reason, competition: 'Irish Championship 2026',
      });
      expect(hasContactErrors(result)).toBe(false);
    },
  );

  it.each(['organise', 'media', 'other'])(
    'does not require a competition for reason "%s"',
    (reason) => {
      const result = validateContact({ ...validBase, reason });
      expect(result.errors.competition).toBeUndefined();
    },
  );

  it('rejects an unknown reason', () => {
    const result = validateContact({ ...validBase, reason: 'not-a-real-reason' });
    expect(result.errors.reason).toBeDefined();
  });

  it('rejects a missing reason', () => {
    const result = validateContact({ ...validBase, reason: '' });
    expect(result.errors.reason).toBeDefined();
  });

  it('rejects an invalid email', () => {
    const result = validateContact({ ...validBase, reason: 'other', email: 'not-an-email' });
    expect(result.errors.email).toBeDefined();
  });

  it('rejects a missing email', () => {
    const result = validateContact({ ...validBase, reason: 'other', email: '' });
    expect(result.errors.email).toBeDefined();
  });

  it('rejects a name that is too short', () => {
    const result = validateContact({ ...validBase, reason: 'other', name: 'J' });
    expect(result.errors.name).toBeDefined();
  });

  it('rejects a message that is too short', () => {
    const result = validateContact({ ...validBase, reason: 'other', message: 'hi' });
    expect(result.errors.message).toBeDefined();
  });

  it('rejects a competition name that is too long', () => {
    const result = validateContact({
      ...validBase,
      reason: 'competition-enquiry',
      competition: 'a'.repeat(201),
    });
    expect(result.errors.competition).toBeDefined();
  });

  it('handles a non-object payload without throwing', () => {
    const result = validateContact(null);
    expect(hasContactErrors(result)).toBe(true);
  });

  it('has a label and a message placeholder configured for every reason', () => {
    CONTACT_REASONS.forEach((reason) => {
      expect(reason.label.length).toBeGreaterThan(0);
      expect(reason.messagePlaceholder?.length).toBeGreaterThan(0);
    });
  });
});
