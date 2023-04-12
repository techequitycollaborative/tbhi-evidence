import { useForm } from "react-hook-form";
import { FormProps } from "@/pages";

const portableScreeningFeeAnswerList = ["yes", "no"];
const applicationMethodList = ["method 1", "method 2", "method 3"];
const assessmentOutcomeList = ["accepted", "denied"];
const denialReasonList = ["reason 1", "reason 2", "reason 3, other"];

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateApplication(formData: any): { [key: string]: string } {
  const errors: any = {};

  if (!formData.screeningCompanyName) {
    errors.screeningCompanyName = "Screening company name is required";
  }

  if (!formData.screeningFee) {
    errors.screeningFee = "Screening fee is required";
  } else if (!parseInt(formData.screeningFee) || parseInt(formData.screeningFee) < 0) {
    errors.screeningFee = "Screening fee must be a non-negative number.";
  }

  if (!formData.portableScreeningFee) {
    errors.portableScreeningFee = "Portable screening fee answer is required";
  } else if (!portableScreeningFeeAnswerList.includes(formData.portableScreeningFee)) {
    errors.portableScreeningFee = "Portable screening fee answer must be from provided list";
  }

  if (!formData.applicationMethod) {
    errors.applicationMethod = "Application method is required";
  } else if (!applicationMethodList.includes(formData.applicationMethod)) {
    errors.applicationMethod = "Application method must be from provided list";
  }

  if (!formData.assessmentOutcome) {
    errors.assessmentOutcome = "Assessment outcome answer is required";
  } else if (!assessmentOutcomeList.includes(formData.assessmentOutcome)) {
    errors.assessmentOutcome = "Assessment outcome answer must be from provided list";
  }

  if (formData.assessmentOutcome === "denied") {
    if (!formData.denialReason) {
      errors.denialReason = "Denial reason is required";
    } else if (!denialReasonList.includes(formData.denialReason)) {
      errors.denialReason = "Denial reason must be from provided list";
    } else if (formData.denialReason === "other" && !formData.denialReasonOther) {
      errors.denialReasonOther = "Denial reason explanation is required";
    }
  }

  return errors;
}

const ApplicationDetails = (props: FormProps) => {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  return (
    <div>
      <p>Application Details</p>
      <div>
        <label>
          Name of Screening Company
          <input
            id="screening-company-name"
            placeholder="enter name"
            type="text"
            value={props.formData.screeningCompanyName}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                screeningCompanyName: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.screeningCompanyName || null}</p>
        </label>
      </div>
      <div className="screning-fee-input">
        <label>
          Fee Paid
          <input
            id="screening-fee"
            placeholder="enter fee"
            type="number"
            value={props.formData.screeningFee}
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                screeningFee: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.screeningFee || null}</p>
        </label>
      </div>

      <div className="portable-screening-fee">
        <label>
          Portable Screening Fee
          <select
            id="portable-screening-fee"
            defaultValue="placeholder"
            value={props.formData.portableScreeningFee}
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
            {portableScreeningFeeAnswerList.map((el) => {
              return (
                <option key={el} value={el}>
                  {el.charAt(0).toLocaleUpperCase() + el.substring(1)}
                </option>
              );
            })}
          </select>
          <p style={{ color: "red" }}>{props.errors?.portableScreeningFee || null}</p>
        </label>
      </div>
      <div className="application-method">
        <label>
          Application Method
          <select
            id="application-method"
            defaultValue="placeholder"
            value={props.formData.applicationMethod}
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
          <p style={{ color: "red" }}>{props.errors?.applicationMethod || null}</p>
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
              {assessmentOutcomeList.map((el) => {
                return (
                  <option key={el} value={el}>
                    {el.charAt(0).toLocaleUpperCase() + el.substring(1)}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <input
              id="assessment-outcome-details"
              placeholder="enter details if applicable"
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
          <p style={{ color: "red" }}>
            {props.errors?.assessmentOutcome || props.errors?.assessmentOutcomeDetails || null}
          </p>
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
          <p style={{ color: "red" }}>
            {props.errors?.denialReason || props.errors?.otherDenialReason || null}
          </p>
        </label>
      </div>
    </div>
  );
};

export default ApplicationDetails;
