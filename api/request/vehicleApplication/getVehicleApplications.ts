import api from "@/api/axios";
import type { AxiosError } from "axios";

export const getVehicleApplications = async ({
  id,
  schoolId,
  driverLicenseId,
  driverLastName,
  driverFirstName,
  firstName,
  lastName,
  licensePlate,
  status,
  applicantId,
  userType,
  sort,
  searchKey,
  count,
  page
}: {
  id?: string;
  schoolId?: string;
  driverLicenseId?: string;
  driverLastName?: string;
  driverFirstName?: string;
  firstName?: string;
  lastName?: string;
  licensePlate?: string;
  status?: string;
  applicantId?: string;
  userType?: string;
  sort?: "1" | "2";
  searchKey?: string;
  count?: number;
  page?: number;
}) => {
  try {
    const response = await api.get("/vehicle-application/search", {
      params: {
        id,
        schoolId,
        driverLicenseId,
        driverLastName,
        driverFirstName,
        firstName,
        lastName,
        licensePlate,
        status,
        applicantId,
        userType,
        sort,
        searchKey,
        count,
        page
      }
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
