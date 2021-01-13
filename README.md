# SDK Information

This outlines a proposed SDK for LLVR. 

## Definitions

### VideoAsset

A single live or on-demand POV, or potentially a video clip. Multiple video assets of a single program that are all Live (or OnDemand) would indicate that multiple POV's are available. The video player should represent those multiple POV's as some sort of chooser above the video player. On the other hand, it could have multiple CLIP type assets (i.e. highlights). It is up to the client (SDK user) how to display and organize those clips.

### Program

A single game, event, or program that might have multple clips associated to it. Multiple Live or OnDemand video assets associated to a program represent concurrent POV's (see above).


### Category

A genre/sport or other type of category associated to a program. Each program can have zero or many of these. Each category `name` is guaranteed to be unique so they are used as quasi-ids.

### Playlist

A list of programs that are available. It is up to the client (SDK user) on how to represent these items.

## Methods provided by SDK

#### getPlaylists

Returns a paginated list of playlists available and the number of items per category.

#### getPrograms

Returns a paginated list of programs (game, episodes, etc..) that are part of a playlist. Can be filtered by category names as well.

#### getVideoAssets

Returns a paginated list of the video assets (povs or clips) associated to a Program.

#### getPlaybackToken

Returns a playback token for authenticated clips. The accessToken should be provided by the client so that the LLVR backend can validate against a backend service (provided by client) that verifies this user.

#### playVideo

Plays a video asset of a specific id. SDK should retain in memory the video assets so that it can associate an ID to the playback url. On playback the SDK can either pass the token as a query parameter or in the Authorization header.

#### playVideoByUrl

If the client knows the specific url and wants to play it, it can pass that in as a parameter.

## Example Typescript/Javascript interface

```ts
interface PaginatedResponse<T> {
  numItems: number;
  start: number;
  limit: number;
  results: T[];
}
interface CategoryResult {
  id: string;
  name: string;
  title: string;
  lastModified: number;
  numItems: number;
  contentUrl: string;
}
interface Playlist {
  id: string;
  type: "Playlist";
  name: string;
  title: string;
  contentUrl: string;
  lastModified: number;
  numItems: number;
  categoryResults: CategoryResult[];
}
interface Image {
  width: number;
  height: number;
  ratio?: string;
  orientation?: string;
  tags: string[];
  url: string;
}
interface Performer {
  performerType: "Individual" | "Group";
  name: string;
  role: string;
}
declare enum ProgramType {
  SPORTS = "Sports",
  ESPORTS = "Esports",
  MUSIC = "Music",
  FILM = "Film",
}
declare enum ProgramState {
  PREVIEW = "Preview",
  LIVE = "Live",
  ON_DEMAND = "OnDemand",
  AVAILABLE = "Available",
}

interface AssetCount {
  [assetType: string]: number;
}

interface Program {
  id: string;
  programType: ProgramType;
  programState: ProgramState;
  name: string;
  title?: string;
  description?: string;
  images: Image[];
  performers: Performer[];
  categoryNames: string[];
  assetCount: AssetCount;
  assetsUrl: string;
  requiresAuth: boolean;
}

export declare function getPlaylists(
  appId: string,
  start?: number,
  limit?: number
): Promise<PaginatedResponse<Playlist>>;
export declare function getPrograms(
  appId: string,
  playlistId: string,
  start: number | undefined,
  limit: number | undefined,
  categoryNames: string[]
): Promise<PaginatedResponse<Program>>;

interface VideoAsset {
  id: string;
  url: string;
  name: string;
  title?: string;
  description?: string;
  startTime: Date | null;
  endTime: Date | null;
  groupId: string;
  assetType: "Live" | "Clip" | "OnDemand";
  codec: "HlsH264Avc" | "Hls_H265_Hevc";
  format: "Flat" | "Equirectangular";
  dimensions: "Monoscopic" | "StereoscopicTopBottom" | "StereoscopicLeftRight";
  fieldOfView: "OneEighty" | "ThreeSixty";
  requiresAuth: boolean;
  contentFlags: string[];
  drm: "None" | "Widevine" | "Fairplay";
}
export declare function getVideoAssets(
  appId: string,
  programId: string,
  start?: number,
  limit?: number
): Promise<PaginatedResponse<VideoAsset>>;
interface TokenResponse {
  token: string;
  expires: number;
}
export declare function getPlaybackToken(
  appId: string,
  accessToken: string,
  options: any
): Promise<TokenResponse>;
export declare function playVideo(
  videoId: string,
  playbackToken: string
): Promise<void>;
export declare function playVideoByUrl(
  url: string,
  playbackToken: string
): Promise<void>;
declare const _default: {
  getPlaylists: typeof getPlaylists;
  getPrograms: typeof getPrograms;
  getVideoAssets: typeof getVideoAssets;
  getPlaybackToken: typeof getPlaybackToken;
  playVideo: typeof playVideo;
  playVideoByUrl: typeof playVideoByUrl;
};
export default _default;

```

## API Responses

The sample api responses are provided on [this document](video.md).

#### GET /video-content/{appId}/playlists?start=0&limit=20

#### GET /video-content/{appId}/playlists/{playlistId}/programs?categoryNames=x,y,z&start=0&limit=10

#### GET /video-content/{appId}/programs/{programId}/video-assets
