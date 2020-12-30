
## Proposed API endpoints

### Get Playlists

#### GET /video-content/{app_id}/playlists?start=0&limit=20

| Parameter | type | Description |
| --------- | ----- | ---------- |
| app_id | string | The application id to pull playlists for |
| start | number | The starting index for results |
| limit | number | The (maximum) number of items to return |

```js
{
    num_items: 5, // the total number of playlists if you need to paginate
    start: 0, // echoes back the start number you sent
    limit: 10, // echoes back the limit that you sent
    results: [
        {
            // the uuid of the playlist, will be a string
            id: "789fa739-31a6-4a4d-99df-06460b2300cc",
            // will always be Playlist (for now)
            type: "Playlist",
            // cms defined name, not for user display
            name: "featured_playlist", 
            // user displayed name
            title: "Featured", 
            // content_url is the link to the list of ALL content in this playlist
            content_url: "https://api.domain.com/video-content/{app_id}/playlists/789fa739-31a6-4a4d-99df-06460b2300cc", 
            // timestamp when the playlist itself was last modified, will represent latest last modified of tags or if the playlist itself was changed
            last_modified: 1608754727,
            // number of total items in the playlist
            num_items: 64,
            // list of number of tags and the number of items in each playlist, this is not paginated
            category_results: [
                {
                    id: "1234",
                    // cms defined name, not for user display
                    name: "basketball", 
                    // user friendly name
                    title: "Basketball",
                    // number of items
                    num_items: 21,
                    // Unix timestamp of when last modified
                    last_modified: 1608754659,
                    // link to content of this category
                    content_url: "https://api.domain.com/video-content/{app_id}/playlists/{playlist_id}?categoryNames=basketball"
                },
                {
                    id: "1234",
                    name: "gymnastics", 
                    title: "Gymnastics",
                    num_items: 11,
                    last_modified: 1608754659,
                    content_url: "https://api.domain.com/video-content/{app_id}/playlists/{playlist_id}?categoryNames=gymnastics"
                },
                // empty categoryNames may be listed
                {
                    id: "1234",
                    name: "football", 
                    title: "Gymnastics",
                    num_items: 0,
                    last_modified: 0,
                    content_url: "https://api.domain.com/video-content/{app_id}/playlists/{playlist_id}?categoryNames=football"
                },
                ...
            }]
        },
        {
            id: "c42a1d01-a0f8-4d2e-b3df-1cf354d46660",
            type: "Playlist",
            name: "library_content", 
            title: "Library", 
            content_url: "https://api.domain.com/video-content/{app_id}/playlists/c42a1d01-a0f8-4d2e-b3df-1cf354d46660", 
            last_modified: 1608754727,
            num_items: 32,
            categoryNames: [
                {
                    id: "1234",
                    name: "basketball", 
                    title: "Basketball",
                    num_items: 21,
                    last_modified: 1608754659,
                    content_url: "https://api.domain.com/video-content/{app_id}/playlists/{playlist_id}?categoryNames=basketball"
                },
                ...
            }]
        },
        ...
    ]
}
```

## Playlist Programs

#### GET /video-content/{app_id}/playlists/{playlist_id}/programs?categoryNames=x,y,z&start=0&limit=10

| Parameters | Type | Description |
|------------|------|-------------|
| app_id| string| The application id to pull playlists for |
| playlist_id | string| The desired playlist id |
| categoryNames | string or comma separated string array | list of categoryNames to get data for |
| start | number | The starting index for results |
| limit | number | The (maximum) number of items to return |

```js
{
    num_items: 23, // the total number of results if you need to paginate
    start: 0, // echoes back the start number you sent
    limit: 10, // echoes back the limit that you sent
    results: [
        {
            // id of the content item
            id: "dd52c217-870a-46f1-82a7-b8bd0de9d14f",
            // content type
            program_type: "SPORTS", // ESPORTS, MUSIC, FILM
            // non user friendly name
            name: "Tottenham vs Arsenal 12/1/2020 - test",
            // user displayed name
            title: "Tottenham vs Arsenal 12/1/2020",
            // subtitle 
            subtitle: "Premier League",
            // some detailed description
            description: "This was a game.",
            // images
            images: [
                width: 100,
                height: 100,
                ratio: "SIXTEEN_NINE", // "FOUR_THREE", "THREE_TWO", "OTHER"
                orientation: "LANDSCAPE", // "PORTRAIT",
                tags: ["thumbnail", "other"],
                url: "http://someurl"
            ],
            performers: [
                {
                    performer_type: "INDIVIDUAL", // "GROUP"
                    name: "Some name",
                    role: "Away Team", // actor, director, etc...
                },
                ...
            ],
            categoryNames: ["football", "gymnastics"],
            assets_count: {
                "LIVE": 4, // there are four POV's
                "CLIP": 2,
                "ON_DEMAND": 4 // four 
            },
            assets_url: "https://api.domain.com/video-content/{app_id}/assets/dd52c217-870a-46f1-82a7-b8bd0de9d14f"
        }
    ]
}
```

## Asset endpoint

#### GET /video-content/{app_id}/programs/{program_id}/video-assets

Returns all of the assets for the video program

| Parameters | Type | Description |
|------------|------|-------------|
| app_id| string| The application id to pull playlists for |
| program_id | string| The program |
| start | number | The starting index for results |
| limit | number | The (maximum) number of items to return |

```js
{
    num_items: 5,
    start: 0,
    limit: 10,
    results: [
        {
            // id of the asset
            id: "12345",
            url: "https://url/to/playback/m3u8",
            // name of this specific asset, not user facing
            name: "POV 1",
            // title of the specific asset
            title: "POV 1 - Side",
            // description
            description: "The description of this asset",
            // LIVE, ON_DEMAND, CLIP
            asset_type: "LIVE",
            // HLS_H264_AVC, HLS_H265_HEVC
            codec: "HLS_H264_AVC",
            // FLAT, EQUIRECTANGULAR 
            format: "FLAT",
            // MONOSCOPIC, STEREOSCOPIC_TOP_BOTTOM, STEREOSCOPIC_LEFT_RIGHT
            dimensions: "MONOSCOPIC",
            // ONE_EIGHTY, THREE_SIXTY
            field_of_view: "ONE_EIGHTY",
            requires_auth: true,
            content_flags: ["test", "thing"],
            // NONE, WIDEVINE, FAIRPLAY
            drm: "NONE"
        },
        {
            id: "12346",
            playback_url: "https://url/to/playback/m3u8",
            name: "POV 1",
            title: "POV 1 - Side",
            description: "The description of this asset",
            asset_type: "LIVE",
            codec: "HLS_H264_AVC",
            format: "FLAT",
            dimensions: "MONOSCOPIC",
            field_of_view: "ONE_EIGHTY",
            requires_auth: true,
            content_flags: ["test", "thing"],
            width: 1280,
            height: 1060,
            drm: "NONE"
        },
        ...
    ]
}