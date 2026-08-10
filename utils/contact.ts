import { WCA_URL } from './constants';

export type ContactReason =
  | 'competition-enquiry'
  | 'organise'
  | 'delete-registration'
  | 'missed-registration'
  | 'media'
  | 'other';

export interface ContactReasonConfig {
  id: ContactReason;
  label: string;
  needsCompetition: boolean;
  helpText?: string;
  messagePlaceholder?: string;
}

// Sentinel value for "my competition isn't listed" in the competition dropdown.
export const CONTACT_OTHER_COMPETITION = 'other';

export const CONTACT_REASONS: ContactReasonConfig[] = [
  {
    id: 'competition-enquiry',
    label: 'I want to enquire about a competition',
    needsCompetition: true,
    messagePlaceholder: 'What would you like to know?',
  },
  {
    id: 'organise',
    label: 'I want to organise a competition',
    needsCompetition: false,
    helpText: 'We run competitions all over Ireland and we\'re always looking for local organisers. Let us know your area and any venue you have in mind, and we\'ll be in touch.',
    messagePlaceholder: 'Tell us about the area/venue you have in mind and any relevant experience.',
  },
  {
    id: 'delete-registration',
    label: 'I want to delete my registration',
    needsCompetition: true,
    helpText: `Registrations are managed on the WCA website (${WCA_URL}), but we can remove it for you. Let us know which competition and the name you registered under. Refunds, if any, are subject to that competition's refund policy on its WCA page.`,
    messagePlaceholder: 'The name you registered under, and any other details.',
  },
  {
    id: 'missed-registration',
    label: 'I missed registration for a competition',
    needsCompetition: true,
    helpText: 'If a competition doesn\'t have a waiting list, we may be able to let you register on the day. Let us know which competition you\'re interested in and we\'ll tell you whether that\'s possible.',
    messagePlaceholder: 'Let us know which competition you\'re interested in.',
  },
  {
    id: 'media',
    label: 'Media enquiry',
    needsCompetition: false,
    helpText: 'Please include your outlet and any deadline you\'re working to.',
    messagePlaceholder: 'Tell us about your outlet, deadline, and what you need from us.',
  },
  {
    id: 'other',
    label: 'Something else',
    needsCompetition: false,
    messagePlaceholder: 'How can we help?',
  },
];

export function getContactReason(id: string | undefined): ContactReasonConfig | undefined {
  return CONTACT_REASONS.find((reason) => reason.id === id);
}

export interface ContactPayload {
  name: string;
  email: string;
  reason: string;
  competition?: string;
  message: string;
}

export interface ContactValidationResult {
  errors: Partial<Record<keyof ContactPayload, string>>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

// Pure validator shared by the contact page (inline field errors) and the API
// route (never trust the client). `payload` is `unknown` because the API route
// receives an untyped JSON body.
export function validateContact(payload: unknown): ContactValidationResult {
  const errors: ContactValidationResult['errors'] = {};

  const data = (payload && typeof payload === 'object' ? payload : {}) as Record<string, unknown>;

  const name = asString(data.name);
  if (name.length < 2 || name.length > 100) {
    errors.name = 'Please enter your name.';
  }

  const email = asString(data.email);
  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const reason = asString(data.reason);
  const reasonConfig = getContactReason(reason);
  if (!reasonConfig) {
    errors.reason = 'Please select a reason for contacting us.';
  }

  const competition = asString(data.competition);
  if (reasonConfig?.needsCompetition) {
    if (!competition) {
      errors.competition = 'Please let us know which competition.';
    } else if (competition.length > 200) {
      errors.competition = 'That competition name is too long.';
    }
  }

  const message = asString(data.message);
  if (message.length < 10 || message.length > 5000) {
    errors.message = 'Please enter a message (at least 10 characters).';
  }

  return { errors };
}

export function hasContactErrors(result: ContactValidationResult): boolean {
  return Object.keys(result.errors).length > 0;
}
