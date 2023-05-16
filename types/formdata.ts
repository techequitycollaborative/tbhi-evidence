import {
  ApplicationMethod,
  AssessmentOutcome,
  CriminalHistoryType,
  DenialReason,
  EvictionReason,
  Race,
  Ethnicity,
  Organization,
} from "./formoptions";

// TODO: use this type in final validation step so that a type error occurs if a field is missing
export interface SubmittableFormData {
  email?: string;
  userType: string;
  shareConsent?: string;
  organization?: Organization;
  race: Race;
  ethnicity: Ethnicity;
  age: number;
  yearlyIncome: number;
  creditScore?: string;
  rentalDebt?: string;
  evictionHistory?: Array<Eviction>;
  criminalHistory?: Array<CriminalHistoryEntry>;
  street?: string;
  unit?: string;
  city: string;
  state: string;
  zipcode: string;
  monthlyRent: number;
  propertyManagementCompany?: string;
  screeningCompanyName?: string;
  screeningFee?: number;
  portableScreeningFee?: string;
  applicationMethod?: ApplicationMethod;
  portalName?: string;
  housingVoucher?: string;
  incomeCertification?: string;
  assessmentOutcome: AssessmentOutcome;
  assessmentOutcomeDetails?: string;
  denialReason?: DenialReason;
  applicationDate?: Date;
  otherDenialReason?: string;
  alternateDenialNotes?: string;
  additionalContextNotes?: string;
}

export type FormData = {
  [Property in keyof SubmittableFormData]+?: SubmittableFormData[Property];
};

export interface Eviction {
  evictionReason: EvictionReason;
  evictionDate: Date;
}

export interface CriminalHistoryEntry {
  criminalHistoryType: CriminalHistoryType;
  convictionDate: Date;
  offenseName: string;
}
