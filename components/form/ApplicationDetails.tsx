import FormField from "@/components/FormField";
import { FormProps } from "@/pages";
import {
  ApplicationMethod,
  AssessmentOutcome,
  DenialReason,
  PortableScreeningFee,
  HousingVoucher,
  IncomeCertification,
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

  if (!formData.applicationDate) {
    errors.applicationDate = "Application date is required";
  }

  if (!formData.screeningFee) {
    errors.screeningFee = "Costs paid is required";
  } else if (!parseInt(formData.screeningFee) || parseInt(formData.screeningFee) < 0) {
    errors.screeningFee = "Costs paid must be a non-negative number.";
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

  if (formData.assessmentOutcome === "Denied") {
    if (!formData.denialReason) {
      errors.denialReason = "If assessment was denied, reason is required";
    } else if (!DenialReason.includes(formData.denialReason)) {
      errors.denialReason = "Denial reason must be from provided list";
    } else if (formData.denialReason === "Other" && !formData.otherDenialReason) {
      errors.otherDenialReason = "Denial reason explanation is required";
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
      <h2>Application Details</h2>
      <p className="text-center text-navy italic">* = required field</p>
      <div className="flex gap-4 w-full">
          <FormField
            {...props}
            labelId="screeningCompanyName"
            labelText="Name of Screening Company*"
            formDataKey="screeningCompanyName"
            placeholder="enter name of company on application"
            type="text"
          />
          <FormField
            {...props}
            labelId="applicationDate"
            labelText="Application Date*"
            formDataKey="applicationDate"
            placeholder="date of application"
            type="date"
          />
      </div>
      <div className="flex gap-4 w-full mb-2">
          <p className="flex-1 text-sm px-1">If unsure, write &quot;not provided&quot;, or include any details you do know</p>
          <p className="flex-1 text-sm px-1">If unsure of exact date, an estimate is fine</p>
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="screeningFee"
          labelText="Costs Paid to Apply*"
          formDataKey="screeningFee"
          placeholder="total $ spent on this application"
          type="number"
        />
        <FormField
          {...props}
          labelId="portableScreeningFee"
          labelText="Did You Use a Portable Screening Fee*"
          formDataKey="portableScreeningFee"
          placeholder="select one"
          type="select"
          options={PortableScreeningFee}
        />
      </div>
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <FormField
            {...props}
            labelId="applicationMethod"
            labelText="Application Method*"
            formDataKey="applicationMethod"
            placeholder="select one"
            type="select"
            options={ApplicationMethod}
          />
        </div>
        <div className={props.formData?.applicationMethod === "Online" ? "flex-1 visible" : "flex-1 invisible"}>
          <FormField
            {...props}
            labelId="portalName"
            labelText="Name of Online Portal"
            formDataKey="portalName"
            placeholder="enter the name of the online portal"
            type="text"
          />
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="housingVoucher"
          labelText="Do You Have a Housing Voucher?"
          formDataKey="housingVoucher"
          placeholder="select one"
          type="select"
          options={HousingVoucher}
        />
        <FormField
          {...props}
          labelId="incomeCertification"
          labelText="Income Certification"
          formDataKey="incomeCertification"
          placeholder="select one"
          type="select"
          options={IncomeCertification}
        />
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="assessmentOutcome"
          labelText="Assessment Outcome*"
          formDataKey="assessmentOutcome"
          placeholder="select one"
          type="select"
          options={AssessmentOutcome}
        />
        <FormField
          {...props}
          labelId="assessmentOutcomeDetails"
          labelText="&nbsp;"
          formDataKey="assessmentOutcomeDetails"
          placeholder="enter details if applicable"
          type="text"
        />
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="denialReason"
          labelText="Reason Provided for Denial"
          formDataKey="denialReason"
          placeholder="select one"
          type="select"
          options={DenialReason}
        />
        <FormField
          {...props}
          labelId="otherDenialReason"
          labelText="&nbsp;"
          formDataKey="otherDenialReason"
          placeholder="if other, explain here"
          type="text"
        />
      </div>
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <FormField
            {...props}
            labelId="alternateDenialNotes"
            labelText="Application Denial Notes"
            formDataKey="alternateDenialNotes"
            placeholder="If you believe you were denied for a reason other than the one provided on your application, please explain"
            type="textarea"
          />
        </div>
        <div className="flex-1">
          <FormField
            {...props}
            labelId="additionalContextNotes"
            labelText="Additional Context"
            formDataKey="additionalContextNotes"
            placeholder="Please share any additional notes about your application"
            type="textarea"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
