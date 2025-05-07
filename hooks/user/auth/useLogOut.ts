import { logout } from "@/api/request/user/auth/logout";
import type { UserLoginResponse } from "@/lib/types";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation
} from "@tanstack/react-query";

export const useLogOut = (
  options?: UseMutationOptions<UserLoginResponse, Error, null>
): UseMutationResult<UserLoginResponse, Error, null> => {
  return useMutation({
    mutationFn: logout,
    ...options
  });
};
