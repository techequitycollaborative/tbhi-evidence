import { FormProps } from "@/pages";
import { Question, FormData } from "@/types/formdata";
import { useState } from "react";

interface BaseProps extends FormProps {
  labelId: string;
  formDataKey: keyof FormData;
  placeholder?: string;
}
interface SelectProps extends BaseProps {
  type: "select";
  options: readonly string[];
}
interface InputProps extends BaseProps {
  type: "text" | "number" | "email" | "date" | "textarea";
}
interface MultiSelectProps extends BaseProps {
  type: "multiselect";
  prompt: string;
  options: readonly string[];
}
export type FormInputProps = InputProps | SelectProps | MultiSelectProps;

export default function Input(props: FormInputProps) {
  const { formData, setFormData, labelId, formDataKey, placeholder } = props;

  let value: any = formData[formDataKey] as string | number | undefined;

  const [type, setType] = useState(
    props.type === "select" ? "select" : props.type === "date" && !!value ? "date" : "text"
  );
  if (type === "date") {
    value = isoDateOnly(value);
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let newValue: any = e.target.value;
    if (type === "date") {
      newValue = new Date(newValue);
    }
    setFormData({
      ...formData,
      [formDataKey]: newValue,
    });
  };

  const onCheck = (
    e: any
  ) => {
    let answer: any = {question: e.target.name, answer: e.target.checked};
    const history = updateHistoryArray(formData[formDataKey] as Array<any> | undefined, answer);
    setFormData({ ...formData, [formDataKey]: history });
  };

  switch (props.type) {
    case "select":
      return (
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
      );
    case "textarea":
      return (
        <textarea id={labelId} placeholder={placeholder} value={value || ""} onChange={onChange} />
      );
    case "multiselect":
      return (
        <div>
          <p className="text-navy">{props.prompt}</p>
          {props.options.map((el) => {
            return (
              <div key={el} className="flex ml-4">
                <div className="w-4 h-4">
                  <input onChange={onCheck} type="checkbox" id={el} name={el} className="hover:cursor-pointer w-4" checked={getHistoryAnswer(formData[formDataKey], el)} />
                </div>
                <p className="text-navy ml-2 mt-[10px]">{el}</p>
              </div>
            );
          })}
        </div>
      );
    default:
      return (
        <input
          id={labelId}
          placeholder={placeholder}
          type={type}
          value={value || ""}
          onChange={onChange}
          onFocus={() => setType(props.type)}
        />
      );
  }
}

function getHistoryAnswer(array: any, question: string): boolean {
  let answer = false;
  array?.forEach((entry: Question) => {
      if (entry.question === question) {
        answer = entry.answer;
      }
    }
  );
  return answer;
}

export function updateHistoryArray(
  array: Array<Question> | undefined,
  updatedEntry: Question
): Array<Question> {
  if (!array) {
    array = [];
  }

  let questionExists = false;
  array?.forEach((entry: Question) => {
      if (entry.question === updatedEntry.question) {
        entry.answer = updatedEntry.answer;
        questionExists = true;
      }
    }
  );

  if (questionExists) {
    return array;
  }
  else {
    return [...array, updatedEntry];
  }
}

export function isoDateOnly(date: Date|string) {
  if (date) {
    if (typeof date === 'string') {
      return date.split("T")[0];
    }
    else {
      return date.toISOString().split("T")[0];
    }
  }
  return "";
}
