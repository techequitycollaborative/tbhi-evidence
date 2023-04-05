import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  formData: any;
  setFormData: (e: any) => void;
  setDisableNext: (e: boolean) => void;
};

const AdditionalDetails = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    console.log("applicant details errors", errors, isValid);
    if (isValid) {
      props.setDisableNext(false);
    } else {
      props.setDisableNext(true);
    }
  }, [isValid]);

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
            {...register("additionalContextNotes", {
              required: "required",
            })}
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
