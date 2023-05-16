import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import ApplicantDetails, { validateApplicant } from "@/components/form/ApplicantDetails";
import ApplicationDetails, { validateApplication } from "@/components/form/ApplicationDetails";
import PropertyDetails, { validateProperty } from "@/components/form/PropertyDetails";
import Start, { validateStart } from "@/components/form/Start";
import { testFetchApplications, testFetchPeople, testSubmit } from "@/dev/testDBFunctions";
import { CriminalHistoryEntry, Eviction, FormData } from "@/types/formdata";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DEBUG = process.env.NEXT_PUBLIC_DEBUG ? process.env.NEXT_PUBLIC_DEBUG : "true";
const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : "http://localhost:8000/";
export const SAVE_RECORD_URL = API_URL + "saveRecord";
export const ALL_APPLICATIONS_URL = API_URL + "application";
export const ALL_PEOPLE_URL = API_URL + "people";

enum FormPage {
  Start,
  ApplicantDetails,
  ApplicationDetails,
  PropertyDetails,
  ThankYou,
}

export interface FormProps {
  formData: FormData;
  setFormData: (e: any) => void;
  errors?: any;
}

const Form: NextPage = () => {
  // instantiate and store form data across refreshes
  const [formData, setFormData] = useState<FormData>();
  useEffect(() => {
    const sessionFormData = sessionStorage.getItem("formData");
    if (sessionFormData) {
      // convert date strings back to date objects
      // TODO: improvement would be to store dates only as strings in the formData to avoid serialization woes
      const preservedFormData = JSON.parse(sessionFormData) as FormData;
      preservedFormData.evictionHistory?.forEach((element: Eviction) => {
        if (element.evictionDate) {
          element.evictionDate = new Date(element.evictionDate);
        }
      });
      preservedFormData.criminalHistory?.forEach((element: CriminalHistoryEntry) => {
        if (element.convictionDate) {
          element.convictionDate = new Date(element.convictionDate);
        }
      });
      setFormData(preservedFormData);
    }
  }, []);
  useEffect(() => {
    if (formData) {
      sessionStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  const [_step, setStep] = useState<number>();
  const step = _step || FormPage.Start;

  // Handle navigation with/ browser back and refresh support.
  //
  // Refresh is jerky due to instantiating the form initially to page 0 and then jumping to the correct page,
  // but it works for now and is not worth the extra complication to fix,
  // especially since this may still be changed to a single page form.
  const router = useRouter();
  useEffect(() => {
    if (_step !== undefined) {
      router.push("?page=" + _step, undefined, { shallow: true });
    }
  }, [_step]);
  useEffect(() => {
    if (!router.isReady) return;
    const currentStep = router.query.page ? parseInt(router.query.page as string) : FormPage.Start;
    // TODO: validate that formData is validated up to current step to prevent skipping steps via URL manipulation
    setStep(currentStep);
    // ensure no one sees next incorrectly disabled
    setNextDisabled(false);
  }, [router.query.page, router.isReady]);

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
  function validate(formData: any, currentStep: number = step): Object {
    switch (currentStep) {
      case FormPage.Start:
        return validateStart(formData);
      case FormPage.ApplicantDetails:
        return validateApplicant(formData);
      case FormPage.ApplicationDetails:
        return validateApplication(formData);
      case FormPage.PropertyDetails:
        return validateProperty(formData);
      default:
        return {};
    }
  }

  function validateAll(formData: any): { [key: string]: string } {
    const errors = {
      ...validateStart(formData),
      ...validateApplicant(formData),
      ...validateProperty(formData),
      ...validateApplication(formData),
    };
    // any final validation needed?
    return errors;
  }

  function handleSubmit() {
    const errors = validateAll(formData);
    if (Object.keys(errors).length === 0) {
      setErrors(null);
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
            sessionStorage.removeItem("formData");
          } else {
            console.log("submit failed");
          }
        });

        setStep(step + 1);
      } catch (err: any) {
        console.log(err.message);
      }
    } else {
      setErrors(errors);
      setNextDisabled(true);
    }
  }

  function formContent(step: number) {
    const formProps: FormProps = {
      formData: formData ?? {},
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
      case FormPage.ThankYou:
        return <div>thank you goes here</div>;
    }
  }

  function nextButton(step: number) {
    switch (step) {
      case FormPage.Start:
        return <Button onClick={handleNext}>start</Button>;
      case FormPage.ApplicantDetails:
      case FormPage.ApplicationDetails:
        return (
          <Button disabled={nextDisabled} onClick={handleNext}>
            next
          </Button>
        );
      case FormPage.PropertyDetails:
        return <Button onClick={handleSubmit}>submit</Button>;
      case FormPage.ThankYou:
        return <div>submit another</div>;
    }
  }

  return (
    <div>
      <Header logo={step > 0 && step <= 3 ? false : true} />
      <div className="w-1/2 min-w-[600px] mx-auto mt-16 pb-20">
        {step > 0 && step <= 3 ? <Nav currentPage={step} lastPage={3} back={handleBack} /> : null}
        <div className="mt-8">{formContent(step)}</div>
        <div className="mb-8">{nextButton(step)}</div>
        {DEBUG === "true" ? (
          <div>
            <div>
              <button onClick={testSubmit}>TEST SUBMIT</button>
            </div>
            <div>
              <button onClick={testFetchApplications}>TEST FETCH APPLICATIONS</button>
            </div>
            <div>
              <button onClick={testFetchPeople}>TEST FETCH PEOPLE</button>
            </div>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {`current form data:
    ${JSON.stringify(formData, null, 4)}`}
            </div>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {`current error data:
    ${JSON.stringify(errors, null, 4)}`}
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default Form;
