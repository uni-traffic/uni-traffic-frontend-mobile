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
  status: string;
  stickerNumber: string;
  owner: User | null;
}

export interface Violation {
  id: string;
  category: string;
  violationName: string;
  penalty: number;
}

export interface ViolationRecord {
  id: string;
  userId: string;
  reportedById: string;
  violationId: string;
  vehicleId: string;
  status: string;
  remarks: string;
  date: string;
  user: User | null;
  reporter: User | null;
  violation: Violation | null;
  vehicle: Vehicle | null;
  payment: ViolationRecordPayment | null;
}

export interface ViolationRecordPayment {
  id: string;
  cashierId: string;
  violationRecordId: string;
  amountPaid: number;
  remarks: string | null;
  timePaid: Date;
  cashier: User | null;
  violationRecord: ViolationRecord | null;
}
