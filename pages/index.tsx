import ApplicantDetails from '@/components/form/ApplicantDetails';
import { useState } from 'react';

import Start from '@/components/form/start';

enum FormPage {
  Start = 0,
  ApplicantDetails = 1,
  Step2 = 2,
  Step3 = 3,
  Step4 = 4,
  ThankYou = 5,
}

const Form: NextPage = () => {
  const [step, setStep] = useState(FormPage.Start);
  const [formData, setFormData] = useState({});
  // move errors into
  const [errors, setErrors] = useState({});

  function handleBack() {
    if (step > FormPage.Start) {
      setStep(step - 1);
    }
  }

  function handleNext() {
    if (step < FormPage.ThankYou) {
      const errors = findFormErrors();
      if (Object.keys(errors).length === 0) {
        setErrors({});
        setStep(step + 1);
      } else {
        setErrors(errors);
      }
    }
  }

  /**
   * @returns An object with key/value pairs of errors, where the key matches the name of the input field.
   *         If there are no errors, returns an empty object.
   */
  function findFormErrors(): Object {
    function validateStart(): Object {
      // validate org?
      // validate email?
      return {};
    }
    function validateApplicationDetails(): Object {
      // validate race is in list
      // validate age is postive number
      // validate yearly income is positive number
      // validate credit score is in range
      // list of evictions: validate reason is in list, date is in past and correct format
      // list of criminal convictions: validate type is in list, date is in past and correct format, any name validation?

      return {};
    }
    function validateStep2(): Object {
      // validate state is in list
      // any other address validation?
      // validate montly rent is positive number
      // validate landlord name is alphabetical with a space (at least first and last name)
      return {};
    }
    function validateStep3(): Object {
      // validate fee is positive number
      // validate portable screening fee, application method, assessment outcome,
      //   reason for denial are all in list
      return {};
    }
    function validateAll(): Object {
      const errors = {
        ...validateStart(),
        ...validateApplicationDetails(),
        ...validateStep2(),
        ...validateStep3(),
      };
      // any final validation needed?
      return errors;
    }

    switch (step) {
      case FormPage.Start:
        return validateStart();
      case FormPage.ApplicantDetails:
        return validateApplicationDetails();
      case FormPage.Step2:
        return validateStep2();
      case FormPage.Step3:
        return validateStep3();
      case FormPage.Step4:
        return validateAll();
      case FormPage.ThankYou:
        return {};
    }
  }

  function formContent(step: number) {
    switch (step) {
      case FormPage.Start:
        return <Start formData={formData} setFormData={setFormData} />;
      case FormPage.ApplicantDetails:
        return <ApplicantDetails formData={formData} setFormData={setFormData} />;
      case FormPage.Step2:
        return <div>form step 2 goes here</div>;
      case FormPage.Step3:
        return <div>form step 3 goes here</div>;
      case FormPage.Step4:
        return <div>form step 4 goes here</div>;
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
        <button onClick={handleNext}>next</button>
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
