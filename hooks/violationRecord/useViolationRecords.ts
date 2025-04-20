import { getViolationRecords } from "@/api/request/violationRecord/getViolationRecords";
import { useQuery } from "@tanstack/react-query";

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
}) => {
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
      }),
    staleTime: 60 * 1000,
    enabled: !!(
      id ||
      vehicleId ||
      userId ||
      violationId ||
      reportedById ||
      status ||
      count !== undefined ||
      page !== undefined
    )
  });
};
