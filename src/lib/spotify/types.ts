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

export interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  supports_volume: boolean;
  type: string;
  volume_percent: number;
}

export interface SpotifyContext {
  external_urls: {
    spotify: string;
  };
  href: string;
  type: string;
  uri: string;
}

export interface SpotifyActions {
  disallows: {
    resuming: boolean;
    toggling_repeat_context?: boolean;
    toggling_repeat_track?: boolean;
    toggling_shuffle?: boolean;
  };
}

export interface SpotifyCurrentlyPlaying {
  device: SpotifyDevice;
  shuffle_state: boolean;
  smart_shuffle: boolean;
  repeat_state: string;
  timestamp: number;
  context: SpotifyContext | null;
  progress_ms: number;
  item: Track | null;
  currently_playing_type: string;
  actions: SpotifyActions;
  is_playing: boolean;
}


