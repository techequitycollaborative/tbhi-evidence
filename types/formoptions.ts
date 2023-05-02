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
  "Ethnicity 1",
  "Ethnicity 2",
  "Ethnicity 3",
] as const;
export type Ethnicity = (typeof Ethnicity)[number];

export const EvictionReason = ["Reason 1", "Reason 2", "Reason 3"] as const;
export type EvictionReason = (typeof EvictionReason)[number];

export const CriminalHistoryType = ["Mideameanor", "Felony"] as const;
export type CriminalHistoryType = (typeof CriminalHistoryType)[number];

export const PortableScreeningFee = ["Yes", "No"];
export type PortableScreeningFee = (typeof PortableScreeningFee)[number];

export const ApplicationMethod = ["Method 1", "Method 2", "Method 3"] as const;
export type ApplicationMethod = (typeof ApplicationMethod)[number];

export const AssessmentOutcome = ["Accepted", "Denied"] as const;
export type AssessmentOutcome = (typeof AssessmentOutcome)[number];

export const DenialReason = [
  "Credit score",
  "Income",
  "Criminal history",
  "Unverifiable identity",
  "No reason given",
  "Other",
] as const;
export type DenialReason = (typeof DenialReason)[number];
