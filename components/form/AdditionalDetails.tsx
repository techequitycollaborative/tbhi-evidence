import { useForm } from "react-hook-form";
import { FormProps } from "@/pages";
import { validateApplicant } from "@/components/form/ApplicantDetails";
import { validateApplication } from "@/components/form/ApplicationDetails";
import { validateProperty } from "@/components/form/PropertyDetails";
import { validateStart } from "@/components/form/Start";

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
        <label>
          Additional context notes
          <textarea
            id="additional-context-notes"
            placeholder="additionalContextNotes"
            value={props.formData.additionalContextNotes}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                additionalContextNotes: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Upload files
          <p>Upload goes here</p>
        </label>
      </div>
    </div>
  );
};

export default AdditionalDetails;
