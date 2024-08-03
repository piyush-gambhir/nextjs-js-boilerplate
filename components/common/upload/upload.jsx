"use client";
import React, { useState } from "react";
import {
  uploadFileToBucket,
  getDownloadUrl,
  getPresignedPostUrl,
  getFileUrl,
} from "@/lib/aws/s3";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [presignedPostUrl, setPresignedPostUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      const filename = file.name;
      const result = await uploadFileToBucket(file, filename);
      setMessage(`File uploaded successfully: ${result.Location}`);

      const downloadUrl = await getDownloadUrl(filename);
      setDownloadUrl(downloadUrl);

      const presignedPost = await getPresignedPostUrl(filename, file.type);
      setPresignedPostUrl(presignedPost.url);
    } catch (error) {
      setMessage(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
      {downloadUrl && (
        <div>
          <p>
            Download URL:{" "}
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              {downloadUrl}
            </a>
          </p>
        </div>
      )}
      {presignedPostUrl && (
        <div>
          <p>
            Presigned Post URL:{" "}
            <a
              href={presignedPostUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {presignedPostUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
