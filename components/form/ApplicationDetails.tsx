import FormField from "@/components/FormField";
import { FormProps } from "@/pages";
import {
  ApplicationMethod,
  AssessmentOutcome,
  DenialReason,
  PortableScreeningFee,
} from "@/types/formoptions";
import { useForm } from "react-hook-form";

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateApplication(formData: any): { [key: string]: string } {
  const errors: any = {};

  if (!formData.screeningCompanyName) {
    errors.screeningCompanyName = "Screening company name is required";
  }

  if (!formData.screeningFee) {
    errors.screeningFee = "Screening fee is required";
  } else if (!parseInt(formData.screeningFee) || parseInt(formData.screeningFee) < 0) {
    errors.screeningFee = "Screening fee must be a non-negative number.";
  }

  if (!formData.portableScreeningFee) {
    errors.portableScreeningFee = "Portable screening fee answer is required";
  } else if (!PortableScreeningFee.includes(formData.portableScreeningFee)) {
    errors.portableScreeningFee = "Portable screening fee answer must be from provided list";
  }

  if (!formData.applicationMethod) {
    errors.applicationMethod = "Application method is required";
  } else if (!ApplicationMethod.includes(formData.applicationMethod)) {
    errors.applicationMethod = "Application method must be from provided list";
  }

  if (!formData.assessmentOutcome) {
    errors.assessmentOutcome = "Assessment outcome answer is required";
  } else if (!AssessmentOutcome.includes(formData.assessmentOutcome)) {
    errors.assessmentOutcome = "Assessment outcome answer must be from provided list";
  }

  if (formData.assessmentOutcome === "denied") {
    if (!formData.denialReason) {
      errors.denialReason = "Denial reason is required";
    } else if (!DenialReason.includes(formData.denialReason)) {
      errors.denialReason = "Denial reason must be from provided list";
    } else if (formData.denialReason === "other" && !formData.denialReasonOther) {
      errors.denialReasonOther = "Denial reason explanation is required";
    }
  }

  return errors;
}

const ApplicationDetails = (props: FormProps) => {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  return (
    <div>
      <p>Application Details</p>
      <FormField
        {...props}
        labelId="screeningCompanyName"
        labelText="Name of Screening Company"
        formDataKey="screeningCompanyName"
        placeholder="enter name"
        type="text"
      />
      <FormField
        {...props}
        labelId="screeningFee"
        labelText="Fee Paid"
        formDataKey="screeningFee"
        placeholder="enter fee"
        type="number"
      />
      <FormField
        {...props}
        labelId="portableScreeningFee"
        labelText="Portable Screening Fee"
        formDataKey="portableScreeningFee"
        placeholder="yes/no"
        type="select"
        options={PortableScreeningFee}
      />
      <FormField
        {...props}
        labelId="applicationMethod"
        labelText="Application Method"
        formDataKey="applicationMethod"
        placeholder="select one"
        type="select"
        options={ApplicationMethod}
      />
      <FormField
        {...props}
        labelId="assessmentOutcome"
        labelText="Assessment Outcome"
        formDataKey="assessmentOutcome"
        placeholder="accepted/denied"
        type="select"
        options={AssessmentOutcome}
      />
      <FormField
        {...props}
        labelId="assessmentOutcomeDetails"
        formDataKey="assessmentOutcomeDetails"
        placeholder="enter details if applicable"
        type="text"
      />
      <FormField
        {...props}
        labelId="denialReason"
        labelText="Reason for denial"
        formDataKey="denialReason"
        placeholder="select one"
        type="select"
        options={DenialReason}
      />
      <FormField
        {...props}
        labelId="otherDenialReason"
        formDataKey="denialReason"
        placeholder="if other, explain here"
        type="text"
      />
    </div>
  );
};

export default ApplicationDetails;
