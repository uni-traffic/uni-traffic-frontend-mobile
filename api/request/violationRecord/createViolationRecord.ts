import api from "@/api/axios";
import type { AxiosError } from "axios";

export const createViolationRecord = async (payload: {
  violationId: string;
  vehicleId?: string;
  licensePlate?: string;
  stickerNumber?: string;
  remarks?: string;
}) => {
  try {
    const response = await api.post("/violation-record/create", payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
