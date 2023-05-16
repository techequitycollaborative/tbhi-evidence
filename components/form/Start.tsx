import FormField, { FormFieldProps } from "@/components/FormField";
import { FormData } from "@/types/formdata";
import { FormProps } from "../../pages";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Organization } from "@/types/formoptions";

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateStart(formData: FormData) {
  const errors: any = {};

  if (!formData?.userType) {
    errors.userType = "You must read and agree to the privacy policy to use this form"
  }

  if (formData?.userType === 'organization') {
    if (!formData.organization) {
      errors.organization = "Organization is required if filling out on behalf of an applicant";
    } else if (!Organization.includes(formData.organization)) {
      errors.organization = "Organization must be from provided list";
    }
  }

  return errors;
}

function Start(props: FormProps) {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  const [privacyOption, setPrivacyOption] = useState(props.formData.userType);

  const emailFieldProps: FormFieldProps = {
    ...props,
    labelId: "email",
    labelText: "Email",
    formDataKey: "email",
    placeholder: "enter your email address",
    type: "email",
  };
  const orgFieldProps: FormFieldProps = {
    ...props,
    labelId: "organization",
    labelText: "Organization",
    formDataKey: "organization",
    placeholder: "select one",
    type: "select",
    options: Organization as readonly string[],
  };

  function clearOrganization() {
    delete props.formData.organization;

    if (props.errors) {
      delete props.errors.organization;
    }
  }

  function handleIndividualClick() {
    clearOrganization();
    
    if (privacyOption !== "individual") {
      setPrivacyOption("individual");
      props.setFormData({...props.formData, userType: "individual"});
    }
    else {
      setPrivacyOption("");
      delete props.formData.userType;
    }
  }

  function handleOrganizationClick() {
    if (privacyOption !== "organization") {
      setPrivacyOption("organization");
      props.setFormData({...props.formData, userType: "organization"});
    }
    else {
      setPrivacyOption("");
      delete props.formData.userType;
      clearOrganization();
    }
  }

  return (
    <>
      <p>Welcome to the TBHI housing outcome submission form, where you may submit details of an application for yourself or on behalf of an applicant. Please have applicant, property, application details ready.</p>
      <p className="my-2">Please read the <a className="font-bold hover:opacity-70 text-blue" target="_blank" href="privacy">privacy policy</a>.</p>
      <p className="my-2">You may remove your consent and participation in the research at any time by emailing <a className="text-blue font-bold hover:opacity-70" href="mailto:research@techequitycollaborative.org">research@techequitycollaborative.org</a>. If you choose to do so, TechEquity will delete your data within 21 days of receiving your request.</p>
      <p className="my-2">Please select one of the following:</p>
      <div className="flex ml-8">
        <input onChange={handleIndividualClick} type="checkbox" id="individual" name="individual" className="hover:cursor-pointer w-4" checked={privacyOption === "individual" ? true : false} />
        <p className="m-2 mt-[9px]">I consent to providing my information and housing experiences to TechEquity Collaborative</p>
      </div>
      <div className="flex ml-8">
        <input onChange={handleOrganizationClick} type="checkbox" id="organization" name="organization" className="hover:cursor-pointer w-4" checked={privacyOption === "organization" ? true : false} />
        <p className="m-2 mt-[9px]">I have received consent from the housing applicant to provide their information and housing experiences</p>
      </div>
      <div className="ml-8">
        {props.errors?.userType && (
          <p className="error-text">{props.errors.userType}</p>
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex-1"><FormField {...emailFieldProps} /></div>
        <div className="flex-1">
          {privacyOption === "organization" ? <FormField {...orgFieldProps} /> : null}
        </div>
      </div>
      <p className="mt-4">Email address is optional and will only be used to find and delete your info should you request it. For more on our privacy policy <a className="font-bold hover:opacity-70 text-blue" target="_blank" href="privacy">click here</a>.</p>
    </>
  );
}

export default Start;
