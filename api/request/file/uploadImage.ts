import api from "@/api/axios";
import type { AxiosError } from "axios";

export const uploadImageApi = async (imageUri: string): Promise<string> => {
  try {
    const formData = new FormData();
    const mimeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png"
    };

    const fileType = imageUri.split(".").pop()?.toLowerCase() ?? "jpg";
    const mimeType = mimeMap[fileType] ?? "image/jpeg";

    // @ts-ignore
    formData.append("image", {
      uri: imageUri,
      name: `upload_${Date.now()}.${fileType}`,
      type: mimeType
    });

    const response = await api.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data.path;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error.message);
    throw new Error(error.message);
  }
};
