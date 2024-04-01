// TODO: Unify this and the .env file
export const CURRENT_COMP_REVALIDATE_TIME = 60 * 60 * 3;

export const WCA_URL = 'https://www.worldcubeassociation.org';
export const WCA_API_URL = `${WCA_URL}/api/v0`;
export const IRISH_COMPS_URL = `${WCA_URL}/competitions?region=Ireland&show_registration_status=on`;

export const WCA_LIVE_API_URL = 'https://live.worldcubeassociation.org/api';
export const SHOPIFY_STORE_URL = 'https://speedcubingireland-merch.myshopify.com';

// dictionary of counties in each province
export const counties: Record<string, string[]> = {
  Connacht: [
    'Galway',
    'Leitrim',
    'Mayo',
    'Roscommon',
    'Sligo',
  ],
  Leinster: [
    'Carlow',
    'Dublin',
    'Kildare',
    'Kilkenny',
    'Laois',
    'Longford',
    'Louth',
    'Meath',
    'Offaly',
    'Westmeath',
    'Wexford',
    'Wicklow',
  ],
  Munster: [
    'Clare',
    'Cork',
    'Kerry',
    'Limerick',
    'Tipperary',
    'Waterford',
  ],
  Ulster: [
    'Antrim',
    'Armagh',
    'Cavan',
    'Donegal',
    'Down',
    'Fermanagh',
    'Londonderry',
    'Monaghan',
    'Tyrone',
  ],
};
