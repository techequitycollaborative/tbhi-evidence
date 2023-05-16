// Applicant Details
export const Race = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Native Hawaiian or Other Pacific Islander",
  "White",
  "Two or More Races",
  "No Response",
] as const;
export type Race = (typeof Race)[number];

export const Ethnicity = [
  "Hispanic/Latino",
  "Not Hispanic/Latino",
  "No Response",
] as const;
export type Ethnicity = (typeof Ethnicity)[number];

export const Organization = [
  "Organization 1",
  "Organization 2",
  "Organization 3",
] as const;
export type Organization = (typeof Organization)[number];

export const EvictionReason = ["Reason 1", "Reason 2", "Reason 3"] as const;
export type EvictionReason = (typeof EvictionReason)[number];

export const CriminalHistoryType = ["Mideameanor", "Felony"] as const;
export type CriminalHistoryType = (typeof CriminalHistoryType)[number];

export const PortableScreeningFee = ["Yes", "No", "Not Sure"];
export type PortableScreeningFee = (typeof PortableScreeningFee)[number];

export const ApplicationMethod = ["In Person", "Online"] as const;
export type ApplicationMethod = (typeof ApplicationMethod)[number];

export const HousingVoucher = ["Yes", "No", "Not Sure"] as const;
export type HousingVoucher = (typeof HousingVoucher)[number];

export const IncomeCertification = ["The property has income certification requirements", "The property does not have income certification requirements", "Not Sure"] as const;
export type IncomeCertification = (typeof IncomeCertification)[number];

export const AssessmentOutcome = ["Accepted", "Accepted with conditions (such as increased deposit or \"risk fee\")", "Denied"] as const;
export type AssessmentOutcome = (typeof AssessmentOutcome)[number];

export const DenialReason = [
  "Credit score",
  "Income",
  "Eviction history",
  "Criminal history",
  "Unverifiable identity",
  "No reason given",
  "Other",
] as const;
export type DenialReason = (typeof DenialReason)[number];
