import { FormProps } from "@/pages";
import { CriminalHistoryEntry, Eviction, FormData } from "@/types/formdata";
import { useState } from "react";

interface BaseProps extends FormProps {
  labelId: string;
  formDataKey: keyof FormData;
  placeholder?: string;
  arrayInfo?: {
    index: number;
    keyAtIndex: keyof Eviction | keyof CriminalHistoryEntry;
  };
}
interface SelectProps extends BaseProps {
  type: "select";
  options: readonly string[];
}
interface InputProps extends BaseProps {
  type: "text" | "number" | "email" | "date";
}
export type FormInputProps = InputProps | SelectProps;

export default function Input(props: FormInputProps) {
  const { formData, setFormData, labelId, formDataKey, placeholder, arrayInfo } = props;

  const [type, setType] = useState(props.type === "select" ? "select" : "text");

  let value: any;
  if (arrayInfo) {
    value = (formData[formDataKey] as Array<any>)?.[arrayInfo.index]?.[arrayInfo.keyAtIndex];
  } else {
    value = formData[formDataKey] as string | number | undefined;
  }

  if (type === "date") {
    value = isoDateOnly(value);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let newValue: any = e.target.value;
    if (type === "date") {
      newValue = new Date(newValue);
    }

    if (arrayInfo) {
      const newFormData: FormData = {
        ...formData,
      };
      updateHistoryArray(newFormData[formDataKey] as Array<any>, arrayInfo.index, {
        [arrayInfo.keyAtIndex]: newValue,
      });
      setFormData(newFormData);
    } else {
      setFormData({
        ...formData,
        [formDataKey]: newValue,
      });
    }
  };

  return (
    <>
      {props.type === "select" ? (
        <select id={labelId} value={value || "1"} onChange={onChange}>
          <option value="1" disabled>
            {placeholder}
          </option>
          {props.options.map((el) => {
            return (
              <option key={el} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          id={labelId}
          placeholder={placeholder}
          type={type}
          value={value || ""}
          onChange={onChange}
          onFocus={() => setType(props.type)}
        />
      )}
    </>
  );
}

export function updateHistoryArray<T extends Object>(
  array: Array<T>,
  index: number,
  update: Object
) {
  if (array[index] !== undefined) {
    array[index] = { ...array[index], ...update };
  } else {
    array.push(update as T);
  }
  return array;
}

export function isoDateOnly(date: Date) {
  if (date) {
    return date.toISOString().split("T")[0];
  }
  return "";
}
