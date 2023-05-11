import FormField from "@/components/FormField";
import { FormProps } from "@/pages";
import { useForm } from "react-hook-form";

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateProperty(formData: any): { [key: string]: string } {
  const errors = {} as any;

  // any other address validation?
  if (!formData.street) {
    errors.street = "Street is required";
  }
  if (!formData.unit) {
    errors.unit = "Unit is required";
  }
  if (!formData.city) {
    errors.city = "City is required";
  }
  if (!formData.state) {
    errors.state = "State is required";
  }

  if (!formData.zipcode) {
    errors.zipcode = "Zipcode is required";
  } else if (formData.zipcode.length !== 5 || !parseInt(formData.zipcode)) {
    errors.zipcode = "Zipcode must be a 5-digit number";
  }

  if (!formData.monthlyRent) {
    errors.monthlyRent = "Monthly rent is required";
  } else if (!parseInt(formData.monthlyRent) || parseInt(formData.monthlyRent) < 0) {
    errors.monthlyRent = "Monthly rent must be a non-negative number.";
  }

  return errors;
}

const PropertyDetails = (props: FormProps) => {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  return (
    <div>
      <h2>Property Details</h2>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="propertyStreet"
          labelText="Street"
          formDataKey="street"
          type="text"
        />
        <FormField
          {...props}
          labelId="propertyUnit"
          labelText="Unit"
          formDataKey="unit"
          type="text"
        />
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="propertyCity"
          labelText="City"
          formDataKey="city"
          type="text"
        />
        <FormField
          {...props}
          labelId="propertyState"
          labelText="State"
          formDataKey="state"
          type="text"
        />
      </div>
      <div className="w-1/2 pr-2">
        <FormField
          {...props}
          labelId="propertyZipcode"
          labelText="Zipcode"
          formDataKey="zipcode"
          type="number"
        />
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="propertyMonthlyRent"
          labelText="Monthly Rent"
          formDataKey="monthlyRent"
          type="number"
        />
        <FormField
          {...props}
          labelId="propertyManagementCompany"
          labelText="Property Management Company"
          formDataKey="propertyManagementCompany"
          type="text"
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
