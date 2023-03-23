import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  formData: any;
  setFormData: (e: any) => void;
};

const ApplicantDetails = (props: Props) => {
  const { register, handleSubmit } = useForm();

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
            value="1"
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
        </label>
      </div>
      <div className="yearly-income-input">
        <label>
          Yearly Income
          <input
            id="yearlyIncome"
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
            {...register("creditScore", {
              required: "required",
              valueAsNumber: true,
            })}
            type="number"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                creditScore: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div className="eviction-history-selection">
        <label>
          Eviction History
          <select
            name="evictionHistory"
            id="evictionHistory"
            value="1"
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
            type="date"
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
            value="1"
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
            type="date"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                convictionDate: e.target.value,
              });
            }}
          />
          <input
            id="offense-name"
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
