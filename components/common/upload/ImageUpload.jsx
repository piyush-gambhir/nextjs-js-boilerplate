"use client";
import React, { useState } from "react";
import Image from "next/image";

import { validateImageFile } from "@/lib/utils/validation";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateImageFile({ imageFile: file });
      if (!validation.valid) {
        setError(validation.message);
        setImage(null);
        setPreview(null);
        return;
      }
      setError("");
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image to upload");
      return;
    }

    setUploading(true);
    try {
      const fileName = `${image.name}`;

      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-5 rounded-md border border-gray-300 p-2"
        />
        {error && <p className="mb-5 text-red-500">{error}</p>}
        {preview && (
          <Image
            src={preview}
            alt="Image preview"
            className="mb-5 max-h-52 rounded-lg border-2 border-gray-300"
            width={200}
            height={200}
          />
        )}
        <button
          type="submit"
          className="rounded-md bg-green-500 px-5 py-2 text-white hover:bg-green-600"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}

export default ImageUpload;
