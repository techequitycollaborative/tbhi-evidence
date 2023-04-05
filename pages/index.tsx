import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import ApplicantDetails from "@/components/form/ApplicantDetails";
import PropertyDetails from "@/components/form/PropertyDetails";

import Start from "@/components/form/start";
import ApplicationDetails from "@/components/form/ApplicationDetails";
import AdditionalDetails from "@/components/form/AdditionalDetails";

const Form: NextPage = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [disableNext, setDisableNext] = useState(false);

  function handleBack() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function handleNext() {
    if (step < 5) {
      setStep(step + 1);
    }
  }

  function formContent(step: number) {
    switch (step) {
      case 0:
        return <Start formData={formData} setFormData={setFormData} />;
      case 1:
        return (
          <ApplicantDetails
            formData={formData}
            setFormData={setFormData}
            setDisableNext={setDisableNext}
          />
        );
      case 2:
        return (
          <PropertyDetails
            formData={formData}
            setFormData={setFormData}
            setDisableNext={setDisableNext}
          />
        );
      case 3:
        return (
          <ApplicationDetails
            formData={formData}
            setFormData={setFormData}
            setDisableNext={setDisableNext}
          />
        );
      case 4:
        return (
          <AdditionalDetails
            formData={formData}
            setFormData={setFormData}
            setDisableNext={setDisableNext}
          />
        );
      case 5:
        return <div>thank you goes here</div>;
      default:
        return <Start formData={formData} setFormData={setFormData} />;
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
