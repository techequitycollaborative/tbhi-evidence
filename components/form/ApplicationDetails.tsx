import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  formData: any;
  setFormData: (e: any) => void;
  setDisableNext: (e: boolean) => void;
};

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateStep3(formData: any): { [key: string]: string } {
  // validate fee is positive number
  // validate portable screening fee, application method, assessment outcome,
  //   reason for denial are all in list
  return {};
}


const ApplicationDetails = (props: Props) => {
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

  const applicationMethodList = ["method 1", "method 2", "method 3"];
  const denialReasonList = ["reason 1", "reason 2", "reason 3"];

  return (
    <div>
      <p>Application Details</p>
      <div>
        <label>
          Name of Screening Company
          <input
            id="screening-company-name"
            placeholder="enter name"
            {...register("screeningCompanyName", {
              required: "required",
            })}
            type="text"
            value={props.formData.screeningCompanyName}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                screeningCompanyName: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div className="screning-fee-input">
        <label>
          Fee Paid
          <input
            id="screening-fee"
            placeholder="enter fee"
            {...register("screeningFee", {
              required: "required",
              valueAsNumber: true,
            })}
            type="number"
            value={props.formData.screeningFee}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                screeningFee: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>
            {errors.age?.type === "required" && "screening fee is required"}
          </p>
        </label>
      </div>

      <div className="portable-screening-fee">
        <label>
          Portable Screening Fee
          <select
            id="portable-screening-fee"
            defaultValue="placeholder"
            value={props.formData.portableScreeningFee}
            {...register("portableScreeningFee", {
              required: "required",
              valueAsNumber: true,
            })}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                portableScreeningFee: e.target.value,
              });
            }}
          >
            <option value="placeholder" disabled>
              Yes/No
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
      </div>
      <div className="application-method">
        <label>
          Application Method
          <select
            id="application-method"
            defaultValue="placeholder"
            value={props.formData.applicationMethod}
            {...register("applicationMethod", {
              required: "required",
              valueAsNumber: true,
            })}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                applicationMethod: e.target.value,
              });
            }}
          >
            <option value="placeholder" disabled>
              select one
            </option>
            {applicationMethodList.map((el) => {
              return (
                <option key={el} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div>
        <label>
          Assessment Outcome
          <div className="assessment-outcome">
            <select
              id="assessment-outcome"
              defaultValue="placeholder"
              value={props.formData.assessmentOutcome}
              {...register("assessmentOutcome", {
                required: "required",
              })}
              onChange={(e) => {
                props.setFormData({
                  ...props.formData,
                  assessmentOutcome: e.target.value,
                });
              }}
            >
              <option value="placeholder" disabled>
                Accepted/Denied
              </option>
              <option value="accepted">Accepted</option>
              <option value="denied">Denied</option>
            </select>
          </div>
          <div>
            <input
              id="assessment-outcome-details"
              placeholder="enter details if applicable"
              {...register("assessmentOutcomeDetails", {
                required: "required",
              })}
              type="text"
              value={props.formData.assessmentOutcomeDetails}
              onChange={(e) => {
                props.setFormData({
                  ...props.formData,
                  assessmentOutcomeDetails: e.target.value,
                });
              }}
            />
          </div>
        </label>
      </div>
      <div>
        <label>
          Reason for denial
          <div className="denial-reason-select">
            <select
              id="denial-reason"
              defaultValue="placeholder"
              value={props.formData.denialReason}
              {...register("denialReason", {
                required: "required",
              })}
              onChange={(e) => {
                props.setFormData({
                  ...props.formData,
                  denialReason: e.target.value,
                });
              }}
            >
              <option value="placeholder" disabled>
                select one
              </option>
              {denialReasonList.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              id="other-denial-reason"
              placeholder="if other, explain here"
              {...register("otherDenialReason", {
                required: "required",
              })}
              type="text"
              value={props.formData.otherDenialReason}
              onChange={(e) => {
                props.setFormData({
                  ...props.formData,
                  otherDenialReason: e.target.value,
                });
              }}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default ApplicationDetails;
