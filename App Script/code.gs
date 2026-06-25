function convertPlaylist() {
  // Upload your index.m3u8 and segments into your Google Drive folder
  
  // This ID represents index.m3u8 File
  const playlistId = '<PUT_YOUR_INDEX.M3U8_ID_HERE>';
  // Folder ID where all the segments are located
  const folderId = '<PUT_YOUR_DRIVE_ID_HERE>';

  let content = DriveApp
    .getFileById(playlistId)
    .getBlob()
    .getDataAsString();

  const lines = content.split('\n');

  const rewritten = lines.map(line => {
    line = line.trim();

    // Skip HLS directives
    if (line.startsWith('#') || line === '') {
      return line;
    }

    const url = getFileUrlByName(line, folderId);
    return url || line;
  });

  const newM3u8 = rewritten.join('\n');

  // Save as a new file
  const folder = DriveApp.getFolderById(folderId);
  const file = folder.createFile(
    'index_rewritten.m3u8',
    newM3u8,
    MimeType.PLAIN_TEXT
  );
  
  Logger.log(file.getUrl());
  Logger.log("You may directly use this link as your m3u8 OR upload it first to a github and use jsdelivr to host it. Make sure this file in Github / Drive is public");
  Logger.log(`https://drive.google.com/uc?export=download&id=${file.getId()}`);
}

function getFileUrlByName(filename, folderId) {
  const files = DriveApp.getFolderById(folderId).getFilesByName(filename);

  if (!files.hasNext()) return null;

  const file = files.next();
  return `https://drive.google.com/uc?export=download&id=${file.getId()}`;
}

