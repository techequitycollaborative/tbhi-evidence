import ApplicantDetails, { validateApplicantDetails } from "@/components/form/ApplicantDetails";
import Start, { validateStart } from "@/components/form/start";
import { NextPage } from "next";
import { useState } from "react";
import AdditionalDetails, { validateAll } from "../components/form/AdditionalDetails";
import ApplicationDetails, { validateStep3 } from "../components/form/ApplicationDetails";
import PropertyDetails, { validateStep2 } from "../components/form/PropertyDetails";

enum FormPage {
  Start = 0,
  ApplicantDetails = 1,
  Step2 = 2,
  Step3 = 3,
  Step4 = 4,
  ThankYou = 5,
}

export interface FormProps {
  formData: any;
  setFormData: (e: any) => void;
  errors: any;
  setDisableNext: (e: boolean) => void;
}

const Form: NextPage = () => {
  const [step, setStep] = useState(FormPage.Start);
  const [formData, setFormData] = useState({});
  const [disableNext, setDisableNext] = useState(false);
  const [errors, setErrors] = useState({});

  function handleBack() {
    if (step > FormPage.Start) {
      setStep(step - 1);
    }
  }

  function handleNext() {
    if (step < FormPage.ThankYou) {
      const errors = validate(formData);
      if (Object.keys(errors).length === 0) {
        setErrors({});
        setStep(step + 1);
      } else {
        setErrors(errors);
      }
    }
  }

  /**
   * @returns An object with key/value pairs of errors,
   * where the key matches the name of the input field.
   * If there are no errors, returns an empty object.
   */
  function validate(formData: Object): Object {
    switch (step) {
      case FormPage.Start:
        return validateStart(formData);
      case FormPage.ApplicantDetails:
        return validateApplicantDetails(formData);
      case FormPage.Step2:
        return validateStep2(formData);
      case FormPage.Step3:
        return validateStep3(formData);
      case FormPage.Step4:
        return validateAll(formData);
      default:
        return {};
    }
  }

  function formContent(step: number) {
    const formProps: FormProps = {
      formData,
      setFormData,
      errors,
      setDisableNext,
    };
    switch (step) {
      case FormPage.Start:
        return <Start {...formProps} />;
      case FormPage.ApplicantDetails:
        return <ApplicantDetails {...formProps} />;
      case FormPage.Step2:
        return <PropertyDetails {...formProps} />;
      case FormPage.Step3:
        return <ApplicationDetails {...formProps} />;
      case FormPage.Step4:
        return <AdditionalDetails {...formProps} />;
      case FormPage.ThankYou:
        return <div>thank you goes here</div>;
    }
  }

  return (
    <>
      <h1>header goes here</h1>
      <p>form nav goes here</p>
      <div>{formContent(step)}</div>
      <div>
        <button onClick={handleBack}>back</button>
        <button disabled={disableNext} onClick={handleNext}>
          next
        </button>
      </div>
      <div>
        <p>current form data:</p>
        {Object.entries(formData).map(([k, v]) => (
          <p>
            {k}: {v}
          </p>
        ))}
      </div>
      <h3>footer goes here</h3>
    </>
  );
};

export default Form;
