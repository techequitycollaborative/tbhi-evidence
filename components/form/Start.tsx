import FormField, { FormFieldProps } from "@/components/FormField";
import { FormProps } from "../../pages";

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateStart(formData: any): { [key: string]: string } {
  // validate org?
  // validate email?
  return {};
}

function Start(props: FormProps) {
  const fieldProps: FormFieldProps = {
    ...props,
    labelId: "email",
    labelText: "Email (for confirmation)",
    formDataKey: "email",
    placeholder: "enter your email address",
    type: "email",
  };
  return <FormField {...fieldProps} />;
}

export default Start;
