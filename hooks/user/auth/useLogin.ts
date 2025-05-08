import { login } from "@/api/request/user/auth/login";
import type { UserLoginResponse } from "@/lib/types";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation
} from "@tanstack/react-query";

type Payload = {
  username: string;
  password: string;
};

export const useLogin = (
  options?: UseMutationOptions<UserLoginResponse, Error, Payload>
): UseMutationResult<UserLoginResponse, Error, Payload> => {
  return useMutation({
    mutationFn: login,
    ...options
  });
};
