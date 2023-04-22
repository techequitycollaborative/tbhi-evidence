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

  // checking for first and last name at least
  if (!formData.landlordName || formData.landlordName.split(" ").length < 2) {
    errors.landlordName = "Landlord name is required";
  }

  return errors;
}

const PropertyDetails = (props: FormProps) => {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  return (
    <div>
      <p>Property Details</p>
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
      <FormField
        {...props}
        labelId="propertyCity"
        labelText="City"
        formDataKey="city"
        type="text"
      />
      <FormField
        {...props}
        labelId="propertyZipcode"
        labelText="Zipcode"
        formDataKey="zipcode"
        type="number"
      />
      <FormField
        {...props}
        labelId="propertyMonthlyRent"
        labelText="Monthly Rent"
        formDataKey="monthlyRent"
        type="number"
      />
      <FormField
        {...props}
        labelId="propertyLandlordName"
        labelText="Name of property mgr / landlord"
        formDataKey="landlordName"
        type="text"
      />
    </div>
  );
};

export default PropertyDetails;
