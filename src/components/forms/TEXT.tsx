import {useMemo, useState} from "react";
import {ErrorMessage} from "@hookform/error-message";
import { IFormProps } from "../../utils/types";

export const TEXT = ({divClass, inputClass, formControl, formHook}: IFormProps) => {
	const [validatorSchema, setValidatorSchema] = useState<object>();
	const errors = formHook.formState.errors || formHook.formState.errors[formControl["key"]];

	useMemo(() => {
		for(const [key, value] of Object.entries(formControl)) {
			switch(key) {
				case 'required':
					if(value) setValidatorSchema(prevState => ({...prevState, required: `${formControl["label"]} is required.`}));
					break;
				case 'maximum':
					setValidatorSchema(prevState => ({
						...prevState,
						maxLength: {value, message: `Maximum of ${value} is required.`}
					}));
					break;
				case 'minimum':
					if(value) setValidatorSchema(prevState => ({
						...prevState,
						minLength: {value, message: `Minimum of ${value} is required.`}
					}));
					break;
				default:
					break;
			}
		}
	}, []);


	return (
		<div className={divClass}>
			<label htmlFor={formControl["name"]} className="form-label">
				{formControl["label"]} {formControl["required"] && <span className="text-danger">*</span>}
			</label>
			<input className={inputClass}
						 type={formControl["type"]}
						 name={formControl["name"]}
						 placeholder={formControl["placeholder"]}
						 defaultValue={formControl["default_value"]}
						 {...formHook.register(formControl["name"], {
							 ...validatorSchema
						 })}
			/>
			<ErrorMessage
				errors={errors}
				name={formControl["name"]}
				render={(error) =>
					error &&
					Object.entries(error).map(([type, message]: any) => (
						<small key={type} className="text-danger mt-1">{message}</small>
					))
				}
			/>
		</div>
	);
}