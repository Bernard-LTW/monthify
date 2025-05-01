export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
}

export interface SpotifyError {
  error: string;
  error_description: string;
}

export interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface Track {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  uri: string;
  external_urls: { spotify: string };
}

export interface Artist {
  name: string;
  images: { url: string }[];
  genres: string[];
  external_urls: { spotify: string };
}