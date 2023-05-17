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
      <p className="text-center text-navy italic">* = required field</p>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="propertyStreet"
          labelText="Street"
          formDataKey="street"
          placeholder="street address of the property"
          type="text"
        />
        <FormField
          {...props}
          labelId="propertyUnit"
          labelText="Unit"
          formDataKey="unit"
          placeholder="unit, if applicable"
          type="text"
        />
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="propertyCity"
          labelText="City*"
          formDataKey="city"
          placeholder="city where the property is located"
          type="text"
        />
        <FormField
          {...props}
          labelId="propertyState"
          labelText="State*"
          formDataKey="state"
          placeholder="state where the property is located"
          type="text"
        />
      </div>
      <div className="w-1/2 pr-2">
        <FormField
          {...props}
          labelId="propertyZipcode"
          labelText="Zipcode*"
          formDataKey="zipcode"
          placeholder="5-digit zipcode"
          type="text"
        />
      </div>
      <div className="flex gap-4 w-full">
        <FormField
          {...props}
          labelId="propertyMonthlyRent"
          labelText="Monthly Rent*"
          formDataKey="monthlyRent"
          placeholder="monthly rent of the unit"
          type="number"
        />
        <FormField
          {...props}
          labelId="propertyManagementCompany"
          labelText="Property Management Company"
          formDataKey="propertyManagementCompany"
          placeholder="company or landlord that manages property"
          type="text"
        />
      </div>
    </div>
  );
};

export default PropertyDetails;
