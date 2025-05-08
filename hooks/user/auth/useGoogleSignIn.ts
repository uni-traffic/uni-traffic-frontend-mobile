import { googleSignIn } from "@/api/request/user/auth/googleSignIn";
import type { UserLoginResponse } from "@/lib/types";
import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation
} from "@tanstack/react-query";

type Payload = {
  token: string;
  clientType: "WEB" | "MOBILE";
};

export const useGoogleSignIn = (
  options?: UseMutationOptions<UserLoginResponse, Error, Payload>
): UseMutationResult<UserLoginResponse, Error, Payload> => {
  return useMutation({
    mutationFn: googleSignIn,
    ...options
  });
};
