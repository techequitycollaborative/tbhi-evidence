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
  const [shareConsent, setShareConsent] = useState("no");

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

  function handleConsentClick() {
    const newValue = shareConsent === "yes" ? "no" : "yes";
    props.setFormData({...props.formData, shareConsent: newValue});
    setShareConsent(newValue);
  }

  return (
    <>
      <p>Led by TechEquity Collaborative, a group of housing-focused organizations are conducting this survey to study the impact of algorithm-backed tenant screening technology. Here, you may submit details of an application for yourself or on behalf of an applicant. Please have applicant, property, and application details ready.</p>
      <h3 className="font-bold mt-4 text-xl">Privacy Policy</h3>
      <p className="my-2">Please read the <a className="font-bold hover:opacity-70 text-blue" target="_blank" href="privacy">privacy policy</a> and select one of the following:</p>
      <div className="flex ml-8">
        <div className="w-4">
          <input onChange={handleIndividualClick} type="checkbox" id="individual" name="individual" className="hover:cursor-pointer w-4" checked={privacyOption === "individual" ? true : false} />
        </div>
        <p className="m-2 mt-[9px] flex-grow">I consent to providing my information and housing experiences to TechEquity Collaborative (individual)</p>
      </div>
      <div className="flex ml-8">
        <div className="w-4">
          <input onChange={handleOrganizationClick} type="checkbox" id="organization" name="organization" className="hover:cursor-pointer w-4" checked={privacyOption === "organization" ? true : false} />
        </div>
        <p className="m-2 mt-[9px]">I have received consent from the housing applicant to provide their information and housing experiences (organization submitting on behalf of client)</p>
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
      <p className="my-4">Email address is optional and will only be used to find and delete your info should you request it. You may remove your consent and participation in the research at any time by emailing <a className="text-blue font-bold hover:opacity-70" href="mailto:research@techequitycollaborative.org">research@techequitycollaborative.org</a>. If you choose to do so, TechEquity will delete your data within 21 days of receiving your request. For more on our privacy policy <a className="font-bold hover:opacity-70 text-blue" target="_blank" href="privacy">click here</a>.</p>
      <h3 className="font-bold mt-4 mb-1 text-lg ml-12">Consent to Share</h3>
      <p className="mb-2 ml-12 text-sm">Please check this optional box if you would like to grant TechEquity consent to discuss your application details with a lawyer. Note that no personally identifying information is collected or shared via this form.</p>
      <div className="flex ml-12 mb-2">
        <div className="w-3">
          <input onChange={handleConsentClick} type="checkbox" id="shareConsent" name="shareConsent" className="hover:cursor-pointer w-3 h-3 mt-[5px] align-top" checked={shareConsent === "yes" ? true : false} />
        </div>
        <p className="mx-2 text-sm">I give consent for TechEquity to share my information with attorneys should they determine that I may have experienced discrimination or other illegal treatment</p>
      </div>
    </>
  );
}

export default Start;
