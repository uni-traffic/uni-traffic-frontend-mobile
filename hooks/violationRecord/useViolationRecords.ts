import { getViolationRecords } from "@/api/request/violationRecord/getViolationRecords";
import type { GetViolationRecordResponse } from "@/lib/types";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";

export const useViolationRecords = ({
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
}): UseQueryResult<GetViolationRecordResponse> => {
  return useQuery({
    queryKey: [
      "violationRecords",
      id,
      vehicleId,
      userId,
      violationId,
      reportedById,
      status,
      count,
      page
    ],
    queryFn: () =>
      getViolationRecords({
        id,
        vehicleId,
        userId,
        violationId,
        reportedById,
        status,
        count,
        page
      })
  });
};
