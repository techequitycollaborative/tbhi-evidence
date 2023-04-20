import { FormProps } from "@/pages";
import { FormData } from "@/types/formdata";
import { CriminalHistoryType, EvictionReason, Race } from "@/types/formoptions";
import { useState } from "react";
import { useForm } from "react-hook-form";

const raceList = Object.values(Race).filter((v) => isNaN(Number(v)));
const evictionReasonList = Object.values(EvictionReason).filter((v) => isNaN(Number(v)));
const criminalHistoryTypeList = Object.values(CriminalHistoryType).filter((v) => isNaN(Number(v)));

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateApplicant(formData: FormData) {
  const errors: any = {};

  if (!formData.race) {
    errors.race = "Race is required";
  } else if (!raceList.includes(formData.race)) {
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

  formData.evictionHistory.forEach((entry) => {
    if (!entry.evictionReason || !entry.evictionDate) {
      errors.evictionHistory = "Must provide eviction reason(s) with date(s).";
    } else if (!evictionReasonList.includes(entry.evictionReason)) {
      errors.evictionHistory = "Eviction history reason(s) must be from provided list";
    } else if (entry.evictionDate.toString() === "Invalid Date") {
      errors.evictionHistory = "Eviction date(s) must be in correct format (MM-DD-YYYY).";
    } else if (
      new Date(entry.evictionDate).setUTCHours(0, 0, 0, 0) >= new Date().setUTCHours(0, 0, 0, 0)
    ) {
      errors.evictionHistory = "Eviction date(s) must be in the past.";
    }
  });

  formData.criminalHistory.forEach((entry) => {
    if (!entry.criminalHistoryType || !entry.convictionDate || !entry.offenseName) {
      errors.criminalHistory =
        "Must provide criminal history type(s) with date(s) and offense name(s).";
    } else if (!criminalHistoryTypeList.includes(entry.criminalHistoryType)) {
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
      <div className="race-selection">
        <label>
          Race
          <select
            id="race"
            value={props.formData.race || "1"}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                race: e.target.value,
              });
            }}
          >
            <option value="1" disabled>
              select one
            </option>
            {raceList.map((el) => {
              return (
                <option key={el} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
          <p style={{ color: "red" }}>{props.errors?.race || null}</p>
        </label>
      </div>
      <div className="age-input">
        <label>
          Age
          <input
            id="age"
            placeholder="applicant's age"
            type="number"
            value={props.formData.age}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                age: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.age || null}</p>
        </label>
      </div>
      <div className="yearly-income-input">
        <label>
          Yearly Income
          <input
            id="yearly-income"
            placeholder="most recent yearly income"
            type="number"
            value={props.formData.yearlyIncome}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                yearlyIncome: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.yearlyIncome || null}</p>
        </label>
      </div>
      <div className="credit-score-input">
        <label>
          Credit Score
          <input
            id="credit-score"
            placeholder="enter a number between 300 - 850"
            value={props.formData.creditScore}
            type="number"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                creditScore: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.creditScore || null}</p>
        </label>
      </div>
      <div className="eviction-history-selection">
        <label>
          Eviction History
          {Array.from({ length: evictionHistoryRows }).map((_, index) => (
            <div key={index}>
              <select
                name={`evictionReason_${index}`}
                id={`eviction-reason-${index}`}
                placeholder="date of eviction"
                value={props.formData.evictionHistory[index]?.evictionReason || "1"}
                onChange={(e) => {
                  const newFormData = {
                    ...props.formData,
                  };
                  updateHistoryArray(newFormData.evictionHistory, index, {
                    evictionReason: e.target.value,
                  });
                  props.setFormData(newFormData);
                }}
              >
                <option value="1" disabled>
                  select reason
                </option>

                {evictionReasonList.map((el) => {
                  return (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
              <input
                name={`evictionDate_${index}`}
                id={`eviction-date-${index}`}
                type="text"
                placeholder="date of eviction"
                onFocus={(e) => (e.target.type = "date")}
                value={isoDateOnly(props.formData.evictionHistory[index]?.evictionDate)}
                onChange={(e) => {
                  const newFormData = {
                    ...props.formData,
                  };
                  updateHistoryArray(newFormData.evictionHistory, index, {
                    evictionDate: new Date(e.target.value),
                  });
                  props.setFormData(newFormData);
                }}
              />
            </div>
          ))}
          <p style={{ color: "red" }}>{props.errors?.evictionHistory || null}</p>
          <button onClick={() => setEvictionHistoryRows((rows) => rows + 1)}>
            Add Eviction History
          </button>
        </label>
      </div>
      <div>
        <label>
          Criminal History
          {Array.from({ length: criminalHistoryRows }).map((_, index) => (
            <div key={index}>
              <select
                name={`criminalHistoryType_${index}`}
                id={`criminal-history-type-${index}`}
                value={props.formData.criminalHistory[index]?.criminalHistoryType || "1"}
                onChange={(e) => {
                  const newFormData = {
                    ...props.formData,
                  };
                  updateHistoryArray(newFormData.criminalHistory, index, {
                    criminalHistoryType: e.target.value,
                  });
                  props.setFormData(newFormData);
                }}
              >
                <option value="1" disabled>
                  select type
                </option>
                {criminalHistoryTypeList.map((el) => {
                  return (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
              <input
                id={`conviction-date-${index}`}
                type="text"
                value={isoDateOnly(props.formData.criminalHistory[index]?.convictionDate)}
                placeholder="date of conviction"
                onFocus={(e) => (e.target.type = "date")}
                onChange={(e) => {
                  const newFormData = { ...props.formData };
                  updateHistoryArray(newFormData.criminalHistory, index, {
                    convictionDate: new Date(e.target.value),
                  });
                  props.setFormData(newFormData);
                }}
              />
              <input
                id={`offense-name-${index}`}
                placeholder="name of offense"
                type="text"
                value={props.formData.criminalHistory[index]?.offenseName}
                onChange={(e) => {
                  const newFormData = { ...props.formData };
                  updateHistoryArray(newFormData.criminalHistory, index, {
                    offenseName: e.target.value,
                  });
                  props.setFormData(newFormData);
                }}
              />
            </div>
          ))}
          <p style={{ color: "red" }}>{props.errors?.criminalHistory || null}</p>
          <button onClick={() => setCriminalHistoryRows((rows) => rows + 1)}>
            Add Criminal History
          </button>
        </label>
      </div>
    </div>
  );
};

export default ApplicantDetails;

function updateHistoryArray<T extends Object>(array: Array<T>, index: number, update: Object) {
  if (array[index] !== undefined) {
    array[index] = { ...array[index], ...update };
  } else {
    array.push(update as T);
  }
  return array;
}

function isoDateOnly(date: Date) {
  if (date) {
    return date.toISOString().split("T")[0];
  }
  return "";
}
