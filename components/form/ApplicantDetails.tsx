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

  if (!formData.age) {
    errors.age = "Age is required";
  } else if (formData.age < 1) {
    errors.age = "Age must be positive";
  }

  if (formData.creditScore < 350) {
    errors.creditScore = "Must be at least 350";
  } else if (formData.creditScore > 850) {
    errors.creditScore = "Must be at most 850";
  }
  // validate race is in list
  // validate yearly income is positive number
  // list of evictions: validate reason is in list, date is in past and correct format
  // list of criminal convictions: validate type is in list, date is in past and correct format, any name validation?
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
            {...register("race", {
              required: "required",
              valueAsNumber: true,
            })}
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
        </label>
      </div>
      <div className="age-input">
        <label>
          Age
          <input
            id="age"
            placeholder="applicant's age"
            {...register("age", {
              required: "required",
              valueAsNumber: true,
            })}
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
            placeholder="most receent yearly income"
            {...register("yearlyIncome", {
              required: "required",
              valueAsNumber: true,
            })}
            type="number"
            value={props.formData.yearlyIncome}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                yearlyIncome: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div className="credit-score-input">
        <label>
          Credit Score
          <input
            id="credit-score"
            placeholder="enter a number between 300 - 850"
            value={props.formData.creditScore}
            {...register("creditScore", {
              required: "required",
              valueAsNumber: true,
              max: 850,
              min: 350,
            })}
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
            placeholder="date off eviction"
            id="eviction-history"
            {...register("evictionHistory", {
              required: "required",
            })}
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
            {...register("evictionDate", {
              required: "required",
              valueAsDate: true,
            })}
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
            {...register("convictionDate", {
              required: "required",
              valueAsDate: true,
            })}
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
            {...register("offenseName", {
              required: "required",
            })}
            type="text"
            value={props.formData.offenseName}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                offenseName: e.target.value,
              });
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default ApplicantDetails;
