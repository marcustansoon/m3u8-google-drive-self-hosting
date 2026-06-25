# MP4 to HLS (M3U8) Conversion Guide

This guide explains how to convert an MP4 video into HLS segments (`.ts`) and a playlist file (`index.m3u8`) using FFmpeg, then prepare it for use with the provided Google Apps Script.

## Prerequisites

### 1. Install FFmpeg

Download FFmpeg from:

* https://github.com/GyanD/codexffmpeg/releases

Recommended version:

* `ffmpeg-8.1.1-essentials_build.zip`

After extraction:

1. Locate the `ffmpeg.exe` file.
2. Add the FFmpeg `bin` folder to your **User Environment Variables (PATH)**. Example: `C:\Users\marcus\Downloads\ffmpeg\bin`.
3. Verify installation by running:

```bash
ffmpeg -version
```

---

## Converting MP4 to HLS

### 2. Prepare Your Video

Place your MP4 file inside a working folder.

Example:

```text
project/
├── video.mp4
```

---

### 3. Standard Conversion (Re-encode)

Run the following command:

```bash
ffmpeg -i video.mp4 -c:v libx264 -c:a aac -f hls -hls_time 10 -hls_playlist_type vod -hls_segment_filename "segment_%05d.ts" index.m3u8
```

This command:

* Converts video to H.264 (`libx264`)
* Converts audio to AAC
* Creates HLS segments
* Splits the video into approximately 10-second segments
* Generates `index.m3u8`

Output example:

```text
index.m3u8
segment_00000.ts
segment_00001.ts
segment_00002.ts
...
```

---

### OPTIONAL: Fast Conversion Mode (No Re-encoding)

If your source video is already HLS-compatible, you can use stream copy mode:

```bash
ffmpeg -i video.mp4 -c copy -f hls -hls_time 10 -hls_playlist_type vod -hls_segment_filename "segment_%05d.ts" index.m3u8
```

Benefits:

* Much faster conversion
* No quality loss
* Lower CPU usage

Limitations:

* Works best when the source video already uses compatible codecs (typically H.264 video and AAC audio).

---

## Uploading Files

### 5. Upload Generated Files

Upload:

* `index.m3u8`
* All `.ts` segment files

to your Google Drive folder.

---

## Google Apps Script Setup

### 6. Configure IDs

In the Apps Script project, create the app script code given in this repo and ensure:

* **Folder ID** points to the Google Drive folder containing the uploaded files.
* **M3U8 File ID** points to the uploaded `index.m3u8`.

---

### 7. Generate Playlist URL

Run the following Apps Script function:

```javascript
convertPlaylist()
```

---

### 8. Play the Stream

After execution:

1. Check the Apps Script Output/Logs console.
2. Copy the generated URL.
3. Open it in your preferred M3U8/HLS player application.

---

## Optional: Host on GitHub

### GitHub Hosting

Instead of serving files through Google Drive, you may host:

* `index.m3u8`
* `.ts` segments

on GitHub (or GitHub Pages) and update your playlist URLs accordingly.

This can simplify distribution and provide a publicly accessible endpoint for HLS playback.


## Optional: Local Network Hosting

### Local Network Hosting on PC

Instead of serving files through Google Drive, you may host:

* `index.m3u8`
* `.ts` segments

on locally on your personal computer and stream it together with other devices or TVs on the same network. 

Ensure you are in the folder where `index.m3u8` and `segments` are located. 

Open your terminal CMD and run this `python -m http.server 8000`. This should make your files available on local network.

Open another CMD and run `ipconfig` and take note of your current PC network address: 

Example: `IPv4 Address. . . . . . . . . . . : 192.168.1.3`

Now, you can stream it directly by inserting the following URL : `http://192.168.1.3:8000/index.m3u8`

Replace the example IP Address above with your actual IP Address

## Recommended Player App To Stream / Find your M3U8 Link

### HLS Remote Player (TV / Phone)

For Android / TV devices, you can use:

[HLS Remote Player (TV / Phone) on Google Play](https://play.google.com/store/apps/details?id=com.notadevstudio.hlsremoteplayer&hl=en)

Features include:

* Play HLS (`.m3u8`) streams directly from any URL
* Stream to TVs on the same local network
* Remote playback control from a phone or tablet
* Subtitle support with synchronization controls
* Support for live and Video-on-Demand HLS streams

Note: For TV, you might need to send download the apk and send it to your TV. Then install it. You can control it remotely using your mobile phone as well.

### StreamFinder

Use StreamFinder to inspect and analyze HLS streams, M3U8 playlists, media files, and subtitle resources from movie websites. It can help verify that your generated HLS stream is working correctly and identify media URLs during testing and development.

Google Play:

[StreamFinder: Media/Subs/HLS on Google Play](https://play.google.com/store/apps/details?id=com.notadevstudio.streamfinder&hl=en)

Features include:

* Find (`.m3u8`) streams directly from any movie URL
* Play HLS (`.m3u8`) streams directly from any URL
* Allow you to download (`.m3u8`) streams
* Allow you to download subtitle

