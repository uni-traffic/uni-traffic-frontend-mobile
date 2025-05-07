import { createVehicleApplication } from "@/api/request/vehicleApplication/createVehicleApplication";
import { useMutation } from "@tanstack/react-query";

export const useCreateVehicleApplication = () => {
  return useMutation({
    mutationFn: createVehicleApplication
  });
};
