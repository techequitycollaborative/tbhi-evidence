import { validateApplicantDetails } from "./ApplicantDetails";
import { validateStart } from "./start";
import { validateStep2 } from "./step2";
import { validateStep3 } from "./step3";

export function validateAll(formData: any): { [key: string]: string } {
  const errors = {
    ...validateStart(formData),
    ...validateApplicantDetails(formData),
    ...validateStep2(formData),
    ...validateStep3(formData),
  };
  // any final validation needed?
  return errors;
}
