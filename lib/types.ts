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
  driver: Driver;
  schoolMember: SchoolMember;
  images: VehicleImages;
  type: string;
  status: string;
  stickerNumber: string;
  owner: User | null;
}

export interface GetVehicleResponse {
  vehicles: Vehicle[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
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
  evidence: string[];
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

export interface VehicleApplication {
  id: string;
  stickerNumber: string | null;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
  schoolMember: SchoolMember;
  driver: Driver;
  vehicle: {
    make: string;
    series: string;
    type: string;
    model: string;
    licensePlate: string;
    certificateOfRegistration: string;
    officialReceipt: string;
    frontImage: string;
    sideImage: string;
    backImage: string;
  };
  status: string;
  applicantId: string;
  applicant?: User;
}

export interface Driver {
  licenseId: string;
  firstName: string;
  lastName: string;
  licenseImage: string;
  selfiePicture: string;
}

export interface SchoolMember {
  schoolId: string;
  firstName: string;
  lastName: string;
  type: string;
  schoolCredential: string;
}

export interface VehicleImages {
  front: string;
  back: string;
  side: string;
  receipt: string;
  registration: string;
}

export interface GetVehicleApplicationResponse {
  vehicleApplication: VehicleApplication[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}

export interface GetViolationResponse {
  violation: Violation[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  isDeleted: boolean;
}

export interface GetVehicleResponse {
  vehicles: Vehicle[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}

export interface GetViolationRecordResponse {
  violation: ViolationRecord[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}

export interface UserLoginResponse {
  user: User;
  appKey: string;
  accessToken: string;
}
