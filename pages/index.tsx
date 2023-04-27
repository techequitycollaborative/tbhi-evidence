import Footer from "@/components/footer";
import AdditionalDetails, { validateAll } from "@/components/form/AdditionalDetails";
import ApplicantDetails, { validateApplicant } from "@/components/form/ApplicantDetails";
import ApplicationDetails, { validateApplication } from "@/components/form/ApplicationDetails";
import PropertyDetails, { validateProperty } from "@/components/form/PropertyDetails";
import Start, { validateStart } from "@/components/form/Start";
import { CriminalHistoryEntry, Eviction, FormData, SubmittableFormData } from "@/types/formdata";
import { NextPage } from "next";
import { useEffect, useState } from "react";

// for local dev environment
const SAVE_RECORD_URL = "http://localhost:8000/saveRecord";
const ALL_PEOPLE_URL = "http://localhost:8000/people";
const ALL_APPLICATIONS_URL = "http://localhost:8000/application";

enum FormPage {
  Start,
  ApplicantDetails,
  PropertyDetails,
  ApplicationDetails,
  AdditionalDetails,
  ThankYou,
}

export interface FormProps {
  formData: FormData;
  setFormData: (e: any) => void;
  errors?: any;
}

const Form: NextPage = () => {
  const [step, setStep] = useState(FormPage.Start);
  const [formData, setFormData] = useState<FormData>({
    evictionHistory: [] as Eviction[],
    criminalHistory: [] as CriminalHistoryEntry[],
  });
  const [errors, setErrors] = useState(null as any);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    setNextDisabled(false);
  }, [formData]);

  function handleBack() {
    if (step > FormPage.Start) {
      setStep(step - 1);
      setNextDisabled(false);
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

  function handleSubmit() {
    try {
      const r = fetch(SAVE_RECORD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      r.then((response) => {
        if (response.ok) {
          console.log("submit succeeded");
        } else {
          console.log("submit failed");
        }
      });

      setStep(step + 1);
    } catch (err: any) {
      console.log(err.message);
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
      <div className="pb-8">
        {step == 5 ? null : (
          <div>
            <button onClick={handleBack}>back</button>
            {step < 4 ? (
              <button disabled={nextDisabled} onClick={handleNext}>
                next
              </button>
            ) : (
              <button onClick={handleSubmit}>submit</button>
            )}
          </div>
        )}
        <div>
          <button onClick={testSubmit}>TEST SUBMIT</button>
        </div>
        <div>
          <button onClick={testFetch}>TEST FETCH</button>
        </div>
        <div style={{ whiteSpace: "pre-wrap" }}>
          {`current form data:
${JSON.stringify(formData, null, 4)}`}
        </div>
      </div>
      <Footer />
    </>
  );
};

// ONLY FOR TESTING. DELETE AFTER GOING LIVE OR FIND SOMEWHERE ELSE TO PUT IT.
function testSubmit() {
  try {
    const r = fetch(SAVE_RECORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: "conrad@madeup.biz",
        race: "Black or African American",
        age: 50,
        yearlyIncome: 100000,
        creditScore: 700,
        evictionHistory: [
          {
            evictionDate: new Date("2021-01-01"),
            evictionReason: "Reason 1",
          },
          {
            evictionDate: new Date("2021-02-01"),
            evictionReason: "Reason 2",
          },
        ],
        criminalHistory: [
          {
            convictionDate: new Date("2021-01-01"),
            criminalHistoryType: "Felony",
            offenseName: "robbery",
          },
          {
            convictionDate: new Date("2021-03-01"),
            criminalHistoryType: "Felony",
            offenseName: "burglary",
          },
        ],
        street: "joey way",
        unit: "2C",
        city: "Seattle",
        zipcode: 84510,
        monthlyRent: 1000,
        landlordName: "joey",
        screeningCompanyName: "joey's screening",
        screeningFee: 100,
        portableScreeningFee: "Yes",
        applicationMethod: "Method 1",
        assessmentOutcome: "Denied",
        assessmentOutcomeDetails: "didn't like me",
        denialReason: "Other",
        otherDenialReason: "didn't like me",
        additionalContextNotes: "joey is not cool",
      } as FormData),
    });
    r.then(async (response) => {
      if (response.ok) {
        window.alert("success");
      } else {
        window.alert(await response.text());
      }
    });
  } catch (err: any) {
    console.log(err.message);
  }
}
function testFetch() {
  const r = fetch(ALL_APPLICATIONS_URL, {
    method: "GET",
  });
  r.then(async (response) => {
    if (response.ok) {
      console.log("fetch succeeded");
      console.log(JSON.stringify(await response.json(), null, 2));
    } else {
      window.alert("fetch failed");
    }
  });
}

export default Form;
