import { uploadPlateScan } from "@/api/request/file/uploadPlateScan";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadPlateScan
  });
};
