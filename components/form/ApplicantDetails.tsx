import { useForm } from "react-hook-form";
import { FormProps } from "../../pages";

const raceList = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Native Hawaiian or Other Pacific Islander",
  "White",
  "Two or More Races",
  "No Response",
];

const evictionReasonList = ["reason 1", "reason 2", "reason 3"];

const criminalHistoryTypeList = ["type 1", "type 2", "type 3", "type 4"];

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateApplicant(formData: any) {
  const errors: any = {};

  if (!formData.race) {
    errors.race = "Race is required";
  } else if (!raceList.includes(formData.race)) {
    errors.race = "Race must be from provided list";
  }

  if (!formData.age) {
    errors.age = "Age is required";
  } else if (!parseInt(formData.age) || parseInt(formData.age) < 1) {
    errors.age = "Age must be a positive number";
  }

  if (!formData.yearlyIncome) {
    errors.yearlyIncome = "Yearly income is required";
  } else if (
    (!parseInt(formData.yearlyIncome) && parseInt(formData.yearlyIncome) !== 0) ||
    parseInt(formData.yearlyIncome) < 0
  ) {
    errors.yearlyIncome = "Yearly income must be a non-negative number.";
  }

  if (!formData.creditScore) {
    errors.creditScore = "Credit score is required";
  } else if (
    !parseInt(formData.creditScore) ||
    parseInt(formData.creditScore) < 350 ||
    parseInt(formData.creditScore) > 850
  ) {
    errors.creditScore = "Credit score must be a number between 350 and 850";
  }

  if (formData.evictionHistory || formData.evictionDate) {
    if (!formData.evictionHistory || !formData.evictionDate) {
      errors.evictionHistory = "Must provide eviction reason with date.";
    } else if (!evictionReasonList.includes(formData.evictionHistory)) {
      errors.evictionHistory = "Eviction history reason must be from provided list";
    } else if (new Date(formData.evictionDate).toString() === "Invalid Date") {
      errors.evictionDate = "Eviction date must be in correct format (MM-DD-YYYY).";
    } else if (
      new Date(formData.evictionDate).setUTCHours(0, 0, 0, 0) >= new Date().setUTCHours(0, 0, 0, 0)
    ) {
      errors.evictionDate = "Eviction date must be in the past.";
    }
  }

  if (formData.criminalHistoryType || formData.convictionDate || formData.offenseName) {
    if (!formData.criminalHistoryType || !formData.convictionDate || !formData.offenseName) {
      errors.evictionHistory = "Must provide criminal history type with date and offense name.";
    } else if (!criminalHistoryTypeList.includes(formData.criminalHistoryType)) {
      errors.evictionHistory = "Criminal history type must be from provided list";
    } else if (new Date(formData.convictionDate).toString() === "Invalid Date") {
      errors.convictionDate = "Criminal offense date must be in correct format (MM-DD-YYYY).";
    } else if (
      new Date(formData.convictionDate).setUTCHours(0, 0, 0, 0) >=
      new Date().setUTCHours(0, 0, 0, 0)
    ) {
      errors.convictionDate = "Criminal offense date must be in the past.";
    }
  }

  return errors;
}

const ApplicantDetails = (props: FormProps) => {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  return (
    <div>
      <p>Applicant Details</p>
      <div className="race-selection">
        <label>
          Race
          <select
            id="race"
            defaultValue="1"
            value={props.formData.race}
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
          <select
            placeholder="date of eviction"
            id="eviction-history"
            defaultValue="1"
            value={props.formData.evictionHistory}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                evictionHistory: e.target.value,
              });
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
            id="eviction-date"
            type="text"
            placeholder="date of eviction"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            value={props.formData.evictionDate}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                evictionDate: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>
            {props.errors?.evictionHistory || props.errors?.evictionDate || null}
          </p>
        </label>
      </div>
      <div>
        <label>
          Criminal History
          <select
            name="criminalHistoryType"
            id="criminal-history-type"
            defaultValue="1"
            value={props.formData.criminalHistoryType}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                criminalHistoryType: e.target.value,
              });
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
            id="conviction-date"
            type="text"
            value={props.formData.convictionDate}
            placeholder="date of conviction"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                convictionDate: e.target.value,
              });
            }}
          />
          <input
            id="offense-name"
            placeholder="name of offense"
            type="text"
            value={props.formData.offenseName}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                offenseName: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>
            {props.errors?.criminalHistoryType ||
              props.errors?.convictionDate ||
              props.errors?.offenseName ||
              null}
          </p>
        </label>
      </div>
    </div>
  );
};

export default ApplicantDetails;
