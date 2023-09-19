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
  "East Bay Community Law Center",
  "Sourthern Louisiana Legal Services",
  "Equal Rights Center",
] as const;
export type Organization = (typeof Organization)[number];

export const EvictionHistory = [
  "Been served with an eviction notice", 
  "Been served with a nonpayment notice", 
  "Contested an eviction",
  "Been sued in an eviction case",
  "Had an eviction case that was dismissed"
] as const;
export type EvictionHistory = (typeof EvictionHistory)[number];

export const CriminalHistory = [
  "Been arrested",
  "Been charged with a misdemeanor",
  "Been charged with a felony",
  "Been convicted of a misdemeanor",
  "Been convicted of a felony",
  "Had conviction(s) that were expunged",
] as const;
export type CriminalHistory = (typeof CriminalHistory)[number];

export const TimeframeOptions = [
  "One of these has happened in the last 5 years",
  "One of these has happened in the last 10 years",
  "Not Sure",
] as const;
export type TimeframeOptions = (typeof TimeframeOptions)[number];

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
  "Credit",
  "Income",
  "Eviction history",
  "Criminal history",
  "Unverifiable identity",
  "No reason given",
  "Other",
] as const;
export type DenialReason = (typeof DenialReason)[number];
