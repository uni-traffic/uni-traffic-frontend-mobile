/**
 * TODO: Include image: string
 */
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  appKey: string;
  accessToken: string;
}

export interface Vehicle {
  id: string;
  ownerId: string;
  licensePlate: string;
  make: string;
  model: string;
  series: string;
  color: string;
  type: string;
  images: string[];
  stickerNumber: string;
  isActive: boolean;
  owner: User;
}

export interface Violation {
  id: string;
  category: string;
  violationName: string;
  penalty: number;
}
