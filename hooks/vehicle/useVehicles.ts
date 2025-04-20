import { getVehicles } from "@/api/request/vehicle/getVehicles";
import { useQuery } from "@tanstack/react-query";

export const useVehicles = ({
  id,
  ownerId,
  licensePlate,
  stickerNumber,
  sort,
  searchKey,
  count,
  page
}: {
  id?: string;
  ownerId?: string;
  licensePlate?: string;
  stickerNumber?: string;
  sort?: "1" | "2";
  searchKey?: string;
  count: number;
  page: number;
}) => {
  return useQuery({
    queryKey: ["vehicles", id, ownerId, licensePlate, stickerNumber, sort, searchKey, count, page],
    queryFn: () =>
      getVehicles({
        id,
        ownerId,
        licensePlate,
        stickerNumber,
        sort,
        searchKey,
        count,
        page
      }),
    staleTime: 60 * 1000,
    enabled: count > 0 && page > 0
  });
};
