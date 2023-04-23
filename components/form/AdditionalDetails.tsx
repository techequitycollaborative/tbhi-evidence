import FormField from "@/components/FormField";
import { validateApplicant } from "@/components/form/ApplicantDetails";
import { validateApplication } from "@/components/form/ApplicationDetails";
import { validateProperty } from "@/components/form/PropertyDetails";
import { validateStart } from "@/components/form/Start";
import { FormProps } from "@/pages";
import { useForm } from "react-hook-form";

export function validateAll(formData: any): { [key: string]: string } {
  const errors = {
    ...validateStart(formData),
    ...validateApplicant(formData),
    ...validateProperty(formData),
    ...validateApplication(formData),
  };
  // any final validation needed?
  return errors;
}

const AdditionalDetails = (props: FormProps) => {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  return (
    <div>
      <p>Additional Details</p>
      <p>Please fill out any additional supporting information</p>
      <div>
        <FormField
          {...props}
          labelId="additionalContextNotes"
          labelText="Additional context notes"
          formDataKey="additionalContextNotes"
          type="text"
        />
      </div>
      <div>
        <p className="fake-label">Upload file(s)</p>
        <p>Upload goes here</p>
      </div>
    </div>
  );
};

export default AdditionalDetails;
