import {
  ApplicationMethod,
  AssessmentOutcome,
  CriminalHistoryType,
  DenialReason,
  EvictionReason,
  Race,
} from "./formoptions";

// TODO: use this type in final validation step so that a type error occurs if a field is missing
export interface SubmittableFormData {
  email: string;
  race: Race;
  age?: number;
  yearlyIncome?: number;
  creditScore?: number;
  evictionHistory: Array<Eviction>;
  criminalHistory: Array<CriminalHistoryEntry>;
  street: string;
  unit: string;
  city: string;
  zipcode: number;
  monthlyRent?: number;
  landlordName: string;
  screeningCompanyName: string;
  screeningFee?: number;
  portableScreeningFee?: "Yes" | "No";
  applicationMethod?: ApplicationMethod;
  assessmentOutcome?: AssessmentOutcome;
  assessmentOutcomeDetails?: string;
  denialReason?: DenialReason;
  otherDenialReason?: string;
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
