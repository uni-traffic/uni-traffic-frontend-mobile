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
}

export interface VehicleApplication {
  id: string;
  stickerNumber: string | null;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
  schoolMember: {
    schoolId: string;
    firstName: string;
    lastName: string;
    type: string;
    schoolCredential: string;
  };
  driver: {
    firstName: string;
    lastName: string;
    licenseId: string;
    licenseImage: string;
  };
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
