type UploadFileData = {
  key: string;
  url: string;
};

export type UploadFileResponse = {
  message: string;
  data: UploadFileData;
  http_status: number;
};
