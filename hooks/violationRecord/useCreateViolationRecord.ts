import { createViolationRecord } from "@/api/request/violationRecord/createViolationRecord";
import type { ViolationRecord } from "@/lib/types";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation
} from "@tanstack/react-query";

type Payload = {
  violationId: string;
  evidence: string[];
  vehicleId?: string;
  licensePlate?: string;
  stickerNumber?: string;
  remarks?: string;
};

export const useCreateViolationRecord = (
  options?: UseMutationOptions<ViolationRecord, Error, Payload>
): UseMutationResult<ViolationRecord, Error, Payload> => {
  return useMutation({
    mutationFn: createViolationRecord,
    ...options
  });
};
