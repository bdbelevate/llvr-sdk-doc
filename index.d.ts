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
