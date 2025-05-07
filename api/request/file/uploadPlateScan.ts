import { getItem } from "@/lib/tokenStorage";
import axios, { type AxiosError } from "axios";

export const uploadPlateScan = async (formData: FormData): Promise<string> => {
  const token = await getItem("RECOGNIZER_TOKEN");
  try {
    const response = await axios.post("https://api.platerecognizer.com/v1/plate-reader", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`
      }
    });

    const responseData = response.data;
    if (responseData.results[0].plate) {
      return (responseData.results[0].plate as string).toUpperCase();
    }

    throw new Error("Failed to extract plate from image.");
  } catch (err) {
    const error = err as AxiosError | Error;
    console.error(error.message);

    throw new Error(error.message);
  }
};
