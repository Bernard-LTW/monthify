import { SpotifyConfig, SpotifyTokens, SpotifyUser, SpotifyError } from './types';

export class SpotifyClient {
  private static instance: SpotifyClient;
  private config: SpotifyConfig;
  private tokens: SpotifyTokens | null = null;

  private constructor(config: SpotifyConfig) {
    this.config = config;
  }

  public static getInstance(config: SpotifyConfig): SpotifyClient {
    if (!SpotifyClient.instance) {
      SpotifyClient.instance = new SpotifyClient(config);
    }
    return SpotifyClient.instance;
  }

  public getAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(' '),
      state,
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  public async exchangeCodeForTokens(code: string): Promise<SpotifyTokens> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${this.config.clientId}:${this.config.clientSecret}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.config.redirectUri,
      }),
    });

    if (!response.ok) {
      const error: SpotifyError = await response.json();
      throw new Error(error.error_description || 'Failed to exchange code for tokens');
    }

    this.tokens = await response.json();
    return this.tokens;
  }

  public async refreshTokens(): Promise<SpotifyTokens> {
    if (!this.tokens?.refresh_token) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${this.config.clientId}:${this.config.clientSecret}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.tokens.refresh_token,
      }),
    });

    if (!response.ok) {
      const error: SpotifyError = await response.json();
      throw new Error(error.error_description || 'Failed to refresh tokens');
    }

    this.tokens = await response.json();
    return this.tokens;
  }

  public async getCurrentUser(): Promise<SpotifyUser> {
    if (!this.tokens?.access_token) {
      throw new Error('No access token available');
    }

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${this.tokens.access_token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        await this.refreshTokens();
        return this.getCurrentUser();
      }
      const error: SpotifyError = await response.json();
      throw new Error(error.error_description || 'Failed to get current user');
    }

    return response.json();
  }

  public setTokens(tokens: SpotifyTokens): void {
    this.tokens = tokens;
  }

  public getTokens(): SpotifyTokens | null {
    return this.tokens;
  }
} 