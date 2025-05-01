# Monthify - Spotify Stats Dashboard

![Monthify](https://github.com/user-attachments/assets/b77a27cd-fb34-4c4a-b839-9ded956c23d8)

A simple web app that fetches data from the Spotify API and displays it in a user-friendly way. It allows users to view their top artists, tracks, and genres over the past month.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and is a **learning ground** for me to explore API integration, data visualization, and user authentication in web applications.

## Main features

- View your top tracks and artists from Spotify
- Filter listening history by different time ranges (Last Month, Last 6 Months, Last Year)
- Create playlists automatically from your top tracks
- Secure authentication with Spotify OAuth
- Real-time data fetching and visualization
- Performance monitoring with Vercel Speed Insights

## Technicalities

- Implementing OAuth 2.0 authentication flow with Spotify
- Managing secure token storage and refresh mechanisms
- Server-side rendering (SSR) for improved performance and SEO
- Masking real API calls with custom self-defined API routes
- Building responsive UIs with Tailwind CSS
- TypeScript integration for better type safety
- Next.js App Router and API routes implementation
- State management with React Context
- Error handling and loading states
- Secure cookie management for authentication
- Integration with external APIs (Spotify Web API)

## To run this:

1. Clone this repo
2. Go to [Spotify's Developer Site](https://developer.spotify.com/) and create an application to get an API key with scope `user-top-read`,`playlist-modify-public` and `playlist-modify-private`. Set the callback URI to be `http://127.0.0.1:4567/api/callback`(Spotify doesn't accept `localhost` in their callback URIs. Read more [here](https://developer.spotify.com/documentation/web-api/concepts/redirect_uri)).
3. On the dashboard, choose your application and go to User Management and add your email for your Spotify account(Since your app is initialized as Developer Mode, the quota is up to 25 users you designate specifically on the dashboard. You can get around this by applying for approval on the developer dashboard)
4. Copy the Client ID, Client Secret and Callback URL to add them to your `.env.local` file on the root directory of the cloned repository
5. Install the dependencies with `pnpm install`
6. Run with `pnpm dev` and open [](http://127.0.0.1/4567)

## Notes to self/learnings

### Authentication & Security
- React Providers are a great way to manage auth across sites
- Use 127.0.0.1 instead of localhost for Spotify API Callback
- Auto masking of env variables in Next.js

### Performance & Best Practices
- Loading screens are crucial for better UX
- Use interfaces to centralize datatypes and auto map JSONs
- Linting is really useful for catching issues early
  - Example: Using `<Image />` from `next/image` instead of `<img>` for better performance
- Masking API calls to server side with built-in API routes
- Add allowed domains for images in Next.js config for loading external images
