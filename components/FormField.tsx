import Input, { FormInputProps } from "@/components/Input";

export type FormFieldProps = FormInputProps & {
  labelText?: string;
};

export default function FormField(props: FormFieldProps) {
  const { labelId, labelText, formDataKey, errors } = props;

  return (
    <div className="flex-1">
      <div className={!labelText ? "" : "mt-2"}>
        <label
          htmlFor={labelId}
          className={!labelText ? "sr-only" : ""}
        >
          {labelText}
        </label>
      </div>
      <div>
        <Input {...props} />
        <div>
          {errors?.[formDataKey] && (
            <p className="error-text">{errors[formDataKey]}</p>
          )}
        </div>
      </div>
    </div>
  );
}
