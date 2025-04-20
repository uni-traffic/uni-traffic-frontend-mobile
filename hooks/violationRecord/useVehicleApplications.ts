import { getVehicleApplications } from "@/api/request/vehicleApplication/getVehicleApplications";
import { useQuery } from "@tanstack/react-query";

export const useVehicleApplications = ({
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
  return useQuery({
    queryKey: [
      "vehicleApplications",
      id,
      schoolId,
      driverLicenseId,
      licensePlate,
      status,
      applicantId,
      userType,
      count,
      page
    ],
    queryFn: () =>
      getVehicleApplications({
        id,
        schoolId,
        driverLicenseId,
        licensePlate,
        status,
        applicantId,
        userType,
        count,
        page
      }),
    enabled: count > 0 && page > 0,
    staleTime: 60 * 1000
  });
};
