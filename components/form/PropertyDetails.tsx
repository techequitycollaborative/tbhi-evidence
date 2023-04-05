import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  formData: any;
  setFormData: (e: any) => void;
  setDisableNext: (e: boolean) => void;
};

const PropertyDetails = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    console.log("applicant details errors", errors, isValid);
    if (isValid) {
      props.setDisableNext(false);
    } else {
      props.setDisableNext(true);
    }
  }, [isValid]);

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
