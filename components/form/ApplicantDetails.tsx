import FormField from "@/components/FormField";
import { FormProps } from "@/pages";
import { FormData } from "@/types/formdata";
import { CriminalHistory, Ethnicity, EvictionHistory, Race, TimeframeOptions } from "@/types/formoptions";
import { useState } from "react";
import { useForm } from "react-hook-form";

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateApplicant(formData: FormData) {
  const errors: any = {};

  if (!formData.race) {
    errors.race = "Race is required";
  } else if (!Race.includes(formData.race)) {
    errors.race = "Race must be from provided list";
  }

  if (!formData.ethnicity) {
    errors.ethnicity = "Ethnicity is required";
  } else if (!Ethnicity.includes(formData.ethnicity)) {
    errors.ethnicity = "Ethnicity must be from provided list";
  }

  if (!formData.age) {
    errors.age = "Age is required";
  } else if (isNaN(formData.age) || formData.age < 1) {
    errors.age = "Age must be a positive number";
  }

  if (!isNaN(formData.yearlyIncome) && formData.yearlyIncome < 0) {
    errors.yearlyIncome = "Yearly income must be a non-negative number.";
  }

  if (formData.rentalDebt && (!parseInt(formData.rentalDebt) || parseInt(formData.rentalDebt) < 0)) {
    errors.rentalDebt = "Rental debt must be a positive number";
  }
  
  return errors;
}

const ApplicantDetails = (props: FormProps) => {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  const [criminalHistoryRows, setCriminalHistoryRows] = useState(
    props.formData.criminalHistory?.length ?? 1
  );
  const [evictionHistoryRows, setEvictionHistoryRows] = useState(
    props.formData.evictionHistory?.length ?? 1
  );

  return (
    <div>
      <h2>Applicant Details</h2>
      <p className="text-center text-navy italic">* = required field</p>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="race"
          labelText="Race*"
          formDataKey="race"
          placeholder="select one"
          type="select"
          options={Race as readonly string[]}
        />
        <FormField
          {...props}
          labelId="ethnicity"
          labelText="Ethnicity*"
          formDataKey="ethnicity"
          placeholder="select one"
          type="select"
          options={Ethnicity as readonly string[]}
        />
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="age"
          labelText="Age*"
          formDataKey="age"
          placeholder="applicant's age"
          type="number"
        />
        <FormField
          {...props}
          labelId="yearlyIncome"
          labelText="Yearly Income"
          formDataKey="yearlyIncome"
          placeholder="approximate yearly income"
          type="number"
        />
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="creditScore"
          labelText="Credit Score"
          formDataKey="creditScore"
          placeholder="applicant's credit score"
          type="text"
        />
        <FormField
          {...props}
          labelId="rentalDebt"
          labelText="Rental Debt"
          formDataKey="rentalDebt"
          placeholder="estimated amount, if applicable"
          type="text"
        />
      </div>
      <div className="flex gap-4 mt-6 w-full">
        <FormField
          {...props}
          labelId="evictionHistory"
          labelText="Eviction History (check all that apply)"
          formDataKey="evictionHistory"
          type="multiselect"
          prompt="Have you ever:"
          options={EvictionHistory}
        />
        <FormField
          {...props}
          labelId="criminalHistory"
          labelText="Criminal History (check all that apply)"
          formDataKey="criminalHistory"
          type="multiselect"
          prompt="Have you ever:"
          options={CriminalHistory}
        />
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="evictionHistoryTimeframe"
          labelText="Most Recent Eviction History"
          formDataKey="evictionHistoryTimeframe"
          placeholder="select one"
          type="select"
          options={TimeframeOptions}
        />
        <FormField
          {...props}
          labelId="criminalHistoryTimeframe"
          labelText="Most Recent Criminal History"
          formDataKey="criminalHistoryTimeframe"
          placeholder="select one"
          type="select"
          options={TimeframeOptions}
        />
      </div>
    </div>
  );
};

export default ApplicantDetails;
