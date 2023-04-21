import { ApplicationMethod, AssessmentOutcome, CriminalHistoryType, DenialReason, EvictionReason, Race } from './formoptions';

export interface FormData {
  email: string,
  race: Race,
  age: number | undefined,
  yearlyIncome: number | undefined,
  creditScore: number | undefined,
  evictionHistory: Array<Eviction>,
  criminalHistory: Array<CriminalHistoryEntry>,
  street: string,
  unit: string,
  city: string,
  zipcode: string,
  monthlyRent: number | undefined,
  landlordName: string,
  screeningCompanyName: string,
  screeningFee: number | undefined,
  portableScreeningFee: "Yes" | "No" | undefined,
  applicationMethod: ApplicationMethod | undefined,
  assessmentOutcome: AssessmentOutcome | undefined,
  assessmentOutcomeDetails: string,
  denialReason: DenialReason | undefined,
  otherDenialReason: string,
  additionalContextNotes: string,
};

export interface Eviction {
  evictionReason: EvictionReason,
  evictionDate: Date,
};

export interface CriminalHistoryEntry {
  criminalHistoryType: CriminalHistoryType,
  convictionDate: Date,
  offenseName: string,
}