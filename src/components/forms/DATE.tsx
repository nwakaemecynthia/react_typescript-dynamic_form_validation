import {useMemo, useState} from "react";
import moment from "moment/moment";
import { Controller } from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import { IFormProps } from "../../utils/types";

export const DATE = ({ divClass, inputClass, formControl, formHook }: IFormProps) => {

  const initialDate =  (typeof formControl["default_value"] !== "boolean" && formControl["default_value"] && moment(formControl["default_value"]).isValid()) ? moment(formControl["default_value"]).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
  const maxDate = (formControl["maximum"] && moment(formControl["maximum"]).isValid()) ? moment(formControl["maximum"]).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
  const minDate = (formControl["minimum"] && moment(formControl["minimum"]).isValid()) ? moment(formControl["minimum"]).format("YYYY-MM-DD") : moment("1960/01/01").format("YYYY-MM-DD");

  const [date, setDate] = useState<string | number | readonly string[] | undefined>(initialDate);
  const [validatorSchema, setValidatorSchema] = useState<object>();
  const errors = formHook.formState.errors || formHook.formState.errors[formControl["key"]];

  useMemo(() => {
    for (const [key, value] of Object.entries(formControl)) {
      switch (key) {
        case 'required':
          if (value) setValidatorSchema(prevState => ({ ...prevState, required: `${formControl["label"]} is required.` }));
          break;
        case 'maximum':
          setValidatorSchema(prevState => ({
            ...prevState,
            max: { value, message: `Maximum ${(value && moment(value).isValid()) ? `of ${moment(value).format('LL')}` : key} is required.` }
          }));
          break;
        case 'minimum':
          if (value) setValidatorSchema(prevState => ({
            ...prevState,
            min: { value, message: `Minimum of ${(value && moment(value).isValid()) ? `of ${moment(value).format('LL')}` : key} is required.` }
          }));
          break;
        default:
          break;
      }
    }
  }, []);

  const setDateParams = (value: any) => {
    console.log(value)
    formHook.setValue(formControl["key"], moment(value).toISOString());
    setDate(value);
  }

  return (
    <div className={divClass}>
      <label htmlFor={formControl["key"]} className="form-label">
        {formControl["label"]} {formControl["required"] && <span className="text-danger">*</span>}
      </label>
    
      <Controller
        name={formControl["key"]}
        control={formHook.control}
        isInvalid={errors}
        rules={{ ...validatorSchema, valueAsDate: true }}
        render={({ field }) => (
          <>
            <input type="date" 
              {...field}
              value={date}
              min={minDate} 
              max={maxDate}
              className={inputClass} 
              name={formControl["key"]}
              onChange={e => setDateParams(e.target.value)}/>
      
            <ErrorMessage
              errors={errors}
              name={formControl["key"]}
              render={(error) =>
                error &&
                Object.entries(error).map(([type, message]: any) => (
                  <small key={type} className="text-danger mt-1">{message}</small>
                ))
              }
            />
          </>
        )}
      />
    </div>
  );
}