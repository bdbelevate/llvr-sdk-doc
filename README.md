# SDK Information

This outlines a proposed SDK for LLVR. 

## Definitions

### VideoAsset

A single live or on-demand POV, or potentially a video clip. Multiple video assets of a single program that are all LIVE (or ON_DEMAND) would indicate that multiple POV's are available. The video player should represent those multiple POV's as some sort of chooser above the video player. On the other hand, it could have multiple CLIP type assets (i.e. highlights). It is up to the client (SDK user) how to display and organize those clips.

### Program

A single game, event, or program that might have multple clips associated to it. Multiple LIVE or ON_DEMAND video assets associated to a program represent concurrent POV's (see above).


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
    num_items: number;
    start: number;
    limit: number;
    results: T[];
}
interface CategoryResult {
    id: string;
    name: string;
    title: string;
    last_modified: number;
    num_items: number;
    content_url: string;
}
interface Playlist {
    id: string;
    type: 'Playlist';
    name: string;
    title: string;
    content_url: string;
    last_modified: number;
    num_items: number;
    category_results: CategoryResult[];
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
    performer_type: 'INDIVIDUAL' | 'GROUP';
    name: string;
    role: string;
}
declare enum ProgramType {
    SPORTS = "SPORTS",
    ESPORTS = "ESPORTS",
    MUSIC = "MUSIC",
    FILM = "FILM"
}
interface AssetCount {
    [asset_type: string]: number;
}
interface Program {
    id: string;
    program_type: ProgramType;
    name: string;
    title?: string;
    description?: string;
    images: Image[];
    performers: Performer[];
    categoryNames: string[];
    assetCount: AssetCount;
    assets_url: string;
}
export declare function getPlaylists(app_id: string, start?: number, limit?: number): Promise<PaginatedResponse<Playlist>>;
export declare function getPrograms(app_id: string, playlist_id: string, start: number | undefined, limit: number | undefined, categoryNames: string[]): Promise<PaginatedResponse<Program>>;
interface VideoAsset {
    id: string;
    url: string;
    name: string;
    title?: string;
    description?: string;
    asset_type: 'LIVE' | 'CLIP' | 'ON_DEMAND';
    codec: 'HLS_H264_AVC' | 'HLS_H265_HEVC';
    format: 'FLAT' | 'EQUIRECTANGULAR';
    dimensions: 'MONOSCOPIC' | 'STEREOSCOPIC_TOP_BOTTOM' | 'STEREOSCOPIC_LEFT_RIGHT';
    field_of_view: 'ONE_EIGHTY' | 'THREE_SIXTY';
    requires_auth: boolean;
    content_flags: string[];
    drm: 'NONE' | 'WIDEVINE' | 'FAIRPLAY';
}
export declare function getVideoAssets(app_id: string, program_id: string, start?: number, limit?: number): Promise<PaginatedResponse<VideoAsset>>;
interface TokenResponse {
    token: string;
    expires: number;
}
export declare function getPlaybackToken(app_id: string, accessToken: string, options: any): Promise<TokenResponse>;
export declare function playVideo(video_id: string, playbackToken: string): Promise<void>;
export declare function playVideoByUrl(url: string, playbackToken: string): Promise<void>;
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

#### GET /video-content/{app_id}/playlists?start=0&limit=20

#### GET /video-content/{app_id}/playlists/{playlist_id}/programs?categoryNames=x,y,z&start=0&limit=10

#### GET /video-content/{app_id}/programs/{program_id}/video-assets
