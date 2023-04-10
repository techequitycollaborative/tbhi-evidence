import ApplicantDetails, { validateApplicant } from "@/components/form/ApplicantDetails";
import Start, { validateStart } from "@/components/form/start";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import AdditionalDetails, { validateAll } from "../components/form/AdditionalDetails";
import ApplicationDetails, { validateApplication } from "../components/form/ApplicationDetails";
import PropertyDetails, { validateProperty } from "../components/form/PropertyDetails";

enum FormPage {
  Start,
  ApplicantDetails,
  PropertyDetails,
  ApplicationDetails,
  AdditionalDetails,
  ThankYou,
}

export interface FormProps {
  formData: any;
  setFormData: (e: any) => void;
  errors?: any;
}

const Form: NextPage = () => {
  const [step, setStep] = useState(FormPage.Start);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null as any);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    setNextDisabled(false);
  }, [formData]);

  function handleBack() {
    if (step > FormPage.Start) {
      setStep(step - 1);
    }
  }

  function handleNext() {
    if (step < FormPage.ThankYou) {
      const errors = validate(formData);
      if (Object.keys(errors).length === 0) {
        setErrors(null);
        setStep(step + 1);
      } else {
        setErrors(errors);
        setNextDisabled(true);
      }
    }
  }

  /**
   * @returns An object with key/value pairs of errors,
   * where the key matches the name of the input field.
   * If there are no errors, returns an empty object.
   */
  function validate(formData: any): Object {
    switch (step) {
      case FormPage.Start:
        return validateStart(formData);
      case FormPage.ApplicantDetails:
        return validateApplicant(formData);
      case FormPage.PropertyDetails:
        return validateProperty(formData);
      case FormPage.ApplicationDetails:
        return validateApplication(formData);
      case FormPage.AdditionalDetails:
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
    };
    switch (step) {
      case FormPage.Start:
        return <Start {...formProps} />;
      case FormPage.ApplicantDetails:
        return <ApplicantDetails {...formProps} />;
      case FormPage.PropertyDetails:
        return <PropertyDetails {...formProps} />;
      case FormPage.ApplicationDetails:
        return <ApplicationDetails {...formProps} />;
      case FormPage.AdditionalDetails:
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
        <button disabled={nextDisabled} onClick={handleNext}>
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
