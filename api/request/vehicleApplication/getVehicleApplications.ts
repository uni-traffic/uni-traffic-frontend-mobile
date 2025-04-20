import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getVehicleApplications = async ({
  id,
  schoolId,
  driverLicenseId,
  licensePlate,
  status,
  applicantId,
  userType,
  count,
  page
}: {
  id?: string;
  schoolId?: string;
  driverLicenseId?: string;
  licensePlate?: string;
  status?: string;
  applicantId?: string;
  userType?: string;
  count: number;
  page: number;
}) => {
  try {
    const response = await api.get("/vehicle-application/search", {
      params: {
        id,
        schoolId,
        driverLicenseId,
        licensePlate,
        status,
        applicantId,
        userType,
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
