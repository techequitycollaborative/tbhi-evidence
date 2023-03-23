import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  formData: any;
  setFormData: (e: any) => void;
};

const ApplicantDetails = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

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

  return (
    <div>
      <div className="race-selection">
        <label>
          Race
          <select
            name="race"
            id="race"
            defaultValue="1"
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
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                age: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>
            {errors.age?.type === "required" && "Age is required"}
          </p>
        </label>
      </div>
      <div className="yearly-income-input">
        <label>
          Yearly Income
          <input
            id="yearlyIncome"
            placeholder="most receent yearly income"
            {...register("yearlyIncome", {
              required: "required",
              valueAsNumber: true,
            })}
            type="number"
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
            id="creditScore"
            placeholder="enter a number between 300 - 850"
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
          <p style={{ color: "red" }}>
            {errors.creditScore?.type === "min" && "Must be higher than 350"}
            {errors.creditScore?.type === "max" &&
              "Must be lower than or equal to 850"}
          </p>
        </label>
      </div>
      <div className="eviction-history-selection">
        <label>
          Eviction History
          <select
            placeholder="date off eviction"
            name="evictionHistory"
            id="evictionHistory"
            defaultValue="1"
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
