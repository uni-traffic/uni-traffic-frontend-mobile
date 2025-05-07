import { uploadImageApi } from "@/api/request/file/uploadImage";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (imageUri: string) => uploadImageApi(imageUri)
  });
};
