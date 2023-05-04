import Input, { FormInputProps } from "@/components/Input";

export type FormFieldProps = FormInputProps & {
  labelText?: string;
};

export default function FormField(props: FormFieldProps) {
  const { labelId, labelText, formDataKey, arrayInfo, errors } = props;

  return (
    <div className="flex-1">
      <div className={!labelText || arrayInfo ? "" : "mt-2"}>
        <label
          htmlFor={labelId + (arrayInfo?.index ?? "")}
          className={!labelText || arrayInfo ? "sr-only" : ""}
        >
          {labelText}
        </label>
      </div>
      <div>
        <Input {...props} />
        <div>
          {errors?.[formDataKey] && !arrayInfo && (
            <p className="error-text">{errors[formDataKey]}</p>
          )}
        </div>
      </div>
    </div>
  );
}
