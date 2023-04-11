import { useForm } from "react-hook-form";
import { FormProps } from "../../pages";

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
      <div>
        <label>
          Street
          <input
            id="street"
            placeholder="Street"
            value={props.formData.street}
            type="text"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                street: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.street || null}</p>
        </label>
      </div>
      <div>
        <label>
          Unit
          <input
            id="unit"
            placeholder="Unit"
            value={props.formData.unit}
            type="text"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                unit: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.unit || null}</p>
        </label>
      </div>
      <div>
        <label>
          City
          <input
            id="city"
            placeholder="City"
            value={props.formData.city}
            type="text"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                city: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.city || null}</p>
        </label>
      </div>

      <div className="zipcode-input">
        <label>
          Zipcode
          <input
            id="zip-code"
            placeholder="5 digits Zipcode"
            value={props.formData.zipcode}
            type="number"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                zipcode: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.zipcode || null}</p>
        </label>
      </div>
      <div className="monthly-rent-input">
        <label>
          Monthly Rent
          <input
            id="monthly-rent"
            placeholder="most receent monthly income"
            value={props.formData.monthlyRent}
            type="number"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                monthlyRent: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.monthlyRent || null}</p>
        </label>
      </div>
      <div className="landlord-name-input">
        <label>
          Name of property mgr / landlord
          <input
            id="landlord-name"
            placeholder="Name of Landlord"
            value={props.formData.landlordName}
            type="text"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                landlordName: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>{props.errors?.landlordName || null}</p>
        </label>
      </div>
    </div>
  );
};

export default PropertyDetails;
