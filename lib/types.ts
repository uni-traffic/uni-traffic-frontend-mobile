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

export interface Vehicle {
  id: string;
  ownerId: string;
  licenseNumber: string;
  stickerNumber: string;
  isActive: boolean;
  owner: User
}