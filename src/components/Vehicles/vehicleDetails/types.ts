export interface Outlay {
  id: number;
  date: string;
  amount: number;
  description: string;
}

export interface Note {
  id: number;
  text: string;
  date: string;
}

export interface Document {
  id: number;
  url: string;
  name: string;
  type: string;
}

export interface Vehicle {
  id: number;
  registrationNumber: string;
  model: string;
  vehicleName: string;
  year: number;
  category: string;
  status: string;
  importOrigin: string;
  registrationDate: string;
  price: number;
  mileage: number;
  daysInStock: number;
  fuelType: string;
  gearbox: string;
  drive: string;
  color: string;
  horsepower: string;
  notes: Note[];
  outlay?: Outlay[];
  equipment: { [key: string]: boolean };
  documents: Document[];
  type: string;
  chassisNumber: string;
  preRegistrationDate: string;
  registrationRenewed: string;
  statusDate: string;
  engineVolume: string;
  maxSpeed: string;
  serviceWeight: number;
  totalWeight: number;
  vehicleWeight: number;
  passengers: number;
  variant: string;
  version: string;
  typeCode: string;
  ecoCertificate: string;
  currentOwner: string;
  acquisitionDate: string;
  totalOwners: number;
  organizationOwner: string;
  lastInspection: string;
  nextInspectionDue: string;
  inspectionMileage: number;
  inspectionStation: string;
  importID: string;
  directImport: string;
  createdAt: string;
  updatedAt: string;
}
