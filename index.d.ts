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
  startTime: Date | null;
  endTime: Date | null;
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
