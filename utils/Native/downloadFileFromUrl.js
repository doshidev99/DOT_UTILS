const onDownloadImagePress = ({ file, nameFile, type }) => {
  const {
    dirs: { DownloadDir, DocumentDir }
  } = RNFetchBlob.fs;

  // eslint-disable-next-line no-console
  console.log(DownloadDir, "<----");
  const pathDownload = Platform.select({
    ios: DocumentDir,
    android: DownloadDir
  });
  const fileEx = nameFile;

  const fPath = `${pathDownload}/${fileEx}`;

  const configOptions = Platform.select({
    ios: {
      fileCache: true,
      path: fPath,
      appendExt: type
    },
    android: {
      fileCache: true,
      appendExt: type,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${pathDownload}/${fileEx}`,
        description: type
      }
    }
  });

  RNFetchBlob.config(configOptions)
    .fetch("GET", file)
    .then(res => {
      console.log(res.path());
    });
};
