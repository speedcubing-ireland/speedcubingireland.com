export interface Avatar {
  url: string;
  pending_url: string;
  thumb_url: string;
  is_default: boolean;
}

export interface TeamAvatar {
  url: string;
  thumb: {
    url: string;
  };
}

export interface Team {
  id: number;
  friendly_id: string;
  leader: boolean;
  name: string;
  senior_member: boolean;
  wca_id: string;
  avatar: TeamAvatar;
}

export interface Country {
  id: string;
  name: string;
  continentId: string;
  iso2: string;
}

export interface User {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  delegate_status: string;
  wca_id: string;
  gender: string;
  country_iso2: string;
  url: string;
  country: Country;
  email: string;
  region: string;
  senior_delegate_id: number;
  class: string;
  teams?: Team[] | null;
  avatar: Avatar;
}

export interface Competition {
  id: string;
  name: string;
  registration_open: string;
  registration_close: string;
  announced_at: string;
  start_date: string;
  end_date: string;
  competitor_limit: number;
  cancelled_at?: string | null;
  url: string;
  website: string;
  short_name: string;
  city: string;
  venue_address: string;
  venue_details: string;
  latitude_degrees: number;
  longitude_degrees: number;
  country_iso2: string;
  event_ids?: string[] | null;
  delegates?: User[] | null;
  trainee_delegates?: User | null;
  organizers?: User | null;
  class: string;
}
