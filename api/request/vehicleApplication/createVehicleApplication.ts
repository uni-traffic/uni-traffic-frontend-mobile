import api from "@/api/axios";
import type { AxiosError } from "axios";

export const createVehicleApplication = async (payload: {
  schoolId: string;
  firstName: string;
  lastName: string;
  userType: "STUDENT" | "STAFF";
  schoolCredential: string;

  driverFirstName: string;
  driverLastName: string;
  driverLicenseId: string;
  driverLicenseImage: string;
  driverSelfiePicture: string;

  make: string;
  series: string;
  type: string;
  model: string;
  licensePlate: string;
  certificateOfRegistration: string;
  officialReceipt: string;
  frontImage: string;
  sideImage: string;
  backImage: string;

  remarks?: string;
}) => {
  try {
    const response = await api.post("/vehicle-application/create", payload);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.error(error);
    throw new Error(error.message);
  }
};
