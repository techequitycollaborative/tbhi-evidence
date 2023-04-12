import { FormProps } from '../../pages';

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
  return (
    <>
      <p>Email</p>
      <input
        onChange={(e) => {
          props.setFormData({
            ...props.formData,
            email: e.target.value,
          });
        }}
      />
    </>
  );
}

export default Start;
