import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getViolationRecords = async ({
  id,
  vehicleId,
  userId,
  violationId,
  reportedById,
  status,
  count,
  page
}: {
  id?: string;
  vehicleId?: string;
  userId?: string;
  violationId?: string;
  reportedById?: string;
  status?: "UNPAID" | "PAID";
  count?: number;
  page?: number;
}) => {
  try {
    const response = await api.get("/violation-record/search", {
      params: {
        id,
        vehicleId,
        userId,
        violationId,
        reportedById,
        status,
        count,
        page
      }
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.warn(error);
    throw new Error(error.message);
  }
};
