import { useForm } from "react-hook-form";
import { FormProps } from "../../pages";

/**
 * @returns An object with key/value pairs of errors,
 * where the key matches the name of the input field.
 * If there are no errors, returns an empty object.
 */
export function validateProperty(formData: any): { [key: string]: string } {
  // validate state is in list
  // any other address validation?
  // validate montly rent is positive number
  // validate landlord name is alphabetical with a space (at least first and last name)
  return {};
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
            {...register("street", {
              required: "required",
            })}
            type="text"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                street: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Unit
          <input
            id="unit"
            placeholder="Unit"
            value={props.formData.unit}
            {...register("unit", {
              required: "required",
            })}
            type="text"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                unit: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div>
        <label>
          City
          <input
            id="city"
            placeholder="City"
            value={props.formData.city}
            {...register("city", {
              required: "required",
            })}
            type="text"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                city: e.target.value,
              });
            }}
          />
        </label>
      </div>

      <div className="zipcode-input">
        <label>
          Zipcode
          <input
            id="zip-code"
            placeholder="5 digits Zipcode"
            value={props.formData.zipcode}
            {...register("zipcode", {
              required: "required",
              valueAsNumber: true,
              max: 99999,
              min: 10000,
            })}
            type="number"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                zipcode: e.target.value,
              });
            }}
          />
          <p style={{ color: "red" }}>
            {errors.zipcode?.type === "max" && "Zipcode must be 5 digits"}
            {errors.zipcode?.type === "min" && "Zipcode must be 5 digits"}
            {errors.zipcode?.type === "required" && "Zipcode is required"}
          </p>
        </label>
      </div>
      <div className="monthly-rent-input">
        <label>
          Monthly Rent
          <input
            id="monthly-rent"
            placeholder="most receent monthly income"
            value={props.formData.monthlyrent}
            {...register("monthlyrent", {
              required: "required",
              valueAsNumber: true,
            })}
            type="number"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                monthlyrent: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div className="landlord-name-input">
        <label>
          Name of property mgr / landlord
          <input
            id="landlord-name"
            placeholder="Name of Landlord"
            {...register("landlordName", {
              required: "required",
              valueAsNumber: true,
            })}
            value={props.formData.landlordName}
            type="text"
            onChange={(e) => {
              props.setFormData({
                ...props.formData,
                landlordName: e.target.value,
              });
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default PropertyDetails;
