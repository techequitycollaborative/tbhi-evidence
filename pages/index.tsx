import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
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

  function nextButton(step: number) {
    switch (step) {
      case FormPage.Start:
        return <Button onClick={handleNext}>start</Button>
      case FormPage.ApplicantDetails:
      case FormPage.PropertyDetails:
      case FormPage.ApplicationDetails:
        return <Button disabled={nextDisabled} onClick={handleNext}>next</Button>;
      case FormPage.AdditionalDetails:
        return <Button onClick={handleSubmit}>submit</Button>
      case FormPage.ThankYou:
        return <div>submit another</div>;
    }
  }

  return (
    <div>
      <Header logo={step > 0 && step <= 4 ? false : true} />
      <div className="w-1/2 min-w-[600px] mx-auto mt-16 pb-20">
        {step > 0 && step <= 4 ? (
          <Nav currentPage={step} lastPage={4} back={handleBack} />
        ) : (
          null
        )}
        <div className="mt-8">{formContent(step)}</div>
        <div className="mb-8">
          {nextButton(step)}
        </div>
        <div>
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
      </div>
      <Footer />
    </div>
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
