import FormField from "@/components/FormField";
import { FormProps } from "@/pages";
import { FormData } from "@/types/formdata";
import { CriminalHistoryType, EvictionReason, Race } from "@/types/formoptions";
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

  if (!formData.age) {
    errors.age = "Age is required";
  } else if (isNaN(formData.age) || formData.age < 1) {
    errors.age = "Age must be a positive number";
  }

  if (!formData.yearlyIncome) {
    errors.yearlyIncome = "Yearly income is required";
  } else if (isNaN(formData.yearlyIncome) || formData.yearlyIncome < 0) {
    errors.yearlyIncome = "Yearly income must be a non-negative number.";
  }

  if (!formData.creditScore) {
    errors.creditScore = "Credit score is required";
  } else if (
    isNaN(formData.creditScore) ||
    formData.creditScore < 350 ||
    formData.creditScore > 850
  ) {
    errors.creditScore = "Credit score must be a number between 350 and 850";
  }

  formData.evictionHistory?.forEach((entry) => {
    if (!entry.evictionReason || !entry.evictionDate) {
      errors.evictionHistory = "Must provide eviction reason(s) with date(s).";
    } else if (!EvictionReason.includes(entry.evictionReason)) {
      errors.evictionHistory = "Eviction history reason(s) must be from provided list";
    } else if (entry.evictionDate.toString() === "Invalid Date") {
      errors.evictionHistory = "Eviction date(s) must be in correct format (MM-DD-YYYY).";
    } else if (
      new Date(entry.evictionDate).setUTCHours(0, 0, 0, 0) >= new Date().setUTCHours(0, 0, 0, 0)
    ) {
      errors.evictionHistory = "Eviction date(s) must be in the past.";
    }
  });

  formData.criminalHistory?.forEach((entry) => {
    if (!entry.criminalHistoryType || !entry.convictionDate || !entry.offenseName) {
      errors.criminalHistory =
        "Must provide criminal history type(s) with date(s) and offense name(s).";
    } else if (!CriminalHistoryType.includes(entry.criminalHistoryType)) {
      errors.criminalHistory = "Criminal history type(s) must be from provided list";
    } else if (entry.convictionDate.toString() === "Invalid Date") {
      errors.criminalHistory = "Criminal offense date(s) must be in correct format (MM-DD-YYYY).";
    } else if (
      new Date(entry.convictionDate).setUTCHours(0, 0, 0, 0) >= new Date().setUTCHours(0, 0, 0, 0)
    ) {
      errors.criminalHistory = "Criminal offense date(s) must be in the past.";
    }
  });

  return errors;
}

const ApplicantDetails = (props: FormProps) => {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  const [criminalHistoryRows, setCriminalHistoryRows] = useState(1);
  const [evictionHistoryRows, setEvictionHistoryRows] = useState(1);

  return (
    <div>
      <p>Applicant Details</p>
      <FormField
        {...props}
        labelId="race"
        labelText="Race"
        formDataKey="race"
        placeholder="select one"
        type="select"
        options={Race as readonly string[]}
      />
      <FormField
        {...props}
        labelId="age"
        labelText="Age"
        formDataKey="age"
        placeholder="applicant's age"
        type="number"
      />
      <FormField
        {...props}
        labelId="yearlyIncome"
        labelText="Yearly Income"
        formDataKey="yearlyIncome"
        placeholder="most recent yearly income"
        type="number"
      />
      <FormField
        {...props}
        labelId="creditScore"
        labelText="Credit Score"
        formDataKey="creditScore"
        placeholder="enter a number between 300 - 850"
        type="number"
      />
      <p className="fake-label">Eviction History</p>
      {Array.from({ length: evictionHistoryRows }).map((_, index) => (
        <div key={index} className="flex">
          <FormField
            {...props}
            labelId="evictionReason"
            formDataKey="evictionHistory"
            type="select"
            placeholder="select reason"
            options={EvictionReason as readonly string[]}
            arrayInfo={{
              index,
              keyAtIndex: "evictionReason",
            }}
          />
          <FormField
            {...props}
            labelId="evictionDate"
            formDataKey="evictionHistory"
            type="date"
            placeholder="date of eviction"
            arrayInfo={{
              index,
              keyAtIndex: "evictionDate",
            }}
          />
        </div>
      ))}
      {props.errors?.evictionHistory && (
        <p className="error-text">{props.errors?.evictionHistory}</p>
      )}
      <button
        className="add-history-btn"
        onClick={() => setEvictionHistoryRows((rows) => rows + 1)}
      >
        Add another eviction reason
      </button>
      <p className="fake-label">Criminal History</p>
      {Array.from({ length: criminalHistoryRows }).map((_, index) => (
        <div key={index} className="flex">
          <FormField
            {...props}
            labelId="criminalHistoryType"
            formDataKey="criminalHistory"
            type="select"
            placeholder="select type"
            options={CriminalHistoryType as readonly string[]}
            arrayInfo={{
              index,
              keyAtIndex: "criminalHistoryType",
            }}
          />
          <FormField
            {...props}
            labelId="convictionDate"
            formDataKey="criminalHistory"
            type="date"
            placeholder="date of conviction"
            arrayInfo={{
              index,
              keyAtIndex: "convictionDate",
            }}
          />
          <FormField
            {...props}
            labelId="offenseName"
            formDataKey="criminalHistory"
            type="text"
            placeholder="name of offense"
            arrayInfo={{
              index,
              keyAtIndex: "offenseName",
            }}
          />
        </div>
      ))}
      {props.errors?.criminalHistory && (
        <p className="error-text">{props.errors?.criminalHistory}</p>
      )}
      <button
        className="add-history-btn"
        onClick={() => setCriminalHistoryRows((rows) => rows + 1)}
      >
        Add another criminal history
      </button>
    </div>
  );
};

export default ApplicantDetails;
